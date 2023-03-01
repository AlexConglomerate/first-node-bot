const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

const button = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Button 1', callback_data: 1}, {text: 'Button 2', callback_data: 2}],
            [{text: 'Button 3', callback_data: 3}, {text: 'Button 4', callback_data: 4}]
        ]
    })
}

const start = async () => {
    // setMyCommands задаёт команды
    await bot.setMyCommands([
        {command: '/start', description: 'Start'},
        {command: '/info', description: 'Info'},
        {command: '/button', description: 'Button'},
    ])

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const message = msg.text

        if (message === '/start') {
            // await bot.sendMessage(chatId, 'Ты нажал старт');
            return bot.sendMessage(chatId, 'Ты нажал старт');
        }

        if (message === '/info') {
            return bot.sendMessage(chatId, 'Ты нажал инфо');
        }
        if (message === '/button') {
            try {
                return bot.sendMessage(chatId, 'Ты нажал button', button);
            } catch (error) {
                return bot.sendMessage(chatId, 'Произошла какая-то ошибка');
            }
        }


        return bot.sendMessage(chatId, 'Я тебя не понимаю');
    })

    bot.on('callback_query', async msg => {
        console.log(`msg`, msg)
        const chatId = msg.message.chat.id;
        const data = msg.data
        return bot.sendMessage(chatId, data);
    })
}


start()

