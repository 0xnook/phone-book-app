# build
FROM node:18.9-alpine as build
WORKDIR /app
COPY src/ .
COPY package.json package-lock.json tsconfig.json schema.gql ./
RUN npm ci
RUN npm run compile

# run with node
# FROM node:18.9-alpine 
# WORKDIR /app
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/schema.gql ../schema.gql
# COPY --from=build /app/dist /app/package.json ./
EXPOSE 4000
CMD ["npm", "start"]

