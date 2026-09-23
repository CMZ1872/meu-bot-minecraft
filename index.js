const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => res.end("Bot Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'florestgames.aternos.me', // Seu IP do começo que funcionava
  username: 'BotFixoAFK',
  skipValidation: true             // Ignora validação pesada que causa lag de login
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  // FIX DEFINTIVO DOS 5 SEGUNDOS (Fase de Configuração)
  // Força o bot a fingir que é um cliente oficial configurado logo no primeiro milissegundo
  bot.on('packet', (data, metadata) => {
    if (metadata.name === 'configuration_requested' || metadata.name === 'bundle_delimiter') {
      try {
        bot._client.write('settings', {
          locale: 'pt_br',
          viewDistance: 4,
          chatFlags: 0,
          chatColors: true,
          skinParts: 127,
          mainHand: 1,
          enableTextFiltering: false,
          enableServerListing: true
        });
      } catch (e) {}
    }
  });

  bot.on('spawn', () => {
    console.log('Bot entrou e estabilizou no servidor com sucesso!');
    
    // Pequeno pulo de 1 segundo após entrar para garantir o registro do jogador
    setTimeout(() => {
      if (bot) {
        bot.setControlState('jump', true);
        setTimeout(() => { if (bot) bot.setControlState('jump', false); }, 400);
      }
    }, 1000);
  });

  bot.on('end', (reason) => {
    console.log(`O bot desconectou: ${reason}. Tentando reconectar em 10 segundos...`);
    setTimeout(iniciarBot, 10000);
  });

  bot.on('error', (err) => console.log("Erro de rede tratado:", err.message));
}

iniciarBot();
