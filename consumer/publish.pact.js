const pact = require('@pact-foundation/pact-node');

if (!process.env.CI && !process.env.PUBLISH_PACT) {
  console.log('skipping Pact publish...');
  process.exit(0);
}

const pactBrokerUrl = process.env.PACT_BROKER_BASE_URL;
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

const gitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const opts = {
  pactFilesOrDirs: ['./consumer/pacts/'],
  pactBroker: pactBrokerUrl,
  pactBrokerToken,
  tags: ['test'],
  consumerVersion: gitHash,
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!');
    console.log('');
    console.log(`Head over to ${pactBrokerUrl}`);
    console.log('to see your published contracts.');
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e);
  });
