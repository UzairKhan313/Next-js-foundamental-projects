import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../utils/api-utils";

export default function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meta
          name="description"
          content="Find out a lot of greate events that allow you to evolove..."
        />
      </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // 30 minutes
  };
}
