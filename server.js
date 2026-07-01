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
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
  :root{--cream:#FBFAF5;--ink:#1B3A6E;--muted:rgba(27,58,110,.55);--line:rgba(27,58,110,.14);--coral:#FF7A59;--wiese:#2BB673}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{height:100%}
  body{background:var(--cream);font-family:'Plus Jakarta Sans',-apple-system,sans-serif;color:var(--ink);display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
  .gate{width:100%;max-width:420px;text-align:center}
  .brand{display:flex;flex-direction:column;align-items:center;gap:16px;margin-bottom:36px}
  .brand svg{height:30px;color:var(--ink);display:block}
  .bar{position:relative;width:132px;height:3px;border-radius:3px;background:rgba(27,58,110,.12);overflow:hidden}
  .bar::after{content:'';position:absolute;top:0;left:0;bottom:0;width:42%;border-radius:3px;background:linear-gradient(90deg,var(--ink),var(--wiese));animation:load 1.5s ease-in-out infinite}
  @keyframes load{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}
  .eyebrow{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
  h1{font-weight:800;font-size:34px;line-height:1.05;letter-spacing:-.035em;margin-bottom:10px}
  h1 .c{color:var(--coral)}
  .lead{font-size:15px;color:var(--muted);margin-bottom:28px;line-height:1.5}
  form{text-align:left}
  label{display:block;font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--muted);margin-bottom:8px}
  input{width:100%;background:#fff;border:1.5px solid var(--line);border-radius:14px;font-family:inherit;font-size:16px;font-weight:500;color:var(--ink);padding:15px 16px;transition:border-color .16s,box-shadow .16s}
  input:focus{outline:none;border-color:var(--wiese);box-shadow:0 0 0 4px rgba(43,182,115,.14)}
  button{width:100%;margin-top:16px;background:var(--coral);color:#fff;border:none;border-radius:100px;padding:16px;font-family:inherit;font-weight:600;font-size:15px;letter-spacing:-.01em;cursor:pointer;transition:transform .12s,filter .18s}
  button:hover{filter:brightness(1.05);transform:translateY(-1px)}
  .err{background:rgba(255,122,89,.12);color:#c2410c;font-size:13px;font-weight:600;padding:11px 14px;border-radius:12px;margin-bottom:18px;text-align:center}
  footer{margin-top:34px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  </style></head>
  <body>
  <div class="gate">
    <div class="brand"><svg viewBox="0 0 605 114"><g fill="currentColor">${MARK}</g></svg><div class="bar"></div></div>
    <div class="eyebrow">White-Label Setup · für ioki</div>
    <h1>Willkommen <span class="c">zurück.</span></h1>
    <p class="lead">Melde dich an, um das White-Label-Setup für die ioki-App zu öffnen.</p>
    <form method="post" action="/login">
      ${err ? '<div class="err">'+err+'</div>' : ''}
      <label for="pw">Passwort</label>
      <input id="pw" name="password" type="password" autofocus autocomplete="current-password">
      <button type="submit">Anmelden</button>
    </form>
    <footer>vioom · free-agents.io</footer>
  </div>
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
