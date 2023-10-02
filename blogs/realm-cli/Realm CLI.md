# Consuming MongoDB Atlas App Services with Realm CLI

Developers often encounter significant challenges when working with cloud-based solutions. Navigating the complexities of server provisioning, infrastructure management, and authentication can be time-consuming and error-prone.

Customizing data access and security rules to fit specific application needs can require in-depth knowledge and extensive coding efforts. The need to ensure scalability and seamless synchronization across devices further complicates the development process, making it critical to streamline these tasks.

## A poor developer experience tell

Meet Bob, a dedicated developer with a monolithic application at the heart of his digital world. While this application has served him well, it's time for a transformation. Bob faces the daunting task of migrating critical backend features to a more modern and efficient infrastructure. Time is of the essence, and Bob needs a solution that not only accelerates development but also ensures easy maintenance, all while preserving a single codebase. The challenges are clear:
- Bob must navigate a complex migration process while keeping pace with evolving user demands
- Bob needs a robust backend solution that allows for swift changes without sacrificing reliability.  
- In this dynamic landscape, Bob is seeking a partner to help him overcome these hurdles and unlock the full potential of his application.

Bob does the research and finds something called MongoDB Atlas App Services.

### What is App Services

MongoDB offers a range of services for building modern applications, including MongoDB Atlas for managed databases, MongoDB Realm for serverless application development, and features like data synchronization, authentication, and event triggers. These services simplify application development, enable real-time data sync, and provide robust backend capabilities.

The engine beneath MongoDB Atlas App Services is called Realm and we can leverage on top of realm-cli to interact with our *app services* application and have a single code base.

Bob's next step is to understand what exactly does it offer [Realm CLI](https://www.mongodb.com/docs/atlas/app-services/cli/).

### What is Realm CLI

To further simplify the development process, Realm offers the realm-cli tool, allowing developers to interact with MongoDB's backend services seamlessly. With realm-cli, you can efficiently manage and customize your application's backend, authentication, and data access, all from a single command-line interface. This tight integration ensures a smooth transition from development to deployment, helping developers bring their cloud-based applications to life with ease.

### Forecasting the development experience

