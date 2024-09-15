import { DocumentStore, Document } from './documentStore';
import { TFIDF } from './tfidf';
import { FuzzyMatch } from './fuzzy';

export class DocumentRetriever {
  private documentStore: DocumentStore;
  private fuzzyMatcher: FuzzyMatch;
  private tfidfCalculator: TFIDF;

  constructor(documentStore: DocumentStore) {
    this.documentStore = documentStore;
    const documents = documentStore.getDocuments().map(doc => doc.content);
    this.tfidfCalculator = new TFIDF(documents);
    this.fuzzyMatcher = new FuzzyMatch();
  }

  public retrieve(query: string, topN: number = 3): { document: Document, score: number }[] {
    const documents = this.documentStore.getDocuments();
    const queryTerms = query.split(/\s+/);

    const documentScores = documents.map((doc) => {
      let score = 0;

      queryTerms.forEach(term => {
        score += this.tfidfCalculator.tfidf(term, doc.content);
      });

      queryTerms.forEach(term => {
        doc.content.split(/\s+/).forEach(word => {
          score += this.fuzzyMatcher.fuzzyMatch(term, word);
        });
      });

      if (doc.title.toLowerCase().includes(query.toLowerCase())) {
        score += 2;
      }

      return { document: doc, score };
    });

    return documentScores
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }
}
