This is a simple NatWest wallet application with Next.js, integrating the NatWast Open Banking API 3.1

## Prerequisites

* [Create NatWest Sandbox Account](https://developer.sandbox.natwest.com/) to be able to access the NatWest Open Banking API.
* Clone this repository to your local machine
* Install [Node.js](https://nodejs.org/en/download) on your machine

## Configuration

* Create a `.env` file in the root of the project 
* Set the obtained `CLIENT_ID` and `CLIENT_SECRET` from NatWest in the `.env` file:
```
NATWEST_CLIENT_ID=<CLIENT_ID>
NATWEST_CLIENT_SECRET=<CLIENT_SECRET>
```

## Running the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
