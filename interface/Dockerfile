# build
FROM node:18.9-alpine as build
WORKDIR /app
COPY interface/src/ ./src
COPY interface/public/ ./public
COPY interface/package.json interface/package-lock.json interface/tsconfig.json interface/codegen.ts ./
RUN npm ci
COPY interface/tsconfig.json interface/codegen.ts ./
COPY server/schema.gql ../server/schema.gql
RUN npm run codegen
CMD ["npm", "start"]



