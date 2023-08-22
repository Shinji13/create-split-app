# Split stack cli tool

![Split logo](./assets/Logo.png)

The **Split Stack CLI Tool** is a command-line utility designed to streamline the process of initializing a project that embraces a split-stack architecture. This architecture combines the best of server-side rendering (SSR) and client-side rendering (CSR) for enhanced performance and flexibility. The tool helps you set up a project with the following cutting-edge technologies:

- **SvelteKit**: A powerful web meta framework that efficiently handles data fetching, routing, SSR, SSG, and CSR, providing a seamless development experience.
- **TypeScript**: Ensures type safety and enhances code maintainability by enabling static type checking.
- **Prisma**: Handles database migrations, models, and connections, simplifying database operations.
- **Lucia**: Offers authentication and authorization capabilities for enhanced security.
- **Tailwind CSS**: Simplifies styling with a utility-first CSS framework.
- **Zod**: Provides data validation to ensure data integrity and consistency.
- **Express.js**: Optionally integrates with Socket.IO to enable real-time communication.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Options](#options)
- [Documentation website](#documentation-website)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with your project, make sure you have Node.js and any node package manager installed on your machine. If you don't have them, you can download and install them from [nodejs.org](https://nodejs.org/).

## Installation

You can install the Split Stack CLI Tool globally using npm:

### npm

```bash
npm install create-split-app
```

### yarn

```bash
yarn install create-split-app
```

### pnpm

```bash
pnpm install create-split-app
```

## Usage

To initialize a project using the Split Stack CLI Tool, open your terminal and navigate to the directory where you want to create your project. Run the following command:

```bash
npx create-split-app
```

### Remarks

- You can also use pnpm or yarn to run the package.
- The package manager that was used to run the package will be used to install the dependencies.
- The CLI tool will guide you through a series of prompts to configure your project based on your preferences.

## Folder Structure

The project generated by the Split Stack CLI Tool follows a folder structure that aligns with SvelteKit's conventions while adding configuration files for the additional technologies:

```
project-root/
|-- src/
|   |-- routes/
|   |-- lib/
|       |-- client/
|           |-- components/
|           |-- utils/
|           |-- stores/
|           |-- types.ts
|       |-- server/
|           |-- config/
|               |-- prisma.ts
|               |-- lucia.ts
|           |-- utils/
|           |-- types.ts
|       |-- global/
|           |-- utils/
|           |-- schemas/
|               |-- zod/
|-- express/
|   |-- routes/
|   |-- controllers/
|   |-- utils/
|   |-- index.ts
|-- prisma/
|   |-- schema.prisma
|-- ...
|-- ...
```

### Remark

The structure for lib folder is optional you can default to sveltekit base structure , prisma and lucia config will be put in lib's server subdirectory.

## Options

During project initialization, the Split Stack CLI Tool will prompt you to select the technologies and features you want to include in your project. While SvelteKit and TypeScript are mandatory, you can also choose to include Prisma, Lucia, Tailwind CSS, and Socket.IO.

You will also be asked if you want to use split's lib folder structure or not and whether initialize a Git repository and install the selected packages.

## Config

Split stack cli adds all configuration needed for included packages and time consuming stuff like server hook to handle lucia session , default styles , error page ...

## Documentation website

In a few days, a website will be available that contains the full documentation well organized.

## Contributing

Contributions to the Split Stack CLI Tool are welcome! Feel free to submit pull requests for new features, bug fixes, or improvements. For major changes, please open an issue first to discuss your ideas.

## License

The Split Stack CLI Tool is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Happy coding with the Split Stack CLI Tool! If you encounter any issues or have questions, please don't hesitate to reach out to our community for support.
