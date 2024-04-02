const fs = require('fs-extra');
const path = require('path');
const { logger } = require('./System/logger');

async function loadAll() {
  const modulePath = path.join(__dirname, "Akhiro", "modules");
  const eventsPath = path.join(__dirname, "Akhiro", "events");

  // load all of em 
  try {
    Object.keys(require.cache).forEach(key => delete require.cache[key]) //lia
    const moduleFiles = fs
      .readdirSync(modulePath)
      .filter((file) => file.endsWith(".js"));
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    moduleFiles.forEach((file) => {
      try {
        const moduleFile = require(path.join(modulePath, file));

        if (!moduleFile) {
          logger.error(`Module file ${file} does not export anything.`);
        } else if (!moduleFile.metadata) {
          logger.error(`Metadata is not defined in module file: ${file}`);
        } else if (typeof moduleFile.onRun !== "function") {
          logger.error(`onRun is not defined in module file: ${file}`);
        } else {
          global.Akhiro.modules[moduleFile.metadata.name] = moduleFile;
          logger.info(`Loaded module "${moduleFile.metadata.name}" from ${file}`);
        }
      } catch (error) {
        logger.error(`Error loading module from file ${file}: ${error}`);
      }
    });
    console.log(`
Loading Events
`);
    
    eventFiles.forEach((file) => {
      try {
        const eventFile = require(path.join(eventsPath, file));
        if (!eventFile) {
          logger.error(`Event file ${file} does not export anything.`);
        } else if (!eventFile.metadata) {
          logger.error(`Metadata is not defined in module file: ${file}`);
        } else if (typeof eventFile.onEvent !== "function") {
          logger.error(`onEvent is not defined in module file: ${file}`);
        } else {
          //pano mag map
          global.Akhiro.events?.set(eventFile.metadata.name, eventFile);
          logger.info(`Loaded event "${eventFile.metadata.name}" from ${file}`);
          // yep
        }
      } catch (error) {
        logger.error(`Error loading module from file ${file}: ${error}`);
      }
    });
  } catch (error) {
    logger.error(`Error reading module directory: ${error}`);
  }
}

module.exports = {
  loadAll,
};