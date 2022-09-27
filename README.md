# Blockchain indexer subscriber client

This is an example client that subscribes to
[Summary](https://summary.dev) blockchain indexer. 

The client will wait for the events which represent changes in the
results of a GraphQL query and will print them out and exit after three
events.

```bash
npm start
```

Subscribes by a default query for the latest blocks in `goerli` and
`mainnet` chains.

```graphql
subscription { starknet_goerli_block(limit: 3, order_by: {block_number: desc}) { block_number, block_hash }}
```

Pass your own query as an argument. This query waits for the latest
events emitted. Note both queries order results descending to get the
latest. If you query for the first rows the results won't include the
latest and won't trigger events.

```bash
npm start 'subscription {starknet_goerli_event(limit: 3, order_by: {id: desc}) {id, name}}'
```
