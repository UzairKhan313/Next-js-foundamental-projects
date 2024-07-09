import { Fragment } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loadig...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2025 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid fileters. Please adjust your filters.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const fileteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!fileteredEvents || fileteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Event found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const data = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultTitle date={data} />
      <EventList items={fileteredEvents} />
    </Fragment>
  );
}
