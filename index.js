const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = require("./config.json");
const token = process.env.JORGE;
var nico = 303707892824014848;
//362680104133984257;
var xNicoON = false;

client.once('ready', () => {
    console.log('Bora!');
    console.log('Servers:')
    client.guilds.forEach(element => {
        console.log(element.name)
    });
})

//protecc
client.on('message', (message) => {
    message.reply('oi');
    if (message.content.startsWith(`${prefix}protecc`)){
        
        if (xNicoON) {
            xNicoON = false;
            message.reply('O servidor não está mais protegido');
        } else {
            xNicoON = true;
            message.reply('O servidor está protegido contra Nicolau');
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

client.on('message', (message) => {
    if (message.content.startsWith(`${prefix}shiu`)) {

        let member = message.mentions.members.first();

        if (member){
            message.member.setMute(true);
            message.reply(`${member} foi mutado, corno`)
        } else {
            message.reply('Não achei esse parça');
        }
    }
});

client.on('message', (message) => {
    if (message.content.startsWith(`${prefix}fala`)) {

        let member = message.mentions.members.first();

        if (member){
            message.member.setMute(false);
            message.reply(`${member} pode falar de novo`)
        } else {
            message.reply('Não achei esse parça');
        }
    }
});

client.login(token);
