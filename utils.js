const fs = require('fs-extra');
const path = require('path');
const { logger } = require('./System/logger');

async function loadAll() {
  const modulePath = path.join(__dirname, "Akhiro", "modules");

  try {
    Object.keys(require.cache).forEach(key => delete require.cache[key]) //lia
    const moduleFiles = fs
      .readdirSync(modulePath)
      .filter((file) => file.endsWith(".js"));

    moduleFiles.forEach((file) => {
      try {
        const moduleFile = require(path.join(modulePath, file));

        if (!moduleFile) {
          logger.error(`Module file ${file} does not export anything.`);
        } else if (!moduleFile.metadata) {
          logger.error(`Metadata is not defined in module file: ${file}`);
        } else if (!moduleFile.onRun) {
          logger.error(`onRun is not defined in module file: ${file}`);
        } else {
          global.Akhiro.modules[moduleFile.metadata.name] = moduleFile;
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