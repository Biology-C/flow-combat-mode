// ═══════════════════════════════════════════════
//  Flow Combat Mode — script.js
// ═══════════════════════════════════════════════

const SENTENCES = [
  '用自然輸入法輸入很自然。考試都考一百分！',
  '愈來愈多老師要求學生用簡報軟體做口頭報告',
  '聽眾不會在乎你有時看看講稿或小抄',
  '投影片上只留下最基本最重要的資訊',
  '沒有色彩變化的投影片真的很無趣',
  '運用動畫音效一定要謹慎寧缺毋濫',
  '決定簡報成功與否不是做了多少張投影片',
  '字體不花俏不多變聽眾才能一目了然',
  '簡報設計簡潔化就可避免窘況發生',
  '把每個條列重點分開各做一張投影片',
];

const MD_LESSONS = [
  {
    name: '一級標題',
    syntax: '# 標題文字',
    desc: '在文字前加 <code>#</code> 和一個空格，建立最大的一級標題。',
    hint: 'Tip：# 號後面必須有一個空格才能生效',
    target: '# 心流打字體驗',
  },
  {
    name: '二級標題',
    syntax: '## 標題文字',
    desc: '使用 <code>##</code> 建立二級標題，比一級小一號，常用於章節名稱。',
    hint: 'Tip：兩個 # 號後面加空格',
    target: '## 功能特色介紹',
  },
  {
    name: '三級標題',
    syntax: '### 標題文字',
    desc: '使用 <code>###</code> 建立三級標題，常用於小節或項目標題。',
    hint: 'Tip：三個 # 號後面加空格',
    target: '### 使用方式說明',
  },
  {
    name: '粗體文字',
    syntax: '**文字**',
    desc: '用兩個星號 <code>**</code> 包住文字，讓它顯示為粗體，突出重要資訊。',
    hint: 'Tip：前後各兩個星號，中間不能有空格',
    target: '這是 **重點文字** 的粗體範例',
  },
  {
    name: '斜體文字',
    syntax: '*文字*',
    desc: '用一個星號 <code>*</code> 包住文字，讓它顯示為斜體，用於強調語氣。',
    hint: 'Tip：前後各一個星號，注意不要打成兩個',
    target: '這是 *斜體強調* 的效果展示',
  },
  {
    name: '無序列表',
    syntax: '- 項目文字',
    desc: '在行首加 <code>-</code> 和空格，建立無序列表（圓點項目清單）。',
    hint: 'Tip：減號後面一定要有一個空格',
    target: '- 開始你的心流打字旅程',
  },
  {
    name: '有序列表',
    syntax: '1. 項目文字',
    desc: '在行首加數字和句點 <code>1.</code>，建立有順序的編號清單。',
    hint: 'Tip：數字後是英文句點，再加一個空格',
    target: '1. 設定本次寫作主題',
  },
  {
    name: '引用區塊',
    syntax: '> 引用文字',
    desc: '在行首加 <code>&gt;</code> 建立引用區塊，常用於名言、重要引述。',
    hint: 'Tip：> 符號後面加一個空格',
    target: '> 讓每次敲擊都充滿意義',
  },
  {
    name: '行內程式碼',
    syntax: '`程式碼`',
    desc: '用反引號 <code>`</code> 包住指令或程式碼片段，反引號在鍵盤 Esc 下方、數字 1 左邊。',
    hint: 'Tip：找到鍵盤左上角的反引號鍵 `',
    target: '按下 `Enter` 鍵送出訊息',
  },
  {
    name: '水平分隔線',
    syntax: '---',
    desc: '單獨一行輸入三個減號 <code>---</code>，建立水平分隔線，用於分隔段落。',
    hint: 'Tip：只需三個減號，單獨一行，不能加其他文字',
    target: '---',
  },
];

// ── DOM ──
const hiddenInput      = document.getElementById('hidden-input');
const inputDisplay     = document.getElementById('input-display');
const testInputDisplay = document.getElementById('test-input-display');
const targetDisplay    = document.getElementById('target-display');
const roller           = document.getElementById('roller');
const rollerPrev       = document.getElementById('roller-prev');
const rollerNext       = document.getElementById('roller-next');
const freeArea         = document.getElementById('free-area');
const comboValueEl     = document.getElementById('combo-value');
const comboBar         = document.getElementById('combo-bar');
const scoreValueEl     = document.getElementById('score-value');
const accuracyEl       = document.getElementById('accuracy-value');
const accuracyWrap     = document.getElementById('accuracy-wrap');
const hudEl            = document.getElementById('hud');
const btnMode          = document.getElementById('btn-mode');
const btnCopy          = document.getElementById('btn-copy');
const btnRoller        = document.getElementById('btn-roller');
const btnTheme         = document.getElementById('btn-theme');
const btnMute          = document.getElementById('btn-mute');
const btnPrev          = document.getElementById('btn-prev');
const btnNext          = document.getElementById('btn-next');
const typingArea       = document.getElementById('typing-area');
const completeMsg      = document.getElementById('complete-msg');
const sentenceCounter  = document.getElementById('sentence-counter');
const canvas           = document.getElementById('vfx');
const ctx              = canvas.getContext('2d');

// ZEN DOM
const zenOverlay       = document.getElementById('zen-overlay');
const zenBreathe       = document.getElementById('zen-breathe');
const zenRing          = document.getElementById('zen-ring');
const zenBreatheLabel  = document.getElementById('zen-breathe-label');
const zenBreatheCount  = document.getElementById('zen-breathe-count');
const zenScraper       = document.getElementById('zen-scraper');
const zenKeywordInput  = document.getElementById('zen-keyword-input');
const zenKeywordCount  = document.getElementById('zen-keyword-count');
const zenKeywordsDisp  = document.getElementById('zen-keywords-display');
const zenTimerWrap     = document.getElementById('zen-timer');
const zenTimerValue    = document.getElementById('zen-timer-value');
const btnZenTimerMode  = document.getElementById('btn-zen-timer-mode');
const zenTopicStep     = document.getElementById('zen-topic-step');
const zenTopicInput    = document.getElementById('zen-topic-input');
const zenTopicBar      = document.getElementById('zen-topic-bar');
const zenNotify        = document.getElementById('zen-notify');
const zenNotifyText    = document.getElementById('zen-notify-text');
const btnZenReport     = document.getElementById('btn-zen-report');
const btnZenDismiss    = document.getElementById('btn-zen-dismiss');
const zenReportOverlay = document.getElementById('zen-report');
const zenReportCanvas  = document.getElementById('zen-report-canvas');
const zenReportStats   = document.getElementById('zen-report-stats');
const btnZenReportClose = document.getElementById('btn-zen-report-close');
const btnZenEncrypt    = document.getElementById('btn-zen-encrypt');
const btnZenExport     = document.getElementById('btn-zen-export');
const btnZenExit       = document.getElementById('btn-zen-exit');

// MD DOM
const mdArea         = document.getElementById('md-area');
const mdLessonNumEl  = document.getElementById('md-lesson-num');
const mdLessonNameEl = document.getElementById('md-lesson-name');
const mdSyntaxBadge  = document.getElementById('md-syntax-badge');
const mdInstrDesc    = document.getElementById('md-instruction-desc');
const mdSyntaxEx     = document.getElementById('md-syntax-example');
const mdInstrHint    = document.getElementById('md-instruction-hint');
const mdPreview      = document.getElementById('md-preview');
const mdTargetDisp   = document.getElementById('md-target-display');
const mdInputDisp    = document.getElementById('md-input-display');
const btnMDPrev      = document.getElementById('btn-md-prev');
const btnMDNext      = document.getElementById('btn-md-next');

