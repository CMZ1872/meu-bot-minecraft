const mineflayer = require('mineflayer');
const http = require('http');

// Porta viva para o Render não dar erro
http.createServer((req, res) => res.end("Bot 1 Online")).listen(process.env.PORT || 3000);

const botOptions = {
  host: 'bluewhiting.aternos.host', // Seu IP Dinâmico atual
  port: 30660,                      // Sua porta atual
  username: 'BotFixoAFK',          
  hideErrors: true,                 // Esconde logs repetitivos
  viewDistance: 'tiny'              // COMPATIBILIDADE 26.2: Força o pacote de renderização leve
};

let bot;

function iniciarBot() {
  bot = mineflayer.createBot(botOptions);

  // Trava a física logo no carregamento para evitar kick por movimento inválido
  bot.physics = null;

  bot.on('login', () => {
    console.log("Fase de login bem-sucedida. Aguardando spawn...");
  });

  bot.on('spawn', () => {
    console.log("Bot 1 entrou e se estabilizou no servidor!");
    
    // Pequeno delay de segurança para garantir a sincronia dos blocos
    setTimeout(() => {
      if (bot) {
        // Envia um comando leve no chat a cada 3 minutos para a Aternos ver atividade real
        setInterval(() => {
          if (bot) bot.chat('/me está ativo.');
        }, 180000);
      }
    }, 3000);
  });

  bot.on('end', (reason) => {
    console.log(`Desconectado por: ${reason}. Reconectando em 15s...`);
    setTimeout(iniciarBot, 15000);
  });

  bot.on('error', (err) => {
    // Ignora o erro comum de timeout interno do protocolo
    if (err.message.includes('timeout') || err.message.includes('protocol')) return;
    console.log(`Aviso de rede tratado: ${err.message}`);
  });
}

// Inicia o robô
iniciarBot();
