# Next Guard

`next-guard` is a **lightweight** and **flexible** package for adding security to your Next.js functions. With an easy-to-use guard wrapper, you can protect your routes and actions effortlessly.

## Why would i use this package?

I created this package because i needed a way to protect my Next.js actions. I wanted to be able to add a guard to my functions and protect them with a simple function. This package is perfect for you if you want to add a guard to your functions and protect them with a few lines of code.

---

# Documentation

## Installation

To install the latest version on npm locally and save it in your package's `package.json` file:

```bash
npm install @decelerate/next-guard --save
yarn add @decelerate/next-guard
```

To install the latest development version locally, without updating your project's `package.json` file:

```bash
npm install git+https://github.com/Decelerate/next-guard.git
yarn add git+https://github.com/Decelerate/next-guard.git
```

---

### Usage

*example.ts*
```ts
import { Guard } from "@decelerate/next-guard";

const AuthGuard = async () => {
  // Your authentication logic here
  const user = await auth();

  if (!user) {
    return false;
  }

  return true;
};

const myUnprotectedFunction = async () => {
  return prisma.user.findMany();
}

const myProtectedFunction = Guard(myUnprotectedFunction, AuthGuard)
```

*example.ts*
```ts
import { Guard } from "@decelerate/next-guard";

const AuthGuard = async () => {
  // Your authentication logic here
  const user = await auth();

  // You can return any type of data in case of error, Guard will automatically type it
  if (!user) {
    return {
      error: "You are not authenticated"
      status: 401
    };
  }

  return true;
};

const myUnprotectedFunction = async () => {
  return prisma.user.findMany();
}

const myProtectedFunction = Guard(myUnprotectedFunction, AuthGuard)
```

---

# Contribute

Requirements :
- Node.JS > 18.0.0

Clone the Git repository and start building good stuff.

```bash
$ git clone git@github.com:Decelerate/next-guard.git
$ cd next-auth
$ yarn
```

When done build everything with `yarn build` and create a pull request respecting git convention.

---

# Credits

- **[Github](https://github.com/Decelerate/next-auth)**
- **[Arkmind](https://github.com/Arkmind/)**
  
---

# License

**[MIT](https://github.com/Decelerate/next-auth/LICENSE)**