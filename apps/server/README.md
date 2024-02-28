# Server App

### Start Development Databases (Postgres & Redis)

-  run command to start dev databases

```sh
  nx dev:db
```

-  run database migration commands

```sh
  nx prisma-generate server
  nx prisma-migrate server --name=user_model
```
