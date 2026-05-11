import posts from '$lib/posts.js';
import { error } from '@sveltejs/kit';
const lookup = new Map(posts.map(p => [p.slug, p]));
export const prerender = true;
export function entries() {
    return posts.map(p => ({ slug: p.slug }));
}
export function load({ params }) {
    const post = lookup.get(params.slug);
    if (!post) throw error(404, 'Not found');
    return { post, slug: params.slug };
}
