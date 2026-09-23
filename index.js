const mineflayer = require('mineflayer');
const http = require('http');

// Cria uma página web falsa para o Render não desligar o bot
http.createServer((req, res) => res.end("Bot Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'bluewhiting.aternos.host:30660', // Coloque o IP do primeiro servidor
  port: 30660,                                    // Porta do primeiro servidor
  username: 'BotFixoAFK'                          // SEM A LINHA VERSION!
};


let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
    console.log("Bot entrou no servidor!");
    
    // FAZ O BOT SE TELEPORTAR PARA A COORDENADA EXATA ASSIM QUE ENTRAR
    // Altere os números abaixo para a coordenada X, Y e Z do seu cantinho
    bot.chat('/tp BotFixoAFK -74 -54 85'); 

    setInterval(() => {
      if (bot && bot.entity) {
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
