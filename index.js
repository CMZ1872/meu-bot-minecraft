const mineflayer = require('mineflayer');
const http = require('http');

// Mantém o Render vivo
http.createServer((req, res) => res.end("Bot Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'florestgames.aternos.me', // <<< VOLTE PARA O SEU IP NORMAL DO COMEÇO!
  username: 'BotFixoAFK'           // Mude para o nick que estava funcionando antes
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
