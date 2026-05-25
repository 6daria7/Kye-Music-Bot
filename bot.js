const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🎵 MusicBot Pro!\n\nОтправьте название трека для поиска.', 
    Markup.inlineKeyboard([
      [Markup.button.switchToCurrentChat('🔍 Поиск', '')]
    ])
  );
});

bot.on('inline_query', (ctx) => {
  const q = ctx.inlineQuery.query;
  if (!q || q.length < 2) return ctx.answerInlineQuery([]);
  ctx.answerInlineQuery([{
    type: 'article', id: '1', title: `🎵 ${q}`, 
    description: 'Нажмите для поиска музыки',
    input_message_content: { message_text: `🎵 Ищем: ${q}` },
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.url('▶️ YouTube', `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}+music`)],
      [Markup.button.url('🎶 YouTube Music', `https://music.youtube.com/search?q=${encodeURIComponent(q)}`)]
    ])
  }], { cache_time: 300 });
});

bot.on('text', (ctx) => {
  const q = ctx.message.text;
  if (q.startsWith('/')) return;
  ctx.reply(`🎵 Поиск: ${q}`, 
    Markup.inlineKeyboard([
      [Markup.button.url('▶️ YouTube', `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}+official+audio`)]
    ])
  );
});

bot.launch();
console.log('✅ MusicBot Pro запущен!');
