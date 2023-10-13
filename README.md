# How to setup locally

1. clone this repo

   ```sh
   git clone https://github.com/joe-shajan/bookstore.git
   ```

2. cd into bookstore

    ```sh
    cd bookstore
    ```

3. Add `.env` file to `apps/api` and `.env.local` file to `apps/web`

4. install packages

   ```sh
   yarn
   ```

5. start app (this will start both nextjs and express app).

   ```sh
   yarn dev
   ```

6. build project

   ```sh
   yarn build
   ```

### Both Elasticsearch and MongoDB are hosted in the cloud.

## Apps and Packages

- `web`: a frontend [Next.js](https://nextjs.org/) app
- `api`: an express server
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
