# Contract testing POC

## 1. Setup

```bash
npm intall
```

## 2. Start Consumer & Producer

- from different terminals

  ```bash
  npm start producer

  npm start consumer
  ```

## 3 Run contract tests using PactFlow.io broker

- setup environment vars

  ```bash
  # for producer and consumer
  export PACT_BROKER_BASE_URL=https://danrusu.pactflow.io
  export PACT_BROKER_TOKEN=******
  # for consumer
  export PACT_PUBLISH=true
  export PACT_TAGS="test,v1"
  # for producer
  export PACT_PUBLISH_VERIFICATION_RESULTS=true
  export PACT_PRODUCER_TAGS="v2"
  export PACT_CONSUMER_TAGS="test"
  ```

- generate contract from consumer

  ```bash
  npm run pact:consumer
  ```

- publish contract to PactFlow.io

  ```bash
  npm run pact:publish
  ```

- verify published contract against provider (start producer first)

  ```bash
  npm run pact:provider
  ```
