const path = require('path');
const remark = require('remark');
const remarkHtml = require('remark-html');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;

  const pageComponent = path.resolve(`src/components/page.tsx`);
  const songComponent = path.resolve(`src/components/song.tsx`);

  const [pages, songs] = await Promise.all([
    graphql(`
      {
        allPagesJson(
          limit: 1000
        ) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `),
    graphql(`
      {
        allSongsJson(
          limit: 1000
        ) {
          edges {
            node {
              id
              number
            }
          }
        }
      }
    `),
  ]);

  if (pages.errors) {
    throw page.errors;
  }

  pages.data.allPagesJson.edges.forEach(({node}) => {
    createPage({
      path: node.slug,
      component: pageComponent,
      context: {id: node.id}, // additional data can be passed via context
    });
  });

  if (songs.errors) {
    throw songs.errors;
  }

  songs.data.allSongsJson.edges.forEach(({node}) => {
    createPage({
      path: String(node.number),
      component: songComponent,
      context: {id: node.id},
    });
  });
};

/*
exports.onCreateNode = ({node}) => {
  if (node.artist) {
    ['bio', 'quote'].forEach(fieldName => {
      const markdown = node[fieldName];
      if (markdown) {
        node[fieldName] = remark()
          .use(remarkHtml)
          .processSync(markdown)
          .toString();
      }
    });
  }
  return node;
};
*/
