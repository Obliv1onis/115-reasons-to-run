(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('game');
  const ctx = canvas.getContext('2d');
  const shell = document.querySelector('.game-shell');
  const images = {};
  ['manchester-city','manchester-city-cheat','pl','epl','ucl','lawyer','arsenal','chelsea','liverpool','tottenham','manchester-united','atletico-madrid','barcelona','bayern-munich','inter','paris-saint-germain','real-madrid'].forEach(name => {
    const image = new Image(); image.src = `logos/${name}.${name==='lawyer'?'svg':'png'}`; images[name] = image;
  });
  const words = {
    en: {
      brand:'115 <strong>REASONS TO RUN</strong>', pageTitle:'115 Reasons to Run',
      tagline:'115 CHARGES. ONE MORE TROPHY?', budget:'BUDGET', lives:'LIVES', eplTrophies:'EPL', uclTrophies:'UCL', distance:'LEAGUE ON YOUR TAIL',
      controls:'← → / A D MOVE · SPACE / ↑ JUMP · P PAUSE', jump:'JUMP ↑', title:'115 REASONS<br><em>TO RUN.</em>',
      intro:'115 charges. Start with 900 mil. Running burns cash. Premier League trophies pay 150 mil; a rare Champions League trophy pays 500 mil if you win its club challenge. A lawyer costs 100 mil and buys an extra life. Every 15 league titles, the League finally opens the file for 15 seconds.',
      start:'START RUNNING →', instructions:'← → / A D to move · SPACE / ↑ to jump<br>On touchscreens, use the buttons below.',
      fulltime:'THE LEAGUE WOULD LIKE A WORD', caught:'NO COMMENT.', final:'Trophies collected before questioning:', restart:'FILE AN APPEAL ↻', brokeKicker:'BUDGET: ZERO', brokeTitle:'CHEATED.<br>STILL LOST.', brokeFinal:'Even cheating could not save the budget. Trophies collected:', brokeRestart:'FIND NEW INVESTORS ↻', pause:'HEARING ADJOURNED', breather:'CONSULT<br>THE LAWYERS.', resume:'BACK TO RUNNING →',
      rival:'RIVAL OBJECTION', challengeNote:'Even the chase gets an adjournment. Win the challenge to claim this trophy.',
      collected:'+1 PREMIER LEAGUE TROPHY. +150 MIL.', hired:'LAWYER HIRED: -100 MIL, +1 LIFE.', saved:'LAWYER INTERVENES! LION FROZEN FOR 1.5s.', frozen:'FROZEN', won:'OBJECTION OVERRULED. +1 TROPHY, +150 MIL!', wonUcl:'CHAMPIONS LEAGUE TROPHY WON! +500 MIL!', lost:'The rival takes this one. No appeal button here.', tie:'Another delay. Play again.',
      challengeTitle:name=>`${name} WANTS THIS PREMIER LEAGUE TROPHY`, uclChallengeTitle:name=>`${name} WANTS THE CHAMPIONS LEAGUE TROPHY`,
      highCopy:'Your hidden card is 1–9. Will it be higher or lower than the rival’s card? A tie is a redraw.',
      rpsCopy:'Rock beats scissors. Scissors beat paper. Paper beats rock. Beat the rival to win the trophy.',
      higher:'HIGHER', lower:'LOWER', rock:'ROCK', paper:'PAPER', scissors:'SCISSORS', next:'CONTINUE →',
      startToast:'115 reasons to keep moving.', prosecutionLabel:'PROSECUTION MODE', prosecutionStart:'15 titles? The League has finally found its reading glasses.', prosecutionEnd:'Hearing adjourned. The trophy cabinet remains under observation.', fullscreen:'Fullscreen', exitFullscreen:'Exit fullscreen', fullscreenError:'Fullscreen is unavailable. The game still fills this window.'
    },
    zh: {
      brand:'115 <strong>先跑再说</strong>', pageTitle:'115：先跑再说',
      tagline:'115 项指控，再拿一座？', budget:'资金', lives:'生命', eplTrophies:'英超', uclTrophies:'欧冠', distance:'英超追到哪了',
      controls:'← → / A D 移动 · 空格 / ↑ 跳跃 · P 暂停', jump:'跳跃 ↑', title:'115。<br><em>先跑再说。</em>',
      intro:'115 项指控，先拿 900 mil 启动资金。跑动花钱；英超奖杯补回 150 mil，稀有的欧冠奖杯赢下俱乐部挑战后可得 500 mil。律师花费 100 mil、增加一条命。每拿 15 座英超冠军，英超总算会翻开案卷调查 15 秒。',
      start:'先跑为敬 →', instructions:'← → / A D 移动 · 空格 / ↑ 跳跃<br>触屏设备可使用下方按钮。',
      fulltime:'英超请你配合调查', caught:'无可奉告。', final:'被叫去问话前收集的奖杯：', restart:'提起上诉 ↻', brokeKicker:'资金归零', brokeTitle:'作弊了，<br>还是输了。', brokeFinal:'作弊也救不了预算。收集到的奖杯：', brokeRestart:'再找投资人 ↻', pause:'暂时休庭', breather:'先和律师<br>商量一下。', resume:'继续跑路 →',
      rival:'对手提出异议', challengeNote:'追逐也得暂时休庭。赢下小游戏，这座奖杯就归你。',
      collected:'+1 座英超奖杯，资金 +150 mil。', hired:'请到律师：资金 -100 mil，生命 +1。', saved:'律师出手！狮子原地停 1.5 秒。', frozen:'静止中', won:'异议驳回，英超奖杯 +1，资金 +150 mil！', wonUcl:'欧冠奖杯到手！资金 +500 mil！', lost:'这座归对手，这里可没有上诉按钮。', tie:'又要延期了，再来一局。',
      challengeTitle:name=>`${name}要抢这座英超奖杯`, uclChallengeTitle:name=>`${name}要抢这座欧冠奖杯`,
      highCopy:'你的暗牌为 1–9。猜它比对手的牌大还是小，相同则重新抽牌。',
      rpsCopy:'石头胜剪刀，剪刀胜布，布胜石头。战胜对手即可赢得奖杯。',
      higher:'大', lower:'小', rock:'石头', paper:'布', scissors:'剪刀', next:'继续 →',
      startToast:'不停下来的理由，足足有 115 个。', prosecutionLabel:'起诉模式', prosecutionStart:'又攒够 15 座？英超终于想起翻案卷了。', prosecutionEnd:'暂时休庭。奖杯柜继续接受监督。', fullscreen:'全屏', exitFullscreen:'退出全屏', fullscreenError:'当前无法进入全屏，游戏仍会铺满窗口。'
    }
  };
  const eplClubs = [
    {key:'arsenal',en:'ARSENAL',zh:'阿森纳'}, {key:'chelsea',en:'CHELSEA',zh:'切尔西'},
    {key:'liverpool',en:'LIVERPOOL',zh:'利物浦'}, {key:'tottenham',en:'TOTTENHAM',zh:'热刺'},
    {key:'manchester-united',en:'MAN UNITED',zh:'曼联'}
  ];
  const uclClubs = [
    ...eplClubs.filter(club=>club.key!=='tottenham'),
    {key:'atletico-madrid',en:'ATLÉTICO MADRID',zh:'马德里竞技'},
    {key:'barcelona',en:'BARCELONA',zh:'巴塞罗那'},
    {key:'bayern-munich',en:'BAYERN MUNICH',zh:'拜仁慕尼黑'},
    {key:'inter',en:'INTER',zh:'国际米兰'},
    {key:'paris-saint-germain',en:'PARIS SAINT-GERMAIN',zh:'巴黎圣日耳曼'},
    {key:'real-madrid',en:'REAL MADRID',zh:'皇家马德里'}
  ];
  const PLAYER_SPEED = 360, LION_SPEED = PLAYER_SPEED * 1.03;
  const PLAYER_ACCEL = 1550, PLAYER_BRAKE = 2050, LION_ACCEL = 1750, LION_BRAKE = 2200;
  const STARTING_BUDGET = 900, RUN_COST_PER_METRE = .08, TROPHY_BONUS = {epl:150,ucl:500};
  const GRAVITY = 1900, JUMP_SPEED = 950, STEP = 1 / 120, CHUNK = 1800;
  let lang = 'en', state = 'ready', width = 1000, height = 700, scale = 1, viewWidth = 1000;
  let cameraX = 0, groundScreen = 550, baseGround = 550, last = 0, accumulator = 0, time = 0;
  let player, lion, score = 0, eplScore = 0, uclScore = 0, budget = STARTING_BUDGET, lives = 1, lionFrozen = 0, contactGrace = 0, prosecutionTime = 0, endReason = 'caught', chunks = new Map(), runSeed = 1, visitedChunks = new Set();
  let keys = new Set(), touches = new Map(), jumpBuffer = 0, challenge = null, toastTime = 0;
  const t = key => words[lang][key];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const approach = (value,target,step) => value<target?Math.min(target,value+step):Math.max(target,value-step);
  const center = actor => actor.x + actor.w / 2;
  const overlap = (a,b,pad=0) => a.x+pad < b.x+b.w && a.x+a.w-pad > b.x && a.y+pad < b.y+b.h && a.y+a.h-pad > b.y;
  function randomFor(index) {
    let seed = (Math.imul(index, 2654435761) ^ runSeed) >>> 0;
    return () => { seed = (Math.imul(seed,1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  }
  // Chunks retain collected items, so returning to old terrain never resets rewards.
  function makeChunk(index) {
    if (chunks.has(index)) return chunks.get(index);
    const random = randomFor(index), origin = index * CHUNK;
    const chunk = {obstacles:[], platforms:[], trophies:[], lawyers:[]};
    const addTrophy = (x,surface) => chunk.trophies.push({kind:'epl',x,y:surface-68,w:44,h:60,taken:false});
    // Each motif has a different silhouette and several reachable routes.
    // Tuple: horizontal position, elevation, width. Adjacent rises stay below 200.
    const layouts = [
      [[110,140,230],[370,290,230],[640,450,270],[970,300,230],[1250,145,230],[1500,305,230]],
      [[150,140,260],[440,285,240],[175,435,240],[460,585,280],[810,430,270],[1130,275,240],[1440,135,250]],
      [[80,135,260],[415,145,240],[730,130,280],[1090,140,260],[1450,130,240],[300,295,260],[650,310,240],[990,300,260],[690,465,250]],
      [[95,90,230],[400,180,210],[690,310,280],[1040,180,230],[1350,95,290],[610,465,240],[965,460,260]],
      [[130,145,300],[520,290,250],[835,445,300],[1210,280,230],[1500,135,250],[485,455,250]],
      [[120,100,240],[460,230,260],[800,380,300],[1150,215,240],[1500,90,230],[850,540,220]]
    ];
    let motif=Math.floor(random()*layouts.length);
    const previous=Math.floor(randomFor(index-1)()*layouts.length);
    if(motif===previous)motif=(motif+1)%layouts.length;
    chunk.motif=motif;
    const mirrored=index!==0&&random()<.5;
    let layout=layouts[motif];
    if(index===0)layout=[[620,140,250],[930,295,250],[1230,450,280],[1540,155,210]];
    for(const [position,elevation,span] of layout){
      const w=span+Math.floor(random()*21),x=origin+(mirrored?CHUNK-position-w:position);
      const y=-(elevation+Math.floor(random()*11));
      const p={x,y,w,h:24,tier:Math.ceil(-y/165),style:motif%3};chunk.platforms.push(p);
    }
    // Irregular obstacle groups: cones, striped barriers and stacked crates.
    const count=motif===4?5:motif===3?2:3;
    for(let n=0;n<count;n++){
      const x=origin+90+n*(1500/count)+random()*130;
      if(index===0&&x<580)continue;
      const kind=['barrier','crate','cone'][Math.floor(random()*3)];
      const h=kind==='crate'?74+Math.floor(random()*33):kind==='cone'?48:58+Math.floor(random()*22);
      const w=kind==='crate'?82:kind==='cone'?46:85+Math.floor(random()*35);
      chunk.obstacles.push({x,y:-h,w,h,kind});
    }
    // A fixed set of safe sites is sampled without replacement. The fractional
    // part is a Bernoulli draw, giving exactly 1.5 or 0.7 EPL trophies per chunk on average.
    const rewardRandom=randomFor(index^0x51ed270b);
    const sites=chunk.platforms.map(p=>({x:p.x+p.w/2-22,surface:p.y}));
    for(let x=origin+160;x<origin+CHUNK-100;x+=360){
      if(index===0&&x<450)continue;
      if(!chunk.obstacles.some(o=>x+44>o.x-30&&x<o.x+o.w+30))sites.push({x,surface:0});
    }
    for(let i=sites.length-1;i>0;i--){const j=Math.floor(rewardRandom()*(i+1));[sites[i],sites[j]]=[sites[j],sites[i]];}
    const eplRate=prosecutionTime>0?.7:1.5;
    const eplCount=Math.floor(eplRate)+(rewardRandom()<eplRate%1?1:0);
    for(const site of sites.slice(0,eplCount))addTrophy(site.x,site.surface);
    // At most one Champions League trophy per chunk, at a 5% chance outside prosecution.
    if(prosecutionTime<=0&&rewardRandom()<.05){
      const lowPlatforms=chunk.platforms.filter(platform=>-platform.y<=310);
      const emptyPlatforms=lowPlatforms.filter(platform=>!chunk.trophies.some(item=>item.y===platform.y-68&&item.x>=platform.x&&item.x<platform.x+platform.w));
      const choices=emptyPlatforms.length?emptyPlatforms:lowPlatforms;
      const platform=choices[Math.floor(rewardRandom()*choices.length)];
      chunk.trophies.push({kind:'ucl',x:platform.x+platform.w/2-27,y:platform.y-96,w:54,h:88,taken:false});
    }
    // One lawyer per prosecution chunk; 80% chance otherwise.
    if(prosecutionTime>0||rewardRandom()<.8){
      const start=index===0?520:100,range=CHUNK-start-100;
      const offset=Math.floor(random()*range);
      for(let step=0;step<range;step+=46){
        const x=origin+start+(offset+step)%range;
        const blocked=chunk.obstacles.some(o=>x+64>o.x-30&&x<o.x+o.w+30)
          ||chunk.trophies.some(item=>item.y>-100&&x+64>item.x-30&&x<item.x+item.w+30);
        if(!blocked){chunk.lawyers.push({x,y:-86,w:64,h:82,taken:false});break;}
      }
    }
    chunks.set(index,chunk); return chunk;
  }
  function terrain() {
    const left=Math.floor((Math.min(player.x,lion.x,cameraX)-CHUNK)/CHUNK);
    const right=Math.floor((Math.max(player.x,lion.x,cameraX+viewWidth)+CHUNK)/CHUNK);
    const result={obstacles:[],platforms:[],trophies:[],lawyers:[]};
    for(let i=left;i<=right;i++) {const c=makeChunk(i); for(const key of Object.keys(result))result[key].push(...c[key]);}
    return result;
  }
  function actor(x,size) {return {x,y:-size,w:size,h:size,vx:0,vy:0,onGround:true,coyote:.1,blocked:false,facing:1};}
  function clearInput(){keys.clear();touches.clear();jumpBuffer=0;}
  function reset() {
    runSeed=Math.floor(Math.random()*0xffffffff); chunks=new Map(); visitedChunks=new Set([0]); score=0; eplScore=0; uclScore=0; budget=STARTING_BUDGET; lives=1; lionFrozen=0; contactGrace=0; prosecutionTime=0; endReason='caught';
    player=actor(300,64); lion=actor(15,74); challenge=null; clearInput();
    groundScreen=baseGround;
    cameraX=center(player)-viewWidth*.5; time=0; accumulator=0; terrain(); updateHud();
  }
  function resize(){
    const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
    width=rect.width;height=rect.height;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    scale=Math.min(1.35,Math.max(.65,(height-90)/380));viewWidth=width/scale;
    baseGround=height-Math.max(85,height*.13);
    if(player)followCamera(0,true);else groundScreen=baseGround;
  }
  function followCamera(dt=STEP,snap=false){
    if(snap){cameraX=center(player)-viewWidth*.5;groundScreen=Math.max(baseGround,height*.52-(player.y+player.h/2)*scale);return;}
    const x=(center(player)-cameraX)*scale,y=groundScreen+(player.y+player.h/2)*scale;
    const left=width*.34,right=width*.66,top=height*.30,bottom=height*.68;
    const targetX=cameraX+(x<left?x-left:x>right?x-right:0)/scale;
    const targetGround=Math.max(baseGround,groundScreen+(y<top?top-y:y>bottom?bottom-y:0));
    // Exponential easing is independent of refresh rate; inside the zone nothing moves.
    const blend=1-Math.exp(-7*dt);
    cameraX+=(targetX-cameraX)*blend;
    groundScreen+=(targetGround-groundScreen)*(1-Math.exp(-16*dt));
  }
  function setLanguage(next){
    lang=next;document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.title=t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=t(el.dataset.i18n));
    $('langBtn').textContent=lang==='en'?'中文':'EN';
    canvas.setAttribute('aria-label',lang==='en'?'Manchester City platform game':'曼城躲避英超平台游戏');
    updateFullscreenLabel();if(challenge)renderChallenge();if(state==='over')renderEndCopy();updateHud();
  }
  function updateHud(){
    $('eplScore').textContent=String(eplScore).padStart(2,'0');$('uclScore').textContent=String(uclScore).padStart(2,'0');
    $('lives').textContent=String(lives);
    $('budget').innerHTML=`${Number(Math.max(0,budget).toFixed(1))} <em>mil</em>`;
    $('budget').classList.toggle('low',budget<100);
    if(!player)return;
    const gap=Math.max(0,Math.abs(center(player)-center(lion))-(player.w+lion.w)/2);
    $('distance').textContent=`${Math.round(gap)} ${lang==='en'?'m':'米'}`;
    $('meterFill').style.width=`${clamp(gap/320,0,1)*100}%`;
    $('meterFill').style.background=gap<70?'#ff8375':'#c8fb51';
    $('prosecution').classList.toggle('hidden',prosecutionTime<=0);
    $('prosecutionTime').textContent=`${prosecutionTime.toFixed(1)}s`;
  }
  function toast(key,loss=false){$('toast').textContent=t(key);$('toast').classList.remove('hidden');$('toast').classList.toggle('loss',loss);toastTime=2.2;}
  function start(){
    reset();state='running';['startOverlay','gameOverOverlay','challengeOverlay','pauseOverlay'].forEach(id=>$(id).classList.add('hidden'));
    document.activeElement?.blur();toast('startToast');last=performance.now();
  }
  function renderEndCopy(){
    const broke=endReason==='funds';
    $('deathKicker').textContent=t(broke?'brokeKicker':'fulltime');
    $('deathTitle').innerHTML=t(broke?'brokeTitle':'caught');
    $('deathDescription').textContent=t(broke?'brokeFinal':'final');
    $('restartBtn').textContent=t(broke?'brokeRestart':'restart');
    $('gameOverCrest').src=`logos/${broke?'manchester-city':'manchester-city-cheat'}.png`;
    $('gameOverCrest').alt=broke?'Manchester City out of funds':'Manchester City caught';
  }
  function gameOver(reason='caught'){
    state='over';endReason=reason;clearInput();$('finalScore').textContent=score;renderEndCopy();$('gameOverOverlay').classList.remove('hidden');
    $('gameOverOverlay').classList.toggle('funds-out',reason==='funds');
    $('toast').classList.add('hidden');updateHud();
  }
  function refreshUnvisitedChunks(){for(const index of chunks.keys())if(!visitedChunks.has(index))chunks.delete(index);}
  function award(kind='epl'){
    score++;
    if(kind==='ucl')uclScore++;
    else{
      eplScore++;
      if(eplScore%15===0){prosecutionTime=15;lion.thinkTime=0;refreshUnvisitedChunks();toast('prosecutionStart');}
    }
    budget+=TROPHY_BONUS[kind];updateHud();
  }
  function pause(){if(state!=='running')return;state='paused';clearInput();$('pauseOverlay').classList.remove('hidden');}
  function resume(){if(state!=='paused')return;state='running';clearInput();$('pauseOverlay').classList.add('hidden');document.activeElement?.blur();last=performance.now();}
  function moveActor(body,targetVx,dt,world,accel,brake){
    const turning=body.vx&&Math.sign(body.vx)!==Math.sign(targetVx);
    body.vx=approach(body.vx,targetVx,(targetVx===0||turning?brake:accel)*dt);
    body.blocked=false;body.coyote=body.onGround?.10:Math.max(0,body.coyote-dt);
    if(body.vx)body.facing=Math.sign(body.vx);
    body.x+=body.vx*dt;
    for(const wall of world.obstacles)if(overlap(body,wall)){
      if(body.vx>0)body.x=wall.x-body.w;else if(body.vx<0)body.x=wall.x+wall.w;
      body.vx=0;body.blocked=true;
    }
    const previousBottom=body.y+body.h;body.vy+=GRAVITY*dt;body.y+=body.vy*dt;body.onGround=false;body.support=null;
    if(body.vy>=0){
      let landing=0;
      for(const surface of [...world.obstacles,...world.platforms]){
        if(body.x+body.w>surface.x && body.x<surface.x+surface.w && previousBottom<=surface.y+.5 && body.y+body.h>=surface.y&&surface.y<landing){landing=surface.y;body.support=surface;}
      }
      if(body.y+body.h>=landing){body.y=landing-body.h;body.vy=0;body.onGround=true;}
    }
  }
  function jump(){if(state==='running')jumpBuffer=.14;}
  function updateLion(dt,world){
    lion.thinkTime=(lion.thinkTime||0)-dt;
    lion.jumpCooldown=Math.max(0,(lion.jumpCooldown||0)-dt);
    if(lion.thinkTime<=0){
      lion.targetX=center(player);lion.targetFeet=player.y+player.h;
      lion.thinkTime=prosecutionTime>0?.16+Math.random()*.10:.4+Math.random()*.25;
      lion.tryClimb=Math.random()<(prosecutionTime>0?.85:.6);
    }
    const dx=lion.targetX-center(lion),direction=Math.sign(dx);
    const feet=lion.y+lion.h;
    const wallRange=prosecutionTime>0?80:48;
    const wallAhead=world.obstacles.some(w=>w.y<feet-1&&w.y+w.h>lion.y&&(direction>0?w.x>=lion.x+lion.w-2&&w.x-(lion.x+lion.w)<wallRange:w.x+w.w<=lion.x+2&&lion.x-(w.x+w.w)<wallRange));
    // Only react to nearby ledges. No route planning or automatic drop-through.
    const modestClimb=lion.tryClimb&&lion.targetFeet<feet-35&&lion.targetFeet>=feet-195&&Math.abs(dx)<180&&world.platforms.some(p=>p.y<feet-30&&p.y>=feet-195&&p.x<lion.x+lion.w+80&&p.x+p.w>lion.x-80);
    if(lion.onGround&&lion.jumpCooldown===0&&(wallAhead||lion.blocked||modestClimb)){
      lion.vy=-JUMP_SPEED*.93;lion.onGround=false;lion.jumpCooldown=prosecutionTime>0?.9:1.35;lion.tryClimb=false;
    }
    const speed=LION_SPEED*(prosecutionTime>0?1.7:1);
    moveActor(lion,clamp(dx*4,-speed,speed),dt,world,LION_ACCEL*(prosecutionTime>0?1.7:1),LION_BRAKE*(prosecutionTime>0?1.7:1));
  }
  function update(dt){
    time+=dt;
    visitedChunks.add(Math.floor(center(player)/CHUNK));
    if(prosecutionTime>0){prosecutionTime=Math.max(0,prosecutionTime-dt);if(prosecutionTime===0){refreshUnvisitedChunks();toast('prosecutionEnd');}}
    const world=terrain();
    let direction=(keys.has('ArrowRight')||keys.has('KeyD')?1:0)-(keys.has('ArrowLeft')||keys.has('KeyA')?1:0);
    for(const value of touches.values())direction+=value;
    direction=clamp(direction,-1,1);
    if(jumpBuffer>0&&(player.onGround||player.coyote>0)){player.vy=-JUMP_SPEED;player.onGround=false;player.coyote=0;jumpBuffer=0;}
    jumpBuffer=Math.max(0,jumpBuffer-dt);
    const oldX=player.x;
    moveActor(player,direction*PLAYER_SPEED,dt,world,PLAYER_ACCEL,PLAYER_BRAKE);
    budget=Math.max(0,budget-Math.abs(player.x-oldX)*RUN_COST_PER_METRE);
    contactGrace=Math.max(0,contactGrace-dt);
    if(lionFrozen>0){lionFrozen=Math.max(0,lionFrozen-dt);lion.vx=0;lion.vy=0;}
    else updateLion(dt,world);
    // World coordinates never scroll themselves; only the view follows the player.
    followCamera(dt);
    for(const lawyer of world.lawyers){
      if(lawyer.taken||!overlap(player,lawyer,6))continue;
      lawyer.taken=true;budget-=100;lives++;toast('hired');
    }
    if(contactGrace===0&&overlap(player,lion,10)){
      if(lives>1){lives--;lionFrozen=1.5;contactGrace=2;lion.vx=0;lion.vy=0;toast('saved');}
      else{gameOver();return;}
    }
    for(const trophy of world.trophies){
      if(trophy.taken||(prosecutionTime>0&&trophy.kind==='ucl')||!overlap(player,trophy,3))continue;
      trophy.taken=true;
      if(trophy.kind==='ucl'||Math.random()<.28){startChallenge(trophy.kind);break;}
      award('epl');if(prosecutionTime<=0||eplScore%15!==0)toast('collected');
    }
    if(state==='challenge'){updateHud();return;}
    if(budget<=0){gameOver('funds');return;}
    updateHud();
  }
  function startChallenge(kind='epl'){
    state='challenge';clearInput();
    const clubPool=kind==='ucl'?uclClubs:eplClubs;
    challenge={kind,club:clubPool[Math.floor(Math.random()*clubPool.length)],mode:Math.random()<.5?'high':'rps',card:2+Math.floor(Math.random()*7),result:null,draw:null};
    $('challengeOverlay').classList.toggle('ucl-duel',kind==='ucl');
    renderChallenge();$('challengeOverlay').classList.remove('hidden');
  }
  function renderChallenge(){
    const c=challenge;if(!c)return;
    $('rivalLogo').src=`logos/${c.club.key}.png`;$('rivalLogo').alt=c.club[lang];
    $('challengeTitle').textContent=words[lang][c.kind==='ucl'?'uclChallengeTitle':'challengeTitle'](c.club[lang]);
    $('challengeCopy').textContent=c.result?t(c.result==='won'&&c.kind==='ucl'?'wonUcl':c.result):t(c.mode==='high'?'highCopy':'rpsCopy');
    $('duel').textContent=c.draw || (c.mode==='high'?`?  vs  ${c.card}`:'✊  ✋  ✌');
    const actions=$('challengeActions');actions.replaceChildren();
    const options=c.result&&c.result!=='tie'?['next']:c.mode==='high'?['higher','lower']:['rock','paper','scissors'];
    options.forEach(option=>{const button=document.createElement('button');button.textContent=t(option);button.addEventListener('click',()=>answer(option));actions.appendChild(button);});
  }
  function answer(choice){
    if(state!=='challenge'||!challenge)return;const c=challenge;
    if(choice==='next'){
      challenge=null;state='running';$('challengeOverlay').classList.add('hidden');clearInput();last=performance.now();
      if(budget<=0)gameOver('funds');
      return;
    }
    if(c.result&&c.result!=='tie')return;
    let win=false,tie=false;
    if(c.mode==='high'){
      const card=1+Math.floor(Math.random()*9);tie=card===c.card;win=choice==='higher'?card>c.card:card<c.card;c.draw=`${card}  vs  ${c.card}`;
    }else{
      const values=['rock','paper','scissors'],emoji=['✊','✋','✌'],ai=Math.floor(Math.random()*3),you=values.indexOf(choice);
      tie=you===ai;win=(you-ai+3)%3===1;c.draw=`${emoji[you]}  vs  ${emoji[ai]}`;
    }
    c.result=tie?'tie':win?'won':'lost';if(win&&!tie)award(c.kind);renderChallenge();
  }
  function drawImage(name,x,y,w,h){
    const image=images[name];if(image.complete&&image.naturalWidth)ctx.drawImage(image,x,y,w,h);
    else{ctx.fillStyle=name==='pl'?'#dd9eff':'#a6d9ff';ctx.beginPath();ctx.arc(x+w/2,y+h/2,w/2,0,Math.PI*2);ctx.fill();}
  }
  function drawBackground(){
    const palettes=[['#061d2a','#16463f','#092a29'],['#21213b','#694f63','#253840'],['#122e46','#35647a','#193d48'],['#292338','#72563e','#2a3b32']];
    const palette=palettes[((Math.floor(player.x/CHUNK)%4)+4)%4];
    const sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,palette[0]);sky.addColorStop(.7,palette[1]);sky.addColorStop(1,palette[2]);ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
    const horizon=groundScreen-70*scale;
    ctx.fillStyle='#c8fb5111';ctx.beginPath();ctx.arc(width*.8,height*.26,75*scale,0,Math.PI*2);ctx.fill();
    // Distant stands move more slowly than the pitch.
    const offset=((cameraX*.23*scale)%160+160)%160;
    for(let x=-160-offset;x<width+160;x+=160){
      ctx.fillStyle='#082b30';ctx.fillRect(x,horizon-110*scale,146,120*scale);
      ctx.fillStyle='#93bc7030';for(let row=0;row<4;row++)for(let col=0;col<8;col++)ctx.fillRect(x+10+col*17,horizon-(90-row*22)*scale,6,3);
      ctx.fillStyle='#0b3436';ctx.fillRect(x+15,horizon-140*scale,5,140*scale);ctx.fillStyle='#bce6b950';ctx.fillRect(x,horizon-145*scale,34,5*scale);
    }
    ctx.fillStyle='#113e37';ctx.fillRect(0,horizon,width,groundScreen-horizon);
    ctx.strokeStyle='#afd5b126';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,horizon+30*scale);ctx.lineTo(width,horizon+30*scale);ctx.stroke();
  }
  function draw(){
    drawBackground();const world=terrain();
    ctx.save();ctx.translate(-cameraX*scale,groundScreen);ctx.scale(scale,scale);
    ctx.fillStyle='#12382d';ctx.fillRect(cameraX,0,viewWidth,height/scale);ctx.fillStyle='#83b864';ctx.fillRect(cameraX,0,viewWidth,4);
    for(let x=Math.floor(cameraX/120)*120;x<cameraX+viewWidth;x+=120){
      ctx.fillStyle=Math.floor(x/120)%2?'#143e2f':'#174330';ctx.fillRect(x,5,120,height/scale);
      ctx.fillStyle='#abc69533';ctx.fillRect(x+14,18,24,2);ctx.fillRect(x+65,45,11,2);
    }
    const visible=o=>o.x+o.w>cameraX-80&&o.x<cameraX+viewWidth+80;
    for(const p of world.platforms.filter(visible)){
      const trim=p.tier>2?'#f5cf72':p.tier>1?'#76def2':'#c8fb51';
      ctx.fillStyle='#071f27';ctx.fillRect(p.x+5,p.y+10,p.w,p.h);
      ctx.fillStyle=p.style===1?'#355068':p.style===2?'#645e58':'#28614f';ctx.fillRect(p.x,p.y,p.w,p.h);
      ctx.fillStyle=trim;ctx.fillRect(p.x,p.y,p.w,5);
      if(p.style===1){ctx.strokeStyle='#83a3ac';ctx.lineWidth=2;for(let x=p.x+10;x<p.x+p.w-20;x+=32){ctx.beginPath();ctx.moveTo(x,p.y+7);ctx.lineTo(x+23,p.y+p.h-3);ctx.moveTo(x+23,p.y+7);ctx.lineTo(x,p.y+p.h-3);ctx.stroke();}}
      else{ctx.fillStyle=p.style===2?'#b7a486':'#84b174';for(let x=p.x+12;x<p.x+p.w-10;x+=27)ctx.fillRect(x,p.y+12,11,4);}
      if(p.tier>2){ctx.fillStyle=trim;ctx.fillRect(p.x+p.w-10,p.y-34,2,34);ctx.beginPath();ctx.moveTo(p.x+p.w-8,p.y-34);ctx.lineTo(p.x+p.w+12,p.y-26);ctx.lineTo(p.x+p.w-8,p.y-18);ctx.fill();}
    }
    for(const o of world.obstacles.filter(visible)){
      ctx.fillStyle='#061e23';ctx.fillRect(o.x-4,-7,o.w+8,7);ctx.fillStyle='#eebf61';if(o.kind!=='cone')ctx.fillRect(o.x,o.y,o.w,o.h-5);
      if(o.kind==='crate'){
        ctx.fillStyle='#8e6340';ctx.fillRect(o.x,o.y,o.w,o.h-5);ctx.strokeStyle='#d6b377';ctx.lineWidth=5;ctx.strokeRect(o.x+5,o.y+5,o.w-10,o.h-15);ctx.beginPath();ctx.moveTo(o.x+8,o.y+8);ctx.lineTo(o.x+o.w-8,-10);ctx.moveTo(o.x+o.w-8,o.y+8);ctx.lineTo(o.x+8,-10);ctx.stroke();continue;
      }
      if(o.kind==='cone'){
        ctx.fillStyle='#ee8958';ctx.beginPath();ctx.moveTo(o.x+o.w/2,o.y);ctx.lineTo(o.x+o.w,-6);ctx.lineTo(o.x,-6);ctx.closePath();ctx.fill();ctx.fillStyle='#ffe8c3';ctx.fillRect(o.x+o.w*.24,o.y+o.h*.55,o.w*.52,8);continue;
      }
      ctx.save();ctx.beginPath();ctx.rect(o.x,o.y,o.w,o.h-5);ctx.clip();ctx.strokeStyle='#593e2d';ctx.lineWidth=11;
      for(let x=o.x-50;x<o.x+o.w+70;x+=27){ctx.beginPath();ctx.moveTo(x,o.y-2);ctx.lineTo(x-40,0);ctx.stroke();}ctx.restore();
      ctx.fillStyle='#ffe6a0';ctx.fillRect(o.x,o.y,o.w,3);
    }
    for(const trophy of world.trophies){if(trophy.taken||(prosecutionTime>0&&trophy.kind==='ucl')||!visible(trophy))continue;
      const ucl=trophy.kind==='ucl';
      ctx.fillStyle=ucl?'#9ddfff35':'#e9ed7924';ctx.beginPath();ctx.ellipse(trophy.x+trophy.w/2,trophy.y+trophy.h/2,ucl?41:32,ucl?51:38,0,0,Math.PI*2);ctx.fill();
      drawImage(trophy.kind,trophy.x,trophy.y+Math.sin(time*3+trophy.x)*2,trophy.w,trophy.h);
    }
    for(const lawyer of world.lawyers){if(lawyer.taken||!visible(lawyer))continue;
      ctx.fillStyle='#f5d57e28';ctx.beginPath();ctx.ellipse(lawyer.x+lawyer.w/2,lawyer.y+lawyer.h/2,36,45,0,0,Math.PI*2);ctx.fill();
      drawImage('lawyer',lawyer.x,lawyer.y+Math.sin(time*2+lawyer.x)*2,lawyer.w,lawyer.h);
      ctx.fillStyle='#f5d57e';ctx.font='700 11px sans-serif';ctx.textAlign='center';ctx.fillText(lang==='en'?'LAWYER':'律师',lawyer.x+lawyer.w/2,lawyer.y-9);
    }
    ctx.textAlign='start';
    for(const [body,name] of [[lion,'pl'],[player,(prosecutionTime>0||state==='over'&&endReason==='caught')?'manchester-city-cheat':'manchester-city']]){
      ctx.fillStyle='#021d2460';ctx.beginPath();ctx.ellipse(center(body),3,body.w*.43,6,0,0,Math.PI*2);ctx.fill();
      const bob=body.onGround&&Math.abs(body.vx)>1?Math.sin(time*18)*1.5:0;
      drawImage(name,body.x,body.y+bob,body.w,body.h);
      if(body===lion&&lionFrozen>0){
        ctx.fillStyle='#e0c4eb';ctx.font='700 14px sans-serif';ctx.textAlign='center';
        ctx.fillText(`${t('frozen')} ${lionFrozen.toFixed(1)}s`,center(lion),lion.y-16);
        ctx.textAlign='start';
      }
      if(name==='pl'){ctx.fillStyle='#dbb8ed';ctx.beginPath();const x=center(body)+body.facing*37;ctx.moveTo(x,body.y+24);ctx.lineTo(x-body.facing*6,body.y+20);ctx.lineTo(x-body.facing*6,body.y+28);ctx.fill();}
    }
    ctx.restore();
    const lionX=(center(lion)-cameraX)*scale;
    if(state==='running'&&(lionX<0||lionX>width)){
      const x=clamp(lionX,24,width-58);ctx.fillStyle='#301d40dd';ctx.fillRect(x-8,groundScreen-65,48,48);drawImage('pl',x,groundScreen-60,32,32);
      ctx.fillStyle='#e0c4eb';ctx.font='14px sans-serif';ctx.fillText(lionX<0?'◀':'▶',x+7,groundScreen-18);
    }
  }
  function frame(now){
    const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
    if(state==='running'){
      accumulator+=dt;while(accumulator>=STEP&&state==='running'){update(STEP);accumulator-=STEP;}
    }else accumulator=0;
    if(toastTime>0){toastTime-=dt;if(toastTime<=0)$('toast').classList.add('hidden');}
    draw();requestAnimationFrame(frame);
  }
  $('startBtn').addEventListener('click',start);$('restartBtn').addEventListener('click',start);$('resumeBtn').addEventListener('click',resume);
  $('langBtn').addEventListener('click',()=>{setLanguage(lang==='en'?'zh':'en');$('langBtn').blur();});
  window.addEventListener('keydown',event=>{
    const controls=['ArrowLeft','ArrowRight','ArrowUp','Space','KeyA','KeyD','KeyW','KeyP','Escape'];
    if(!controls.includes(event.code))return;
    if(event.target?.tagName==='BUTTON'&&(state==='challenge'||state==='ready'||state==='over'))return;
    event.preventDefault();
    if((event.code==='KeyP'||event.code==='Escape')&&!event.repeat){if(state==='paused')resume();else pause();return;}
    if(state!=='running')return;keys.add(event.code);
    if(['Space','ArrowUp','KeyW'].includes(event.code)&&!event.repeat)jump();
  });
  window.addEventListener('keyup',event=>keys.delete(event.code));
  window.addEventListener('blur',()=>{clearInput();pause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();pause();}});
  document.querySelectorAll('[data-move]').forEach(button=>{
    button.addEventListener('pointerdown',event=>{event.preventDefault();if(state==='running'){touches.set(event.pointerId,Number(button.dataset.move));button.setPointerCapture(event.pointerId);}});
    for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,event=>touches.delete(event.pointerId));
  });
  $('jumpBtn').addEventListener('pointerdown',event=>{event.preventDefault();jump();});
  function updateFullscreenLabel(){const label=t(document.fullscreenElement?'exitFullscreen':'fullscreen');$('fullscreenBtn').title=label;$('fullscreenBtn').setAttribute('aria-label',label);}
  $('fullscreenBtn').addEventListener('click',async()=>{
    try{if(document.fullscreenElement)await document.exitFullscreen();else await shell.requestFullscreen();}catch(_){toast('fullscreenError');}
    $('fullscreenBtn').blur();updateFullscreenLabel();
  });
  document.addEventListener('fullscreenchange',updateFullscreenLabel);
  new ResizeObserver(resize).observe(canvas);
  resize();reset();setLanguage('en');requestAnimationFrame(frame);
})();
