import * as React from 'react';
import classnames from 'classnames';
import {useStaticQuery, graphql} from 'gatsby';

import css from './navigation.module.css';

export default function Navigation({
  songNumber,
  latestSongNumber = 10,
}: {
  songNumber?: number;
  latestSongNumber?: number;
}) {
  const data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string;
          fileAbsolutePath: string;
          frontmatter: {
            url: string;
            title: string;
            state: string;
          };
        };
      }>;
    };
  } = useStaticQuery(query);

  if (!data) {
    return null;
  }

  const nodes = data.allMarkdownRemark.edges.map(({node}) => node);

  const navLinks = nodes
    .filter(({fileAbsolutePath}) => fileAbsolutePath.match(/\/navLinks\//))
    .map(({id, frontmatter}) => ({
      ...frontmatter,
      id,
    }));

  const totalSongs = nodes.filter(({fileAbsolutePath, frontmatter: {state}}) =>
    fileAbsolutePath.match(/\/songs\//) && state === 'published',
  ).length;

  return (
    <div className={css.fixedSpace}>
      <div className={css.fixed}>
        <nav className={css.main}>
          <div className={css.top} paintColor="">
            “A playlist of songs that Donald Trump will hate.”
            <div>The Washington Post</div>
          </div>

          <a className={css.logoLink} href="/">
            <img className={css.logoImg} />
          </a>

          {Number.isInteger(songNumber) ? (
            <div className={css.songLinksArrows}>
              {songNumber > 1 ? (
                <a
                  className={css.arrowLeft}
                  href={`/${songNumber - 1}`}
                  title="Previous Song"
                />
              ) : (
                <div className={css.arrowBlank} />
              )}
              <div className={css.arrowNumber}>{songNumber}</div>
              {songNumber < totalSongs ? (
                <a
                  className={css.arrowRight}
                  href={`/${songNumber + 1}`}
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
              <div className={css.link} key={navLink.id}>
                <a href={navLink.url}>{navLink.title}</a>
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
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//(navLinks|songs)//"}}
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            title
            url
            order
            state
          }
        }
      }
    }
  }
`;
