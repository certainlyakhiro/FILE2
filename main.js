const fs = require("fs-extra");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const login = require("./System/login");
/*const config = require("./config.json");*/
const { logger } = require("./System/logger");
const express = require("express");
const app = express();
require('ts-node').register();

process.on("unhandledRejection", (...args) => console.log(...args));
process.on("uncaughtException", (...args) => console.log(...args));

global.Akhiro = {
  /*config: config,*/
  get config() {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "config.json"), "utf-8"),
    );
  },
  set config(config) {
    const data = global.Akhiro.config;
    const finalData = {
      ...data,
      ...config
    }
    const str = JSON.stringify(finalData, null, 2);
    fs.writeFileSync(path.join(__dirname, "config.json"), str);
  },
  /*botPrefix: config.botPrefix,
  botAdmins: config.botAdmins,*/
  modules: {},
  //haha wala ako alam sa map
  events: new Map(),
  cooldown: new Map(),
  replies: new Map(),
  reactions: {}
};
Object.assign(global.Akhiro, {
  get botPrefix() {
    return global.Akhiro.config.botPrefix;
  },
  get botAdmins() {
    return global.Akhiro.config.botAdmins;
  },
  get botName() {
    return global.Akhiro.config.botName;
  },
});

const { config } = global.Akhiro;

async function start() {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "System", "public", "index.html"));
  });

  app.listen(3000);

  const utils = require("./utils");
  global.Akhiro.utils = utils; //lia
  const state = fs.readJSONSync("./cookies.json");

  figlet.text(
    "AkhiroV2",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    },
    async (err, data) => {
      if (err) {
        logger.error(`❌ | Error while displaying the Banner: ${err}`);
      }

      console.log(chalk.cyan(data));
      console.log(chalk.grey("Akhiro-Bot-V2"));
      console.log(chalk.grey("Created by Rui | https://github.com/ruingl"));
      console.log(chalk.grey("This bot is not for sale!"));
      console.log();

      await utils.loadAll();

      login({ appState: state }, (err, api) => {
        if (err) {
          logger.error("❌ | Error while logging in: ");
          console.log(err);
          process.exit(1);
        }

        api.setOptions({
          listenEvents: config.fcaOptions.listenEvents,
          logLevel: config.fcaOptions.logLevel,
          updatePresence: config.fcaOptions.updatePresence,
          selfListen: config.fcaOptions.selfListen,
          forceLogin: config.fcaOptions.forceLogin,
          online: config.fcaOptions.online,
          autoMarkDelivery: config.fcaOptions.autoMarkDelivery,
          autoMarkRead: config.fcaOptions.autoMarkRead,
        });

        try {
          var listenEmitter = api.listenMqtt((error, event) => {
            if (error) {
              if (error === "Connection closed.") {
                console.error(`Error during API listen: ${error}`, userid);
              }
              console.log(error);
            }
            const listener = require("./System/listen");
            listener({ api, event });
          });
        } catch (error) {
          logger.error("❌ | Error whilst listening: " + error);
        }
      });
    },
  );
}

start();
