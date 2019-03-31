import React from 'react';
import {graphql} from 'gatsby';

import Layout from 'src/components/layout.tsx';

import css from './page.module.css';

export default function Song({
  data,
}: {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        artist: string;
        day: number,
        number: number,
        youtubeUrl?: string,
        spotifyUrl?: string,
        image?: string,
        cropImage: boolean,
        bio?: string,
        quote?: string,
        lyrics?: string,
        state: 'published' | 'draft' | 'archived',
      };
    };
  };
}) {
  const {
    markdownRemark: {
      frontmatter: {artist, title},
    },
  } = data;

  return (
    <Layout>
      <div className={css.page}>{artist}</div>
    </Layout>
  );
}

export const query = graphql`
  query SongQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        title
        artist
        day
        number
        youtubeUrl
        spotifyUrl
        image
        cropImage
        bio
        quote
        lyrics
        state
      }
    }
  }
`;
