# QA Wisdom API

A small API that serves short QA wisdom quotes.  
Useful for adding dynamic badges or random insights about testing and quality to your README or projects.

## Features

- Random QA wisdom in JSON
- Auto-generated PNG badges
- Custom text badges (`?text=your+message`)
- Easy to deploy with Vercel

## Endpoints

- `GET /` - API info
- `GET /wisdom` - Random QA wisdom (JSON)
- `GET /badge` - Random wisdom as PNG badge
- `GET /badge?text=custom` - Custom text badge

## Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Use the URL in your README!

The badge updates every time someone visits your README!