/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AboutQueryVariables = {};
export type AboutQueryResponse = {
    readonly me: {
        readonly name: string;
    };
};
export type AboutQuery = {
    readonly response: AboutQueryResponse;
    readonly variables: AboutQueryVariables;
};



/*
query AboutQuery {
  me {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AboutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AboutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0f8076e7a40ab4df0a8d88784c61f384",
    "id": null,
    "metadata": {},
    "name": "AboutQuery",
    "operationKind": "query",
    "text": "query AboutQuery {\n  me {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bae81cd87fca5296eeff4174eeea70a3';
export default node;
