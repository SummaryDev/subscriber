const {execute} = require('apollo-link');
const {WebSocketLink} = require('apollo-link-ws');
const {SubscriptionClient} = require('subscriptions-transport-ws');
const ws = require('ws');
const gql = require('graphql-tag');

const wsurl = 'wss://hasura.prod.summary.dev/v1/graphql';

const args = process.argv.slice(2);
const query = args.length ? args[0] : 'subscription { starknet_goerli_block(limit: 3, order_by: {block_number: desc}) { block_number, block_hash }}';

const getWsClient = (wsurl) => {
  return new SubscriptionClient(wsurl, {reconnect: true}, ws);
};

const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {query: query, variables: variables});
};

const gq = gql(query);

const subscriptionClient = createSubscriptionObservable(wsurl, gq, {/*id: 1*/});

let ct = 0;

const consumer = subscriptionClient.subscribe((eventData) => {
  console.log(JSON.stringify(eventData, null, 2));

  if (ct++ === 2) {
    consumer.unsubscribe();
    process.exit(0);
  }
}, (err) => {
  console.error(err);
  process.exit(1);
});
