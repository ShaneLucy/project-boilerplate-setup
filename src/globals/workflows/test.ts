export default `name: Tests

on:
  push:
  pull_request:

jobs:
  tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout current repository
        uses: actions/checkout@v2
      - name: Setup NodeJs
        uses: actions/setup-node@v2
        with:
          node-version: "lts/*"
      - name: Install dependencies
        run: npm i
      - name: Lint
        run: npm run tests
`;
