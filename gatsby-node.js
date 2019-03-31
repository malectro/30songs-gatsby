const path = require('path');

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions;

  const pageComponent = path.resolve(`src/components/page.tsx`);
  const songComponent = path.resolve(`src/components/song.tsx`);

  const [pages, songs] = await Promise.all([
    graphql(`
      {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/pages/"}}
          limit: 1000
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `),
    graphql(`
      {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/songs/"}}
          limit: 1000
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              frontmatter {
                number
              }
            }
          }
        }
      }
    `),
  ]);

  if (pages.errors) {
    throw page.errors;
  }

  pages.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: node.frontmatter.slug,
      component: pageComponent,
      context: {id: node.id}, // additional data can be passed via context
    });
  });

  if (songs.errors) {
    throw songs.errors;
  }

  songs.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: String(node.frontmatter.number), 
      component: songComponent,
      context: {id: node.id},
    })
  });
};
