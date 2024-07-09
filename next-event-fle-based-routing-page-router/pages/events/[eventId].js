import { Fragment } from "react";
import { useRouter } from "next/router";

import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

import { getEventById } from "../../dummy-data";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailsPage() {
  const router = useRouter();

  //Extrecting event id from the url.
  const eventId = router.query.eventId;

  const event = getEventById(eventId);
  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Event Found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
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
