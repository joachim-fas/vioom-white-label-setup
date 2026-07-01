const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const path = require('path');
const app = express();

const PASSWORD = process.env.APP_PASSWORD || 'vioom2026';
const SECRET   = process.env.SESSION_SECRET || 'vioom-wl-secret-change-me';
const TOKEN    = crypto.createHash('sha256').update(PASSWORD + '|' + SECRET).digest('hex');
const MARK = '<path fill="currentColor" d="M554.942 0c32.475 0 50.029 24.137 50.029 53.978v56.611h-21.723v-53.1c0-19.529-9.655-36.644-29.842-36.644-19.528 0-29.402 16.457-29.402 36.205v53.539h-21.723v-53.54c0-19.747-9.874-36.204-29.842-36.204-20.187 0-29.183 17.115-29.183 36.644v53.1h-21.723V54.197c0-30.06 17.115-54.197 49.37-54.197 21.504 0 37.083 10.971 42.568 27.647C519.396 10.971 534.536 0 554.942 0Z"></path> <path fill="currentColor" fill-rule="evenodd" d="M341.613.44c32.474 0 57.05 25.454 57.05 56.173-.001 31.157-24.796 56.608-57.05 56.609-18.398 0-34.401-8.171-44.818-20.919H280.2c-10.332 12.747-26.208 20.919-44.481 20.919-32.474 0-57.489-25.452-57.49-56.61 0-30.938 25.235-56.172 57.49-56.172 19.56 0 36.25 9.237 46.434 23.294h12.729C305.229 9.638 322.141.44 341.613.44Zm0 20.405c-14.802 0-27.127 8.731-32.649 21.175h-40.993c-5.448-12.443-17.611-21.175-32.252-21.175-20.187 0-35.767 16.238-35.767 35.986 0 19.529 15.58 35.765 35.767 35.765 13.628 0 25.108-7.566 31.025-18.577h43.464c5.997 11.012 17.627 18.577 31.405 18.577 19.967 0 35.325-16.237 35.325-35.765 0-19.747-15.358-35.985-35.325-35.986Z" clip-rule="evenodd"></path> <path fill="currentColor" d="M132.31 3.072h21.723v107.517H132.31V3.072ZM34.669 96.546 0 3.072h23.259l31.597 87.55c.219 1.097 1.097 2.194 2.413 2.194 1.536 0 2.414-1.097 2.633-2.195L91.5 3.072h23.04L79.65 96.547c-4.169 11.19-11.849 16.895-22.601 16.895-10.094 0-18.432-5.705-22.601-16.895Z"></path>';

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
function authed(req){ return req.cookies && req.cookies.vioom_auth === TOKEN; }
function loginPage(err){
  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"><title>vioom · White-Label Setup</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
  :root{--cream:#FBFBF7;--ink:#0B0B0C;--muted:rgba(11,11,12,.55);--line:rgba(11,11,12,.12);--night:#1B3A6E;--wiese:#2BB673}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{height:100%}
  body{background:var(--cream);font-family:'DM Sans',system-ui,sans-serif;color:var(--ink);display:flex;flex-direction:column;min-height:100vh}
  .top{display:flex;align-items:center;gap:11px;padding:20px 26px}
  .prompt{font:600 15px 'JetBrains Mono',monospace;color:var(--ink)}
  .top svg{height:15px;color:var(--night);display:block}
  .top .sep{color:var(--line);font-weight:400}
  .top .sys{font:600 11px 'JetBrains Mono',monospace;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
  main{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 26px}
  .wrap{width:100%;max-width:560px}
  .eyebrow{font:600 11px 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:20px}
  h1{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:44px;line-height:1.05;letter-spacing:-.02em;margin-bottom:8px}
  h1 .g{color:var(--wiese)}
  .lead{font-size:15px;color:var(--muted);margin-bottom:30px;max-width:420px}
  .field{position:relative;border-bottom:1.5px solid var(--line);transition:border-color .18s}
  .field:focus-within{border-color:var(--wiese)}
  .field label{position:absolute;left:0;top:11px;font:600 11px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);pointer-events:none}
  input{width:100%;background:transparent;border:none;font-family:'DM Sans',sans-serif;font-size:19px;color:var(--ink);padding:34px 0 13px}
  input:focus{outline:none}
  .row{display:flex;align-items:center;gap:16px;margin-top:24px}
  button{background:var(--night);color:#fff;border:none;border-radius:10px;padding:14px 26px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:transform .12s,background .18s}
  button:hover{background:#16305c;transform:translateY(-1px)}
  .hint{font:500 12px 'JetBrains Mono',monospace;color:var(--muted)}
  .err{display:inline-flex;align-items:center;gap:8px;background:rgba(154,91,0,.09);color:#9a5b00;font:600 12px 'JetBrains Mono',monospace;padding:8px 12px;border-radius:8px;margin-bottom:22px}
  .err::before{content:'!';display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;background:#9a5b00;color:#fff;font-size:10px}
  footer{display:flex;justify-content:space-between;padding:20px 26px;font:500 11px 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
  @media(max-width:560px){h1{font-size:34px}}
  </style></head>
  <body>
  <header class="top"><span class="prompt">&gt;_</span><svg viewBox="0 0 605 114"><g fill="currentColor">${MARK}</g></svg><span class="sep">/</span><span class="sys">White-Label Setup</span></header>
  <main><form class="wrap" method="post" action="/login">
    <div class="eyebrow">vioom · für ioki</div>
    <h1>Willkommen<br><span class="g">zurück.</span></h1>
    <p class="lead">Bitte melde dich an, um das White-Label-Setup für die ioki-App zu öffnen.</p>
    ${err ? '<div class="err">'+err+'</div>' : ''}
    <div class="field"><label for="pw">Passwort</label>
    <input id="pw" name="password" type="password" autofocus autocomplete="current-password"></div>
    <div class="row"><button type="submit">Anmelden</button><span class="hint">&#8629; Enter</span></div>
  </form></main>
  <footer><span>vioom · White-Label Setup</span><span>free-agents.io</span></footer>
  </body></html>`;
}
app.get('/login', (req, res) => { if (authed(req)) return res.redirect('/'); res.type('html').send(loginPage('')); });
app.post('/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    res.cookie('vioom_auth', TOKEN, { httpOnly: true, sameSite: 'lax', maxAge: 1000*60*60*24*30 });
    return res.redirect('/');
  }
  res.type('html').send(loginPage('Falsches Passwort.'));
});
app.get('/logout', (req, res) => { res.clearCookie('vioom_auth'); res.redirect('/login'); });
app.use((req, res, next) => { if (authed(req)) return next(); res.redirect('/login'); });
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'app.html')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('vioom White-Label Setup läuft auf Port ' + PORT));
