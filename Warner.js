class Warner {
    #socket;
    #getText;
    #sendMessage;
    #membersLimit;
    #trigger;
  
    constructor(config = {}) {
      this.#membersLimit = config.membersLimit || 100;
      this.#trigger = config.trigger;
    }
  
    init(socket, getText, sendMessage) {
      this.#socket = socket;
      this.#getText = getText;
      this.#sendMessage = sendMessage;
    }
  
    async process(key, message) {
      const fs = require('fs');
      
      const stickerPath = "files\\sticker_img.jpg";
      if (!fs.existsSync(stickerPath)) {
          console.error("Sticker image file does not exist.");
          return;
      }
      const stickerData = fs.readFileSync(stickerPath);


      // const stickerPath = './sticker.webp';
      // const stickerFile = fs.readFileSync(stickerPath);
      // if (stickerFile){
      //   console.log(stickerFile)
      // }

      // const Sticker = require('wa-sticker-formatter').default;
      // const { StickerTypes } = require('wa-sticker-formatter');
      // const stickerFile = fs.readFileSync("sticker_img.jpg"); // media is an Express.Multer.File
      // const stickerBuffer = Buffer.from(stickerFile);

      const text = this.#getText(key, message);

      if (!text.includes(this.#trigger)) return;
  
      try {
        const grp = await this.#socket.groupMetadata(key.remoteJid);
        const members = grp.participants;

        console.log(members)
        
        let rrrr=false;

        members.forEach(({id,admin}) => {
          if(id==key.participant && admin!=null){
            console.log("Message Sent by Admin")
            rrrr=true;
            return;
          }
        });
        
        if(rrrr){
          return;
        }

        // if(!grp.admin.includes("918851254350@s.whatsapp.net")) return;

        // if(grp.admin.includes(key.participant)) return;

        // const response = await this.#socket.sendMessage(key.remoteJid, { text: 'hello!' })
        await this.#socket.sendMessage(key.remoteJid,{delete:key})

        const mentions = [];
        const items = [];
  
        members.forEach(({ id, admin }) => {
          if(admin)
          {
            mentions.push(id);
            items.push("@" + id.slice(0, 12) +" 👑 ");
          }
        });

        for(let i=0;i<mentions.length;++i){
            console.log(mentions[i])
        }
  
        if (members.length < this.#membersLimit){
          this.#sendMessage(
            key.remoteJid,
            { text: `*Warning grp links not allowed, tagging admins...*\n ${items.join(" ")}`, mentions },
            { quoted: { key, message } }
          );
          // this.#sendMessage(
          //   key.remoteJid,
          //   stickerFile,
          //   // MessageType.sticker,
          //   {mimetype: "image/webp"}
          // );

          // this.#sendMessage(
          //   key.remoteJid,
          //   {sticker: stickerBuffer,
          //     fileName: "sticker_img.jpg",
          //     isAnimated: false}
          // );

          if (this.#socket.sendMessage) {
            // Send the image as a message
            await this.#socket.sendMessage(key.remoteJid, {image: stickerData, });
            console.log("Sticker sent successfully");
          } else {
            console.error("sendMessage method is not available on the socket object.");
          }   
      }
      } catch (err) {
        console.log("ERROR in WARNING:", err);
      }
    }
  }
  
  module.exports = Warner;