import { Button } from "@chakra-ui/react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { aboutPageQuery } from "./__generated__/aboutPageQuery.graphql";

export function Page() {
  const data = useLazyLoadQuery<aboutPageQuery>(
    graphql`
      query aboutPageQuery {
        me {
          name
        }
      }
    `,
    {}
  );

  return (
    <div>
      <div>About {data.me.name}</div>
      <Button as="a" href="/">
        Back Home
      </Button>
    </div>
  );
}
