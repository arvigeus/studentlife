// @flow

import React from 'react';

type HtmlType = {
  title: any,
  meta: any,
  cssUri: string,
  data: any,
  jsUri: string,
  markup: any,
  settings: any,
  analytics: any
}

// This component is rendered server side only
const Html = ({ title, meta, cssUri, data, jsUri, markup, settings, analytics }: HtmlType) => (
  <html lang="bg" prefix="og: http://ogp.me/ns#">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="bg" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {meta.toComponent()}
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css" />
      {cssUri && <link rel="stylesheet" type="text/css" href={cssUri} />}
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="alternate" type="application/atom+xml" title="Atom Feed for studentlife.bg" href="/atom.feed" />
      {title.toComponent()}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
      <script
        id="preloadedData"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/\//g, '\\/') }}
      />
      <script
        id="settings"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(settings) }}
      />
      {analytics.google.trackingId &&
        <script
          dangerouslySetInnerHTML={{ __html:
            `(function(i,r){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){` +
            `(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date()` +
            `})(window,'ga');` +
            `window.ga('create', '${analytics.google.trackingId}', 'auto');`
          }}
        />
        }
      {analytics.google.trackingId &&
        <script src="https://www.google-analytics.com/analytics.js" async defer />
      }
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
      <script src={jsUri} />
    </body>
  </html>
);

export default Html;
