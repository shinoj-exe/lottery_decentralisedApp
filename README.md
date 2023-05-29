# **Ethers Lottery**


## Run Locally

1.Clone this repository to your local machine.

```bash
  git https://github.com/shinoj-exe/lottery_decentralisedApp
```

2.Go to the project directory
```bash
  cd lottery_decentralisedApp
```

3.Install the dependencies for both the client and server side.
```bash
  npm install
```
4.Install Truffle for compiling and deploying the contracts
```bash
  npm install -g truffle
```
5.Install hd wallet provider
```bash
  npm install @truffle/hdwallet-provider
```
6.Create a .secret file in the root directory folder and store your wallet's recovery phrase in it

6.Compile the contracts 
```bash
  truffle compile 
```

7.Now before deploying it to the polygon testnet create a testnet in metamask(we used alchemy for creating the testnet rpc url).Create some accounts in the network and add sufficient MATIC tokens from polygon faucets.
``` bash
Polygon testnet details:
Network name : Polygon Mumbai Testnet
New RPC URL : https://polygon-mumbai.g.alchemy.com/YOUR_API_KEY
Chain ID : 80001
Currency symbol : MATIC
```



8.Deploy the contracts
```bash
 truffle deploy --network matic
 ```
9.Open another terminal window and start the client.
```bash
  cd client && npm run dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
