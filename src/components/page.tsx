import React from 'react';
import {graphql} from 'gatsby';

import Layout from 'src/components/layout.tsx';

import css from './page.module.css';

export default function Page({
  data,
}: {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        description: string;
      };
    };
  };
}) {
  const {
    markdownRemark: {
      html,
      frontmatter: {description, title},
    },
  } = data;

  return (
    <Layout>
      <div className={css.page} dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  );
}

export const query = graphql`
  query GenericPageQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        description
        title
      }
    }
  }
`;
