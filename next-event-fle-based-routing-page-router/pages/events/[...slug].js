import { Fragment } from "react";
import { useRouter } from "next/router";

// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../utils/api-utils";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

export default function FilteredEventPage({ haseError, events, date }) {
  const router = useRouter();
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loadig...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear < 2021 ||
  //   numYear > 2025 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // )
  if (haseError) {
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

  const fileteredEvents = events; //getFilteredEvents({ year: numYear, month: numMonth });

  if (!fileteredEvents || fileteredEvents.length === 0) {
    return (
      <Fragment>
        <Head>
          <title>No filter Events!</title>
          <meta
            name="description"
            content={`No Event found for the choosen filter!`}
          />
        </Head>
        <ErrorAlert>
          <p>No Event found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const data = new Date(date.year, date.month - 1);
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All Events for ${date.month - 1}/${date.month}`}
        />
      </Head>
      <ResultTitle date={data} />
      <EventList items={fileteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

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
    return {
      // notfound: true,
      props: {
        haseError: true,
      },
    };
  }

  const fileteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: fileteredEvents,
      date: { year: numYear, month: numMonth },
    },
  };
}
