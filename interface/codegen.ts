import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/schema.gql",
  documents: "src/**/*.gql",
  generates: {
    "src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          endpoint: "process.env.REACT_APP_SERVER_ENDPOINT",
          fetchParams: {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Methods": 'POST'
            },
          },
        },
      },
    },
  },
};

export default config;
