const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

// Setup provider server to verify
// const app = require('express')();
// app.use(require('./product.routes'));
// const server = app.listen("8080");

describe('Pact Verification', () => {
  it('validates the expectations of ProductService', () => {
    const consumerVersionTags =
      process.env.PACT_CONSUMER_TAGS?.split(',') || [];
    const providerVersionTags =
      process.env.PACT_PRODUCER_TAGS?.split(',') || [];
    const opts = {
      // remote pact - pactflow
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: Boolean(
        process.env.CI || process.env.PACT_PUBLISH_VERIFICATION_RESULTS,
      ),

      providerBaseUrl: 'http://localhost:1113',
      provider: 'ProductService',
      providerVersion: '1.0.0',
      providerVersionTags,

      // match existing contract by tags or consumer version
      consumerVersionTags,
      // consumerVersionSelectors: ['c2bec65'],

      logLevel: 'INFO',
    };

    return new Verifier(opts).verifyProvider().then(output => {
      console.log(output);
    });
  });
});
