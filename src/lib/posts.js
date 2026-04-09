import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import readingTime from 'reading-time';

marked.use(markedHighlight({
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

const postsDir = path.join(process.cwd(), 'posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let posts = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), { encoding: 'utf-8' });
  const { body, ...frontMatter } = fm(content);
  const html = marked.parse(body);
  const readingStats = readingTime(body);
  posts.push({ html, readingTime: readingStats.text, ...frontMatter.attributes });
}
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export default posts;
