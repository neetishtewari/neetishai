import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Thought Journal',
            slugField: 'title',
            path: 'content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date' }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                tags: fields.array(
                    fields.text({ label: 'Tag' }),
                    { label: 'Tags', itemLabel: (props) => props.value }
                ),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
    },
});
