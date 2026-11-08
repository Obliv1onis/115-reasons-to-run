# 115 Reasons to Run

An unofficial Premier League platformer game. Control Manchester City's badge, collect trophies, and stay ahead of the chasing League lion and occasional UEFA pursuit. The satire references the charges and the Premier League's published commission findings; the game's outcomes are fictional.

The game runs in a browser with no build step or dependencies. Serve the folder over HTTP to play (for example, `python3 -m http.server 8000`, then open `http://localhost:8000`). The game loads its settings from JSON; opening `index.html` with `file://` is not supported. It starts in English; use the language button to switch to Chinese.

## How to play

| Action | Keyboard | Touchscreen |
| --- | --- | --- |
| Move | `←` / `→` or `A` / `D` | Left and right buttons |
| Jump | `Space`, `↑`, or `W` | Jump button |
| Pause or resume | `P` or `Esc` | — |

Use the fullscreen button in the top right if you want the game to fill the display. The camera follows smoothly once you leave the center area. Platforms, barriers, trophies, and lawyers appear as you explore in either direction.

The arrow button in the top-right controls opens a randomly chosen YouTube reaction or critique published after the September 2026 verdict reports. Its 50 selected destinations are listed in [`videos.js`](videos.js); each video is shown once before the list reshuffles. The user-suggested Vizeh video starts at 1:00.

You start with **900 mil** and **one life**. Moving costs **0.08 mil per metre**. A Premier League trophy adds **150 mil**; some trigger a random challenge against one of the original rival clubs, and you receive the trophy only if you win. A Champions League trophy adds **500 mil** and always triggers a challenge. Its rivals include the original clubs except Tottenham, plus Atlético Madrid, Barcelona, Bayern Munich, Inter, Paris Saint-Germain, and Real Madrid. A lawyer costs **100 mil** and adds one life. If a pursuer catches you while you have an extra life, you spend that life and that pursuer freezes in place for **1.5 seconds**. The run ends when a pursuer catches you with one life left or your budget reaches zero. Those endings have different messages.

Trophy disputes are four-choice football trivia questions. The curated bilingual bank currently has **43 Premier League questions** and **21 Champions League questions**, with no fixed quota. It mixes player moments, records, awards, managers, notable matches, selected finals, and three questions on the [Premier League's 29 September 2026 commission statement](https://www.premierleague.com/en/news/4727779/premier-league-statement-manchester-city-fc/). Answers link to the relevant Premier League or UEFA source. Questions do not repeat in a run until that competition's deck is exhausted.

Each generated map section averages **1.5 Premier League trophies**, has an **80% chance of containing one lawyer**, and has a **25% chance of containing one Champions League trophy**. The HUD tracks the two trophy counts separately for the current run.

Every **15 Premier League trophies**, the League starts a **15-second prosecution mode**. The lion runs at **1.35× its usual speed** and reacts more quickly, the City badge changes to its charged version, Champions League trophies stop appearing, Premier League trophies drop to **0.7 per map section** on average, and each section gets **one lawyer**. Normal spawn rates return when the hearing is adjourned. The timer advances only while you are running.

The button in the lower right grants **900 mil** and invites a **30-second prosecution mode**; it has a **90-second cooldown**. Every **three Champions League trophies**, UEFA enters from the left edge of the screen for a **15-second prosecution**. UEFA and the League lion both chase at **1.35× their normal speed** during a hearing and keep that speed as they close in. When a target is below their platform, pursuers head for a platform edge and drop before resuming the chase. When UEFA's timer ends, it stops at its current position and no longer chases. Overlapping hearings use the longer remaining League timer; UEFA's own chase lasts 15 seconds. Timers and cooldowns advance only while running.

## Files

- [`index.html`](index.html): game page and interface
- [`style.css`](style.css): responsive layout and overlays
- [`game.js`](game.js): movement, terrain generation, AI, economy, and language strings
- [`questions.js`](questions.js): sourced bilingual football trivia bank
- [`logos/`](logos): club badges, trophy art, and lawyer sprite

The source code is released under the [MIT License](LICENSE). Club and league marks belong to their respective owners; this fan game is not affiliated with them.

## 调整游戏数值

统一编辑 [`game-config.json`](game-config.json)，保存并刷新页面即可生效，无需改 JavaScript。概率范围是 0–1（`0.25` 即 25%）；所有时间单位为秒。已有存档不持久化，刷新会重新开始。

- `spawn`：英超每区块平均数量、欧冠/律师出现概率、调查期间概率、英超答题概率、地图镜像概率。欧冠默认由 15% 提高至 25%。
- `economy`：初始资金/生命、跑动费用、奖杯奖金、律师费用/生命、冻结与接触保护时间、救助金额/冷却。
- `prosecution`：两类奖杯触发数量、调查时长、UEFA 追击时长、救助调查时长、追兵速度倍率。
- `physics`：移动速度、加速/刹车、重力、跳跃、追兵跳跃倍率、物理步长、跳跃宽限/缓冲。
- `navigation`：寻路刷新周期、跳跃冷却、障碍探测距离、卡住判定时间。
- `terrain`：区块宽度、平台布局及初始区块布局。平台三元组为 `[区块内横坐标, 高度, 宽度]`；改布局时需保持跳跃可达。

`eplPerChunk` 等数量需非负；触发数量需正整数；速度、重力、物理步长、区块宽度需大于零。调整调查期间欧冠概率后，欧冠仍会按调查规则暂时隐藏，结束后可收集。

验证：`node --test tests/*.test.cjs`。
