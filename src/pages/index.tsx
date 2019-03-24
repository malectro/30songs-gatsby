import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import classnames from 'classnames';

import Navigation from 'src/components/navigation.tsx';

import css from './index.module.css';

export default ({data}) => {
  const titleText = '30 Days, 30 Songs';
  const aboutText = '';

  return (
    <div className={css.main}>
      <Helmet>
        <title>{titleText}</title>
        <OgMeta
          title={titleText}
          type="website"
          url="http://www.30days30songs.com"
          image="http://www.30days30songs.com/images/logo.png"
          description={aboutText}
          site_name={titleText}
        />
      </Helmet>

      <div className={css.wrapper}>
        <div className={css.center}>
          <Navigation />
        </div>
      </div>

      <footer className={css.footer} paintColor='#efefef'>
        <a className={css.footerEagle} href='/' />
      </footer>
    </div>
  );
};

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___order]}
      filter: {fileAbsolutePath: {regex: "/navLinks/"}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            url
            order
          }
        }
      }
    }
  }
`;

const OgMeta = (props: {[key: string]: string}) => (
  <>
    {Object.keys(props).map(key => (
      <meta key={key} property={`og:${key}`} content={props[key]} />
    ))}
  </>
);
