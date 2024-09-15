export class TFIDF {
    private documents: string[] = [];
  
    constructor(documents: string[]) {
      this.documents = documents;
    }
  
    private termFrequency(term: string, document: string): number {
      const words = document.split(/\s+/);
      const termCount = words.filter(word => word.toLowerCase() === term.toLowerCase()).length;
      return termCount / words.length;
    }
  
    private inverseDocumentFrequency(term: string): number {
      const docCount = this.documents.length;
      const docsContainingTerm = this.documents.filter(doc => doc.toLowerCase().includes(term.toLowerCase())).length;
      return Math.log(docCount / (1 + docsContainingTerm));
    }
  
    public tfidf(term: string, document: string): number {
      const tf = this.termFrequency(term, document);
      const idf = this.inverseDocumentFrequency(term);
      return tf * idf;
    }
  }
  