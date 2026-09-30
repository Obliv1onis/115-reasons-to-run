// Historical questions are frozen to the published records linked below.
// Proper names are kept in their usual English spelling in both languages.
window.FOOTBALL_QUESTIONS = (() => {
  const PL = 'https://www.premierleague.com/en/stats/records';
  const TITLES = 'https://www.premierleague.com/en/premier-league-explained';
  const BOOT = 'https://www.premierleague.com/en/news/1206108';
  const GLOVE = 'https://www.premierleague.com/en/news/1206130/premier-league-golden-glove-award-winners';
  const GOAL = 'https://www.premierleague.com/en/news/3529385';
  const MANAGERS = 'https://www.premierleague.com/en/news/4660971/every-premier-league-title-winning-manager-in-history';
  const RULING = 'https://www.premierleague.com/en/news/4727779/premier-league-statement-manchester-city-fc/';
  const FINALS = 'https://es.uefa.com/news/0252-0e98d341867a-1f3b773dccf1-1000--todas-las-finales-en-video/';
  const UEFA = 'https://www.uefa.com/uefachampionsleague/news/0252-0e98c715bb79-dea77f56e2bd-1000--champions-league-final-records-and-statistics/';
  const UEFA_GOALS = 'https://www.uefa.com/uefachampionsleague/history/rankings/players/goals_scored/';
  const UEFA_APPS = 'https://www.uefa.com/uefachampionsleague/news/025a-0e9f8a3d1e40-d534e8b4a897-1000--ronaldo-equals-casillas-record/';
  const UEFA_FAST = 'https://www.uefa.com/uefachampionsleague/news/0237-0e966468be2a-209986d8dffd-1000--ten-years-on-makaay-scores-fastest-champions-league-goal/';
  const UEFA_HATS = 'https://www.uefa.com/news/0257-0e99f0d0d91b-eb0f4ba7a8f7-1000--champions-league-hat-tricks/';
  const epl = [], ucl = [];
  const label = (en, zh=en) => ({en,zh});
  const clubs = {
    mun:label('Manchester United','曼联'), blb:label('Blackburn Rovers','布莱克本'),
    ars:label('Arsenal','阿森纳'), che:label('Chelsea','切尔西'),
    lei:label('Leicester City','莱斯特城'), liv:label('Liverpool','利物浦'),
    tot:label('Tottenham Hotspur','热刺'), new:label('Newcastle United','纽卡斯尔联'),
    eve:label('Everton','埃弗顿'), derby:label('Derby County','德比郡'),
    por:label('Portsmouth','朴茨茅斯'), rea:label('Reading','雷丁'),
    sou:label('Southampton','南安普顿'), sun:label('Sunderland','桑德兰'),
    mar:label('Marseille','马赛'), mil:label('AC Milan','AC米兰'),
    ajax:label('Ajax','阿贾克斯'), juv:label('Juventus','尤文图斯'),
    dort:label('Borussia Dortmund','多特蒙德'), real:label('Real Madrid','皇家马德里'),
    bay:label('Bayern Munich','拜仁慕尼黑'), bar:label('Barcelona','巴塞罗那'),
    porto:label('Porto','波尔图'), inter:label('Inter Milan','国际米兰'),
    atl:label('Atlético Madrid','马德里竞技'), psg:label('Paris Saint-Germain','巴黎圣日耳曼'),
    mon:label('Monaco','摩纳哥'), val:label('Valencia','瓦伦西亚'),
    lev:label('Bayer Leverkusen','勒沃库森')
  };
  const people = Object.fromEntries([
    'Teddy Sheringham','Andrew Cole','Alan Shearer','Kevin Phillips','Jimmy Floyd Hasselbaink',
    'Thierry Henry','Ruud van Nistelrooy','Didier Drogba','Cristiano Ronaldo','Nicolas Anelka',
    'Robin van Persie','Luis Suárez','Harry Kane','Mohamed Salah','Jamie Vardy',
    'Petr Čech','Pepe Reina','Edwin van der Sar','Wojciech Szczęsny','Thibaut Courtois',
    'David de Gea','Alisson Becker','David Raya','Matz Sels','Emre Can','Sofiane Boufal',
    'Andros Townsend','Son Heung-min','Erik Lamela','Julio Enciso','Alejandro Garnacho',
    'Harrison Reed','Sir Alex Ferguson','Kenny Dalglish','Arsène Wenger','José Mourinho',
    'Carlo Ancelotti','Claudio Ranieri','Antonio Conte','Jürgen Klopp','Arne Slot',
    'Mikel Arteta','Ryan Giggs','Brian Deane','Shane Long','Sadio Mané','Eric Cantona',
    'David Beckham','Ethan Nwaneri','James Milner','Brad Friedel','Gareth Barry',
    'Jermain Defoe','Frank Lampard','Lionel Messi','Roy Makaay','Iker Casillas',
    'Robert Lewandowski','Karim Benzema','Luka Modrić','Zinédine Zidane','Xavi Hernández'
  ].map(name=>[name,label(name)]));
  const only = (pool,keys) => Object.fromEntries(keys.map(key=>[key,pool[key]]));
  const championClubs=only(clubs,['mun','blb','ars','che','lei','liv']);
  const englishClubs=only(clubs,['mun','blb','ars','che','lei','liv','tot','new','eve','sun']);
  const finalistClubs=only(clubs,['mun','ars','che','liv','tot','mar','mil','ajax','juv','dort','real','bay','bar','porto','inter','atl','psg','mon','val','lev']);
  const pick = (pool,correct,seed) => {
    const others=Object.keys(pool).filter(key=>key!==correct);
    return [pool[correct],...Array.from({length:3},(_,i)=>pool[others[(seed+i)%others.length]])];
  };
  const add = (bank,en,zh,options,source) => {
    if(options.length!==4||options.some(option=>!option)||new Set(options.map(o=>o.en)).size!==4)throw Error(`Bad options: ${en}`);
    bank.push({prompt:label(en,zh),options,answer:0,source});
  };
  const rows = text => text.trim().split(/\s+/).map(pair=>pair.split(':'));

  // Season title winners, excluding direct Manchester City questions.
  const champions=rows(`1992/93:mun 1993/94:mun 1994/95:blb 1995/96:mun 1996/97:mun 1997/98:ars
    1998/99:mun 1999/00:mun 2000/01:mun 2001/02:ars 2002/03:mun 2003/04:ars
    2004/05:che 2005/06:che 2006/07:mun 2007/08:mun 2008/09:mun 2009/10:che
    2010/11:mun 2012/13:mun 2014/15:che 2015/16:lei 2016/17:che 2019/20:liv
    2024/25:liv 2025/26:ars`);
  champions.forEach(([season,club],i)=>add(epl,
    `Who won the Premier League in ${season}?`,`${season} 赛季的英超冠军是哪支球队？`,pick(championClubs,club,i),TITLES));

  // Single Golden Boot winners. Joint awards and City players are omitted.
  const boots=rows(`1992/93=Teddy_Sheringham,nfo 1993/94=Andrew_Cole,new 1994/95=Alan_Shearer,blb
    1995/96=Alan_Shearer,blb 1996/97=Alan_Shearer,new 1999/00=Kevin_Phillips,sun
    2000/01=Jimmy_Floyd_Hasselbaink,che 2001/02=Thierry_Henry,ars
    2002/03=Ruud_van_Nistelrooy,mun 2003/04=Thierry_Henry,ars 2004/05=Thierry_Henry,ars
    2005/06=Thierry_Henry,ars 2006/07=Didier_Drogba,che 2007/08=Cristiano_Ronaldo,mun
    2008/09=Nicolas_Anelka,che 2009/10=Didier_Drogba,che
    2011/12=Robin_van_Persie,ars 2012/13=Robin_van_Persie,mun
    2013/14=Luis_Suárez,liv 2015/16=Harry_Kane,tot 2016/17=Harry_Kane,tot
    2017/18=Mohamed_Salah,liv 2019/20=Jamie_Vardy,lei 2020/21=Harry_Kane,tot
    2024/25=Mohamed_Salah,liv`.replaceAll('=',':'));
  const bootFacts=boots.map(([season,pair])=>{const [name,club]=pair.split(',');return {season,name:name.replaceAll('_',' '),club};});
  const bootPeople=only(people,[...new Set(bootFacts.map(fact=>fact.name))]);
  bootFacts.forEach(({season,name},i)=>add(epl,
    `Who won the Premier League Golden Boot in ${season}?`,`${season} 赛季谁赢得英超金靴？`,
    pick(bootPeople,name,i+4),BOOT));
  bootFacts.filter(fact=>fact.club!=='nfo').forEach(({season,club},i)=>add(epl,
    `Which club did the ${season} Golden Boot winner represent?`,`${season} 赛季英超金靴得主效力于哪支球队？`,
    pick(englishClubs,club,i+9),BOOT));

  // Golden Glove winners, leaving out shared awards and City keepers.
  const gloves=rows(`2004/05=Petr_Čech 2005/06=Pepe_Reina 2006/07=Pepe_Reina
    2007/08=Pepe_Reina 2008/09=Edwin_van_der_Sar 2009/10=Petr_Čech
    2015/16=Petr_Čech 2016/17=Thibaut_Courtois 2017/18=David_de_Gea
    2018/19=Alisson_Becker 2022/23=David_de_Gea 2023/24=David_Raya
    2025/26=David_Raya`.replaceAll('=',':'));
  const glovePeople=only(people,[...new Set(gloves.map(([,name])=>name.replaceAll('_',' ')))]);
  gloves.forEach(([season,name],i)=>add(epl,
    `Who won the Premier League Golden Glove in ${season}?`,`${season} 赛季谁获得英超金手套？`,
    pick(glovePeople,name.replaceAll('_',' '),i+12),GLOVE));

  const goalWinners=rows(`2016/17=Emre_Can 2017/18=Sofiane_Boufal 2018/19=Andros_Townsend
    2019/20=Son_Heung-min 2020/21=Erik_Lamela 2021/22=Mohamed_Salah
    2022/23=Julio_Enciso 2023/24=Alejandro_Garnacho 2025/26=Harrison_Reed`.replaceAll('=',':'));
  const goalPeople=only(people,goalWinners.map(([,name])=>name.replaceAll('_',' ')));
  goalWinners.forEach(([season,name],i)=>add(epl,
    `Who won Premier League Goal of the Season in ${season}?`,`${season} 赛季谁获得英超赛季最佳进球奖？`,
    pick(goalPeople,name.replaceAll('_',' '),i+17),GOAL));

  const titleManagers=rows(`1994/95=Kenny_Dalglish 1997/98=Arsène_Wenger
    2001/02=Arsène_Wenger 2003/04=Arsène_Wenger 2004/05=José_Mourinho
    2005/06=José_Mourinho 2009/10=Carlo_Ancelotti 2014/15=José_Mourinho
    2015/16=Claudio_Ranieri 2016/17=Antonio_Conte 2019/20=Jürgen_Klopp
    2024/25=Arne_Slot 2025/26=Mikel_Arteta`.replaceAll('=',':'));
  const managerPeople=only(people,[...new Set(titleManagers.map(([,name])=>name.replaceAll('_',' ')))]);
  titleManagers.forEach(([season,name],i)=>add(epl,
    `Who managed the Premier League champions in ${season}?`,`${season} 赛季英超冠军的主教练是谁？`,
    pick(managerPeople,name.replaceAll('_',' '),i+21),MANAGERS));

  const playerRecords = [
    ['the most Premier League goals','英超总进球纪录','Alan Shearer'],
    ['the most Premier League assists','英超总助攻纪录','Ryan Giggs'],
    ['the first Premier League goal','英超历史首粒进球','Brian Deane'],
    ['the fastest Premier League goal','英超最快进球纪录','Shane Long'],
    ['the fastest Premier League hat-trick','英超最快帽子戏法纪录','Sadio Mané'],
    ['the first Premier League hat-trick','英超首个帽子戏法','Eric Cantona'],
    ['goals in the most consecutive Premier League matches','英超连续进球场次纪录','Jamie Vardy'],
    ['the most Premier League free-kick goals','英超任意球进球纪录','David Beckham'],
    ['the most Premier League goals for one club','效力同一家俱乐部的英超进球纪录','Harry Kane'],
    ['the most away goals in the 1999/00 Premier League season','1999/00 赛季英超客场进球纪录','Kevin Phillips'],
    ['the oldest Premier League goalscorer','英超最高龄进球纪录','Teddy Sheringham'],
    ['the youngest Premier League appearance','英超最年轻出场纪录','Ethan Nwaneri'],
    ['the most Premier League appearances','英超出场纪录','James Milner'],
    ['the most consecutive Premier League appearances','英超连续出场纪录','Brad Friedel'],
    ['the most Premier League yellow cards','英超黄牌纪录','Gareth Barry'],
    ['the most Premier League goals as a substitute','英超替补进球纪录','Jermain Defoe']
  ];
  const recordPeople=only(people,[...new Set(playerRecords.map(([, ,name])=>name))]);
  playerRecords.forEach(([record,zhRecord,name],i)=>add(epl,
    `Which player holds the record for ${record}?`,`哪名球员保持着${zhRecord}？`,
    pick(recordPeople,name,i+31),PL));

  const numericRecords = [
    ['Alan Shearer’s all-time Premier League goals','阿兰·希勒的英超总进球数','260','249','251','273'],
    ['Ryan Giggs’s all-time Premier League assists','瑞恩·吉格斯的英超总助攻数','162','154','168','176'],
    ['the fastest Premier League goal, in seconds','英超最快进球用时（秒）','7.69','8.28','9.82','10.12'],
    ['Sadio Mané’s fastest Premier League hat-trick, in minutes and seconds','萨迪奥·马内的英超最快帽子戏法用时','2:56','3:14','4:02','5:12'],
    ['Jamie Vardy’s consecutive scoring matches','杰米·瓦尔迪的连续进球场次','11','9','10','12'],
    ['Chelsea’s 2004/05 Premier League clean sheets','切尔西 2004/05 赛季英超零封场次','25','21','23','27'],
    ['Liverpool’s 2018/19 points without winning the title','利物浦 2018/19 赛季未夺冠的积分','97','91','95','99'],
    ['Derby County’s 2007/08 league points','德比郡 2007/08 赛季英超积分','11','9','13','16'],
    ['Ryan Giggs’s Premier League winners’ medals','瑞恩·吉格斯的英超冠军奖牌数','13','11','12','14'],
    ['the most goals scored by one player in a Premier League match','英超单场个人最多进球数','5','4','6','7'],
    ['the most Premier League Golden Boots won by one player','一名球员赢得的英超金靴最多次数','4','3','5','6'],
    ['Petr Čech’s 2004/05 Golden Glove clean sheets','彼得·切赫 2004/05 赛季金手套零封场次','24','21','22','25'],
    ['Arsène Wenger’s Premier League seasons as manager','阿尔塞纳·温格执教英超的赛季数','22','19','20','24'],
    ['Sir Alex Ferguson’s Premier League wins as manager','弗格森爵士执教英超的胜场数','410','391','402','423']
  ];
  numericRecords.forEach(([record,zhRecord,correct,...wrong])=>add(epl,
    `What is the figure for ${record}?`,`${zhRecord}是多少？`,
    [correct,...wrong].map(value=>label(value)),PL));

  const clubRecords = [
    ['Which club finished unbeaten in the 2003/04 Premier League?','哪支球队在 2003/04 赛季英超保持不败？','ars',['che','liv','mun']],
    ['Which club earned 97 points in 2018/19 but did not win the title?','哪支球队在 2018/19 赛季拿到 97 分却没夺冠？','liv',['ars','che','mun']],
    ['Which club finished the 2007/08 Premier League with 11 points?','哪支球队在 2007/08 赛季英超只拿到 11 分？','derby',['sou','sun','lei']],
    ['Which club recorded 25 clean sheets in the 2004/05 Premier League?','哪支球队在 2004/05 赛季英超完成了 25 场零封？','che',['ars','liv','mun']],
    ['Which club scored seven goals in the 7–4 match against Reading in 2007?','哪支球队在 2007 年对雷丁的 7 比 4 比赛中打入七球？','por',['lei','new','tot']],
    ['Which club won 9–0 away at Southampton in 2019?','哪支球队在 2019 年客场 9 比 0 战胜南安普顿？','lei',['liv','che','mun']],
    ['Which club conceded only 15 league goals on its way to the 2004/05 title?','哪支球队在 2004/05 赛季夺冠途中只丢了 15 个联赛进球？','che',['ars','liv','mun']]
  ];
  clubRecords.forEach(([en,zh,correct,wrong])=>add(epl,en,zh,[correct,...wrong].map(key=>clubs[key]),PL));

  // Three questions on the Premier League's 29 September 2026 published findings.
  add(epl,"Which seasons did the independent Commission examine for Manchester City's main financial-rule breaches?",
    '独立委员会审查的曼城的主要财务规则违规发生在哪些赛季？',
    ['2009/10–2017/18','2012/13–2020/21','2015/16–2023/24','2003/04–2011/12'].map(value=>label(value)),RULING);
  add(epl,"When did the Premier League issue its formal complaint in the Manchester City's 115-charges case?,
    '英超在针对曼城的“115 项指控”案件中何时正式提出申诉？',
    ['February 2023','December 2018','December 2024','September 2026'].map((en,i)=>label(en,['2023 年 2 月','2018 年 12 月','2024 年 12 月','2026 年 9 月'][i])),RULING);
  add(epl,'After the 29 September 2026 core decision for the 115-charges case, what still required a separate hearing?',
    '2026 年 9 月 29 日公布对“115 项指控”案的核心裁决后，什么仍须另行听证？',
    [label('The sanction','处罚决定'),label('Whether a complaint was filed','是否提出过申诉'),label('Which league was involved','涉及哪个联赛'),label('The hearing’s start date','听证会何时开始')],RULING);

  // Champions League finals: all questions omit finals featuring Manchester City.
  const finalists=rows(`1993:mar,mil 1994:mil,bar 1995:ajax,mil 1996:juv,ajax
    1997:dort,juv 1998:real,juv 1999:mun,bay 2000:real,val
    2001:bay,val 2002:real,lev 2003:mil,juv 2004:porto,mon
    2005:liv,mil 2006:bar,ars 2007:mil,liv 2008:mun,che
    2009:bar,mun 2010:inter,bay 2011:bar,mun 2012:che,bay
    2013:bay,dort 2014:real,atl 2015:bar,juv 2016:real,atl
    2017:real,juv 2018:real,liv 2019:liv,tot 2020:bay,psg
    2022:real,liv 2024:real,dort 2025:psg,inter 2026:psg,ars`);
  finalists.forEach(([year,pair],i)=>{
    const [winner]=pair.split(',');
    add(ucl,`Who won the ${year} Champions League final?`,`${year} 年欧冠决赛的冠军是哪支球队？`,
      pick(finalistClubs,winner,i+7),FINALS);
  });
  const opponentYears=new Set(['1994','1997','2004','2005','2006','2008','2010','2012','2019','2025']);
  finalists.filter(([year])=>opponentYears.has(year)).forEach(([year,pair],i)=>{
    const [winner,loser]=pair.split(',');
    add(ucl,`Which club lost the ${year} Champions League final to ${clubs[winner].en}?`,
      `哪支球队在 ${year} 年欧冠决赛中输给了${clubs[winner].zh}？`,
      pick(finalistClubs,loser,i+34),FINALS);
  });
  const uclRecords = [
    ['Which club has won the most Champions League-era titles?','哪支球队赢得最多欧冠时代冠军？','real',['bar','bay','mil'],UEFA],
    ['Which club ranks second for all-time European Cup titles?','哪支球队的欧冠及欧洲冠军杯总冠军数排第二？','mil',['bay','liv','bar'],UEFA],
    ['Which club has lost the most Champions League-era finals?','哪支球队在欧冠时代输掉最多决赛？','juv',['bay','mil','liv'],UEFA]
  ];
  uclRecords.forEach(([en,zh,correct,wrong,source])=>add(ucl,en,zh,[correct,...wrong].map(key=>clubs[key]),source));
  const uclPeople = [
    ['Who has scored the most Champions League goals?','谁保持着欧冠总进球纪录？','Cristiano Ronaldo',['Lionel Messi','Robert Lewandowski','Karim Benzema'],UEFA_GOALS],
    ['Who has played the most Champions League matches?','谁保持着欧冠出场纪录？','Cristiano Ronaldo',['Iker Casillas','Lionel Messi','Luka Modrić'],UEFA_APPS],
    ['Who scored the fastest Champions League goal?','谁打入了欧冠历史最快进球？','Roy Makaay',['Cristiano Ronaldo','Lionel Messi','Robert Lewandowski'],UEFA_FAST],
    ['Who scored the fastest Champions League hat-trick?','谁打入了欧冠历史最快帽子戏法？','Mohamed Salah',['Cristiano Ronaldo','Lionel Messi','Robert Lewandowski'],UEFA_HATS],
    ['Which coach has won the most Champions League finals?','哪位主教练赢得最多欧冠决赛？','Carlo Ancelotti',['Zinédine Zidane','José Mourinho','Jürgen Klopp'],UEFA]
  ];
  uclPeople.forEach(([en,zh,correct,wrong,source])=>add(ucl,en,zh,[correct,...wrong].map(name=>people[name]),source));

  if(epl.length!==150||ucl.length!==50)throw Error(`Question bank size: EPL ${epl.length}, UCL ${ucl.length}`);
  return {epl,ucl};
})();
