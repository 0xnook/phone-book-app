# Phone App
A simple application for storing phone contacts. 

A single page application interface is provided, its files are found `/interface` and is built using typescript, react, material ui, react-query, imask.js and uses react context as a state management solution. 

For the API, a server exposing a graphql endpoint is provided, the files are found in `/server` and is built using apollo-server and slonik for interacting with postgresql for data storage.

## Quickstart

0. Make sure you have docker and docker-compose installed
1. Copy the .env.example file or provide your own
`cp .env.example .env`
2. From the root of the repo run 
`docker-compose up --build`

After building, the interface will be available at port 3000, the api at 4000, and the database at 5432.

Alternatively, you can run the services individually by decending into their respective folders and running `npm run` to print all available scripts.

