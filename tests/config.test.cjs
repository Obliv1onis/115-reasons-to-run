const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../game.js'),'utf8');
const config=JSON.parse(fs.readFileSync(require.resolve('../game-config.json'),'utf8'));
function generate(overrides,prosecutionTime=0){
  const CONFIG=structuredClone(config);Object.assign(CONFIG.spawn,overrides);
  const context=vm.createContext({CONFIG,prosecutionTime});
  vm.runInContext(`
    const CHUNK=CONFIG.terrain.chunkWidth;
    let chunks=new Map(),runSeed=1234;
    ${source.slice(source.indexOf('  function randomFor'),source.indexOf('  function terrain'))}
    globalThis.chunk=makeChunk(1);
  `,context);
  return context.chunk;
}
test('JSON controls all trophy, lawyer and prosecution spawn rates',()=>{
  for(const active of [0,15]){
    const chunk=generate({eplPerChunk:3,prosecutionEplPerChunk:3,uclChance:1,prosecutionUclChance:1,lawyerChance:1,prosecutionLawyerChance:1},active);
    assert.equal(chunk.trophies.filter(t=>t.kind==='epl').length,3);
    assert.equal(chunk.trophies.filter(t=>t.kind==='ucl').length,1);
    assert.equal(chunk.lawyers.length,1);
    const empty=generate({eplPerChunk:0,prosecutionEplPerChunk:0,uclChance:0,prosecutionUclChance:0,lawyerChance:0,prosecutionLawyerChance:0},active);
    assert.equal(empty.trophies.length,0);assert.equal(empty.lawyers.length,0);
  }
});
test('game initializes after loading the external JSON',async()=>{
  let frameRequested=false;
  const elements=new Map();
  const element=()=>new Proxy({classList:{add(){},remove(){},toggle(){}},style:{},getContext:()=>({setTransform(){}}),addEventListener(){},setAttribute(){},getBoundingClientRect:()=>({width:1000,height:700})},{get:(obj,key)=>key in obj?obj[key]:undefined});
  const context=vm.createContext({console,fetch:async path=>{assert.equal(path,'game-config.json');return {ok:true,json:async()=>config};},document:{documentElement:{},getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector:()=>element(),querySelectorAll:()=>[],addEventListener(){}},window:{addEventListener(){},devicePixelRatio:1},Image:class{},ResizeObserver:class{observe(){}},requestAnimationFrame(){frameRequested=true;},performance:{now:()=>0},Math});
  await vm.runInContext(source,context);
  assert.ok(frameRequested,'must start the render loop after configuration is available');
});
