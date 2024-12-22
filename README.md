# S for Serverless

## Overview

Acting as a middleware in a microservices architecture, `s-for-serverless` is a simple serverless function that handles requests from a frontend app.

![image](https://github.com/user-attachments/assets/02586ca0-bf76-425e-ae63-5b49924f6224)

## How to Use

Feel free to use this as a starting point for your application as I take additional steps to secure this app. This app references the example app [`node-hello-world`](https://github.com/vercel/examples/tree/main/solutions/node-hello-world).

### Getting Started

Clone and change directory to project root.

```bash
git clone https://github.com/joey-ma/s-for-serverless.git
cd s-for-serverless
```

### Using Vercel CLI

First, you can install Vercel CLI globally. (I'm ignoring the warning messages for now... 🫠)

```bash
npm i -g vercel
```

Log in as needed, following command line prompts.

```bash
vercel login
```

<img width="277" alt="image" src="https://github.com/user-attachments/assets/a8eee46e-dd07-4ed8-8f40-ab6b72bd3972" />

To test your Vercel Project locally before deploying, run the app at the root of the repository:

```bash
vercel dev
```

To build & deploy your app with vercel:

```bash
vercel build
```

```bash
vercel # you can omit 'deploy' in `vercel deploy`
```

## Notes

### Addressing Vulnerabilities: 

As of December 21, 2024, [`@vercel/node`](https://github.com/vercel/vercel/tree/main/packages/node) depends on an outdated version of [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp), which introduces a [vulnerability](https://github.com/advisories/GHSA-9wv6-86v2-598j).

<img width="762" alt="image" src="https://github.com/user-attachments/assets/83311b92-4c3e-421a-88b3-2e7699ec3281" />

While there is an [open issue](https://github.com/vercel/vercel/issues/11543) related to this, a resolution may take some time. In the meantime, I resolved the vulnerability by adding an override in my `package.json`. (`npm audit fix` didn't work for me.)

```json
  "overrides": {
    "@vercel/node": {
      "path-to-regexp": "8.2.0"
    }
  },
```

This ensures the project uses the updated version of path-to-regexp without waiting for an official fix.

<img width="376" alt="image" src="https://github.com/user-attachments/assets/0bd4a8fa-ad60-4dea-9f69-c96b654cd3a9" />

### Semantic Versioning

> Git has the ability to tag specific points in a repository’s history as being important. Typically, people use this functionality to mark release points (v1.0, v2.0 and so on).

[`git tag`](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

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

With the deprecation of [`standard-version`](https://www.npmjs.com/package/standard-version), [bcoe](https://github.com/bcoe) (one of its maintainers) recommends switching to [`release-please`](https://github.com/googleapis/release-please). Alternatively, [`semantic-release`](https://www.npmjs.com/package/@semantic-release/github) is another strong option for automating releases.

For this project, we’ve adopted the [`release-please-action`](https://github.com/googleapis/release-please-action) to streamline releases based on [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/).
