const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end("Bot 1 Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'bluewhiting.aternos.host', // Verifique se o seu IP dinâmico atual é esse
  port: 30660,                      // Verifique se a sua porta atual é essa
  username: 'BotFixoAFK'           // Coloque o nome exato que você desbaniu
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log("Bot entrou! Movendo para estabilizar...");
    
    // ANTI-KICK DE ENTRADA: Faz o bot pular uma vez assim que nasce para a Aternos não chutar
    setTimeout(() => {
      if (bot) bot.setControlState('jump', true);
      setTimeout(() => { if (bot) bot.setControlState('jump', false); }, 500);
    }, 2000);

    // Ciclo Anti-AFK contínuo (Gira a cabeça a cada 10 segundos)
    setInterval(() => {
      if (bot && bot.entity) {
        bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2);
      }
    }, 10000); 
  });

  bot.on('end', (reason) => {
    console.log(`Desconectado: ${reason}. Reconectando em 10s...`);
    setTimeout(iniciarBot, 10000);
  });

  bot.on('error', (err) => console.log(`Erro: ${err.message}`));
}

iniciarBot();
