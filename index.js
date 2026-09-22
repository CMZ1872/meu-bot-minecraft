const mineflayer = require('mineflayer');
const http = require('http');

// Cria uma página web falsa para o Render não desligar o bot
http.createServer((req, res) => res.end("Bot Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'florestgames.aternos.me', // <<< COLOQUE O IP DO SEU SERVIDOR AQUI
  port: 25565,                         
  username: 'BotFixoAFK',              
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log("Bot entrou no servidor!");
    setInterval(() => {
      if (bot && bot.entity) {
        // Gira a cabeça a cada 15 segundos para evitar o anti-AFK
        bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2);
      }
    }, 15000); 
  });

  bot.on('end', (reason) => {
    console.log(`Desconectado: ${reason}. Reconectando em 15s...`);
    setTimeout(iniciarBot, 15000);
  });

  bot.on('error', (err) => console.log(`Erro: ${err.message}`));
}

iniciarBot();
