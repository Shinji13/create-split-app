# Project Folder Structure

The following section outlines the folder structure of a Split project after accepting all proposed options. This structure provides an organized layout for your project, making it easier to manage and navigate.

```plaintext
project-root/
|-- src/
|   |-- app.css
|   |-- app.d.ts
|   |-- app.html
|   |-- hooks.server.ts
|   |-- routes/
|   |   |-- +layout.svelte
|   |   |-- +error.svelte
|   |   |-- +page.svelte
|   |-- lib/
|   |   |-- client/
|   |   |   |-- components/
|   |   |   |-- utils/
|   |   |   |-- stores/
|   |   |   |-- types.ts
|   |   |-- server/
|   |   |   |-- config/
|   |   |   |   |-- prisma.ts
|   |   |   |   |-- lucia.ts
|   |   |   |-- utils/
|   |   |   |-- types.ts
|   |   |-- global/
|   |   |   |-- schema/
|   |   |   |-- utils/
|-- static/
|   |-- favicon.png
|-- express/
|   |-- index.ts
|   |-- tsconfig.json
|-- prisma/
|   |-- schema.prisma
|-- ...
|-- ...
|-- svelte.config.js
|-- tsconfig.json
|-- vite.config.ts
|-- .gitignore
|-- .prettierrc
|-- .eslintrc.cjs
|-- .env
|-- package.json
|-- tailwind.config.cjs
|-- postcss.config.cjs

```

⚠️ **Important Note**: Some files only exist if specific technologies are added to the project:

- The **.env** file is created only when **_Prisma_** is added to the project.
- The **hooks.server.ts** file is generated when **_Lucia_** is included in the project.

### **_Prisma_**

The **_Prisma_** folder contains the **schema.prisma** file, which configures the database connection and schema. It may also include migration files and seed scripts if required. If you've chosen to integrate **_Lucia_**, it will also contain the **_Lucia_** schema. For more details, please refer to [**_Lucia's Prisma adapter documentation_**](https://lucia-auth.com/database-adapters/prisma).

### **_static_**

The **static** folder is dedicated to housing static assets that are served by the **_SvelteKit_** server. This is where you can place files like **favicon.png**.

### **_src/routes_**

Within the **src/routes** folder, you'll find all the routes of your **_SvelteKit_** application. Initially, it contains the following files:

- **+layout.svelte**: This file includes the global styles of your application.
- **+error.svelte**: It contains a robust UI setup to handle common errors, such as those with status codes 500, 404, 403, and 401.
- **+page.svelte**: This file serves as your split app's entry point.

### **_src/app.css_**

The **src/app.css** file contains your project's global styles. The Split CLI includes default community styles, along with responsive font sizes and colors. If you decide to incorporate **_Tailwind_**, these styles will be replaced with [**_Tailwind derivatives_**](https://tailwindcss.com/docs/functions-and-directives).

### **_src/app.d.ts_**

This file includes global types that are applicable to your project. Initially, it's empty. However, if you choose to integrate **_Lucia_** into your project, the Split CLI will populate it with a local interface that encompasses [**_Lucia user_**](https://lucia-auth.com/basics/users) and [**_auth-Request_**](https://lucia-auth.com/basics/handle-requests) attributes, as well as the [**_Lucia namespace_**](https://lucia-auth.com/getting-started/sveltekit).

### **_src/hooks.server.ts_**

The **_src/hooks.server.ts_** file is the home of the **_Lucia_** hook, which takes care of user authorization and **CSRF** protection. Additionally, it sets the session user and **_Lucia_** auth-Request for the current request in the **event.locals** object.

### **_svelte.config.js_**

This file contains the default **_Svelte_** configuration. The only significant configuration difference is the use of **adapter-node** instead of **adapter-auto** when **_SocketIo_** is selected to prevent any ambiguity. For more details, refer to the [**_SvelteKit adapters documentation_**](https://kit.svelte.dev/docs/adapters).

### **_tsconfig.json_**

The **tsconfig.json** file includes **_TypeScript_** configurations tailored for a **_SvelteKit_** project. To learn more about the specific choices made, please consult the [**_TypeScript documentation_**](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### **_.eslintrc.cjs_**

The **.eslintrc.cjs** file configures **ESLint** for your project, defining linting rules and configurations aligned with those provided by **_SvelteKit_**.

### **_postcss.config.cjs_**

The **postcss.config.cjs** file is employed for **_Tailwind PostCSS_** usage and can be customized as per your requirements.

### **_.prettierrc_**

The **.prettierrc** file specifies **Prettier** settings for code formatting. It uses **prettier-plugin-svelte** by default, but if you opt for **_Tailwind_**, the Split CLI will replace it with **prettier-plugin-tailwind**.

### **_tailwind.config.cjs_**

This file contains your **_Tailwind_** configuration. For in-depth information, please refer to the [**_Tailwind CSS Configuration Docs_**](https://tailwindcss.com/docs/configuration).

### **_express_**

The **_express_** folder houses the setup for **_SocketIo_** with **_Express_**, consisting of the following files:

- **tsconfig.json**: This file contains TypeScript configuration tailored for a **Node.js** environment.
- **index.ts**: This file serves as the sockets server, and the CLI generates the default **_SocketIo-Express_** setup.

### **_src/lib_**

The **src/lib** folder structure offers an organized approach to manage shared modules within your **_SvelteKit_** project, including the following subfolders:

- **Client**: This folder contains shared modules that run exclusively in the browser, encompassing UI components, stores, and utility functions.
- **Server**: The **Server** folder hosts server-related configuration files, such as **lucia.ts** and **prisma.ts**, along with server-specific utility modules.
- **Global**: Modules within the **Global** folder can be utilized anywhere in your application, primarily serving as schemas bridging the server and client, as well as global utility functions. Both the **Server** and **Client** folders include a **types.ts** file containing shared types for their respective modules.

⚠️ **Important Note**: The structure within the **lib** folder is optional. If you prefer not to use it, the Split CLI will place **lucia.ts** and **prisma.ts** inside the **server** subfolder.

#### **_Lucia.ts_**

The **_Lucia.ts_** file initializes **_Lucia_** with optimal settings, setting up middleware for **_SvelteKit_** and configuring the adapter for **_Prisma-adapter_** if Prisma is integrated into the project. Developers are required to add their chosen technology adapter if **_Prisma_** is not used. For further details, please refer to the [**_Lucia adapters documentation_**](https://lucia-auth.com/basics/database).

#### **_Prisma.ts_**

This file exports a new **_Prisma_** client instance, but only if one doesn't already exist in your project.

### **_.env_**

The **.env** file is used to store environment variables. For more information, please see the documentation on [**Environment Variables**](https://joyofcode.xyz/sveltekit-environment-variables). It's essential to note that this file should **not** be committed to the git history for security reasons.
