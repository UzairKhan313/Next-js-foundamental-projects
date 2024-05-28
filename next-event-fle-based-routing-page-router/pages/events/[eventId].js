import { Fragment } from "react";
import { useRouter } from "next/router";

import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

import { getEventById } from "../../dummy-data";

export default function EventDetailsPage() {
  const router = useRouter();

  //Extrecting event id from the url.
  const eventId = router.query.eventId;

  const event = getEventById(eventId);
  if (!event) {
    return <p>No Event Found.</p>;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
}
