import Document, { Html, Head, NextScript, Main } from 'next/document';

import NProgress from 'nprogress';

import 'nprogress'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
