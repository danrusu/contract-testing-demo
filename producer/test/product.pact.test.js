const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

// Setup provider server to verify
// const app = require('express')();
// app.use(require('./product.routes'));
// const server = app.listen("8080");

describe('Pact Verification', () => {
  it('validates the expectations of ProductService', () => {
    const opts = {
      logLevel: 'INFO',
      providerBaseUrl: 'http://localhost:1113',
      provider: 'ProductService',
      providerVersion: '1.0.0',
      providerVersionTags: ['test'],

      // local pact
      //pactUrls: [
      //   path.resolve(
      //     process.cwd(),
      //     'consumer/pacts/FrontendWebsite-ProductService.json',
      //   ),
      //]

      // remote pact - pactflow
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: Boolean(
        process.env.CI || process.env.PACT_BROKER_PUBLISH_VERIFICATION_RESULTS,
      ),

      // match existing contract by tags or consumer version
      consumerVersionTags: ['test'],
      //consumerVersionSelectors: ['053d3c-master+053d3c.SNAPSHOT.RO-39TV5S2'],
    };

    return new Verifier(opts).verifyProvider().then(output => {
      console.log(output);
    });
    // .finally(() => {
    //   server.close();
    // });
  });
});
