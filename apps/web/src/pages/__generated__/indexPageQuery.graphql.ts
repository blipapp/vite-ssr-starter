/**
 * @generated SignedSource<<560e7bf2e6701a17ed4f1d5e346e5739>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type indexPageQuery$variables = {};
export type indexPageQueryVariables = indexPageQuery$variables;
export type indexPageQuery$data = {
  readonly hello: string;
};
export type indexPageQueryResponse = indexPageQuery$data;
export type indexPageQuery = {
  variables: indexPageQueryVariables;
  response: indexPageQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hello",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "indexPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "indexPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9c5e3ec7bebcf7514bffda91fad15240",
    "id": null,
    "metadata": {},
    "name": "indexPageQuery",
    "operationKind": "query",
    "text": "query indexPageQuery {\n  hello\n}\n"
  }
};
})();

(node as any).hash = "6eac987a3ebdd73f7a4087422d3f0955";

export default node;
