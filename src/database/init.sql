CREATE USER mask_admin WITH password 'admin';
DROP DATABASE IF EXISTS mask;
DROP DATABASE IF EXISTS keycloak;
CREATE DATABASE mask;
CREATE DATABASE keycloak;
GRANT ALL PRIVILEGES ON DATABASE mask TO mask_admin;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO mask_admin;

\c mask
\c keycloak
