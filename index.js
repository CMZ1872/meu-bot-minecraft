const mineflayer = require('mineflayer');
const http = require('http');

// Cria um servidor web em uma porta limpa e alternativa
const server = http.createServer((req, res) => res.end("Bot Online"));
server.listen(process.env.PORT || 10000, '0.0.0.0');

const botOptions = {
  host: 'bluewhiting.aternos.host', // Seu IP Dinâmico atualizado
  port: 30660,                      // Sua porta de 5 números atualizada
  username: 'BotFixoAFK'
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`Sucesso: ${bot.username} entrou no servidor!`);
    setInterval(() => {
      if (bot && bot.entity) {
        bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2);
      }
    }, 12000); 
  });

  bot.on('end', (reason) => {
    console.log(`Conexão encerrada: ${reason}. Tentando novamente em 20s...`);
    setTimeout(iniciarBot, 20000);
  });

  bot.on('error', (err) => console.log(`Erro de rede: ${err.message}`));
}

iniciarBot();