// ── State ──
let mode = 'FREE';
let combo = 0;
let score = 0;
let muted = false;
let totalCorrect = 0;
let totalTyped = 0;
let sentenceIdx = 0;
let mdLessonIdx = 0;
let currentTarget = '';
let prevText = '';
let composingText = '';
let isComposing = false;
let processTimer = null;
let lastCommittedValue = '';

// ZEN state
let zenPhase = 'idle';          // 'idle' | 'topic' | 'breathe' | 'scraper' | 'typing'
let zenKeywords = [];
let zenBreatheCycle = 0;
let zenTimerMode = 'stopwatch'; // 'stopwatch' | 'pomodoro'
let zenTimerSeconds = 0;
let zenTimerInterval = null;
let zenTopic = '';
const ZEN_POMODORO_TOTAL = 25 * 60;
const ZEN_NOTIFY_MINS = [10, 30, 60];
let zenNotifiedMins = new Set();

// ZEN Behavior Tracking
const zenTrack = {
  backspace_total: 0,
  backspace_map: [],       // { time: ms, pos: charIndex }
  input_velocity: [],      // { time: ms, wpm: number }
  startTime: 0,
  charTimestamps: [],      // timestamps of each character input
};

const COMBO_TIERS = [
  { min: 0,  color: '#6ea4d4', bwColor: '#4a90c4', mult: 1 },
  { min: 10, color: '#7ec4a3', bwColor: '#3a8a5a', mult: 2 },
  { min: 30, color: '#d4a76e', bwColor: '#b08030', mult: 4 },
];
const BASE_POINT = 10;
const MAX_PARTICLES = 200;

// ── Audio ──
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playTone(freq, dur, type = 'sine', vol = 0.08) {
  if (muted || !audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, audioCtx.currentTime);
  g.gain.setValueAtTime(vol, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000);
  o.connect(g).connect(audioCtx.destination);
  o.start(); o.stop(audioCtx.currentTime + dur / 1000);
}
function sfxCorrect()  { playTone(520, 30); }
function sfxWrong()    { playTone(200, 60, 'sawtooth', 0.06); }
function sfxError()    { playTone(150, 100, 'sawtooth', 0.06); }
function sfxUpgrade()  { playTone(880, 150, 'sine', 0.1); }
function sfxComplete() { playTone(660, 200); setTimeout(() => playTone(880, 300), 150); }

