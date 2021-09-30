<!--
TODO:
1. take filepath (or post number or post title) as prop
3. compute MD text
4. decide blogpost design
5. convert MD to HTML (how to sub in markup as a string?)
-->

<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import marked from 'marked';
import markedImages from 'marked-images';
//import * as fs from 'fs';
import sanitizeHtml from 'sanitize-html'

const renderer = {
    heading(text, level) {
        return `
        <h${level}>
            ${text}
        </h${level}>
        `;
    }
}

marked.use(renderer)
marked.use(markedImages())
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

export default {
    computed: {
        compiledMarkdown() {
            if (slug) 
                return sanitizeHtml(marked(fs.readFile(`./articles/${slug}/${slug}.md`)))

            return `<h1>Post not found!</h1>`
        }
    }
}
</script>

<style>

</style>