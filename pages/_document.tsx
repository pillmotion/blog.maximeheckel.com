import { getCssText } from '@maximeheckel/design-system';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh" className="maximeheckel-light">
        <Head>
          <link
            href="/static/favicons/logo-favicon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/logo-favicon.png"
            rel="icon"
            sizes="196x196"
            type="image/png"
          />
          <link
            href="/static/favicons/logo-favicon.png"
            rel="icon"
            sizes="128x128"
            type="image/png"
          />
          <link
            href="/static/favicons/logo-favicon.png"
            rel="icon"
            sizes="96x96"
            type="image/png"
          />
          <link
            href="/static/favicons/logo-favicon.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/logo-favicon.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            rel="webmention"
            href="https://webmention.io/blog.maximeheckel.com/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/blog.maximeheckel.com/xmlrpc"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        </Head>
        <body className="maximeheckel-dark">
          <Script src="/sw.js"></Script>
          <script
            key="maximeheckel-theme"
            dangerouslySetInnerHTML={{
              __html: `(function() { try {
        var mode = localStorage.getItem('mode');
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
        if (!mode && supportDarkMode)  document.documentElement.classList.add('maximeheckel-dark');
        if (!mode) return
        document.documentElement.classList.add('maximeheckel-' + mode);
      } catch (e) {} })();`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
