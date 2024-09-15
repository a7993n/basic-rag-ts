export interface Document {
    id: number;
    title: string;
    content: string;
  }
  
  export class DocumentStore {
    private documents: Document[] = [];
  
    public addDocument(document: Document) {
      this.documents.push(document);
    }
  
    public getDocuments(): Document[] {
      return this.documents;
    }
  
    public clear() {
      this.documents = [];
    }
  }
  