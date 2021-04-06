import * as React from 'react';
import {graphql} from 'gatsby';
import Helmet from 'react-helmet';

import Layout from 'src/components/layout';
import Navigation from 'src/components/navigation';
import ogMeta from 'src/components/og-meta';

import * as css from './song.module.css';

export default function Song({
  data,
}: {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        artist: string;
        day: number;
        number: number;
        youtubeUrl?: string;
        spotifyUrl?: string;
        image?: string;
        gamePath?: string;
        cropImage: boolean;
        bio?: string;
        quote?: string;
        lyrics?: string;
        state: 'published' | 'draft' | 'archived';
      };
    };
  };
}) {
  const {
    markdownRemark: {
      frontmatter: {
        artist,
        title,
        number,
        day,
        image,
        cropImage,
        youtubeUrl,
        spotifyUrl,
        bio,
        gamePath,
        lyrics,
        quote,
      },
    },
  } = data;

  const youtubeId = youtubeUrl && new URL(youtubeUrl).searchParams.get('v');

  return (
    <Layout navigation={<Navigation songNumber={number} />}>
      <Helmet>
        <title>{artist} - 30 Days, 30 Songs</title>
        <meta name="description" content={title} />
        {ogMeta({
          title,
          type: 'website',
          url: `http://www.30days30songs.com/${number}`,
          image: '',
          description: artist,
        })}
      </Helmet>
      <div className={css.song}>
        <div className={css.day}>
          Day {day}, Song {number}
        </div>
        <h2 className={css.artist}>{artist}</h2>
        <h1 className={css.title}>{title}</h1>

        {youtubeId && (
          <iframe
            className={css.video}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            height="340"
            frameBorder="0"
          />
        )}
        {spotifyUrl && (
          <iframe
            className={css.widget}
            src={`https://embed.spotify.com/?uri=${spotifyUrl}`}
            height="80"
            frameBorder="0"
            allowTransparency={true}
          />
        )}

        <div className={css.info}>
          <div className={css.infoCol1}>
            {image &&
              (cropImage ? (
                <div
                  className={css.image}
                  style={{backgroundImage: `url(${image})`}}
                />
              ) : (
                <img className={css.image} src={image} />
              ))}
            <div className={css.bio} paintColor="" dangerouslySetInnerHTML={{__html: bio}} />
          </div>

          <div className={css.infoCol2}>
            {gamePath && (
              <div>
                <a className={css.startGame} href="/jets">
                  <img src="src/images/jets.jpeg" />
                </a>
              </div>
            )}

            <div className={css.quote} dangerouslySetInnerHTML={{__html: quote}} />

            <div className={css.lyricsLabel}>Lyrics</div>
            <p className={css.lyrics}>{lyrics}</p>
          </div>
        </div>
      </div>
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
