import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ayuntamiento%2C_Kiel%2C_Alemania%2C_2019-09-10%2C_DD_51-53_HDR.jpg/640px-Ayuntamiento%2C_Kiel%2C_Alemania%2C_2019-09-10%2C_DD_51-53_HDR.jpg",
    title: "First Meetup",
    address: "London",
    description: "This is the first meetup!",
  },
  {
    id: "m2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ayuntamiento%2C_Kiel%2C_Alemania%2C_2019-09-10%2C_DD_51-53_HDR.jpg/640px-Ayuntamiento%2C_Kiel%2C_Alemania%2C_2019-09-10%2C_DD_51-53_HDR.jpg",
    title: "Second Meetup",
    address: "Newbury",
    description: "This is the second meetup!",
  },
];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a list of React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://ahmet:Smart123@cluster0.v7a94.mongodb.net/meetupDB?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
