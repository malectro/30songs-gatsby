module.exports = {
  pathPrefix: '/30-days-30-songs',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/cms/songs`,
        name: 'song',
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/cms/navLinks`,
        name: 'navLink',
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/cms/pages`,
        name: 'page',
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/mongostuff`,
        name: 'mongo',
      }
    },
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
  ],
}
