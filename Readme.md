# Create a VM for your next Laravel project with ease

Creating a containerized environment for your new Laravel project can be quite tedious. Whenever you copy the files from another project you run into errors because certain names for containers, networks and volumes are already in use... Urgh.

## What's inside

The Docker-Laravel-Generator solves thd problem of manually creating a new Docker environment for your new Laravel project. Specifically, it does the following:

- Create an new docker-compose.yml file in your current working directory with all the stuff you need to run your Laravel App (PHP, MySQL, Redis, Mailhog etc.)
- The containers, networks and volumes will have random names. Thus, you won't run into errors anymore due to naming conflicts.
- Create a Dockerfile with all the stuff you need to run your Laravel server. This even includes XDebug ;)
- A folder named `VM` with some additional configuration files

## How to do it

Just execute `npm run generate`. That's it!