// ── Canvas (sized to container) ──
const fcmContainer = document.getElementById('fcm-container');
function resizeCanvas() {
  const rect = fcmContainer.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ── Particles ──
const particles = [];
function getParticle() {
  for (let i = 0; i < particles.length; i++) if (!particles[i].alive) return particles[i];
  if (particles.length < MAX_PARTICLES) { const p = { alive: false }; particles.push(p); return p; }
  return null;
}
function spawnParticles(x, y, count, color, spread = 80) {
  // 螢幕座標 → 容器相對座標
  const cr = fcmContainer.getBoundingClientRect();
  const cx = x - cr.left;
  const cy = y - cr.top;
  for (let i = 0; i < count; i++) {
    const p = getParticle(); if (!p) break;
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * spread + 20;
    Object.assign(p, { alive: true, x: cx, y: cy, vx: Math.cos(a)*s, vy: Math.sin(a)*s - 30,
      life: 1, decay: 0.02 + Math.random()*0.03, size: 2 + Math.random()*3, color });
  }
}
let lastFrame = 0;
function renderLoop(ts) {
  const dt = Math.min((ts - lastFrame) / 1000, 0.05); lastFrame = ts;
  ctx.clearRect(0, 0, canvas.width/devicePixelRatio, canvas.height/devicePixelRatio);
  for (const p of particles) {
    if (!p.alive) continue;
    p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 120*dt; p.life -= p.decay;
    if (p.life <= 0) { p.alive = false; continue; }
    ctx.globalAlpha = Math.min(p.life, 0.45);
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size*p.life, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);

// ── Combo / Score ──
function getTier() {
  for (let i = COMBO_TIERS.length - 1; i >= 0; i--)
    if (combo >= COMBO_TIERS[i].min) return COMBO_TIERS[i];
  return COMBO_TIERS[0];
}
function updateHUD() {
  comboValueEl.textContent = combo;
  scoreValueEl.textContent = score;
  comboBar.style.width = Math.min(combo/50, 1)*100 + '%';
  hudEl.classList.remove('combo-green', 'combo-gold');
  if (combo >= 30) hudEl.classList.add('combo-gold');
  else if (combo >= 10) hudEl.classList.add('combo-green');
  if (mode === 'TEST') {
    const acc = totalTyped === 0 ? 100 : Math.round((totalCorrect/totalTyped)*100);
    accuracyEl.textContent = acc + '%';
  }
}
function addCombo() {
  const prev = getTier(); combo++;
  const next = getTier();
  score += BASE_POINT * next.mult;
  if (next !== prev) sfxUpgrade();
  updateHUD();
}
function breakCombo() { combo = 0; updateHUD(); }

// ── Mode helpers ──
function isFreeLike() { return mode === 'FREE' || mode === 'ZEN'; }

// ── Shake ──
function shakeEl(el, cls) {
  el.classList.remove(cls); void el.offsetWidth;
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}
function shakeScreen() { shakeEl(typingArea, 'screen-shake'); }
function errorShake()  { shakeEl(typingArea, 'error-shake'); }

// ── Helpers ──
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function tierColor(tier) { return themeBW ? tier.bwColor : tier.color; }
function errColor() { return themeBW ? '#c04040' : errColor(); }
const PUNCT = new Set('。，！？；：、.!?,;:');

// 取得目前顯示區域的最後一個字元位置
function getLastCharPos(container) {
  const el = container || inputDisplay;
  const spans = el.querySelectorAll('.char');
  const span = spans.length > 0 ? spans[spans.length - 1] : null;
  if (span) { const r = span.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; }
  const r = el.getBoundingClientRect();
  return { x: r.left + 20, y: r.top + r.height/2 };
}

function getCharPosAt(container, idx) {
  const el = container || inputDisplay;
  const spans = el.querySelectorAll('.char');
  const span = spans[idx] || spans[spans.length - 1];
  if (span) { const r = span.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; }
  const r = el.getBoundingClientRect();
  return { x: r.left + 20, y: r.top + r.height/2 };
}

// ═════════════════════════════════════
//  FREE MODE
// ═════════════════════════════════════

let userScrolling = false;   // 使用者正在手動捲動
let scrollResetTimer = null;

// 取得 textarea 的選取範圍（轉為 codepoint index）
function getSelection() {
  const val = hiddenInput.value;
  const s = hiddenInput.selectionStart;
  const e = hiddenInput.selectionEnd;
  const startIdx = [...val.slice(0, s)].length;
  const endIdx = [...val.slice(0, e)].length;
  return { start: startIdx, end: endIdx };
}

function renderFree(committed, composing, autoScroll) {
  // ZEN: Markdown 渲染路徑（無逐字 span，更乾淨）
  if (mode === 'ZEN') {
    const before = committed.slice(0, hiddenInput.selectionStart);
    const after = committed.slice(hiddenInput.selectionStart);
    let html = renderMarkdown(before) + '<span class="cursor"></span>' + renderMarkdown(after);
    if (composing) {
      // 在游標位置插入組字預覽
      html = renderMarkdown(before) + '<span class="composing">' + esc(composing) + '</span><span class="cursor"></span>' + renderMarkdown(after);
    }
    // 換行轉 <br>
    html = html.replace(/\n/g, '<br>');
    inputDisplay.innerHTML = html;
    if (autoScroll && !userScrolling) scrollFreeToCenter();
    return;
  }

  // FREE: 逐字 span 渲染（支援粒子定位）
  const chars = [...committed];
  const sel = getSelection();
  const cursorPos = sel.start;
  let html = '';
  let cursorInserted = false;

  for (let i = 0; i < chars.length; i++) {
    if (i === cursorPos && sel.start === sel.end && !composing && !cursorInserted) {
      html += '<span class="cursor"></span>';
      cursorInserted = true;
    }
    if (chars[i] === '\n') { html += '<br>'; continue; }
    const selected = (sel.start !== sel.end && i >= sel.start && i < sel.end);
    const spawn = (i === chars.length - 1 && !composing) ? ' char-spawn' : '';
    const cls = selected ? 'char normal selected' + spawn : 'char normal' + spawn;
    html += '<span class="' + cls + '">' + esc(chars[i]) + '</span>';
  }
  if (composing) html += '<span class="composing">' + esc(composing) + '</span>';
  if (!cursorInserted) html += '<span class="cursor"></span>';

  inputDisplay.innerHTML = html;
  if (autoScroll && !userScrolling) scrollFreeToCenter();
}

function scrollFreeToCenter() {
  const cursor = inputDisplay.querySelector('.cursor');
  if (!cursor) return;
  
  const cursorRect = cursor.getBoundingClientRect();
  const areaRect = freeArea.getBoundingClientRect();
  
  const cursorCenter = cursorRect.top + cursorRect.height / 2;
  const areaCenter = areaRect.top + areaRect.height / 2;
  
  freeArea.scrollBy({ top: cursorCenter - areaCenter, behavior: 'smooth' });
}

// ── 手動捲動：滑鼠滾輪 + 拖曳 ──
freeArea.addEventListener('wheel', () => {
  userScrolling = true;
  clearTimeout(scrollResetTimer);
}, { passive: true });

let dragStartY = null;
let dragStartScroll = null;

freeArea.addEventListener('mousedown', (e) => {
  // 只允許中間空白區域拖曳（不要和文字選取衝突）
  if (e.button !== 0) return;
  dragStartY = e.clientY;
  dragStartScroll = freeArea.scrollTop;
  userScrolling = true;
  clearTimeout(scrollResetTimer);
});

document.addEventListener('mousemove', (e) => {
  if (dragStartY === null) return;
  const dy = dragStartY - e.clientY;
  freeArea.scrollTop = dragStartScroll + dy;
});

document.addEventListener('mouseup', () => {
  dragStartY = null;
});

// ── 選取變化時更新反白顯示 ──
hiddenInput.addEventListener('select', () => {
  if (!isFreeLike()) return;
  renderFree(hiddenInput.value, isComposing ? composingText : '', false);
});

// 方向鍵、Shift 選取、Home/End 等移動游標時刷新顯示
hiddenInput.addEventListener('keyup', (e) => {
  if (!isFreeLike()) return;
  const nav = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Shift'];
  if (nav.includes(e.key) || e.shiftKey) {
    renderFree(hiddenInput.value, isComposing ? composingText : '', false);
  }
});

function handleFreeChange(committed, wasDelete) {
  ensureAudio();
  userScrolling = false;
  clearTimeout(scrollResetTimer);

  const inZen = mode === 'ZEN';

  if (wasDelete) {
    // ZEN: 靜默追蹤，不震動不紅光
    if (inZen) {
      zenTrack.backspace_total++;
      zenTrack.backspace_map.push({
        time: Date.now() - zenTrack.startTime,
        pos: [...committed].length
      });
      renderFree(committed, '', true);
    } else {
      breakCombo(); errorShake(); sfxError();
      renderFree(committed, '', true);
      requestAnimationFrame(() => {
        const pos = getLastCharPos(inputDisplay);
        spawnParticles(pos.x, pos.y, 12, errColor(), 100);
      });
    }
    return;
  }

  const prevChars = [...prevText];
  const newChars = [...committed];
  const added = newChars.length - prevChars.length;

  // ZEN: 追蹤每個字元時間戳
  if (inZen) {
    const now = Date.now();
    for (let i = 0; i < added; i++) zenTrack.charTimestamps.push(now);
    recordWPM();
  }

  for (let i = 0; i < added; i++) {
    addCombo();
    if (!inZen && PUNCT.has(newChars[prevChars.length + i])) shakeScreen();
    if (!inZen) sfxCorrect();
  }
  renderFree(committed, '', true);
  if (!inZen) {
    requestAnimationFrame(() => {
      const tier = getTier();
      const pos = getLastCharPos(inputDisplay);
      spawnParticles(pos.x, pos.y, 5 + Math.min(combo, 30), tierColor(tier));
      if (added > 0 && PUNCT.has(newChars[newChars.length - 1])) {
        spawnParticles(pos.x, pos.y, 15, tierColor(tier), 120);
      }
    });
  }
}

// WPM 紀錄（每 5 秒取樣一次）
function recordWPM() {
  const ts = zenTrack.charTimestamps;
  if (ts.length < 2) return;
  const now = Date.now();
  // 最近 10 秒內的字元數
  const cutoff = now - 10000;
  const recent = ts.filter(t => t > cutoff).length;
  const wpm = Math.round((recent / 10) * 60);  // chars per min (中文以字計)
  const last = zenTrack.input_velocity[zenTrack.input_velocity.length - 1];
  if (!last || (now - last.time) > 5000) {
    zenTrack.input_velocity.push({ time: now - zenTrack.startTime, wpm });
  }
}

// ═════════════════════════════════════
//  TEST MODE
// ═════════════════════════════════════

function renderTest(committed, composing) {
  const targetChars = [...currentTarget];
  const typedChars = [...committed];
  const typedLen = typedChars.length;

  // 輸入區：已打的字
  let inputHtml = '';
  for (let i = 0; i < typedLen; i++) {
    const ok = targetChars[i] !== undefined && typedChars[i] === targetChars[i];
    const cls = ok ? 'correct' : 'wrong';
    const spawn = (i === typedLen - 1 && !composing) ? ' char-spawn' : '';
    inputHtml += '<span class="char ' + cls + spawn + '">' + esc(typedChars[i]) + '</span>';
  }
  if (composing) inputHtml += '<span class="composing">' + esc(composing) + '</span>';
  if (typedLen < targetChars.length) inputHtml += '<span class="cursor"></span>';
  testInputDisplay.innerHTML = inputHtml;

  // 目標區：標示進度（已完成=暗淡，目前=高亮，未打=一般灰）
  let targetHtml = '';
  for (let i = 0; i < targetChars.length; i++) {
    let cls = 'target-pending';     // 未打
    if (i < typedLen) {
      cls = (typedChars[i] === targetChars[i]) ? 'target-done' : 'target-error';
    } else if (i === typedLen) {
      cls = 'target-active';        // 下一個要打的字
    }
    targetHtml += '<span class="' + cls + '">' + esc(targetChars[i]) + '</span>';
  }
  targetDisplay.innerHTML = targetHtml;
}

function handleTestChange(committed, wasDelete) {
  ensureAudio();
  const targetChars = [...currentTarget];
  const typedChars = [...committed];

  if (wasDelete) {
    breakCombo(); errorShake(); sfxError();
    renderTest(committed, '');
    requestAnimationFrame(() => {
      const pos = typedChars.length > 0 ? getCharPosAt(testInputDisplay, typedChars.length - 1) : getLastCharPos(testInputDisplay);
      spawnParticles(pos.x, pos.y, 12, errColor(), 100);
    });
    return;
  }

  const prevChars = [...prevText];
  const newCount = typedChars.length - prevChars.length;
  for (let i = 0; i < newCount; i++) {
    const idx = prevChars.length + i;
    totalTyped++;
    if (targetChars[idx] !== undefined && typedChars[idx] === targetChars[idx]) {
      totalCorrect++; addCombo(); sfxCorrect();
    } else {
      breakCombo(); sfxWrong();
    }
  }

  renderTest(committed, '');
  requestAnimationFrame(() => {
    const lastIdx = typedChars.length - 1;
    if (lastIdx < 0) return;
    const pos = getCharPosAt(testInputDisplay, lastIdx);
    const ok = targetChars[lastIdx] !== undefined && typedChars[lastIdx] === targetChars[lastIdx];
    if (ok) {
      const tier = getTier();
      spawnParticles(pos.x, pos.y, 5 + Math.min(combo, 30), tierColor(tier));
      if (PUNCT.has(typedChars[lastIdx])) {
        shakeScreen();
        spawnParticles(pos.x, pos.y, 15, tierColor(tier), 120);
      }
    } else {
      spawnParticles(pos.x, pos.y, 8, errColor(), 60);
      errorShake();
    }
  });

  // 只有全部正確才過關
  if (typedChars.length === targetChars.length) {
    const allCorrect = typedChars.every((c, i) => c === targetChars[i]);
    if (allCorrect) onSentenceComplete();
  }
}

function onSentenceComplete() {
  sfxComplete();
  completeMsg.classList.add('show');
  setTimeout(() => completeMsg.classList.remove('show'), 1500);
  const r = testInputDisplay.getBoundingClientRect();
  spawnParticles(r.left + r.width/2, r.top + r.height/2, 50, tierColor(getTier()), 150);
  // 1.2 秒後自動下一題
  setTimeout(() => {
    if (sentenceIdx < SENTENCES.length - 1) {
      loadSentence(sentenceIdx + 1);
    }
  }, 1200);
}

function loadSentence(idx) {
  sentenceIdx = idx;
  currentTarget = SENTENCES[idx];
  hiddenInput.value = '';
  prevText = '';
  composingText = '';
  lastCommittedValue = '';
  renderRoller();
  renderTest('', '');
  hiddenInput.focus({ preventScroll: true });
}

function renderRoller() {
  sentenceCounter.textContent = (sentenceIdx + 1) + ' / ' + SENTENCES.length;

  // 上一題
  if (sentenceIdx > 0) {
    rollerPrev.textContent = SENTENCES[sentenceIdx - 1];
    rollerPrev.style.visibility = 'visible';
  } else {
    rollerPrev.textContent = '';
    rollerPrev.style.visibility = 'hidden';
  }

  // 下一題
  if (sentenceIdx < SENTENCES.length - 1) {
    rollerNext.textContent = SENTENCES[sentenceIdx + 1];
    rollerNext.style.visibility = 'visible';
  } else {
    rollerNext.textContent = '';
    rollerNext.style.visibility = 'hidden';
  }

  // 導航按鈕狀態
  btnPrev.style.visibility = sentenceIdx > 0 ? 'visible' : 'hidden';
  btnNext.style.visibility = sentenceIdx < SENTENCES.length - 1 ? 'visible' : 'hidden';
}

// ── TEST Nav ──
btnPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  if (sentenceIdx > 0) loadSentence(sentenceIdx - 1);
});
btnNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (sentenceIdx < SENTENCES.length - 1) loadSentence(sentenceIdx + 1);
});

