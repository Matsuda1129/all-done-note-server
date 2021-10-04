import { Context, Handler, APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  app.init();
  return serverless.createServer(expressApp);
};

export const handler: any= (event, context ) => {
  if (!cachedServer) {
    bootstrapServer().then((server) => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};

// export const handler: APIGatewayProxyHandler = async (event, context) => {
//   if (!cachedServer) {
//     cachedServer = await bootstrapServer();
//   }
//   const result = await serverless.proxy(cachedServer, event, context, 'PROMISE')
//     .promise;
//   return result;
// };
