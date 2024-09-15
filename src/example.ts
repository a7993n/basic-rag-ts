import { DocumentStore } from "./documentStore";
import { DocumentRetriever } from "./retrieval";

const store = new DocumentStore();

store.addDocument({ id: 1, title: 'Introduction to Node.js', content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.' });
store.addDocument({ id: 2, title: 'Advanced TypeScript', content: 'TypeScript offers static type-checking and powerful type system for large JavaScript projects.' });
store.addDocument({ id: 3, title: 'JavaScript Performance Tips', content: 'Optimizing JavaScript code can greatly improve performance in web apps.' });
store.addDocument({ id: 4, title: 'Fastify Guide', content: 'Fastify is a high-performance Node.js web framework for building APIs.' });
store.addDocument({ id: 5, title: 'REST API Best Practices', content: 'Designing a REST API involves defining endpoints, methods, and status codes.' });

const retriever = new DocumentRetriever(store);

const query = 'js';
const topN = 3;

const results = retriever.retrieve(query, topN);

console.log('Search Query:', query);
console.log('Top', topN, 'Results:');

results.forEach((result: { document: { id: any; title: any; content: any; }; score: number; }, index: number) => {
  console.log(`\nResult ${index + 1}:`);
  console.log(`ID: ${result.document.id}`);
  console.log(`Title: ${result.document.title}`);
  console.log(`Content: ${result.document.content}`);
  console.log(`Score: ${result.score.toFixed(2)}`);
});