// ═════════════════════════════════════
//  IME Composition + Input
// ═════════════════════════════════════

hiddenInput.addEventListener('compositionstart', () => {
  isComposing = true;
  composingText = '';
  lastCommittedValue = hiddenInput.value;
});

hiddenInput.addEventListener('compositionupdate', (e) => {
  composingText = e.data || '';
  if (mode === 'MD') renderMDInput(lastCommittedValue, composingText);
  else if (isFreeLike()) renderFree(lastCommittedValue, composingText, false);
  else renderTest(lastCommittedValue, composingText);
});

hiddenInput.addEventListener('compositionend', () => {
  isComposing = false;
  composingText = '';
  clearTimeout(processTimer);
  processTimer = setTimeout(processInput, 30);
});

hiddenInput.addEventListener('input', (e) => {
  if (isComposing || e.isComposing) return;
  clearTimeout(processTimer);
  processTimer = setTimeout(processInput, 30);
});

function processInput() {
  const committed = hiddenInput.value;
  if (committed === prevText) {
    if (mode === 'MD') renderMDInput(committed, '');
    else if (isFreeLike()) renderFree(committed, '', false);
    else renderTest(committed, '');
    return;
  }
  const wasDelete = [...committed].length < [...prevText].length;
  if (mode === 'MD') handleMDChange(committed, wasDelete);
  else if (isFreeLike()) handleFreeChange(committed, wasDelete);
  else handleTestChange(committed, wasDelete);
  prevText = committed;
  lastCommittedValue = committed;
}

// ── Prevent exceeding target in TEST / MD mode ──
hiddenInput.addEventListener('keydown', (e) => {
  if (mode !== 'TEST' && mode !== 'MD') return;
  if (isComposing || e.key === 'Process') return;
  const targetLen = [...currentTarget].length;
  const currentLen = [...hiddenInput.value].length;
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && currentLen >= targetLen) {
    e.preventDefault();
  }
});

// ── Focus ──
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
  if (zenPhase === 'scraper') zenKeywordInput.focus();
  else hiddenInput.focus({ preventScroll: true });
});

// ═════════════════════════════════════
//  ZEN MODE — Entry Protocol
// ═════════════════════════════════════

function startZenEntry() {
  zenPhase = 'topic';
  zenKeywords = [];
  zenBreatheCycle = 0;
  zenTopic = '';
  zenNotifiedMins = new Set();
  hiddenInput.disabled = true;

  // Reset tracking
  zenTrack.backspace_total = 0;
  zenTrack.backspace_map = [];
  zenTrack.input_velocity = [];
  zenTrack.startTime = 0;
  zenTrack.charTimestamps = [];

  zenOverlay.classList.remove('hidden');
  zenTopicStep.classList.remove('hidden');
  zenBreathe.classList.add('hidden');
  zenScraper.classList.add('hidden');

  zenTopicInput.value = '';
  zenTopicInput.disabled = false;
  zenTopicInput.focus();
}

// Topic step: Enter 提交
zenTopicInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  if (e.isComposing) return;
  e.preventDefault();
  zenTopic = zenTopicInput.value.trim() || '自由書寫';
  zenTopicInput.disabled = true;
  zenTopicStep.classList.add('hidden');

  // 進入呼吸階段
  zenPhase = 'breathe';
  zenBreathe.classList.remove('hidden');
  runBreatheCycle();
});

