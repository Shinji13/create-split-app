## Installation

To scaffold an app using Split Stack CLI, follow these steps. You can use npm, yarn, or pnpm to create your Split Stack project.

### npm

```Bash
npm i create-split-app@latest
npx create-split-app
```

### yarn

```Bash
yarn add create-split-app@latest
yarn create create-split-app
```

### pnpm

```Bash
pnpm add create-split-app@latest
pnpm dlx create-split-app
```

### Advanced Usage

The Split Stack CLI offers advanced options to customize your project during initialization:

#### Option/Flag Description

- `[dir]` Specify a directory name for the project.
- `--noGit` Prevent the CLI from initializing a new Git repository for the project.
- `--default` Bootstrap a new Split Stack app with all options selected without prompting.
- `--noInstall` Generate the project without installing dependencies.
- `--noLib` Omit the Split folder structure and use the default SvelteKit structure.

### Quick Usage

For advanced use cases, such as CI/CD workflows, the Split Stack CLI provides quick flags to scaffold your project without any prompts:

#### Flags Description

- `--CI` Activate CI mode to skip prompts.
- `--zod` Include Zod in the project.
- `--socketIo` Include Socket.IO in the project.
- `--tailwind` Include Tailwind Css in the project.
- `--prisma` Include Prisma in the project.
- `--lucia` Include Lucia in the project.

**⚠️ Important:** When using the quick flags, make sure to include the `--CI` flag to skip prompts. Without it, the other flags will have no effect.

You don't need to explicitly opt-out of packages you don't want. However, if you prefer to be explicit, you can pass `false`, e.g., `--socketIO false`.

### Default options

Split cli default flag will setup a project with default options which are:

- including tailwind, prisma, lucia and zod.
- using split's lib folder structure.
- installing packages for the project.
- initializing git repository for the project.

### Example

Here's an example of scaffolding a Split Stack app with Prisma, Zod and lucia.

```Bash
pnpm dlx create-split-app@latest --CI --prisma --zod --lucia
```
