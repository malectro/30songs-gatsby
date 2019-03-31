import React from 'react';


export const ogMeta = (props: {[key: string]: string}) => (
  Object.keys(props).map(key => (
    <meta key={key} property={`og:${key}`} content={props[key]} />
  ))
);

export default ogMeta;