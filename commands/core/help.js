const { EmbedBuilder, ActionRowBuilder , ButtonBuilder} = require('discord.js');


module.exports = {
    name: 'help',
    description: "MusiCap Help Pannel (enable commands only)",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

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
        .setDescription("**Hey i'm** [MusiCap](https://discord.com/api/oauth2/authorize?client_id=1040274260662439947&permissions=8&scope=applications.commands%20bot).\n**Now Support:** \n- `Spotify` <:spotify:1046730624549007381>\n- `Soundcloud` <:soundcloud:1046730623370403941>\n- `Youtube` <:youtube:1048334518899183677>\nJoin my [support server](https://discord.gg/9GNmT5he3Q)\nVisite my [WebSite](https://MusiCap.kschdsc.repl.co/)")
        .addFields([ { name: `Enabled - ${commands.size}`, value: commands.map(x => ` > ➤ \`${x.name}\``).join('\n'), } ])
        .setTimestamp()
        .setImage("https://c.tenor.com/K6vFDcodRXIAAAAC/music-welcome-singer-secret-discord.gif")
        .setFooter({ text: 'Made with heart by KSCH ❤️', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed], components: [row] });
    },
};