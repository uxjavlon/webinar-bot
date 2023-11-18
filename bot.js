const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_API_TOKEN' with your actual bot's API token
// const token = 'YOUR_API_TOKEN';
const token = "6532809661:AAHthmybbaO-Tdy_aRIq7u3WILtw3JOfwxY";

const bot = new TelegramBot(token, { polling: true });

// Define the target channel ID where you want to send the user information
const targetChannelId = "-4050602453"; // Replace with your channel username or IDd

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Salom! Creatit Webinar botga Xush kelibsiz.");
  bot.sendMessage(chatId, "Ismingiz:");

  bot.once("message", (nameMsg) => {
    const name = nameMsg.text;

    bot.sendMessage(
      chatId,
      `Tanishganimdan xursandman, ${name}! Telefon raqamingizni jo'nating:`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Telefon raqamni jo'natish",
                request_contact: true,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      }
    );

    bot.once("contact", (contactMsg) => {
      const phoneNumber = contactMsg.contact.phone_number;

      bot.sendMessage(
        chatId,
        `Ro'yxatdan o'tganingiz uchun rahmat! Tez orada siz bilan bog'lanamiz.`
      );

      // Send user information to another channel
      const messageToChannel = `User's name: ${name}\nUser's phone number: ${phoneNumber}`;
      bot.sendMessage(targetChannelId, messageToChannel);
    });
  });
});

bot.on("polling_error", (error) => {
  console.log(`Polling error: ${error}`);
});

console.log("Bot is running...");
