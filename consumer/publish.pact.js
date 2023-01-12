const pact = require('@pact-foundation/pact-node');
const path = require('path');

if (!process.env.CI && !process.env.PACT_PUBLISH) {
  console.log('Skipping Pact publish.');
  process.exit(0);
}

const gitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const pactBroker = process.env.PACT_BROKER_BASE_URL;
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

if (!pactBroker || !pactBrokerToken) {
  console.error(
    'To publish a PACT, the following env vars are required: PACT_BROKER_BASE_URL, PACT_BROKER_TOKEN.',
  );
  process.exit(1);
}

const tags = process.env.PACT_TAGS?.split(',');

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'consumer/pacts')],
  pactBroker,
  pactBrokerToken,
  consumerVersion: gitHash,
};

if (tags) {
  opts.tags = tags;
}

pact
  .publishPacts(opts)
  .then(() => {
    [
      'Pact contract publishing complete!',
      `Consumer version (git hash): ${gitHash}`,
      `Consumer tags: ${tags.toString()}\n`,
      `Head over to ${pactBroker} to see your published contracts.`,
    ].forEach(text => console.log(text));
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e);
  });