function runBreatheCycle() {
  if (zenPhase !== 'breathe') return;

  zenRing.classList.remove('inhale', 'topup', 'exhale');
  zenRing.style.width = '0';
  zenRing.style.height = '0';
  zenBreatheCount.textContent = (zenBreatheCycle + 1) + ' / 2';

  // Phase 1: Inhale (4s)
  zenBreatheLabel.textContent = '吸氣';
  zenRing.classList.add('inhale');
  playBreatheTone('inhale');

  setTimeout(() => {
    if (zenPhase !== 'breathe') return;
    // Phase 2: Top-up (1s)
    zenRing.classList.remove('inhale');
    zenBreatheLabel.textContent = '屏住';
    zenRing.classList.add('topup');

    setTimeout(() => {
      if (zenPhase !== 'breathe') return;
      // Phase 3: Exhale (7s)
      zenRing.classList.remove('topup');
      zenBreatheLabel.textContent = '吐氣';
      zenRing.classList.add('exhale');
      playBreatheTone('exhale');

      setTimeout(() => {
        if (zenPhase !== 'breathe') return;
        zenRing.classList.remove('exhale');
        zenBreatheCycle++;
        if (zenBreatheCycle < 2) {
          runBreatheCycle();
        } else {
          startScraper();
        }
      }, 7000);
    }, 1000);
  }, 4000);
}

function playBreatheTone(phase) {
  ensureAudio();
  if (phase === 'inhale') playTone(220, 3000, 'sine', 0.03);
  else if (phase === 'exhale') playTone(180, 5000, 'sine', 0.02);
}

// ── Signal Scraper ──
function startScraper() {
  zenPhase = 'scraper';
  zenKeywords = [];

  zenBreathe.classList.add('hidden');
  zenScraper.classList.remove('hidden');
  zenKeywordInput.value = '';
  zenKeywordInput.disabled = false;
  zenKeywordCount.textContent = '0 / 3';
  zenKeywordsDisp.innerHTML = '';
  zenKeywordInput.focus();
}

zenKeywordInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  if (e.isComposing) return; // IME 組字中，讓 Enter 先完成組字
  e.preventDefault();

  const kw = zenKeywordInput.value.trim();
  if (!kw) return;

  zenKeywords.push(kw);
  zenKeywordInput.value = '';
  zenKeywordCount.textContent = zenKeywords.length + ' / 3';

  const span = document.createElement('span');
  span.className = 'zen-keyword';
  span.textContent = kw;
  zenKeywordsDisp.appendChild(span);
  requestAnimationFrame(() => span.classList.add('evaporate'));

  playTone(440, 100, 'sine', 0.04);

  if (zenKeywords.length >= 3) {
    zenKeywordInput.disabled = true;
    setTimeout(unlockZenTyping, 3000);
  }
});

function unlockZenTyping() {
  zenPhase = 'typing';
  zenOverlay.classList.add('hidden');
  zenScraper.classList.add('hidden');

  hiddenInput.disabled = false;
  hiddenInput.value = '';
  prevText = '';
  lastCommittedValue = '';
  hiddenInput.focus({ preventScroll: true });

  // Topic bar
  zenTopicBar.textContent = zenTopic;
  zenTopicBar.classList.remove('hidden');

  // Start tracking
  zenTrack.startTime = Date.now();

  zenTimerWrap.classList.remove('hidden');
  startZenTimer();
  renderFree('', '', false);
}

// ── ZEN Timer ──
function startZenTimer() {
  stopZenTimer();
  zenTimerSeconds = zenTimerMode === 'stopwatch' ? 0 : ZEN_POMODORO_TOTAL;
  updateZenTimerDisplay();

  zenTimerInterval = setInterval(() => {
    if (zenTimerMode === 'stopwatch') {
      zenTimerSeconds++;
      checkZenNotify(zenTimerSeconds);
    } else {
      zenTimerSeconds--;
      if (zenTimerSeconds <= 0) {
        zenTimerSeconds = 0;
        stopZenTimer();
        onPomodoroComplete();
      }
    }
    updateZenTimerDisplay();
  }, 1000);
}

function stopZenTimer() {
  if (zenTimerInterval) { clearInterval(zenTimerInterval); zenTimerInterval = null; }
}

