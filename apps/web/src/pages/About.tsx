import { Button } from "@chakra-ui/react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { Link } from "react-router-dom";
import { AboutQuery } from "./__generated__/AboutQuery.graphql";

export default function About() {
  const data = useLazyLoadQuery<AboutQuery>(
    graphql`
      query AboutQuery {
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
      <Button as={Link} to="/">Back Home</Button>
    </div>
  );
}
