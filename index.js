const express = require('express');
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
  "If you havent tested it in production, you haven't really tested it.",
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
  "You dont get quality by adding tests at the end. You design it from the start.",
  "A green build should give confidence, not complacency.",
  "Every failing test is a chance to learn about your system.",
  "A pipeline is not done until it tells you when things break.",
  "Resilience is tested when everything else is failing.",
  "Documentation might lie, but tests tell the truth."
];

function getRandomWisdom() {
  return qaWisdom[Math.floor(Math.random() * qaWisdom.length)];
}

function wrapText(text, maxCharsPerLine = 60) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxCharsPerLine) {
      lines.push(line);
      line = w;
    } else {
      line = (line ? line + ' ' : '') + w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function generateSVG(text, opts = {}) {
  const {
    width = 600,
    paddingX = 20,
    paddingY = 16,
    lineHeight = 20,
    fontSize = 14,
    fontFamily = 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial'
  } = opts;

  const lines = wrapText(text, 60);
  const contentHeight = lines.length * lineHeight;
  const height = contentHeight + paddingY * 2;

  const svg = `
	<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="QA Wisdom">
	  <defs>
		<linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
		  <stop offset="0%" stop-color="#2E3440"/>
		  <stop offset="100%" stop-color="#3B4252"/>
		</linearGradient>
	  </defs>
	  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bg)" rx="8" ry="8" stroke="#5E81AC" stroke-width="1"/>
	  <g fill="#ECEFF4" font-family="${fontFamily}" font-size="${fontSize}" font-weight="600">
		${lines.map((line, i) =>
		  `<text x="${width / 2}" y="${paddingY + (i * lineHeight) + fontSize}" text-anchor="middle">${escapeXml(line)}</text>`
		).join('\n    ')}
	  </g>
	</svg>`;
	  return svg;
	}

function escapeXml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

app.get('/', (req, res) => {
  res.json({
    message: 'QA Wisdom API',
    endpoints: {
      '/wisdom': 'Get random QA wisdom (JSON)',
      '/badge': 'Get wisdom as SVG badge',
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
  const svg = generateSVG(wisdom);

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(svg);
});

app.listen(PORT, () => {
  console.log(`QA Wisdom API running on port ${PORT}`);
});
