# S for Serverless

Acting as a middleware in a microservices architecture, here is a simple serverless function that handles requests from a frontend app.

## How to Use

Additional steps will be taken to secure this app, but feel free to use this as a starting point for your application. This app references the example app [`node-hello-world`](https://github.com/vercel/examples/tree/main/solutions/node-hello-world).

### Getting Started

```bash
git clone https://github.com/joey-ma/s-for-serverless.git
cd s-for-serverless
```

### Deploying Projects from Vercel CLI

First, you can install Vercel CLI globally

```bash
npm i -g vercel
```

To test your Vercel Project locally before deploying, run the app at the root of the repository:

```bash
vercel dev
```

```bash
vercel build
```

```bash
vercel # you can omit 'deploy' in `vercel deploy`
```

## Notes

Just for documentation purposes: 
- [`@vercel/node`](https://github.com/vercel/vercel/tree/main/packages/node) is relying on outdated version of [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp). There is an [open issue](https://github.com/vercel/vercel/issues/11543) on this, but it may not be that straightforward to get a fix in anytime soon. Nonetheless, I was able to resolve the vulnerability by overriding it in my `package.json`.
