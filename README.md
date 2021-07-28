# MASK API

MASK-API is a Node.js / Express API built to power MASK-Mobile and MASK-Web.

## Installing and Configuring

Clone this repository into your Gitlab Group's projects or subgroup.

Run `npm install`.

In order to run the API locally you need to edit your `/etc/hosts` file (`vi /etc/hosts`) and add this line:
  `127.0.0.1	keycloak`
(See the "Components and Architecture / Keycloak Authentication" section for the reason.)

## Running

Run `docker compose up`.

Once `docker compose` does its thing, you should have an up-and-running API with Postgres database and Keycloak auth server. *However, nothing will work yet because you haven't created a Keycloak user to access the protected API with.*

### Creating a User

1. Navigate to `keycloak:8080/auth` in your browser
2. Log in with the admin credentials (`admin`, `admin`)
3. Select "Users" in the lefthand pane
4. Select "Add User" in the top-right
5. Enter a username and select "Save"
6. Select the Credentials tab, enter a password twice, uncheck "Temporary", and select "Set Password"
7. Select the Role Mappings tab, add the "mask-admin" realm role to this user

You should now be able to test the API locally and log in to the dashboard (MASK-Web) and mobile app (MASK-Mobile).

## Testing

```
npm test
npm run coverage
```

## Components and Architecture

### Docker Containers

MASK-API uses Docker to containerize the bits of architecture. Run `docker compose up` to spin the API up locally. If you're having trouble getting it up and running, usually running `docker system prune -a` and then `docker compose up` again will resolve errors.

See `docker-compose.yml` for the details of what is being spun up.

Note that when dependencies are added or updated, they must _additionally_ be installed in the Docker container: `docker compose run api npm ci`.

### Express API

The MASK API is a Typescript Express API that contains basic CRUD operation for a model called `Task`.

#### Files of Interest

`index.ts` – app setup and various security settings

`routes.ts` – endpoints and associated middleware protections

`keycloak.json` – config file read by the Keycloak middleware

`realm-export.json` – Keycloak "terraform" file

`ormconfig.ts` – config file read by `TypeORM`

`services/data.service.ts` – helpers for accessing stored data through `TypeORM`

`controllers/task.controller.ts` – responsible for handling incoming requests from the client and outgoing responses to the client

`database/` – directory containing Postgres setup scripts, seeding, and migrations

`entities/Task.ts` – the one data model in MASK API

### Postgres Database

The database is set up using Postgres and [TypeORM](https://typeorm.io/#/) as the ORM layer. It is seeded with a tool called [typeorm-seeder](https://github.com/w3tecch/typeorm-seeding). 

Running the API with `docker compose up` will automatically drop and re-seed the database (see `entry-point.sh`).

In order to connect to the local database the host must be host.docker.internal instead of localhost (if using pgadmin).

#### Migrations

Due to the way typeorm is installed, commands which pass an argument must be structured with a `--` between the command and the flags. For example:
`npm run typeorm typeorm migration:generate -- -n PostRefactoring`
In order to run a migration: `npm run typeorm migrate:run`
In order to generate a migration: `npm run typeorm migrate:generate -- -n NAME`
More documentation for migrations can be found [here](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)

### Keycloak Authentication

In order to run Keycloak locally you must edit your `/etc/hosts` file (assuming you are on a Mac). Express looks for Keycloak at the URL of its container name (`http://keycloak:8080`).

The JWT issued by Keycloak must be signed by the same URL which the Express API is communicating with. In order to do this your Keycloak instance must be accessible in the browser at keycloak.com.

Keycloak loads with an example realm called MASK. The realm has three clients (`mask-api`, `mask-mobile`, `mask-dashboard`), two realm roles (`mask-admin`, `mask-user`) and no users. *You must add a user and map them to the example role in order to test the API.*

An example authentication flow is currently
- Fetch a bearer token from Keycloak

 ```curl -s -X POST http://keycloak:8080/auth/realms/mask/protocol/openid-connect/token -H 'content-type: application/x-www-form-urlencoded' -d 'username=example_user&password=password&grant_type=password&client_id=mask-dashboard&scope=openid''```

- Make a request to a protected URL with the bearer token

`curl -v http://localhost:3000/api/v1/{protected_route} -H "Authorization: Bearer $YOUR_BEARER_TOKEN_HERE"`
