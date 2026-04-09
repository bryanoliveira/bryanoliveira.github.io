import posts from '$lib/posts.js';
export function load() {
    return { posts: posts.map(({ html, ...p }) => p) };
}
