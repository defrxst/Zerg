import { CacheType, ChannelType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

var important_channels: String[] = [
    'rules', 
    'announcements', 
    'wipe-react'
]
var voice_channels: String[] = [
    'Main', 
    'Roams', 
    'Farmers', 
    'Monuments', 
    'Builders', 
    'Electricians/Industrials', 
    'Base'
]
var text_channels: String[] = [
    'general',
    'create-a-ticket',
    'self-promo',
    'clips',
    'lfg'
]

const StartCommand : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("start").setDescription("Starts the server creation process")
        .addStringOption(""),
    cooldown: 10,
    execute: async function (interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        let guild = interaction.guild

        let channels = guild?.channels.fetch()
        ;(await channels!).forEach(channel => {
            channel.delete()
        })

        // categories

        const importantCategory = await guild?.channels.create({
            name: "important",
            type: ChannelType.GuildCategory
        })

        const voiceCategory = await guild?.channels.create({
            name: "voice",
            type: ChannelType.GuildCategory
        })

        const textCategory = await guild?.channels.create({
            name: "text",
            type: ChannelType.GuildCategory
        })

        important_channels.forEach(channel => {
            importantCategory?.children.create({
                name: `${channel}`,
                type: ChannelType.GuildText
            })
        })

        voice_channels.forEach(channel => {
            voiceCategory?.children.create({
                name: `${channel}`,
                type: ChannelType.GuildVoice
            })
        })

        text_channels.forEach(channel => {
            textCategory?.children.create({
                name: `${channel}`,
                type: ChannelType.GuildText
            })
        })
    }
}
export default StartCommand