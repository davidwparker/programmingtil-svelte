import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
// https://github.com/motdotla/dotenv
import dotenv from "dotenv";

// Must call dotenv first or won't have access to environment variables
dotenv.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

express() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (_req) => {
        return ({
          API_ENDPOINT: process.env.API_ENDPOINT,
        });
      }
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
