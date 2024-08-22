import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../utils/api-utils";
import EventSearch from "../../components/events/event-search";
import Head from "next/head";

export default function EventsPage({ events }) {
  // const events = getAllEvents();
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find out a lot of greate events that allow you to evolove..."
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60, // 1 minute
  };
}
