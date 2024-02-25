# Cdk Infrastructure App

<br>

### Environmental Variable

```sh
export AWS_DEFAULT_REGION=""
export AWS_ACCOUNT_ID=""
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export DOPPER_ACCESS_TOKEN=""
export TAG_IDENTIFIER=""
export HOSTED_ZONE_ID=""
export HOSTED_ZONE_DOMAIN=""
export CERTIFICATE_ARN=""
```

<br>

### Deployment

-  deploy resource stack

```sh
 nx deploy cdk --stack prod/resource
 nx deploy cdk --stack prod/service
```
