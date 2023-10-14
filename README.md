# How to setup locally

1. clone this repo

   ```sh
   git clone https://github.com/joe-shajan/bookstore.git
   ```

2. cd into bookstore

    ```sh
    cd bookstore
    ```

3. Add `.env` file to `apps/api`.

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

### [API Documentation](https://docs.google.com/document/d/1yX7twPjzfIde9L9EcrdWTzN5xGw2MJY-aw0RfEJ_x9A/edit?usp=sharing)
## Apps and Packages

- `web`: a frontend [Next.js](https://nextjs.org/) app
- `web`: a frontend [Next.js](https://docs.google.com/document/d/1yX7twPjzfIde9L9EcrdWTzN5xGw2MJY-aw0RfEJ_x9A/edit?usp=sharing) app
- `api`: an express server
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