function updateZenTimerDisplay() {
  const m = Math.floor(Math.abs(zenTimerSeconds) / 60);
  const s = Math.abs(zenTimerSeconds) % 60;
  zenTimerValue.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function onPomodoroComplete() {
  playTone(660, 300, 'sine', 0.08);
  setTimeout(() => playTone(880, 400, 'sine', 0.08), 300);
  completeMsg.textContent = 'TIME';
  completeMsg.classList.add('show');
  setTimeout(() => {
    completeMsg.classList.remove('show');
    completeMsg.textContent = 'PERFECT!';
  }, 2000);
}

btnZenTimerMode.addEventListener('click', (e) => {
  e.stopPropagation();
  zenTimerMode = zenTimerMode === 'stopwatch' ? 'pomodoro' : 'stopwatch';
  btnZenTimerMode.textContent = zenTimerMode === 'stopwatch' ? '⏱' : '🍅';
  if (zenPhase === 'typing') startZenTimer();
  hiddenInput.focus({ preventScroll: true });
});

// ── ZEN Cleanup ──
function cleanupZen() {
  zenPhase = 'idle';
  stopZenTimer();
  zenOverlay.classList.add('hidden');
  zenBreathe.classList.add('hidden');
  zenScraper.classList.add('hidden');
  zenTopicStep.classList.add('hidden');
  zenTimerWrap.classList.add('hidden');
  zenTopicBar.classList.add('hidden');
  zenNotify.classList.add('hidden');
  zenReportOverlay.classList.add('hidden');
  hiddenInput.disabled = false;
  document.body.classList.remove('mode-zen');
  zenKeywordInput.disabled = true;
  zenKeywordInput.value = '';
  zenTopicInput.disabled = true;
}

// ═════════════════════════════════════
//  ZEN — Interval Notify
// ═════════════════════════════════════

function checkZenNotify(secs) {
  const mins = Math.floor(secs / 60);
  for (const m of ZEN_NOTIFY_MINS) {
    if (mins === m && !zenNotifiedMins.has(m)) {
      zenNotifiedMins.add(m);
      showZenNotify(m);
      break;
    }
  }
}

function showZenNotify(mins) {
  zenNotifyText.textContent = '已專注輸入 ' + mins + ' 分鐘，需要現在查看您的思緒流動分析報告嗎？';
  zenNotify.classList.remove('hidden');
}

btnZenDismiss.addEventListener('click', (e) => {
  e.stopPropagation();
  zenNotify.classList.add('hidden');
  hiddenInput.focus({ preventScroll: true });
});

btnZenReport.addEventListener('click', (e) => {
  e.stopPropagation();
  zenNotify.classList.add('hidden');
  showZenReport();
});

// ═════════════════════════════════════
//  ZEN — Analytic Report
// ═════════════════════════════════════

function showZenReport() {
  zenReportOverlay.classList.remove('hidden');
  renderReportChart();
  renderReportStats();
}

btnZenReportClose.addEventListener('click', (e) => {
  e.stopPropagation();
  zenReportOverlay.classList.add('hidden');
  hiddenInput.focus({ preventScroll: true });
});

function renderReportChart() {
  const c = zenReportCanvas;
  const cctx = c.getContext('2d');
  const dpr = devicePixelRatio || 1;
  c.width = c.clientWidth * dpr;
  c.height = c.clientHeight * dpr;
  cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const W = c.clientWidth;
  const H = c.clientHeight;

  cctx.clearRect(0, 0, W, H);

  const vel = zenTrack.input_velocity;
  const bsMap = zenTrack.backspace_map;
  if (vel.length < 2) {
    cctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-dim');
    cctx.font = '14px sans-serif';
    cctx.textAlign = 'center';
    cctx.fillText('數據不足，請繼續輸入', W / 2, H / 2);
    return;
  }

  const maxTime = vel[vel.length - 1].time;
  const maxWPM = Math.max(...vel.map(v => v.wpm), 1);
  const pad = { top: 20, bottom: 30, left: 10, right: 10 };
  const gW = W - pad.left - pad.right;
  const gH = H - pad.top - pad.bottom;

  // WPM Line
  cctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent-blue') || '#6ea4d4';
  cctx.lineWidth = 2;
  cctx.beginPath();
  for (let i = 0; i < vel.length; i++) {
    const x = pad.left + (vel[i].time / maxTime) * gW;
    const y = pad.top + gH - (vel[i].wpm / maxWPM) * gH;
    if (i === 0) cctx.moveTo(x, y); else cctx.lineTo(x, y);
  }
  cctx.stroke();

  // WPM label
  cctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-blue') || '#6ea4d4';
  cctx.font = '11px sans-serif';
  cctx.fillText('WPM', pad.left + 20, pad.top + 12);

  // Backspace markers
  const bsColor = getComputedStyle(document.body).getPropertyValue('--accent-red') || '#d47070';
  cctx.fillStyle = bsColor;
  for (const bs of bsMap) {
    const x = pad.left + (bs.time / maxTime) * gW;
    cctx.globalAlpha = 0.4;
    cctx.fillRect(x - 1, pad.top, 2, gH);
  }
  cctx.globalAlpha = 1;

  // BS label
  cctx.fillStyle = bsColor;
  cctx.fillText('退格', W - pad.right - 30, pad.top + 12);

  // Time axis
  cctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-dim') || '#888';
  cctx.font = '10px sans-serif';
  cctx.textAlign = 'center';
  for (let t = 0; t <= maxTime; t += 60000) {
    const x = pad.left + (t / maxTime) * gW;
    cctx.fillText(Math.round(t / 60000) + 'm', x, H - 8);
  }
}

function renderReportStats() {
  const elapsed = zenTrack.startTime ? Math.round((Date.now() - zenTrack.startTime) / 1000) : 0;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const text = hiddenInput.value || '';
  const charCount = [...text].length;

  // Markdown stats
  const lines = text.split('\n');
  const headings = lines.filter(l => /^#{1,3}\s/.test(l)).length;
  const listItems = lines.filter(l => /^[-*]\s/.test(l)).length;
  const boldCount = (text.match(/\*\*[^*]+\*\*/g) || []).length;

  // Avg WPM
  const vel = zenTrack.input_velocity;
  const avgWPM = vel.length > 0 ? Math.round(vel.reduce((s, v) => s + v.wpm, 0) / vel.length) : 0;

  zenReportStats.innerHTML =
    '<b>主題：</b>' + esc(zenTopic) + '<br>' +
    '<b>專注時長：</b>' + mins + ' 分 ' + secs + ' 秒<br>' +
    '<b>總字數：</b>' + charCount + '<br>' +
    '<b>平均速度：</b>' + avgWPM + ' 字/分<br>' +
    '<b>退格次數：</b>' + zenTrack.backspace_total + '<br>' +
    '<b>標題數：</b>' + headings + '　<b>列表項：</b>' + listItems + '　<b>粗體：</b>' + boldCount;
}

// ═════════════════════════════════════
//  ZEN — AES-GCM Encryption + Export
// ═════════════════════════════════════

async function zenEncryptAndSave() {
  const text = hiddenInput.value || '';
  const trackData = JSON.stringify({
    topic: zenTopic,
    keywords: zenKeywords,
    backspace_total: zenTrack.backspace_total,
    backspace_map: zenTrack.backspace_map,
    input_velocity: zenTrack.input_velocity,
    charCount: [...text].length,
    duration: zenTrack.startTime ? Date.now() - zenTrack.startTime : 0,
    timestamp: new Date().toISOString(),
  });

  const combined = JSON.stringify({ text, analytics: trackData });
  const password = prompt('設定加密密碼（留空取消）：');
  if (!password) return;

  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(combined));

    // Store to localStorage
    const record = {
      salt: Array.from(salt),
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
      topic: zenTopic,
      timestamp: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('zen_records') || '[]');
    existing.push(record);
    localStorage.setItem('zen_records', JSON.stringify(existing));

    btnZenEncrypt.textContent = '已儲存';
    setTimeout(() => { btnZenEncrypt.textContent = '加密存儲'; }, 2000);
  } catch (err) {
    alert('加密失敗：' + err.message);
  }
}

btnZenEncrypt.addEventListener('click', (e) => {
  e.stopPropagation();
  zenEncryptAndSave();
});

