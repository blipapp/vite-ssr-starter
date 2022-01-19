import { Button, Heading } from "@chakra-ui/react";
import { useLazyLoadQuery, graphql } from "react-relay";
import { indexPageQuery } from "./__generated__/indexPageQuery.graphql";

export const documentProps = {
  title: "Home Page",
};

export function Page() {
  const data = useLazyLoadQuery<indexPageQuery>(
    graphql`
      query indexPageQuery {
        hello
      }
    `,
    {}
  );

  return (
    <div>
      <Heading>Home Page: {data.hello}</Heading>
      <Button as="a" href="/about">
        Go To About!
      </Button>
    </div>
  );
}
