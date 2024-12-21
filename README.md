# S for Serverless

## Overview

Acting as a middleware in a microservices architecture, `s-for-serverless` is a simple serverless function that handles requests from a frontend app.

## How to Use

Additional steps will be taken to secure this app, but feel free to use this as a starting point for your application. This app references the example app [`node-hello-world`](https://github.com/vercel/examples/tree/main/solutions/node-hello-world).

### Getting Started

Clone and change directory to project root.

```bash
git clone https://github.com/joey-ma/s-for-serverless.git
cd s-for-serverless
```

### Using Vercel CLI

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

### Semantic Versioning

> Git has the ability to tag specific points in a repository’s history as being important. Typically, people use this functionality to mark release points (v1.0, v2.0 and so on).

[git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

```bash
git tag # lists the existing tags.
git tag -a v0.0.3 -m 'add a message as you create an annotated tag'
git show v0.0.2 # shows the commit
git tag -a v0.0.0 d19d8f0ca59f85af3808435ea35c7a8fd2c98bea # tag the project after the fact if you forgot
# By default, the git push command doesn’t transfer tags to remote servers. 
git push origin --tags # explicitly push tags to a shared server after you have created them
```

[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) 

```bash
# If supplied with -m or --message config option, npm will use it as a commit message when creating a version commit. If the message config contains %s then that will be replaced with the resulting version number. For example:
npm version patch -m "If run in a git repo, upgrading using npm version patch also create a version commit and tag (\%s: %s)"
```

### Automating Tags and Releases

[`standard-version`](https://www.npmjs.com/package/standard-version) is deprecated and [bcoe](https://github.com/bcoe), one of the maintainers, recommends [`release-please`](https://github.com/googleapis/release-please). Otherwise [`semantic-release`](https://www.npmjs.com/package/@semantic-release/github) also seems like a good alternative option.

This repo uses [`release-please-action`](https://github.com/googleapis/release-please-action) to automate releases with [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/).