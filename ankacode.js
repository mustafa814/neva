const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const ms = require("ms");
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const { MessageButton, MessageActionRow } = require('discord-buttons');
require('discord-buttons')(client);
const roldb = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const queue = new Map();

client.ayarlar = {  "prefix": "."}

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//--------------------------------------------------------------------------------------------\\

client.on("ready",() => {
console.log("Bot Hazır");
var randomMesajlar = ["Anka Code Butonlu Kayıt Botu"]
setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);}, 3 * 30000);
client.user.setStatus("dnd");
})
//--------------------------------------------------------------------------------------------\\



//------------------------------------SAKIN DOKUNMA DOKUNMA SAKIN DOKUNMA-------------------------------------------------\\

  client.on("guildMemberAdd", member => {    //SAKIN DOKUNMA   
    let otorol = '858738715458142268'//SAKIN DOKUNMA
      member.roles.add(otorol) //SAKIN DOKUNMA
    });

//--------------------SAKIN DOKUNMA SAKIN DOKUNMA SAKIN DOKUNMA SAKIN DOKUNMA---------------------------\\


//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     
//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     




client.on("guildMemberAdd", member => {       
    var ronney = roldb.fetch(`otorolrolu_${member.guild.id}`);
  var rol = member.guild.roles.cache.get(ronney)
 if(!rol) return; //Eğer sunucudaki rol silinirse otorol ayarı silinir
   member.roles.add(rol.id)
//-----Rol(ÜST)Yazı(ALT)-----\\
var ales = roldb.fetch(`otorolkanali_${member.guild.id}`);
var kanal = member.guild.channels.cache.get(ales)
if(!kanal) return;
kanal.send(`

 <@${member.id}> **Sunucuya Katıldı.**

 ${rol} **Adlı Rol Verildi.**

  **Hoşgeldin** ${member.user.username}!




`)

});

client.on("message", (message) => {



if (message.content !== ".kayıt" || message.author.id === client.ayarlar.sahip || message.author.bot) return;


    
   let kayıt = new MessageButton()
  .setStyle('blurple') // Rengi ayarlayabilirsiniz.
  .setLabel('⚡ • KAYIT OL') // Adını Değiştirebilirsiniz.
  .setID('kayıt'); // Elleme Bunu
    
    message.channel.send("> ```Kayıt Olmak İçin Aşağıdaki Butona Tıkla!```", { 
      buttons: [ kayıt ]
  });
  });
  client.on('clickButton', async function (button) {
if (button.id === 'kayıt') {
        if (button.clicker.member.roles.cache.get("Kayıt Olunca Verilecek ROL İD")) {
            await button.clicker.member.roles.remove("Kayıt Olunca Verilecek ROL İD")
            await button.reply.edit(`**Kayıt Olmak İçin Tekrar Butona Basınız**`, true)
        } else {
            await button.clicker.member.roles.add("Kayıt Olunca Verilecek ROL İD")
            await button.reply.edit("**Başarıyla Kayıt Oldunuz**", true)
            }
    }
});
















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































                                              client.login(process.env.token)


