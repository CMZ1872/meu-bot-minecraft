const mineflayer = require('mineflayer');

const botOptions = {
  host: 'florestgames.aternos.me', // IP do começo que funcionava
  username: 'BotFixoAFK'
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot entrou no servidor com sucesso!');
  });

  bot.on('end', (reason) => {
    console.log(`O bot desconectou: ${reason}`);
    console.log('Tentando reconectar em 10 segundos...');
    setTimeout(iniciarBot, 10000);
  });

  bot.on('error', (err) => console.log(err));
}

iniciarBot();
