import React from 'react';
import {graphql} from 'gatsby';

import Layout from 'src/components/layout.tsx';
import Navigation from 'src/components/navigation.tsx';

import * as css from './page.module.css';

export default function Page({
  data,
}: {
  data: {
    pagesJson: {
      content: {
      html: string;
      };
        title: string;
        description: string;
    };
  };
}) {
  const {
    pagesJson: {
      content: {html},
      description,
      title,
    },
  } = data;

  return (
    <Layout navigation={<Navigation />}>
      <div className={css.page} dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  );
}

export const query = graphql`
  query GenericPageQuery($id: String!) {
    pagesJson(id: {eq: $id}) {
      id
      content {
        html
      }
      description
      title
    }
  }
`;
