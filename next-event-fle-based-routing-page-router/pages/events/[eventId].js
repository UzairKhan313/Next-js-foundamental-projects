import { Fragment } from "react";
// import { useRouter } from "next/router";
import Comments from "../../components/input/comments";

import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

import { getEventById, getFeaturedEvents } from "../../utils/api-utils";
// import Button from "../../components/ui/Button";
// import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

export default function EventDetailsPage({ event }) {
  // const router = useRouter();

  // //Extrecting event id from the url.
  // const eventId = router.query.eventId;

  // const event = getEventById(eventId);

  // if (!event) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>No Event Found.</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummery title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    // paths: [{ params: { eventId: "e1" } }],
    paths: paths,
    fallback: true,
  };
}
