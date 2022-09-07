import { Html, Head, Main, NextScript } from "next/document" ;
import Script from "next/script" ;

// Document
function Document(): JSX.Element
{
  return (
  <>
    <Html>
      <Head>
        <meta name="author" content="Syed Muhammad Khizer" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Akaya+Telivigala&amp;display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway&amp;display=swap" />
      
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.webp" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.webp" />
      </Head>

      <body>
        <nav className="navbar navbar-light navbar-expand-md navBar">
          <div className="container-fluid">
            <a className="navbar-brand navBarHeading" href="#"> Student Portal </a>
          </div>
        </nav>

        <Main />

        <footer className="footer"></footer>

        <NextScript />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
      </body>
    </Html>
  </>
  )
}

// Export Document
export default Document ;