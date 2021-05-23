// import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
