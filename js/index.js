(function(){
  // IdlePoll
  // Copyright © infernal3 2025
  // Usage rights of this file are in the attached LICENSE.
  // 
  // Debug Mode
  var debugMode=true;
  //
  //
  //
  var el=E=>document.getElementById(E);
  var DelayMsg=["You can only take one action every 1 minute.",
                "Actions are delayed for up to 1 minute.",
                "It's IDLE! Wait 1 minute to take an action.",
                "You need to wait 1 minute for the next action.",
                "Actions have a cooldown for one minute.",
                "Actions are on cooldown for 1 minute. You're lucky it's not 1 hour.",
                "Slow down! Wait 1 minute to take the next action.",
                "Actions are throttled with a 1 minute delay.",
                "You need to wait 1 minute to perform this action.",
                "Wait 1 minute to take your next action."];
  var randomDelayMsg=function randomDelayMsg(){
    return DelayMsg[parseInt(Math.random()*DelayMsg.length)];
  }
  var U1Scaling=function U1Scaling(x){
    if(typeof(x)!=='number'||!isFinite(x)||x<0)return 0;
    return void 0;
  }
  // Data point obfuscation! No idea why I did this, it just exists.
  // Yes, it's confusing. That is LITERALLY THE POINT.
  var L=new Map([["Points",".UG9pbnR"],["Round",".Um91bmQ"],["Upgrade",".VXBncmF"],["Option",".T3B0aW9"],[void 0,".VW5kZWZ"],["Last",".VGltZXI"]]);
  
  var createButton=function createButton(id,name,func){
    if(debugMode)console.log(`[IdlePoll:Debug] function call createButton(${id},${name},${func});`);
    var temp=document.createElement("button");
    temp.id=id;
    temp.textContent=`[${name}]`;
    temp.addEventListener("click",func);
    return temp;
  }
  var setupHTML=function setupHTML(){
    // This function is called once, when the page is being set up.
    // Requires DOM content to be loaded.
    // Creates and sets up the HTML page.
    if(debugMode)console.log("[IdlePoll:Debug] function call setupHTML();");
    var app=document.createElement("div"),div0=document.createElement("div"),div1=document.createElement("div"),div2=document.createElement("div"),div3=document.createElement("div");
    app.id="app";
    div1.id="idleData";
    div2.id="choices";
    div1.innerHTML=`
    Idle&nbsp;Poll,&nbsp;Round&nbsp;#<span id="round">1</span>.<br>
    You&nbsp;have&nbsp;<span id="points">10</span>&nbsp;Points.<br><br>Options:<br>
    <span id="O1"><span class="shown">[O1]</span>&nbsp;+<span id="O1Effect">100</span>&nbsp;Points</span><br>
    <span id="O2"><span class="shown">[O2]</span>&nbsp;x<span id="O2Effect">10</span>&nbsp;Points</span><br>
    <span id="O3"><span class="shown">[O3]</span>&nbsp;^1.5&nbsp;Points</span><br>
    <br>Upgrades:<br>
    <span id="U1"><span class="shown">[U1]</span>&nbsp;Multiply&nbsp;O2's&nbsp;effect&nbsp;by&nbsp;x<span id="U1Effect">1000</span>.</span><span id="U1-extra" class="aside">Cost: 1000 Points</span><br>
    <span id="U2"><span class="shown">[U2]</span>&nbsp;Unlock&nbsp;O3,&nbsp;which&nbsp;raises&nbsp;Points&nbsp;to&nbsp;^1.5.</span><span id="U2-extra" class="aside">Cost: 1e10 Points</span><br>
    <span id="U3"><span class="shown">[U3]</span>&nbsp;Make U1 rebuyable and boost O1.</span><span id="U3-extra" class="aside">Cost: 1e50 Points</span><br>
    `;
    div0.append(createButton("click_import","Import from Clipboard",()=>{ImportClipboard();}));
    div0.append(createButton("click_export","Export to Clipboard",()=>{Export();}));
    div0.append(createButton("click_hreset","HARD RESET",()=>{HardReset();}));
    app.append(div0);
    app.append(div1);
    div2.append(createButton("click1","O1",()=>{HandleAction("O1");}));
    div2.append(createButton("click2","O2",()=>{HandleAction("O2");}));
    div2.append(createButton("click3","O3",()=>{HandleAction("O3");}));
    div2.append(createButton("click11","U1",()=>{HandleAction("U1");}));
    div2.append(createButton("click12","U2",()=>{HandleAction("U2");}));
    div2.append(createButton("click13","U3",()=>{HandleAction("U3");}));
    div3.id="delay";
    div2.append(div3);
    app.append(div2);
    document.body.append(app);
    
  }
  var setupVariableHTML=function setupVariableHTML(){
    // This function is called once, when the page is being set up.
    // Requires a DATA object to be loaded.
    // Modifies some aspects of the page that are data-sensitive.
    if(Data[L.get("Upgrade")][1])el("U1-extra").textContent="BOUGHT";
    if(Data[L.get("Upgrade")][2])el("U2-extra").textContent="BOUGHT";
    if(Data[L.get("Upgrade")][3])el("U3-extra").textContent="BOUGHT";
    el('click3').style=Data[L.get("Upgrade")][2]?"":"display:none;";
  }
  var updateHTML=function updateHTML(){
    // This function is called very often.
    // Updates some HTML stuff.
    el("round").textContent=globalThis.Data[L.get("Round")];
    el("points").textContent=globalThis.Data[L.get("Points")];
    el("O1Effect").textContent=globalThis.Data[L.get("Option")][1];
    el("O2Effect").textContent=globalThis.Data[L.get("Option")][2];
  }
  var setupData=function setupData(){
    // This function is called once, when the page is being set up.
    // Creates a DATA object to hold all data.
    if(debugMode)console.log("[IdlePoll:Debug] function call setupData();");
    if(localStorage&&localStorage.getItem("idlePollSave")){
      if(debugMode)console.log("[IdlePoll:Debug] Loaded existing save.");
      var Data=JSON.parse(atob(localStorage.getItem("idlePollSave")));
      Data[L.get("Points")]=new Decimal(Data[L.get("Points")]);
      if(Data[L.get("Points")].toString()=="Infinity")Data[L.get("Points")]=new Decimal(Number.MAX_VALUE);
      return Data;
      // Parse Decimals
    }
    // Save does not exist
    if(debugMode)console.log("[IdlePoll:Debug] Created a new save.");
    var Data={},obj1=[void 0,100,10,void 0],obj2=[void 0,0,0,0];
    L.forEach((v,k)=>{Data[v]=undefined;});
    Data[L.get("Option")]=obj1;
    Data[L.get("Upgrade")]=obj2;
    Data[L.get("Points")]=new Decimal(10);
    Data[L.get("Round")]=1;
    Data[L.get("Last")]=Date.now()-60000;
    return Data;
  }
  var save=function save(){
    if(debugMode)console.log("[IdlePoll:Debug] function call save();");
    if(!Data){
      throw new Error("[IdlePoll] Attempted to save without a save object.");
    }
    localStorage.setItem("idlePollSave",btoa(JSON.stringify(Data)));
    if(debugMode)console.log("[IdlePoll:Debug] Save complete.");
  }
  var Export=async function Export(){
    if(debugMode)console.log("[IdlePoll:Debug] function call export();");
    save();
    try {
      await navigator.clipboard.writeText(localStorage.getItem("idlePollSave"));
      if(debugMode)console.log("[IdlePoll:Debug] Exported save.");
    } catch (error) {
      console.error("[IdlePoll] "+error.message);
    }
  }
  var Import=function Import(data){
    if(debugMode)console.log(`[IdlePoll:Debug] function call import(${data});`);
    if(!JSON.parse(atob(data))){
      console.error("[IdlePoll] Malformed import data.");
      return;
    }
    if(debugMode)console.log("[IdlePoll:Debug] Imported save.");
    Data=JSON.parse(atob(data));
  }
  var ImportClipboard=async function ImportClipboard(){
    if(debugMode)console.log("[IdlePoll:Debug] function call importClipboard();");
    var clipTxt=await navigator.clipboard.readText();
    Import(clipTxt);
  }
  var HardReset=function HardReset(){
    if(debugMode)console.log("[IdlePoll:Debug] function call hardReset();");
    if(localStorage.getItem("idlePollSave")){
      localStorage.removeItem("idlePollSave");
    }
    window.setTimeout(()=>{location.reload();},150);
  }

  var HandleAction=function HandleAction(action){
    // Handles actions.
    // All actions have a base property, that is, they advance the round and have delay.
    if(debugMode)console.log(`[IdlePoll:Debug] function call HandleAction(${action});`);
    if(Date.now()-Data[L.get("Last")]<60000){
      el("delay").textContent=randomDelayMsg();
      console.log(`[IdlePoll] Action "${action}" was prevented.`);
      return;
    }
    var invalid=void 0;
    switch(action){
      case "O1":
        invalid=O1();
        break;
      case "O2":
        invalid=O2();
        break;
      case "U1":
        invalid=U1();
        break;
      case "U2":
        invalid=U2();
        break;
      case "O3":
        invalid=O3();
        break;
      case "U3":
        invalid=U3();
        break;
      default:
        console.warn(`[IdlePoll] Action ${action} does not exist.`);
        break;
    }
    if(invalid){
      el("delay").textContent=invalid;
      return;
    }
    Data[L.get("Round")]+=1;
    Data[L.get("Last")]=Date.now();
    el("delay").textContent="";
    save();
  }
  var O1=function O1(){
    if(debugMode)console.log("[IdlePoll:Debug] function call O1();");
    Data[L.get("Points")]=Data[L.get("Points")].add(globalThis.Data[L.get("Option")][1]);
  }
  var O2=function O2(){
    if(debugMode)console.log("[IdlePoll:Debug] function call O2();");
    Data[L.get("Points")]=Data[L.get("Points")].mul(globalThis.Data[L.get("Option")][2]);
  }
  var O3=function O3(){
    if(debugMode)console.log("[IdlePoll:Debug] function call O3();");
    if(!Data[L.get("Upgrade")][2])return "LOCKED: Purchase U2 to unlock";
    Data[L.get("Points")]=Data[L.get("Points")].pow(1.5);
  }
  var U1=function U1(){
    if(debugMode)console.log("[IdlePoll:Debug] function call U1();");
    if(Data[L.get("Upgrade")][3]){
      // We have U3. U1 is now rebuyable.
      var pointsNeeded=new Decimal(1000).pow(Data[L.get("Upgrade")][1]+1);// TODO: add U1 softcap
      if(Data[L.get("Points")].lt(pointsNeeded))return `Insufficient Points: Need ${pointsNeeded}`;
      Data[L.get("Upgrade")][1]=(Data[L.get("Upgrade")][1]||0)+1;//TODO: add bulk buy
      Data[L.get("Points")]=Data[L.get("Points")].sub(pointsNeeded);
      el("U1-extra").textContent=`Bought x${Data[L.get("Upgrade")][1]}. Next at ${pointsNeeded} Points`;
      Data[L.get("Option")][1]=new Decimal(100).mul(new Decimal(1000).pow(Data[L.get("Upgrade")][1]));
      Data[L.get("Option")][2]=10*Math.pow(1000,Data[L.get("Upgrade")][1])
    } else {
      if(Data[L.get("Upgrade")][1])return "U1 already bought";
      if(Data[L.get("Points")].lt(1000))return "Insufficient Points: Need 1000";
      el("U1-extra").textContent="BOUGHT";
      Data[L.get("Points")]=Data[L.get("Points")].sub(1000);
      Data[L.get("Upgrade")][1]=(Data[L.get("Upgrade")][1]||0)+1;
      Data[L.get("Option")][2]=10*Math.pow(1000,Data[L.get("Upgrade")][1])
    }
  }
  var U2=function U2(){
    if(debugMode)console.log("[IdlePoll:Debug] function call U2();");
    if(Data[L.get("Upgrade")][2])return "U2 already bought";
    if(Data[L.get("Points")].lt(1e10))return "Insufficient Points: Need 1e10";
    el("U2-extra").textContent="BOUGHT";
    Data[L.get("Points")]=Data[L.get("Points")].sub(1e10);
    Data[L.get("Upgrade")][2]=1;
    el('click3').style=Data[L.get("Upgrade")][2]?"":"display:none;"
  }
  var U3=function U3(){
    if(debugMode)console.log("[IdlePoll:Debug] function call U3();");
    if(Data[L.get("Upgrade")][3])return "U3 already bought";
    if(Data[L.get("Points")].lt(1e50))return "Insufficient Points: Need 1e50";
    el("U3-extra").textContent="BOUGHT";
    Data[L.get("Points")]=Data[L.get("Points")].sub(1e50);
    Data[L.get("Upgrade")][3]=1;
  }
  var main=function main(){
    if(debugMode)console.log("[IdlePoll:Debug] function call main();");
    setupHTML();
    globalThis.Data=setupData();
    setupVariableHTML();
    globalThis.Import=Import;
    globalThis.Export=Export;
    globalThis.HardReset=HardReset;
    window.setInterval(updateHTML,50);
  }
  if(debugMode)console.log("[IdlePoll:Debug] Script index.js ran 1 time without issues.");
  main();
}).call(this);
