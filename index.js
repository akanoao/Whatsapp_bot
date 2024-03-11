const Bot = require("./Bot");

const TagEveryone = require("./TagEveryone");

const Warner = require("./Warner");

const { botConfig, pluginsConfig } = require("./config");

const plugins = [
  new TagEveryone(pluginsConfig.tagEveryone),
  new Warner(pluginsConfig.warner),
];

const bot = new Bot(plugins, botConfig);

(async () => {
  await bot.connect();
  await bot.run();
})();