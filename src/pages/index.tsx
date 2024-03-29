import * as React from 'react';
import Helmet from 'react-helmet';
import {graphql, useStaticQuery, Link} from 'gatsby';

import Layout from 'src/components/layout.tsx';

import socialIcons from 'src/images/social-icons.svg';
import logo from 'src/images/long-logo-1000.svg';

import * as css from './index.module.css';

export default () => {
  const data: {
    allSongsJson: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          artist: string;
          number: number;
        },
      }>
    };
  } = useStaticQuery(query);

  const header = (
    <div className={css.header}>
      <div className={css.headerQuote}>
        <div className={css.quote}>
          “A playlist of songs that Donald Trump will hate.”
        </div>
        <div> - The Washington Post</div>
      </div>

      <div className={css.links}>
        <Link className={css.linkAbout} to="/about">
          About
        </Link>
        <a className={css.linkRegister} href="https://www.headcount.org/">
          Register to Vote
        </a>
        <Link className={css.linkMasthead} to="/masthead">
          Masthead
        </Link>
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
            {data.allSongsJson.edges.map(
              ({
                node: {
                  id,
                  title, artist, number,
                },
              }) => (
                <Link className={css.song} to={`/${number}`}>
                  <li className={css.songItem}>
                    <span className={css.songNumber}>{number}</span>
                    <div className={css.songInfo}>
                      <span className={css.songArtist}>{artist}</span>
                      <span className={css.songTitle}>{title}</span>
                    </div>
                    <div className={css.songArrow} />
                  </li>
                </Link>
              ),
            )}
          </ol>
        </div>
      </div>
    </Layout>
  );
};

const query = graphql`
  query HomePageQuery {
    allSongsJson(
      sort: {order: DESC, fields: [number]}
      filter: {state: {eq: "published"}}
    ) {
      edges {
        node {
          id
          artist
          title
          number
          state
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
