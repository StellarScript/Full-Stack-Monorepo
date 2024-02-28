# Appify

Appify is a full-stack monorepo designed to streamline the development process for scalable web applications. This documentation guides you through setting up the infrastructure, client, and server applications, managing environmental variables, and integrating third-party services.

## Applications

The Appify project is structured into several key components. Each component's detailed setup and usage instructions are available in their respective README files:

-  [cdk](https://github.com/StellarScript/Full-Stack-Monorepo-v2/blob/main/apps/cdk/README.md): Manages cloud infrastructure. (code as infrastructure)
-  [client](https://github.com/StellarScript/Full-Stack-Monorepo-v2/blob/main/apps/client/README.md): The frontend application.
-  [server](https://github.com/StellarScript/Full-Stack-Monorepo-v2/blob/main/apps/server/README.md): The backend application.

## Environmental Variables

To ensure the project runs smoothly in different environments (development, staging, production), you must configure the environmental variables. Below is a template for the required variables:

```env
# AWS Configuration
AWS_DEFAULT_REGION
AWS_ACCOUNT_ID
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

# AWS Route 53 Configuration
HOSTED_ZONE_ID
HOSTED_ZONE_DOMAIN
CERTIFICATE_ARN

# Doppler Access Token
DOPPLER_ACCESS_TOKEN

# Application Configuration
ENVIRONMENT="prod" # Use "dev" for development environment
TAG_IDENTIFIER
```

<br>

### Setup [Dopper](https://doppler.com/) Environmental Variable

-  add environmental variables in dopper: [artical how to get started with doppler](https://medium.com/@edoter92/elevate-your-environmental-security-dive-into-dopplers-capabilities-c618d148f915)

<br>

### Setup [Clerk](https://clerk.com/) Project for OAuth

When users sign up, the process occurs on the client side. To add the user to the database, you need to set up a webhook in Clerk.

-  **`development`**: use ngrok and add ngrok's URL to the Clerk webhook (`<NGROK_URL>/api/auth/signup`).

-  **`production`**: add your domain (`<YOUR_DOMAIN>/api/auth/signup`).
