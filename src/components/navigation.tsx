import * as React from 'react';
import classnames from 'classnames';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';

import * as css from './navigation.module.css';

export default function Navigation({
  songNumber,
  latestSongNumber = 10,
}: {
  songNumber?: number;
  latestSongNumber?: number;
}) {
  const data: {
    allSongsJson: {
      totalCount: number;
    };
    allNavlinksJson: {
      nodes: Array<{
        url: string;
        name: string;
      }>,
    }
  } = useStaticQuery(query);

  if (!data) {
    return null;
  }

  const navLinks = data.allNavlinksJson.nodes;
  const totalSongs = data.allSongsJson.totalCount;

  /*
  const navLinks = nodes
    .filter(({fileAbsolutePath}) => fileAbsolutePath.match(/\/navLinks\//))
    .map(({id, frontmatter}) => ({
      ...frontmatter,
      id,
    }));
  */

  /*
  const totalSongs = nodes.filter(
    ({fileAbsolutePath, frontmatter: {state}}) =>
      state === 'published',
  ).length;
   */

  return (
    <div className={css.fixedSpace}>
      <div className={css.fixed}>
        <nav className={css.main}>
          <div className={css.top} paintColor="">
            “A playlist of songs that Donald Trump will hate.”
            <div>The Washington Post</div>
          </div>

          <Link className={css.logoLink} to="/">
            <StaticImage className={css.logoImg} src="../images/logo-simple-1000.svg" />
          </Link>

          {Number.isInteger(songNumber) ? (
            <div className={css.songLinksArrows}>
              {songNumber > 1 ? (
                <Link
                  className={css.arrowLeft}
                  to={`/${songNumber - 1}`}
                  title="Previous Song"
                />
              ) : (
                <div className={css.arrowBlank} />
              )}
              <div className={css.arrowNumber}>{songNumber}</div>
              {songNumber < totalSongs ? (
                <Link
                  className={css.arrowRight}
                  to={`/${songNumber + 1}`}
                  title="Next Song"
                />
              ) : (
                <div className={css.arrowBlank} />
              )}
            </div>
          ) : (
            <div className={css.songLinksBuffer} />
          )}

          <div className={css.links} paintColor="">
            {navLinks.map(navLink => (
              <div className={css.link} key={navLink.url}>
                <Link to={navLink.url}>{navLink.name}</Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

const query = graphql`
  query NavigationQuery {
      allSongsJson(filter: {state: {eq: "published"}}) {
    totalCount
  }
    allNavlinksJson(
      sort: {
        fields: [order]
      }
    ) {
      nodes {
        url
        name
      }
    }
  }
`;
