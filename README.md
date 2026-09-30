# 115 Reasons to Run

A satirical, unofficial Premier League platformer. Control Manchester City's badge, collect trophies, and stay ahead of the chasing League lion and occasional UEFA pursuit. The game refers to the 115 charges as allegations; its outcomes are fictional.

The game runs in a browser with no build step or dependencies. Open [`index.html`](index.html) to play. It starts in English; use the language button to switch to Chinese.

## How to play

| Action | Keyboard | Touchscreen |
| --- | --- | --- |
| Move | `←` / `→` or `A` / `D` | Left and right buttons |
| Jump | `Space`, `↑`, or `W` | Jump button |
| Pause or resume | `P` or `Esc` | — |

Use the fullscreen button in the top right if you want the game to fill the display. The camera follows smoothly once you leave the center area. Platforms, barriers, trophies, and lawyers appear as you explore in either direction.

You start with **900 mil** and **one life**. Moving costs **0.08 mil per metre**. A Premier League trophy adds **150 mil**; some trigger a random challenge against one of the original rival clubs, and you receive the trophy only if you win. A Champions League trophy adds **500 mil** and always triggers a challenge. Its rivals include the original clubs except Tottenham, plus Atlético Madrid, Barcelona, Bayern Munich, Inter, Paris Saint-Germain, and Real Madrid. A lawyer costs **100 mil** and adds one life. If a pursuer catches you while you have an extra life, you spend that life and that pursuer freezes in place for **1.5 seconds**. The run ends when a pursuer catches you with one life left or your budget reaches zero. Those endings have different messages.

Each generated map section averages **1.5 Premier League trophies**, has an **80% chance of containing one lawyer**, and has a **5% chance of containing one Champions League trophy**. The HUD tracks the two trophy counts separately for the current run.

Every **15 Premier League trophies**, the League starts a **15-second prosecution mode**. The lion runs at **1.7× its usual speed** and reacts more quickly, the City badge changes to its charged version, Champions League trophies stop appearing, Premier League trophies drop to **0.7 per map section** on average, and each section gets **one lawyer**. Normal spawn rates return when the hearing is adjourned. The timer advances only while you are running.

The button in the lower right grants **900 mil** and invites a **30-second prosecution mode**; it has a **90-second cooldown**. Every **three Champions League trophies**, UEFA enters from the left edge of the screen for a **15-second prosecution**. UEFA and the League lion both chase at **1.7× their normal speed** during a hearing. When UEFA's timer ends, it stops at its current position and no longer chases. Overlapping hearings use the longer remaining League timer; UEFA's own chase lasts 15 seconds. Timers and cooldowns advance only while running.

## Files

- [`index.html`](index.html): game page and interface
- [`style.css`](style.css): responsive layout and overlays
- [`game.js`](game.js): movement, terrain generation, AI, economy, and language strings
- [`logos/`](logos): club badges, trophy art, and lawyer sprite

The source code is released under the [MIT License](LICENSE). Club and league marks belong to their respective owners; this fan game is not affiliated with them.
