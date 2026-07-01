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
  <meta name="viewport" content="width=device-width, initial-scale=1"><title>vioom · Login</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
  <style>*{margin:0;padding:0;box-sizing:border-box}body{background:#FBFAF5;font-family:'Plus Jakarta Sans',sans-serif;color:#1B3A6E;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{background:#fff;border:1px solid rgba(27,58,110,.12);border-radius:16px;padding:38px 34px;width:360px;box-shadow:0 12px 40px rgba(27,58,110,.10)}
  .card svg{height:30px;color:#1B3A6E;display:block;margin-bottom:24px}
  .ey{font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:rgba(27,58,110,.55);margin-bottom:18px}
  label{font-size:12.5px;font-weight:600;display:block;margin-bottom:7px}
  input{width:100%;font:500 14px 'Plus Jakarta Sans';border:1px solid rgba(27,58,110,.16);border-radius:8px;padding:11px 12px;color:#1B3A6E}
  input:focus{outline:none;border-color:#2BB673;box-shadow:0 0 0 3px rgba(43,182,115,.14)}
  button{width:100%;margin-top:16px;background:#1B3A6E;color:#fff;border:none;border-radius:8px;padding:12px;font:600 14px 'Plus Jakarta Sans';cursor:pointer}
  .err{background:#fdeccb;color:#9a5b00;font-size:12.5px;padding:9px 11px;border-radius:7px;margin-bottom:14px}</style></head>
  <body><form class="card" method="post" action="/login">
  <svg viewBox="0 0 605 114"><g fill="currentColor">${MARK}</g></svg>
  <div class="ey">White-Label Setup · für ioki</div>
  ${err ? '<div class="err">'+err+'</div>' : ''}
  <label for="pw">Passwort</label>
  <input id="pw" name="password" type="password" autofocus autocomplete="current-password">
  <button type="submit">Anmelden</button></form></body></html>`;
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
