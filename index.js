const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.JORGE;

const LanguageToolApi = require('language-grammar-api');
 
const options = {
  endpoint: 'https://languagetool.org/api/v2'
};
 
const languageToolClient = new LanguageToolApi(options);

var grammarON = false;
var nico = 362680104133984257;
//362680104133984257;
var xNicoON = false;

client.once('ready', () => {
    console.log('Bora!');
    console.log('Servers:')
    client.guilds.forEach(element => {
        console.log(element.name)
    });
})

client.on('message', (message) => {
    
    //mute
    if (message.content.startsWith(`/shiu`)) {

        let member = message.mentions.members.first();

        if (member){
            message.member.setMute(true);
            message.reply(`${member} foi mutado, corno`)
        } else {
            message.reply('Não achei esse parça');
        }
    }
    
    //unmute
    if (message.content.startsWith(`/fala`)) {

        let member = message.mentions.members.first();

        if (member){
            message.member.setMute(false);
            message.reply(`${member} pode falar de novo`)
        } else {
            message.reply('Não achei esse parça');
        }
    }
    
    //protecc ON/OFF
    if (message.content.startsWith(`/protecc`)){
        if (message.member.id != nico){
            if (xNicoON) {
                xNicoON = false;
                message.reply('O servidor não está mais protegido');
            } else {
                xNicoON = true;
                message.reply('O servidor está protegido contra Nicolau');
            }
        } else {
            message.reply('Você não possui tal poder, Nicholas');
        }
    }

    //grammar check ON/OFF
    if (message.content.startsWith(`/tuiga`)) {
        if (grammarON) {
            grammarON = false;
            message.reply('O servidor voltou ao normal');
        } else {
            grammarON = true;
            message.reply('O servidor agora é chato com gramática');
        }
    }

    //grammar check
    if (!message.content.startsWith(`/`)){
        if (grammarON){
            let check = languageToolClient.check({
                text: message.content,
                language: 'pt-BR' 
            });

            console.log(check.body);
        }
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (xNicoON){
        if (oldMember.id == nico){
            let newUserChannel = newMember.voiceChannel
            let oldUserChannel = oldMember.voiceChannel
        
            if(newUserChannel !== undefined) {
                newMember.setVoiceChannel(null);
            }    
        }
    }
});

client.login(token);
