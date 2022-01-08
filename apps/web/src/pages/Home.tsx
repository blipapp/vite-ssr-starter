import { Button, Heading } from "@chakra-ui/react";
import { useLazyLoadQuery, graphql } from "react-relay";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

export default function Home() {
  const data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        hello
      }
    `,
    {}
  );

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Heading>Home Page: {data.hello}</Heading>
      <Button as={Link} to="/about">
        Go To About!
      </Button>
    </div>
  );
}
