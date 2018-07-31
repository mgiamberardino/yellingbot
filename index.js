var Bot = require('slackbots');

const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_NAME = process.env.BOT_NAME || 'yellingbot';

var settings = {
    token: BOT_TOKEN,
    name: BOT_NAME,
};

var bot = new Bot(settings);

bot.on('start', function() {
    bot.getChannels().then(({ channels }) => {
      bot.getGroups()
        .then(({ groups }) => {
          return channels
            .filter(c => c.is_member)
            .concat(groups).map(g => g.id);
        })
        .then(groupsIds => {
          bot.on('message', (data) => {
            if (data.type === 'message'
              && data.username !== 'yellingbot' 
              && groupsIds.includes(data.channel)
              && data.text !== data.text.toUpperCase()){
              bot.postMessage(data.channel, `HEY!! YOU SHOULD YELL HERE!!! BE NICE AND FOLLOW THE RULES!!`);
            }
          });
          console.log('Yelling Bot is Up and Running!');
        });
      });
});

