# Subscriber client for Summary blockchain indexer 

This is an example client that subscribes to
[Summary](https://summary.dev) blockchain indexer. 

The client will wait for events which represent changes in the results
of a GraphQL query, will print them out and exit after three events.

```bash
npm start
```

Subscribes by a default query that waits for the three latest blocks in test `goerli` chain.

```graphql
subscription { starknet_goerli_block(limit: 3, order_by: {block_number: desc}) { block_number, block_hash }}
```

You can pass your own query as an argument. This query waits for the latest
events emitted. 

```bash
npm start 'subscription {starknet_goerli_event(limit: 3, order_by: {id: desc}) {id, name}}'
```

Note this and the default query order results descending to get the
latest. If you query for the first rows the results won't include the
latest and won't trigger events.
