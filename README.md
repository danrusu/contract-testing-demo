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
export PACT_BROKER_BASE_URL=https://danrusu.pactflow.io
export PACT_BROKER_TOKEN=******
export PUBLISH_PACT=true
export PACT_BROKER_PUBLISH_VERIFICATION_RESULTS=true
```

- generate contract from consumer

  ```bash
  npm run pact:consumer
  ```

- publish contract to PactFlow.io

  ```bash
  npm run pact:consumer
  ```

- verify published contract against provider

  ```bash
  npm run pact:provider
  ```
