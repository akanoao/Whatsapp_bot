// Contains the default configuration for Bot & Plugins
// Any attribute not given in the configuration will take its default value

const botConfig = {
    authFolder: "auth",
    selfReply: false,
    logMessages: true,
  };
  
  const pluginsConfig = {
    tagEveryone: {
      membersLimit: 200,
      trigger: "TagAll",
    },
    warner:{
      membersLimit: 200,
      trigger: "https://chat.whatsapp.com"
    }
  };
  
  module.exports = { botConfig, pluginsConfig };