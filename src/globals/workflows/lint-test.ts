export default `name: lint & test

on:
  push:
  pull_request:

jobs:
  lint-test:
    runs-on: macos-latest

    steps:
      - name: Checkout current repository
        uses: actions/checkout@v2
      - name: Setup NodeJs
        uses: actions/setup-node@v2
        with:
          node-version: "lts/*"
      - name: Update npm
        run: npm install -g npm@latest
      - name: Install dependencies
        run: npm i
      - name: Lint
        run: npm run lint
      - name: Run tests
        run: npm run test
`;
