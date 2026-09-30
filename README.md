# 115 Reasons to Run

A satirical, unofficial Premier League platformer. Control Manchester City's badge, collect trophies, and stay ahead of the chasing League lion. The game refers to the 115 charges as allegations; its outcomes are fictional.

The game runs in a browser with no build step or dependencies. Open [`index.html`](index.html) to play. It starts in English; use the **中文** button to switch languages.

## How to play

| Action | Keyboard | Touchscreen |
| --- | --- | --- |
| Move | `←` / `→` or `A` / `D` | Left and right buttons |
| Jump | `Space`, `↑`, or `W` | Jump button |
| Pause or resume | `P` or `Esc` | — |

Use the fullscreen button in the top right if you want the game to fill the display. The camera follows smoothly once you leave the center area. Platforms, barriers, trophies, and lawyers appear as you explore in either direction.

You start with **500 mil** and **one life**. Moving costs **0.08 mil per metre**. A trophy adds **150 mil**; some trophies trigger a random challenge against another club, and you receive the trophy only if you win. A lawyer costs **100 mil** and adds one life. If the lion catches you while you have an extra life, you spend that life and the lion freezes in place for **1.5 seconds**. The run ends when the lion catches you with one life left or your budget reaches zero. Those endings have different messages.

Each generated map section has an **80% chance of containing one lawyer**. Trophies are deliberately rare. Your best trophy count is saved in the browser's local storage.

## 中文说明

这是一个讽刺风格的非官方英超平台小游戏。操控曼城队标收集奖杯，躲开追赶你的英超狮子。游戏提到的 115 项是指控；游戏结局纯属虚构。

直接用浏览器打开 [`index.html`](index.html) 即可游玩，无需安装依赖。默认英文，点击右上角的 **中文** 按钮切换语言。

- **移动：** `←` / `→` 或 `A` / `D`；触屏使用左右按钮。
- **跳跃：** 空格、`↑` 或 `W`；触屏使用跳跃按钮。
- **暂停 / 继续：** `P` 或 `Esc`。

每局从 **500 mil** 和 **一条命** 开始。移动每米消耗 **0.08 mil**，收集奖杯增加 **150 mil**。部分奖杯会触发与其他俱乐部的随机小游戏，获胜才能拿到奖杯。律师花费 **100 mil**，增加一条命；有额外生命时被狮子碰到，会消耗一条命，并让狮子原地静止 **1.5 秒**。资金耗尽，或只剩一条命时再次被狮子抓到，游戏结束。

每段随机地图有 **80% 概率出现一名律师**。奖杯较稀有，最佳奖杯数会保存在浏览器本地。

## Files

- [`index.html`](index.html): game page and interface
- [`style.css`](style.css): responsive layout and overlays
- [`game.js`](game.js): movement, terrain generation, AI, economy, and language strings
- [`logos/`](logos): club badges, trophy art, and lawyer sprite

The source code is released under the [MIT License](LICENSE). Club and league marks belong to their respective owners; this fan game is not affiliated with them.
