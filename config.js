module.exports = {
    app: {
        token: "MTA1MzA0NTk5MjEzNzY5OTQyMA.GNwUON.i5SIV3P7cYg6s-xQYeVf0pXab1cDJc2aWunMC4",
        playing: '/help',
        global: true,
        guild: '1040257156626268251'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    },
    radio: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: false,
        leaveOnEmpty: false,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