Bob creates a MongoDB Atlas account where it finds first there is [Free tier for app services](https://www.mongodb.com/docs/atlas/app-services/billing/#monthly-free-tier) which any developer can use it to learn more how it works.

The main goal for now is to find a easy way to design, code and maintain changes on App Services for a trigger to update a collection. So Bob continues creating a [Trigger](https://www.mongodb.com/docs/atlas/app-services/triggers/database-triggers/) in App Services

After a few clicks the triggers gets created

![[trigger.png]]

and the function tied to the trigger as well

![[function.png]]

The situation now is that a dev needs to login to Atlas then to App Services and then apply the changes, Bob then configures Realm CLI.

## Configuring Realm CLI

Bob's first step is to create an API Key and assigning *Project owner*  at Project Settings 

![[apikey.png]]

With that completed, Bob can move on and install the NPM package for Realm CLI for a local administration within a NodeJS project 
``` shell
npm install -g mongodb-realm-cli
```

After having a successful installation and the API Key information, the next command ties the project to App Services

``` shell
realm-cli login --api-key="<my api key>" --private-api-key="<my private api key>"
```

With this step execute, now the App services can be download as a codebase in your local machine. 

```shell
realm-cli pull
```
Let's see what Bob now has in the local folder
```
├── auth
│   ├── custom_user_data.json
│   └── providers.json
├── data_sources
│   └── mongodb-atlas
│       └── config.json
├── environments
│   ├── development.json
│   ├── no-environment.json
│   ├── production.json
│   ├── qa.json
│   └── testing.json
├── functions
│   ├── UpdateAProductSummary.js
│   └── config.json
├── graphql
│   ├── config.json
│   └── custom_resolvers
├── http_endpoints
│   └── config.json
├── log_forwarders
├── realm_config.json
├── sync
│   └── config.json
├── triggers
│   └── UpdateProductsSummaryCollection.json
└── values
```

Pulling the project now Bob can have a local copy, perform changes on the files that are located on App Services with no need to login into Atlas anymore, after the changes are saved, Bob can push the changes to App Services
```
realm-cli push
```
It will detect the changes and prompt if Bob want to apply the changes
``` javascript
Determining changes
The following reflects the proposed changes to your Realm app
--- functions/UpdateAProductSummary.js
+++ functions/UpdateAProductSummary.js
@@ -10,7 +10,6 @@
   const collProductSummary = context.services.get(serviceName).db(databaseName).collection(collnameProductSummmary);
 
   const productCategory = changeEvent.fullDocument.category;
-  const test= "";
   const aggregationPipeline = 
   [
     {

? Please confirm the changes shown above (y/N) 
```

Other features that realm-cli enables is review of logs for instance adding console.log for a quick debug on the functions
```c
realm-cli logs ls
```

For example the output will be something like this
```c
2023-09-22T20:39:29.356+0000      [0s]                           : Error - error issuing collMod command for db.items: (NamespaceNotFound) ns does not exist
2023-09-22T22:11:12.288+0000     [6ms]        Trigger -> Database UpdateProductsSummaryCollection: Error - {"message":"'aggregation' is not a function","name":"TypeError"}
2023-09-22T22:11:12.288+0000     [6ms]        Trigger -> Database UpdateProductsSummary: OK
  error performing mongodb write:  'aggregation' is not a function
2023-09-22T22:11:12.289+0000   [139ms]        Trigger -> Database trigger0: OK
```

Also using authentication on App services such as social logins, API KEYs or JWT, Bob can manage the users that interact with the platform
```c
realm-cli users
```

```
Aliases:
  users, user

Available Commands:
  create      Create an application user for your Realm app
  list        List the application users of your Realm app (alias: ls)
  disable     Disable an application User of your Realm app
  enable      Enable an application User of your Realm app
  revoke      Revoke an application User’s sessions from your Realm app
  delete      Delete an application user from your Realm app
```

With this Bob is free to manage, create, update and delete resources within the terminal, as well this allows to Bob to have a single codebase where it can reside next to the backend code.

Bob can confident rely on App Services of MongoDB Atlas and start the migration.

## Advantages

Realm CLI (Command Line Interface) offers several advantages for developers working with MongoDB Realm and MongoDB Atlas App Services:

1. **Efficient Backend Management:** Realm CLI allows developers to efficiently manage and customize the backend of their applications from a command-line interface. This streamlines tasks such as setting up authentication, creating triggers, and configuring data access rules.

2. **Single Codebase:** With Realm CLI, developers can maintain a single codebase for their applications, reducing complexity and ensuring consistency across different environments.

3. **Simplified Deployment:** The CLI simplifies the deployment process, making it easy to transition from development to production. Developers can deploy their changes with a single command.

4. **Integration with Version Control:** Developers can integrate Realm CLI with version control systems, enabling collaboration and tracking changes to the backend configuration over time.

5. **Scripting and Automation:** Realm CLI can be used in scripts and automated workflows, allowing for the automation of common backend tasks and configurations.

6. **Cross-Platform Support:** Realm CLI supports various platforms, including macOS, Windows, and Linux, making it accessible to a wide range of developers.

7. **Seamless Integration:** It seamlessly integrates with MongoDB Atlas and MongoDB Realm, allowing developers to interact with these services directly from the command line.

8. **Real-time Updates:** Developers can use Realm CLI to apply real-time updates and changes to their backend services, ensuring that their applications remain responsive and up-to-date.

9. **Enhanced Productivity:** By providing a command-line interface, Realm CLI enhances developer productivity by allowing them to perform tasks quickly and efficiently without the need for a graphical user interface.

10. **Access to Documentation:** Developers can access documentation and resources related to MongoDB Realm and Atlas App Services directly from the CLI, facilitating easy reference and learning.

In summary, Realm CLI simplifies backend management, deployment, and automation for developers working with MongoDB Realm and MongoDB Atlas App Services, contributing to increased productivity and efficiency in the development process.