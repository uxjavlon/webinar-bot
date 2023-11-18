const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_API_TOKEN' with your actual bot's API token
// const token = 'YOUR_API_TOKEN';
const token = "6532809661:AAHthmybbaO-Tdy_aRIq7u3WILtw3JOfwxY";

const bot = new TelegramBot(token, { polling: true });

// Define the target channel ID where you want to send the user information
const targetChannelId = "4050602453"; // Replace with your channel username or IDd

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Hello! I am your Telegram bot.");
  bot.sendMessage(chatId, "Please tell me your name:");

  bot.once("message", (nameMsg) => {
    const name = nameMsg.text;

    bot.sendMessage(
      chatId,
      `Nice to meet you, ${name}! Please share your contact information:`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Share Contact",
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
        `Thank you for sharing your contact! Your phone number is ${phoneNumber}.`
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
