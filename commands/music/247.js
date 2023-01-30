const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('discord.js');
const { QueryType } = require('discord-player');

 

module.exports = {
    name: '247',
    description: 'Play Music 24/7 in a voice channel',
    voiceChannel: false,
    options: [
        {
            name: "stop",
            description: "Stop Radio in voice channel",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "start",
            description: "Start Radio in Voice Channel",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                
                    {
                        name: 'channel',
                        description: 'Voice Channel to play radio',
                        type: ApplicationCommandOptionType.Channel,
                        required: true,
                    },
                    {
                        name: 'radio',
                        description: 'Radio to play in Voice Channel',
                        type: 3,
                        required: true,
                        choices:[
                            {
                                name: "🎵 Lofi Radio",
                                value: "lofi",
                            },
                            {
                                name: "👹 Phonk Radio",
                                value: "phonk",
                            },
                            {
                                name: "☠️ Rock Radio",
                                value: "rock",
                            },
                            {
                                name: "👾 Trap Radio",
                                value: "trap",
                            },
                            {
                                name: "🎮 Gaming Radio",
                                value: "game",
                            },
                            {
                                name: "🐻 Russian Radio",
                                value: "russian",
                            },
                            {
                                name: "🥖France Radio",
                                value: "france",
                            },
                            {
                                name: "🍔 US Radio",
                                value: "usa",
                            },
                            {
                                name: "🔪Gangsta Radio",
                                value: "gangsta",
                            },
                            {
                                name: "🚗 Bass Boosted Car Radio",
                                value: "car",
                            },
                            {
                                name: "🏴 Dark Ambient Radio",
                                value: "dark",
                            },
                        ]
                    },
            ]
        },
        
    ],


    async execute({ inter }) {
        
        let cmd = inter.options.data[0].name;
        switch(cmd){
            case "stop":
                await inter.deferReply();
                const queeue = radioplayer.getQueue(inter.guild.id);
                if (!queeue || !queeue.playing) return inter.editReply("**I’m currently not playing in this guild.** :x:");
                await queeue.stop();
                inter.editReply("**Radio Stoped !**")
                break;

            case "start":
                function GetRadioName(radiochoosing) {
                    var name = {
                        "lofi": "🎵 Lofi Radio",
                        "rock": "☠️ Rock Radio",
                        "phonk": "👹 Phonk Radio",
                        "trap": "👾 Trap Radio",
                        "game": "🎮 Gaming Radio",
                        "russian": "🇷🇺 Russian Radio",
                        "france": "🇫🇷 France Radio",
                        "usa": "🇺🇸 USA Radio",
                        "gangsta": "🗡️ Gangsta Radio",
                        "car": "🏎️ Bass Boosted Car Radio",
                        "dark": "🏴 Dark Ambient Radio"
                    }
                  
                    var radio_name = name[radiochoosing] || "IDK BRO SORRY";
                    return radio_name
                  }
                  function GetRadioURL(radiochoosing) {
                    var url = {
                        "lofi": "https://youtu.be/jfKfPfyJRdk",
                        "rock": "https://youtu.be/5X18D-EbjUc",
                        "phonk": "https://youtu.be/UYBstGPWYnE",
                        "trap": "https://youtu.be/6Qq2OMFh8Pc",
                        "game": "https://youtu.be/MsSrIlOi81o",
                        "russian": "https://youtu.be/LtTtTG7ORLE",
                        "france": "https://youtu.be/We8GTZkXcSE",
                        "usa": "https://youtu.be/05689ErDUdM",
                        "gangsta": "https://youtu.be/n7rPvz7Rr1Q",
                        "car": "https://youtu.be/n7rPvz7Rr1Q",
                        "dark": "https://youtu.be/eYTUGtlM2k8"
                    }
                  
                    var radio_url = url[radiochoosing] || "https://youtu.be/jfKfPfyJRdk";
                    return radio_url
                  }
        
                const notgood = new EmbedBuilder()
                .setTitle("__Failed__ <a:deny:1041634531695927337>")
                .setColor('#ff0000')
                .setDescription("**Sorry Something gone wrong please try to provide an Valid\n__Voice Channel__\nAnd an Valid __Radio__**")
                .setTimestamp()
                let start_options = inter.options.data[0].options
                let channel = inter.options.getChannel(start_options[0].name);
                
                if(!channel) return inter.reply({ embeds: [notgood] });
        
                if(channel.type !== 2) return inter.reply({ embeds: [notgood] });
                
                let radiochoice = start_options[1].value;
                
                if(!radiochoice) return inter.reply({ embeds: [notgood] });
                
                
        
        
                await inter.deferReply();
        
                const song = GetRadioURL(radiochoice)
                const res = await radioplayer.search(song, {
                    requestedBy: inter.member,
                    searchEngine: QueryType.AUTO
                });
        
                if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });
        
                const queue = await radioplayer.createQueue(inter.guild, {
                    metadata: channel,
                    leaveOnEmpty: false,
                    spotifyBridge: client.config.radio.spotifyBridge,
                    initialVolume: client.config.radio.defaultvolume,
                    leaveOnEnd: true,
                });
        
                try {
                    if (!queue.connection) await queue.connect(channel);
                } catch {
                    await radioplayer.deleteQueue(inter.guildId);
                    return inter.editReply({ content: `I can't join the voice channel ${channel.name}... try again ? ❌`, ephemeral: true});
                }
        
               await inter.editReply({ content:`Loading ${GetRadioName(radiochoice)}... 🎧`});
        
                res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        
                if (!queue.playing) await queue.play();
            
        
        
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Listen Radio')
                    .setURL(`https://discord.com/channels/${inter.guild.id}/${channel.id}`)
                    .setStyle('Link')
                    .setDisabled(false)
                )
                
                const embed = new EmbedBuilder()
                .setTitle("__Success__ <a:check:1041634534174756864>")
                .setColor('#00FF3A')
                .setDescription("**Hey 24h/24h Radio Play Enable thank to use** [MusiCap](https://discord.com/api/oauth2/authorize?client_id=1040274260662439947&permissions=8&scope=applications.commands%20bot).\n\n```yml\nIf you find some bugs Join my```\n[<a:a2f:1040272766982692885> Discord Support Server](https://discord.gg/9GNmT5he3Q)")
                .setTimestamp()
                .setImage("https://i.gifer.com/76Oz.gif")
                .setFooter({ text: 'Made with heart by KSCH ❤️'});
            
                await inter.editReply({ embeds: [embed], components: [row] });
                break;
        }
    },
};