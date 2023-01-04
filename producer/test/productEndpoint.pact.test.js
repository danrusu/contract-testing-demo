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
      provider: 'ProductController',
      providerVersion: '1.0.0',
      pactUrls: [
        path.resolve(
          process.cwd(),
          'consumer/pacts/FrontendWebsite-ProductController.json',
        ),
      ],
    };

    return new Verifier(opts).verifyProvider().then(output => {
      console.log(output);
    });
    // .finally(() => {
    //   server.close();
    // });
  });
});
