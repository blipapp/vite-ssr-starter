import {
  Environment,
  RecordSource,
  Network,
  FetchFunction,
  Store,
} from "relay-runtime";
import fetch from "isomorphic-fetch";

const getFetchFn = (headers: Record<string, any> = {}): FetchFunction => {
  return async (operation, variables, _cacheConfig, _uploadables) => {
    const fetchOpts: RequestInit = {
      method: "POST",
      headers: {
        ...headers,
      },
    };

    const operationBody = {
      id: operation.id,
      query: operation.text,
      variables: variables,
    };

    Object.assign(fetchOpts, {
      headers: {
        ...fetchOpts.headers,
        "content-type": "application/json",
      },
      body: JSON.stringify(operationBody),
    });

    const res = await fetch("http://localhost:3000/api/graphql", fetchOpts);

    return res.json();
  };
};

export function createEnvironment({
  records,
  headers,
}: {
  records?: Record<string, any>;
  headers?: Record<string, any>;
} = {}) {
  const network = Network.create(getFetchFn(headers));
  const source = new RecordSource(records);
  const store = new Store(source, {
    gcReleaseBufferSize: 10,
  });

  const environment = new Environment({ network, store });

  return environment;
}
