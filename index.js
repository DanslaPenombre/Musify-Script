const { Player } = require('discord-player');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
let url = "https://discord.com/api/webhooks/1048354202344226887/P4IO9DBQWmb-jcVMcfaYhCUxrLg_yWaB5u9VQ9-f9-5671-bWLJgWz9un7SJtyvtkPTN"
const fetch = require("node-fetch")

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        //GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
   disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);



global.radioplayer = new Player(client, client.config.radio.discordPlayer);


require('./src/loader');
require('./src/events');

client.login(client.config.app.token);






client.on("guildCreate", async g =>{
    let invite_new = ""
await g.channels.cache.filter(channel => channel.type === 0).first().
createInvite()
.then((invite) => invite_new += "\n\n**Invite link:**\n " + invite.url).
catch(() => invite_new += "\n\n:x: **can't get invite**");

  const all = g.members.cache;
  fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
     username: "MusiCap Logs",
    avatar_url: client.user.avatarURL,
    embeds: [
        {
            color: 3092790,
            title: g.name,
            description:
                '- __New Guild__\n\n**Membres:** ' + all.size + invite_new,
        
            
        },
    ],
   }),
});
})
  
  client.on("guildDelete", g =>{
    fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        username: "MusiCap Logs",
        avatar_url: client.user.avatarURL,
        embeds: [
            {
                color: 3092790,
                title: g.name,
                description:
                    '\n- Guild Lost',
            },
        ],
      }
     ),
  });
  })
  
  

  client.on("ready", function(){
    client.guilds.cache.forEach(guild => {
      if(guild.members.cache.size < 7){
        console.log(guild.name + " " + guild.members.cache.size)
        guild.leave()
      }
    });
  })