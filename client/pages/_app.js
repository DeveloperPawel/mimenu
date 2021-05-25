// import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Navigation from "../components/Navigation";
import { Layout } from "antd";
import { Provider } from "../context/index";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Navigation />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
