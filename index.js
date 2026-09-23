const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end("Bot 1 Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'bluewhiting.aternos.host', 
  port: 30660,                      
  username: 'BotFixoAFK',
  checkTimeoutInterval: 60 * 1000, // Aumenta o tempo de tolerância de lag para 1 minuto
  viewDistance: 'tiny'
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  // Força o bot a responder os pacotes de "estou vivo" (KeepAlive) na hora para não dar socketClosed
  bot.on('packet', (data, metadata) => {
    if (metadata.name === 'keep_alive') {
      bot._client.write('keep_alive', {
        keepAliveId: data.keepAliveId
      });
    }
  });

  bot.on('spawn', () => {
    console.log("Bot 1 estabilizado e conectado com sucesso!");
    
    // Pequeno movimento mecânico para o servidor registrar a presença física dele
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('sneak', true);
        setTimeout(() => { if (bot) bot.setControlState('sneak', false); }, 500);
      }
    }, 30000); // Agacha a cada 30 segundos
  });

  bot.on('end', (reason) => {
    console.log(`Desconectado por: ${reason}. Reconectando em 10s...`);
    setTimeout(iniciarBot, 10000);
  });

  bot.on('error', (err) => console.log(`Erro tratado: ${err.message}`));
}

iniciarBot();
