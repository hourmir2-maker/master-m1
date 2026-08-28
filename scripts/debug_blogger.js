const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { ARTICLES_ROADMAP } = require('../src/lib/articles-roadmap.ts');

const envPath = path.join(__dirname, '..', '.env.local');
const env = dotenv.parse(fs.readFileSync(envPath));

async function debugArticle9() {
  const topic = ARTICLES_ROADMAP[9];
  const authRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.BLOGGER_CLIENT_ID,
      client_secret: env.BLOGGER_CLIENT_SECRET,
      refresh_token: env.BLOGGER_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });
  const authData = await authRes.json();

  // Test 1: with full blog HTML
  const prompt = `เขียนสรุปบทเรียนและสูตรลัดเรื่องนี้สำหรับเด็ก ป.6: ${topic.title}`;
  const gemRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  const gemData = await gemRes.json();
  const aiCaption = gemData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || topic.summaryConcept;

  const cleanLabels = [
    topic.subject,
    'ONET 2570',
    'สรุปสูตรลัด',
    'MASTER M1',
    ...(topic.keywords || [])
  ]
    .map(l => l.replace(/[^a-zA-Z0-9\u0E00-\u0E7F\s_-]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  console.log('Labels to send:', cleanLabels);

  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${env.BLOGGER_BLOG_ID}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authData.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      kind: 'blogger#post',
      title: topic.title,
      content: `<div><h2>${topic.title}</h2><p>${topic.summaryConcept}</p><p>${aiCaption}</p></div>`,
      labels: cleanLabels
    })
  });

  const data = await res.json();
  console.log('Response Status:', res.status);
  console.log('Response Data:', data);
}

debugArticle9();
