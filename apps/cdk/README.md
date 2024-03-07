# Cdk Infrastructure App

<br>

### Diagram

<img src="./assets/ECS_Diagram.svg">

<br>

### Deployment

-  deploy resource stack

```sh
 nx deploy cdk --stack prod/resource
 nx deploy cdk --stack prod/database
 nx deploy cdk --stack prod/service
 nx deploy cdk --stack prod/pipeline
```

<br>

### Database Deployment

-  **when you deploy database under connectivity & security copy endpoint and export as `RDS_ENDPOINT=<Endpoint>`**
