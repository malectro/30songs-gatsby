import * as React from 'react';
import Helmet from 'react-helmet';

import ogMeta from 'src/components/og-meta.tsx';

import css from './layout.module.css';


export default function Layout({header, navigation, children}: {
  header?: React.ReactNode,
  navigation?: React.ReactNode,
  children: React.ReactNode,
}) {
  const titleText = '30 Days, 30 Songs';
  const aboutText = '';

  return (
    <div className={css.main}>
      <Helmet>
        <title>{titleText}</title>
        {ogMeta({
          title: titleText,
          type: "website",
          url: "http://www.30days30songs.com",
          image: "http://www.30days30songs.com/images/logo.png",
          description: aboutText,
          site_name: titleText,
        })}
      </Helmet>

      {header ? header : <div className={css.empty} />}

      <div className={css.wrapper}>
        <div className={css.center}>
          <div className={css.content}>{children}</div>
          {navigation}
        </div>
      </div>

      <footer className={css.footer} paintColor='#efefef'>
        <a className={css.footerEagle} href='/' />
      </footer>
    </div>
  );
};
