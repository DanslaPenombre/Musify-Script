const { EmbedBuilder, ActionRowBuilder , ButtonBuilder} = require('discord.js');


module.exports = {
    name: 'info',
    description: "MusiCap info",
    showHelp: false,

    execute({ client, inter }) {

        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                .setLabel('Invite Me')
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1040274260662439947&permissions=8&scope=applications.commands%20bot")
                .setStyle('Link')
                .setDisabled(false)
            )
            .addComponents(
				new ButtonBuilder()
                .setLabel('My Website')
                .setURL("https://MusiCap.kschdsc.repl.co/")
                .setStyle('Link')
                .setDisabled(false)
            )
            
            .addComponents(
				new ButtonBuilder()
                .setLabel('My Support')
                .setURL("https://discord.gg/9GNmT5he3Q")
                .setStyle('Link')
                .setDisabled(false)
            )

       
        const embed = new EmbedBuilder()
        .setColor('#03fc0f')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
                
    
        .setDescription(`**Hey i'm MusiCap, the best music bot on discord!**\n**I'm able tu play youtube / spotify and soundcloud songs with the best quality possible**\nYou can also support me with a donate on this [<:paypal:975465071935356980> PayPal](https://paypal.me/plus2pub)\n**You can help me by voting for me on this website**\nhttps://discordbotlist.com/bots/MusiCap-3890`)
        .setTimestamp()
        .setImage("https://c.tenor.com/K6vFDcodRXIAAAAC/music-welcome-singer-secret-discord.gif")
        .setFooter({ text: 'Made with heart by KSCH ❤️', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed], components: [row] });
    
    },
};