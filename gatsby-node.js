const path = require('path');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const Component = path.resolve(`src/components/page.tsx`);

  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.slug,
        component: Component,
        context: {id: node.id}, // additional data can be passed via context
      });
    });
  });
};
