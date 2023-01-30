const { EmbedBuilder} = require('discord.js');


module.exports = {
    name: 'invite',
    description: "MusiCap Invite link",
    showHelp: false,

    execute({ client, inter }) {

		

        const embed = new EmbedBuilder()
        .setColor('#FF9300')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription("[MusiCap Invite](https://discord.com/api/oauth2/authorize?client_id=1040274260662439947&permissions=8&scope=applications.commands%20bot)")
        .setTimestamp()
        .setFooter({ text: 'Made with heart by KSCH ❤️', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed]});
    },
};