import React from 'react';
import Helmet from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

import Layout from 'src/components/layout.tsx';

import socialIcons from 'src/images/social-icons.svg';
import logo from 'src/images/long-logo-1000.svg';

import css from './index.module.css';

export default () => {
  const data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string;
          frontmatter: {
            title: string;
            artist: string;
            number: number;
          };
        };
      }>;
    };
  } = useStaticQuery(songsQuery);

  const header = (
    <div className={css.header}>
      <div className={css.headerQuote}>
        <div className={css.quote}>
          “A playlist of songs that Donald Trump will hate.”
        </div>
        <div> - The Washington Post</div>
      </div>

      <div className={css.links}>
        <a className={css.linkAbout} href="/about">
          About
        </a>
        <a className={css.linkRegister} href="https://www.headcount.org/">
          Register to Vote
        </a>
        <a className={css.linkMasthead} href="/masthead">
          Masthead
        </a>
      </div>

      <div className={css.headerSocial}>
        <a
          className={css.headerSocialLink}
          href="https://twitter.com/30days30songs"
          title="Twitter"
        >
          <SocialIcon type="twitter" />
        </a>
        <a
          className={css.headerSocialLink}
          href="https://www.facebook.com/30songs30"
          title="Facebook"
        >
          <SocialIcon type="facebook" />
        </a>
        <a
          className={css.headerSocialLink}
          href="https://instagram.com/30days30songs"
          title="Instagram"
        >
          <SocialIcon type="instagram" />
        </a>
        <a
          className={css.headerSocialLink}
          href="https://www.youtube.com/c/30days30songs"
          title="Youtube"
        >
          <SocialIcon type="youtube" />
        </a>
      </div>
    </div>
  );

  return (
    <Layout header={header} showNavigation={false}>
      <div className={css.wrapper}>
        <div className={css.splash}>
          <img className={css.logo} src={logo} alt="30 Days, 30 Songs" />

          <div className={css.social}>
            <a
              className={css.socialLink}
              href="https://open.spotify.com/user/30days30songs/playlist/0GDtTmyBfSvYxMgFCS6yee?utm_campaign=30days30songs&utm_medium=web"
              paintColor="#efefef"
            >
              <SocialIcon type="spotify" />
              <span>Listen to the playlist</span>
            </a>
            <a
              className={css.socialLink}
              href="https://twitter.com/intent/tweet?text=http://www.30days30songs.com"
              about="_blank"
              paintColor="#efefef"
            >
              <SocialIcon type="twitter" />
              <span>Share on Twitter</span>
            </a>
            <a
              className={css.socialLink}
              href="https://www.facebook.com/sharer/sharer.php?u=http://www.30days30songs.com"
              paintColor="#efefef"
            >
              <SocialIcon type="facebook" />
              <span>Share on Facebook</span>
            </a>
          </div>

          <ol className={css.songs}>
            {data.allMarkdownRemark.edges.map(
              ({
                node: {
                  id,
                  frontmatter: {title, artist, number},
                },
              }) => (
                <a className={css.song} href={`/${number}`}>
                  <li className={css.songItem}>
                    <span className={css.songNumber}>{number}</span>
                    <div className={css.songInfo}>
                      <span className={css.songArtist}>{artist}</span>
                      <span className={css.songTitle}>{title}</span>
                    </div>
                    <div className={css.songArrow} />
                  </li>
                </a>
              ),
            )}
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export const songsQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___number]}
      filter: {fileAbsolutePath: {regex: "/songs\/[^\/]+/"}}
    ) {
      edges {
        node {
          id
          frontmatter {
            artist
            title
            number
          }
        }
      }
    }
  }
`;

const SocialIcon = ({type}: {type: string}) => (
  <svg className={css.socialIcon}>
    <use
      className={css.socialUseIcon}
      xlinkHref={`${socialIcons}#${type}-icon`}
    />
  </svg>
);
