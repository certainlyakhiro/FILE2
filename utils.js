const fs = require("fs-extra");
const path = require("path");
const { logger } = require("./System/logger");

async function loadAll() {
  const errs = {};
  const modulePath = path.join(__dirname, "Akhiro", "modules");
  const eventsPath = path.join(__dirname, "Akhiro", "events");

  // load all of em
  try {
    Object.keys(require.cache).forEach((key) => delete require.cache[key]); //lia
    const moduleFiles = fs
      .readdirSync(modulePath)
      .filter((file) => file.endsWith(".js") || file.endsWith(".ts")).map(i => `${modulePath}/${i}`);
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js") || file.endsWith(".ts")).map(i => `${eventsPath}/${i}`);

    moduleFiles.forEach((file) => {
      try {
        let moduleFile = require(file);
        if (moduleFile && (moduleFile.onEvent || moduleFile?.default?.onEvent)) {
          eventFiles.push(file);
          //onEvent support for cmds
        }
        if (moduleFile && moduleFile.default) {
          moduleFile = moduleFile.default;
          //for esm
        }

        if (!moduleFile) {
          throw new Error(`Module file ${file} does not export anything.`);
        } else if (!moduleFile.metadata) {
          throw new Error(`Metadata is not defined in module file: ${file}`);
        } else if (typeof moduleFile.onRun !== "function") {
          throw new Error(`onRun is not defined in module file: ${file}`);
        } else {
          global.Akhiro.modules[moduleFile.metadata.name] = moduleFile;
          logger.info(
            `Loaded module "${moduleFile.metadata.name}" from ${file}`,
          );
        }
      } catch (error) {
        logger.error(`Error loading module from file ${file}: ${error}`);
        errs[file] = error;
      }
    });
    console.log(`
Loading Events
`);

    eventFiles.forEach((file) => {
      try {
        let eventFile = require(file);
        if (eventFile && eventFile.default) {
          eventFile = eventFile.default;
          //for esm
        }
        
        if (!eventFile) {
          throw new Error(`Event file ${file} does not export anything.`);
        } else if (!eventFile.metadata) {
          throw new Error(`Metadata is not defined in module file: ${file}`);
        } else if (typeof eventFile.onEvent !== "function") {
          throw new Error(`onEvent is not defined in module file: ${file}`);
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
    errs[file] = error;
  }
  return Object.keys(errs).length === 0 ? false : errs;
}

module.exports = {
  loadAll,
  cleanCode
};

function cleanCode(code) {
  const regex = /api\.sendMessage\(([^,]+),\s*(.*\bthreadID\b.*)\s*,\s*(.*\bmessageID\b.*)\)/g;
  code = code.replace(regex, "box.reply($1)");
  return code;
}
global.utils = new Proxy({
  cleanCode,
  loadAll
}, {
  get(target, prop) {
    if (!(prop in target)) {
      throw new Error(`The global.utils.${prop} is not available in utils of Akhiro Bot!`);
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop in target) {
      throw new Error(`You are not allowed to override the global.utils.${prop} of Akhiro Bot!`);
    }
    target[prop] = value;
  }
})