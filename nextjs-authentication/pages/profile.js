import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
import { Fragment } from "react";
import Head from "next/head";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Next JS Auth</title>
        <meta
          name="description"
          content="Simple application in next js for authentications"
        />
      </Head>
      <UserProfile />;
    </Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        parmanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
