const { ShardingManager } = require('discord.js');

const { app } = require("./config.js");
let BOT_TOKEN = app.token
const manager = new ShardingManager('./index.js', { token: BOT_TOKEN });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();
