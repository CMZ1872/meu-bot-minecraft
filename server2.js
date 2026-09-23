const mineflayer = require('mineflayer');
const http = require('http');

// Porta web para o Render (usando a porta que o Render vai dar para este segundo bot)
http.createServer((req, res) => res.end("Bot 2 Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'caducaio.aternos.me', // <<< COLOQUE O IP DO SEU SEGUNDO SERVIDOR AQUI
  port: 29046,                         
  username: 'BotFixoAFK2',
  version: '26.2'// Mude o nome se quiser diferenciar do primeiro
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log("Bot 2 entrou no servidor!");
    setInterval(() => {
      if (bot && bot.entity) {
        bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2);
      }
    }, 15000); 
  });

  bot.on('end', (reason) => {
    console.log(`Bot 2 desconectado: ${reason}. Reconectando em 15s...`);
    setTimeout(iniciarBot, 15000);
  });

  bot.on('error', (err) => console.log(`Erro no Bot 2: ${err.message}`));
}

iniciarBot();
