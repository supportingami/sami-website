import type { Core } from "@strapi/types";
import { Server } from "socket.io";
import { DeployWebsocketService } from "./services/deploy-websocket";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase

  // https://strapi.io/blog/real-time-chat-application-using-strapi-next-socket-io-and-postgre-sql

  // TODO - adapt more from
  // https://github.dev/ComfortablyCoding/strapi-plugin-io

  //strapi.server.httpServer is the new update for Strapi V4
  const io = new Server(strapi.server.httpServer, {
    cors: {
      // cors setup
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
    path: "/sami-admin/",
  });
  // register deployment service websocket handler
  new DeployWebsocketService(io).register();
};
