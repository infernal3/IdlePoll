(function(){
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
  // Yes, it's confusing. Who cares?
  var L=new Map([["Points",".UG9pbnR"],["Round",".Um91bmQ"],["Upgrade",".VXBncmF"],["Option",".T3B0aW9"],[void 0,".VW5kZWZ"],["Last",".VGltZXI"]]);
  
  var createButton=function createButton(id,name,func){
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
    var app=document.createElement("div"),div1=document.createElement("div"),div2=document.createElement("div"),div3=document.createElement("div");
    app.id="app";
    div1.id="idleData";
    div2.id="choices";
    div1.innerHTML=`
    Idle Poll, Round #<span id="round">1</span>.<br>
    You have <span id="points">10</span> Points.<br><br>Options:<br>
    <span id="O1">[O1] +<span id="O1Effect">100</span> Points</span><br>
    <span id="O2">[O2] x<span id="O2Effect">10</span> Points</span><br><br>Upgrades:<br>
    <span id="U1">[U1] Multiply O2's effect by x<span id="U1Effect">1000</span>.</span><br>`;
    app.append(div1);
    div2.append(createButton("click1","O1",()=>{HandleAction("O1");}));
    div2.append(createButton("click2","O2",()=>{HandleAction("O2");}));
    div2.append(createButton("click11","U1",()=>{HandleAction("U1");}));
    div3.id="delay";
    div2.append(div3);
    app.append(div2);
    document.body.append(app);
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
    
    // TODO: Implement Local Storage
    var Data={},obj1=[void 0,100,10],obj2=[void 0,0];
    L.forEach((v,k)=>{Data[v]=undefined;});
    Data[L.get("Option")]=obj1;
    Data[L.get("Upgrade")]=obj2;
    Data[L.get("Points")]=10;
    Data[L.get("Round")]=1;
    Data[L.get("Last")]=Date.now()-60000;
    return Data;
  }
  var HandleAction=function HandleAction(action){
    // Handles actions.
    // All actions have a base property, that is, they advance the round and have delay.
    if(Date.now()-Data[L.get("Last")]<60000){
      el("delay").textContent=randomDelayMsg();
      console.log(`Action "${action}" prevented due to 1 minute action cooldown.`);
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
      default:
        console.log(`Error: Action ${action} does not exist.`);
        break;
    }
    if(invalid!==(void 0)){
      el("delay").textContent=invalid;
    }
    Data[L.get("Round")]+=1;
    Data[L.get("Last")]=Date.now();
    el("delay").textContent="";
  }
  var O1=function O1(){
    Data[L.get("Points")]+=globalThis.Data[L.get("Option")][1];
  }
  var O2=function O2(){
    Data[L.get("Points")]*=globalThis.Data[L.get("Option")][2];//TODO: Implement break_eternity.js to prevent numeric overflow
  }
  var U1=function U1(){
    if(Data[L.get("Upgrade")][1]!==0)return "U1 already bought";
    if(Data[L.get("Points")]<1000)return "Insufficient Points: Need 1000";
    Data[L.get("Points")]-=1000;
    Data[L.get("Upgrade")][1]++;
    Data[L.get("Option")][2]=10*Math.pow(1000,Data[L.get("Upgrade")][1])
  }
  var main=function main(){
    setupHTML();
    globalThis.Data=setupData();
    window.setInterval(updateHTML,50);
  }
  main();
}).call(this);
