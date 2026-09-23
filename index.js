const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end("Bot 1 Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'bluewhiting.aternos.host', 
  port: 30660,                      
  username: 'BotFixoAFK'           
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  // DESATIVA A FÍSICA PARA EVITAR KICK DO ANTI-CHEAT DA ATERNOS
  bot.physics = null; 

  bot.on('spawn', () => {
    console.log("Bot se estabilizou no servidor.");
    
    // Envia uma mensagem vazia no chat para confirmar atividade a cada 4 minutos
    setInterval(() => {
      if (bot) bot.chat('/me está cuidando do spawn.');
    }, 240000);
  });

  bot.on('end', (reason) => {
    console.log(`Desconectado por: ${reason}. Reconectando em 10s...`);
    setTimeout(iniciarBot, 10000);
  });

  bot.on('error', (err) => console.log(`Erro tratado: ${err.message}`));
}

iniciarBot();
