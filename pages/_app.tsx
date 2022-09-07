import { AppProps } from "next/app" ;
// ...
import "../styles/styles.css" ;

// App
function App({ Component, pageProps }: AppProps): JSX.Element
{
  return (
  <>
    <Component { ...pageProps } />
  </>
  )
}

// Export App
export default App ;