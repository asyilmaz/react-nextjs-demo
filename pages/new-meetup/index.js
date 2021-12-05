import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add a Meetup</title>
        <meta name="description" content="Create your own" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
