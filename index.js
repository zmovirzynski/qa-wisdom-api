const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const PORT = process.env.PORT || 3000;

const qaWisdom = [
    "Your pipeline is only green because you forgot to run the real tests.",
    "High code coverage does not guarantee quality.",
    "Debugging is the art of having conversations with bugs.",
    "The most expensive bug is the one found by the customer.",
    "Write tests that fail for the right reasons.",
    "A feature without monitoring is a ghost feature.",
    "An automated test that never runs is not a test.",
    "If you haven't tested it in production, you haven't really tested it.",
    "The best bug is the one that never happens.",
    "Quality is never an accident; it is always the result of intelligent effort.",
    "Flaky tests are like unreliable friends: they only show up when they want.",
    "A broken CI/CD pipeline is like cold coffee: nobody wants it.",
    "Rollback should be plan B, never plan A.",
    "Logs are love letters to your future self.",
    "Performance without monitoring is shooting in the dark.",
    "Tests are not just to prove code works, but to prove it fails gracefully.",
    "Automation without purpose is just noise.",
    "Observability turns unknown failures into known stories.",
    "The faster the feedback, the cheaper the fix.",
    "You don’t get quality by adding tests at the end — you design it from the start.",
    "A green build should give confidence, not complacency.",
    "Every failing test is a chance to learn about your system.",
    "A pipeline is not done until it tells you when things break.",
    "Resilience is tested when everything else is failing.",
    "Documentation might lie, but tests tell the truth."
  ];
  
function getRandomWisdom() {
  return qaWisdom[Math.floor(Math.random() * qaWisdom.length)];
}

function generateBadge(text, width = 600, height = 100) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#2E3440');
  gradient.addColorStop(1, '#3B4252');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  ctx.strokeStyle = '#5E81AC';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  
  ctx.fillStyle = '#ECEFF4';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > width - 40 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  const lineHeight = 20;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });
  
  return canvas.toBuffer('image/png');
}

app.get('/', (req, res) => {
  res.json({
    message: 'QA Wisdom API',
    endpoints: {
      '/wisdom': 'Get random QA wisdom (JSON)',
      '/badge': 'Get wisdom as PNG badge',
      '/badge?text=custom': 'Custom text badge'
    }
  });
});

app.get('/wisdom', (req, res) => {
  res.json({
    wisdom: getRandomWisdom(),
    timestamp: new Date().toISOString()
  });
});

app.get('/badge', (req, res) => {
  const customText = req.query.text;
  const wisdom = customText || getRandomWisdom();
  
  const badge = generateBadge(wisdom);
  
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  res.send(badge);
});

app.listen(PORT, () => {
  console.log(`QA Wisdom API running on port ${PORT}`);
  console.log(`Badge endpoint: http://localhost:${PORT}/badge`);
});