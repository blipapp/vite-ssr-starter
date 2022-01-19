/**
 * @generated SignedSource<<a6c0da3f09fe1f1a297d0dd5bc42c121>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type aboutPageQuery$variables = {};
export type aboutPageQueryVariables = aboutPageQuery$variables;
export type aboutPageQuery$data = {
  readonly me: {
    readonly name: string;
  };
};
export type aboutPageQueryResponse = aboutPageQuery$data;
export type aboutPageQuery = {
  variables: aboutPageQueryVariables;
  response: aboutPageQuery$data;
};

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
    "name": "aboutPageQuery",
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
    "name": "aboutPageQuery",
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
    "cacheID": "ebaadce16f765ca135ece73530fd90b7",
    "id": null,
    "metadata": {},
    "name": "aboutPageQuery",
    "operationKind": "query",
    "text": "query aboutPageQuery {\n  me {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e607a54ece225ce5415065f0f3d69d9d";

export default node;
