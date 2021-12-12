export default `name: End-to-End Tests

on:
  pull_request:
  workflow_dispatch:

jobs:
  e2e-tests:
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
      - name: Build
        run: npm run build
      - name: Install operating system dependencies
        run: npx playwright install-deps
      - name: Run your tests
        run: npm run test:e2e:headless
`;