btnZenExport.addEventListener('click', (e) => {
  e.stopPropagation();
  const text = hiddenInput.value || '';
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (zenTopic || 'zen') + '_' + new Date().toISOString().slice(0, 10) + '.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// ═════════════════════════════════════
//  Lightweight Markdown Rendering
// ═════════════════════════════════════

function renderMarkdown(text) {
  // 逐行處理，回傳 HTML
  const lines = text.split('\n');
  let result = '';
  for (const line of lines) {
    let html = escLine(line);
    // Headings: ### > ## > #
    if (/^### /.test(line)) {
      html = '<span class="md-h3">' + escLine(line.slice(4)) + '</span>';
    } else if (/^## /.test(line)) {
      html = '<span class="md-h2">' + escLine(line.slice(3)) + '</span>';
    } else if (/^# /.test(line)) {
      html = '<span class="md-h1">' + escLine(line.slice(2)) + '</span>';
    } else if (/^[-*] /.test(line)) {
      html = '<span class="md-li">' + escLine(line) + '</span>';
    }
    // Bold: **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<span class="md-bold">**$1**</span>');
    result += html + '\n';
  }
  return result;
}

function escLine(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ═════════════════════════════════════
//  MD MODE — Markdown 語法練習
// ═════════════════════════════════════

function applyInlineMD(text) {
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`\n]+)`/g, '<code class="md-code-inline">$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="#" class="md-link" onclick="return false">$1</a>');
  return text;
}

function renderMDHTML(text) {
  if (!text) return '<span class="md-preview-placeholder">輸入 Markdown 語法，這裡即時渲染…</span>';
  const lines = text.split('\n');
  let html = '';
  for (const raw of lines) {
    const l = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if      (/^### /.test(l)) html += '<h3>' + applyInlineMD(l.slice(4)) + '</h3>';
    else if (/^## /.test(l))  html += '<h2>' + applyInlineMD(l.slice(3)) + '</h2>';
    else if (/^# /.test(l))   html += '<h1>' + applyInlineMD(l.slice(2)) + '</h1>';
    else if (/^[-*+] /.test(l)) html += '<ul><li>' + applyInlineMD(l.slice(2)) + '</li></ul>';
    else if (/^\d+\. /.test(l)) html += '<ol><li>' + applyInlineMD(l.replace(/^\d+\. /, '')) + '</li></ol>';
    else if (/^> /.test(l))   html += '<blockquote>' + applyInlineMD(l.slice(2)) + '</blockquote>';
    else if (/^---+$/.test(l))  html += '<hr class="md-hr">';
    else if (l === '')          html += '<br>';
    else                        html += '<p>' + applyInlineMD(l) + '</p>';
  }
  return html;
}

function renderMDInput(committed, composing) {
  const lesson = MD_LESSONS[mdLessonIdx];
  const targetChars = [...lesson.target];
  const typedChars = [...committed];
  const typedLen = typedChars.length;

  let inputHtml = '';
  for (let i = 0; i < typedLen; i++) {
    const ok = targetChars[i] !== undefined && typedChars[i] === targetChars[i];
    const cls = ok ? 'correct' : 'wrong';
    const spawn = (i === typedLen - 1 && !composing) ? ' char-spawn' : '';
    inputHtml += '<span class="char ' + cls + spawn + '">' + esc(typedChars[i]) + '</span>';
  }
  if (composing) inputHtml += '<span class="composing">' + esc(composing) + '</span>';
  if (typedLen < targetChars.length) inputHtml += '<span class="cursor"></span>';
  mdInputDisp.innerHTML = inputHtml;

  let targetHtml = '';
  for (let i = 0; i < targetChars.length; i++) {
    let cls = 'target-pending';
    if (i < typedLen) {
      cls = (typedChars[i] === targetChars[i]) ? 'target-done' : 'target-error';
    } else if (i === typedLen) {
      cls = 'target-active';
    }
    targetHtml += '<span class="' + cls + '">' + esc(targetChars[i]) + '</span>';
  }
  mdTargetDisp.innerHTML = targetHtml;

  mdPreview.innerHTML = renderMDHTML(committed || '');
}

function handleMDChange(committed, wasDelete) {
  ensureAudio();
  const lesson = MD_LESSONS[mdLessonIdx];
  const targetChars = [...lesson.target];
  const typedChars = [...committed];

  if (wasDelete) {
    breakCombo(); errorShake(); sfxError();
    renderMDInput(committed, '');
    requestAnimationFrame(() => {
      const pos = typedChars.length > 0
        ? getCharPosAt(mdInputDisp, typedChars.length - 1)
        : getLastCharPos(mdInputDisp);
      spawnParticles(pos.x, pos.y, 12, errColor(), 100);
    });
    return;
  }

  const prevChars = [...prevText];
  const newCount = typedChars.length - prevChars.length;
  for (let i = 0; i < newCount; i++) {
    const idx = prevChars.length + i;
    if (targetChars[idx] !== undefined && typedChars[idx] === targetChars[idx]) {
      addCombo(); sfxCorrect();
    } else {
      breakCombo(); sfxWrong();
    }
  }

  renderMDInput(committed, '');
  requestAnimationFrame(() => {
    const lastIdx = typedChars.length - 1;
    if (lastIdx < 0) return;
    const pos = getCharPosAt(mdInputDisp, lastIdx);
    const ok = targetChars[lastIdx] !== undefined && typedChars[lastIdx] === targetChars[lastIdx];
    if (ok) {
      spawnParticles(pos.x, pos.y, 5 + Math.min(combo, 30), tierColor(getTier()));
    } else {
      spawnParticles(pos.x, pos.y, 8, errColor(), 60);
      errorShake();
    }
  });

  if (typedChars.length === targetChars.length) {
    const allCorrect = typedChars.every((c, i) => c === targetChars[i]);
    if (allCorrect) onMDLessonComplete();
  }
}

function onMDLessonComplete() {
  sfxComplete();
  completeMsg.classList.add('show');
  setTimeout(() => completeMsg.classList.remove('show'), 1500);
  const r = mdInputDisp.getBoundingClientRect();
  spawnParticles(r.left + r.width / 2, r.top + r.height / 2, 50, tierColor(getTier()), 150);
  setTimeout(() => {
    if (mdLessonIdx < MD_LESSONS.length - 1) {
      loadMDLesson(mdLessonIdx + 1);
    } else {
      mdLessonNumEl.textContent = '全部完成！🎉';
    }
  }, 1200);
}

function loadMDLesson(idx) {
  mdLessonIdx = idx;
  const lesson = MD_LESSONS[idx];
  currentTarget = lesson.target;

  mdLessonNumEl.textContent = '關卡 ' + (idx + 1) + ' / ' + MD_LESSONS.length;
  mdLessonNameEl.textContent = lesson.name;
  mdSyntaxBadge.textContent = lesson.syntax;
  mdInstrDesc.innerHTML = lesson.desc;
  mdSyntaxEx.textContent = lesson.syntax;
  mdInstrHint.textContent = lesson.hint;

  hiddenInput.value = '';
  prevText = '';
  composingText = '';
  lastCommittedValue = '';

  renderMDInput('', '');

  btnMDPrev.style.visibility = idx > 0 ? 'visible' : 'hidden';
  btnMDNext.style.visibility = idx < MD_LESSONS.length - 1 ? 'visible' : 'hidden';

  hiddenInput.focus({ preventScroll: true });
}

function cleanupMD() {
  mdLessonIdx = 0;
}

// ── MD Nav ──
btnMDPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  if (mdLessonIdx > 0) loadMDLesson(mdLessonIdx - 1);
});
btnMDNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (mdLessonIdx < MD_LESSONS.length - 1) loadMDLesson(mdLessonIdx + 1);
});

// ═════════════════════════════════════
//  Mode Toggle (4-way: FREE → TEST → ZEN → MD → FREE)
// ═════════════════════════════════════

function setMode(targetMode) {
  if (mode === 'ZEN') cleanupZen();
  if (mode === 'MD') cleanupMD();

  if (targetMode === 'TEST') {
    mode = 'TEST';
    btnMode.textContent = 'TEST';
    freeArea.classList.add('hidden');
    mdArea.classList.add('hidden');
    roller.classList.remove('hidden');
    accuracyWrap.classList.remove('hidden');
    document.body.classList.remove('mode-zen');
    btnZenExit.classList.add('hidden');
    totalCorrect = 0; totalTyped = 0;
    loadSentence(0);
  } else if (targetMode === 'ZEN') {
    mode = 'ZEN';
    btnMode.textContent = 'ZEN';
    roller.classList.add('hidden');
    mdArea.classList.add('hidden');
    freeArea.classList.remove('hidden');
    accuracyWrap.classList.add('hidden');
    document.body.classList.add('mode-zen');
    btnZenExit.classList.remove('hidden');
    hiddenInput.value = '';
    prevText = '';
    lastCommittedValue = '';
    renderFree('', '', false);
    startZenEntry();
  } else if (targetMode === 'MD') {
    mode = 'MD';
    btnMode.textContent = 'MD';
    roller.classList.add('hidden');
    freeArea.classList.add('hidden');
    mdArea.classList.remove('hidden');
    document.body.classList.remove('mode-zen');
    accuracyWrap.classList.add('hidden');
    btnZenExit.classList.add('hidden');
    hiddenInput.value = '';
    prevText = '';
    lastCommittedValue = '';
    loadMDLesson(0);
  } else {
    // FREE
    mode = 'FREE';
    btnMode.textContent = 'FREE';
    roller.classList.add('hidden');
    mdArea.classList.add('hidden');
    freeArea.classList.remove('hidden');
    accuracyWrap.classList.add('hidden');
    document.body.classList.remove('mode-zen');
    btnZenExit.classList.add('hidden');
    hiddenInput.value = '';
    prevText = '';
    lastCommittedValue = '';
    renderFree('', '', false);
  }
  combo = 0; score = 0;
  updateHUD();
  hiddenInput.focus({ preventScroll: true });
}

btnMode.addEventListener('click', (e) => {
  e.stopPropagation();
  const next = { FREE: 'TEST', TEST: 'ZEN', ZEN: 'MD', MD: 'FREE' };
  setMode(next[mode]);
});

// HERO Card Click Setup
document.querySelectorAll('.hero-card').forEach((card, index) => {
  const modes = ['FREE', 'TEST', 'ZEN', 'MD'];
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    document.getElementById('fcm-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setMode(modes[index]);
  });
});

