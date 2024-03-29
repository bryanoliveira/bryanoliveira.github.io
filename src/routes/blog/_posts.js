// code from https://newcurrent.se/blog/create-markdown-sapper-svelte-blog

const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");
const hljs = require("highlight.js");
const readingTime = require('reading-time');
const files = fs.readdirSync("posts");

// Use highlight.js as the highlighter for the marked library
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(code, {language: lang, ignoreIllegals: true }).value;
  },
});

let posts = [];
for (let i = 0; i < files.length; i++) {
  const content = fs.readFileSync(`posts/${files[i]}`, { encoding: "utf-8" });
  // Use the front-matter library to separate the body from the front matter
  const { body, ...frontMatter } = fm(content);
  // Use the marked library to turn markdown into html
  const html = marked(body);
  const readingStats = readingTime(body);
  posts.push({ html, readingTime: readingStats.text, ...frontMatter.attributes });
}
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export default posts;