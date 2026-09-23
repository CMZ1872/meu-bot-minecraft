const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end("Bot Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'florestgames.aternos.me', 
  username: 'BotFixoAFK',
  skipValidation: true
};

let bot;

function iniciarBot() {
  // Se já existir uma instância do bot rodando na memória, limpa ela totalmente antes
  if (bot) {
    try {
      bot.quit(); 
    } catch(e) {}
    bot = null;
  }

  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot entrou e estabilizou no servidor com sucesso!');
  });

  // RESOLVENDO O LOOP: Força o bot a se destruir totalmente antes de tentar ligar de novo
  bot.on('end', (reason) => {
    console.log(`O bot desconectou de forma limpa: ${reason}.`);
    
    try {
      bot.quit(); // Garante o fechamento total da conexão velha
    } catch(e) {}
    bot = null;

    console.log('Aguardando 15 segundos para abrir uma nova conexão limpa...');
    setTimeout(iniciarBot, 15000); // Aumentamos para 15s para dar tempo da Aternos liberar o slot do IP
  });

  bot.on('error', (err) => {
    console.log("Erro de rede tratado:", err.message);
    try { bot.quit(); } catch(e) {}
    bot = null;
  });
}

iniciarBot();