btnZenExit.addEventListener('click', (e) => {
  e.stopPropagation();
  setMode('FREE');
});

// ── Copy ──
function copyText() {
  const text = hiddenInput.value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    btnCopy.textContent = 'OK!';
    setTimeout(() => { btnCopy.textContent = 'COPY'; }, 1000);
  });
}
btnCopy.addEventListener('click', (e) => {
  e.stopPropagation();
  copyText();
});

// ── Roller Toggle ──
let rollerOn = false;
btnRoller.addEventListener('click', (e) => {
  e.stopPropagation();
  rollerOn = !rollerOn;
  freeArea.classList.toggle('roller-on', rollerOn);
  btnRoller.classList.toggle('active', rollerOn);
  hiddenInput.focus({ preventScroll: true });
});

// ── Theme Toggle ──
let themeBW = false;
btnTheme.addEventListener('click', (e) => {
  e.stopPropagation();
  themeBW = !themeBW;
  document.body.classList.toggle('theme-bw', themeBW);
  btnTheme.classList.toggle('active', themeBW);
  hiddenInput.focus({ preventScroll: true });
});

// ── Mute ──
btnMute.addEventListener('click', (e) => {
  e.stopPropagation();
  muted = !muted;
  btnMute.textContent = muted ? '🔇' : '🔊';
  if (muted && audioCtx) audioCtx.suspend();
  else if (!muted && audioCtx) audioCtx.resume();
});

// ═════════════════════════════════════
//  TUTORIAL SYSTEM
// ═════════════════════════════════════

const tutorialOverlay  = document.getElementById('tutorial-overlay');
const tutorialSpotlight = document.getElementById('tutorial-spotlight');
const tutorialTooltip  = document.getElementById('tutorial-tooltip');
const tutorialStepNum  = document.getElementById('tutorial-step-num');
const tutorialText     = document.getElementById('tutorial-text');
const btnTutorialSkip  = document.getElementById('btn-tutorial-skip');
const btnTutorialNext  = document.getElementById('btn-tutorial-next');
const tutorialCelebrate = document.getElementById('tutorial-celebrate');

const TUTORIAL_STEPS = [
  {
    target: '#btn-mode',
    text: '這是<b>模式切換鍵</b>。點擊可以在 FREE（自由打字）、TEST（測驗）、ZEN（專注）之間切換。',
    pos: 'below',
  },
  {
    target: '#hud-left',
    text: '<b>COMBO 連段計數器</b>。連續打字不中斷，Combo 會持續累積，粒子顏色也會隨之升階！',
    pos: 'below',
  },
  {
    target: '#hud-center',
    text: '<b>分數</b>會根據 Combo 倍率累積。在 ZEN 模式中，這裡會變成計時器。',
    pos: 'below',
  },
  {
    target: '#btn-copy',
    text: '打完文字後，點擊 <b>COPY</b> 即可複製全部內容到剪貼簿。',
    pos: 'below',
  },
  {
    target: '#btn-roller',
    text: '開啟 <b>ROLL 滾筒效果</b>，讓文字區域呈現 3D 立體捲軸感。',
    pos: 'below',
  },
  {
    target: '#btn-theme',
    text: '切換 <b>BW 白底黑字</b>主題，適合不同的閱讀環境。',
    pos: 'below',
  },
  {
    target: '#btn-mute',
    text: '切換<b>音效開關</b>。打字的敲擊聲、Combo 升階音效都可以靜音。',
    pos: 'below',
  },
  {
    target: '#free-area',
    text: '這是<b>打字區域</b>。直接開始打字吧！支援中文輸入法，也支援 Markdown 語法（在 ZEN 模式中）。',
    pos: 'center',
  },
];

let tutorialStep = 0;

function startTutorial() {
  // 只在第一次開啟時顯示
  if (localStorage.getItem('tutorial_done')) return;
  tutorialStep = 0;
  tutorialOverlay.classList.remove('hidden');
  showTutorialStep();
}

function showTutorialStep() {
  if (tutorialStep >= TUTORIAL_STEPS.length) {
    finishTutorial();
    return;
  }

  const step = TUTORIAL_STEPS[tutorialStep];
  const el = document.querySelector(step.target);
  if (!el) { tutorialStep++; showTutorialStep(); return; }

  const rect = el.getBoundingClientRect();
  const cr = fcmContainer.getBoundingClientRect();
  const pad = 10;

  // 圈選位置（容器相對）
  tutorialSpotlight.style.top = (rect.top - cr.top - pad) + 'px';
  tutorialSpotlight.style.left = (rect.left - cr.left - pad) + 'px';
  tutorialSpotlight.style.width = (rect.width + pad * 2) + 'px';
  tutorialSpotlight.style.height = (rect.height + pad * 2) + 'px';

  // Tooltip 位置
  tutorialStepNum.textContent = '步驟 ' + (tutorialStep + 1) + ' / ' + TUTORIAL_STEPS.length;
  tutorialText.innerHTML = step.text;

  if (step.pos === 'center') {
    tutorialTooltip.style.top = '50%';
    tutorialTooltip.style.left = '50%';
    tutorialTooltip.style.transform = 'translate(-50%, -50%)';
  } else {
    // below target
    tutorialTooltip.style.top = (rect.bottom - cr.top + 16) + 'px';
    tutorialTooltip.style.left = Math.max(16, Math.min(rect.left - cr.left, cr.width - 420)) + 'px';
    tutorialTooltip.style.transform = 'none';
  }

  // 最後一步改按鈕文字
  btnTutorialNext.textContent = tutorialStep === TUTORIAL_STEPS.length - 1 ? '開始使用！' : '下一步 ▸';
}

function finishTutorial() {
  localStorage.setItem('tutorial_done', '1');
  tutorialOverlay.classList.add('hidden');

  // 慶祝動畫
  tutorialCelebrate.classList.remove('hidden', 'show');
  void tutorialCelebrate.offsetWidth;
  tutorialCelebrate.classList.add('show');
  setTimeout(() => tutorialCelebrate.classList.add('hidden'), 1200);

  hiddenInput.focus({ preventScroll: true });
}

btnTutorialNext.addEventListener('click', (e) => {
  e.stopPropagation();
  tutorialStep++;
  showTutorialStep();
});

btnTutorialSkip.addEventListener('click', (e) => {
  e.stopPropagation();
  finishTutorial();
});

// ── Init ──
updateHUD();
renderFree('', '', false);
hiddenInput.focus({ preventScroll: true });
startTutorial();
