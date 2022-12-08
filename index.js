require("dotenv").config();
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});
const bannedWords = ["tak", "yes"];

function checkForBannedWords(message) {
  for (let i = 0; i < bannedWords.length; i++) {
    const regex = new RegExp(bannedWords[i], "i");
    if (regex.test(message)) {
      return true;
    }
  }
  return false;
}

function onMessage(message) {
  console.log("hehe");
  if (checkForBannedWords(message.content)) {
    let newMessage = message.content.replace(/tak|yes/g, "`cursed word`");

    message.delete();
    message.channel.send(newMessage);
  }
}

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on("messageCreate", onMessage);

client.login(process.env.token);