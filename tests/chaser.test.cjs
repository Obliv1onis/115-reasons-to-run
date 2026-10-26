const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

// Exercise the game's actual physics and AI without starting the canvas UI.
const source = fs.readFileSync(require.resolve('../game.js'), 'utf8');
function simulation() {
  const context = vm.createContext({});
  vm.runInContext(`
    const PLAYER_SPEED=360,LION_SPEED=PLAYER_SPEED*.82;
    const LION_ACCEL=1050,LION_BRAKE=1550,GRAVITY=1900,JUMP_SPEED=950,CHUNK=1800;
    let prosecutionTime=0,player;
    ${source.slice(source.indexOf('  const clamp ='), source.indexOf('  function randomFor'))}
    ${source.slice(source.indexOf('  const GROUND_SURFACE='), source.indexOf('  function reset'))}
    ${source.slice(source.indexOf('  function moveActor('), source.indexOf('  function update(dt)'))}
    globalThis.api={actor,dropRoute,updateChaser,setPlayer(value){player=value;}};
  `, context);
  return context.api;
}

for (const height of [48, 58, 74, 106, 150]) {
  test(`resumes pursuit after dropping from a ${height}px surface`, () => {
    const api = simulation();
    const surface = { x: 0, y: -height, w: 240, h: height };
    const world = { obstacles: [], platforms: [surface] };
    const chaser = api.actor(160, 74);
    chaser.y = surface.y - chaser.h;
    chaser.support = surface;
    const player = api.actor(450, 64);
    api.setPlayer(player);
    let landed = false;
    for (let frame = 0; frame < 600; frame++) {
      api.updateChaser(chaser, 1 / 120, world);
      if (chaser.onGround && !chaser.support) { landed = true; break; }
    }
    assert.ok(landed, 'must leave the platform and reach the ground');
    // Turn back after landing: a stale drop direction used to override pursuit.
    player.x = -400;
    for (let frame = 0; frame < 240; frame++) api.updateChaser(chaser, 1 / 120, world);
    assert.equal(chaser.dropRoute, null);
    assert.ok(chaser.vx < 0, 'must turn toward the player');
  });
}

test('keeps the drop route in midair, clears it upon landing on a lower ledge', () => {
  const api = simulation();
  const upper = { x: 0, y: -150, w: 240, h: 24 };
  const lower = { x: 220, y: -100, w: 240, h: 24 };
  const chaser = api.actor(160, 74);
  chaser.y = upper.y - chaser.h;
  chaser.support = upper;
  api.setPlayer(api.actor(450, 64));
  const world = { obstacles: [], platforms: [upper, lower] };
  const route = api.dropRoute(chaser, 1000, world, 450, true);
  chaser.onGround = false;
  chaser.support = null;
  assert.equal(api.dropRoute(chaser, 1000, world, 450, true), route);
  chaser.onGround = true;
  chaser.support = lower;
  chaser.y = lower.y - chaser.h;
  const nextRoute = api.dropRoute(chaser, 1000, world, 450, true);
  assert.notEqual(nextRoute, route);
  assert.equal(nextRoute.surface, lower);
});
