import { Fragment } from "react";
import StartingPageContent from "../components/starting-page/starting-page";
import Head from "next/head";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Next JS Auth</title>
        <meta
          name="description"
          content="Simple application in next js for authentications"
        />
      </Head>
      <StartingPageContent />;
    </Fragment>
  );
}

export default HomePage;
