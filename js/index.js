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
  var L=new Map([["Points",".UG9pbnR"],["Round",".Um91bmQ"],["U",".VXBncmF"],["O",".T3B0aW9"],[void 0,".VW5kZWZ"],["Last",".VGltZXI"]]);
  var setupHTML=function setupHTML(){
    var app=document.createElement("div"),div1=document.createElement("div"),div2=document.createElement("div"),div3=document.createElement("div");
    app.id="app";
    div1.id="idleData";
    div2.id="choices";
    div1.innerHTML=`Idle Poll, Round #<span id="round">[Error]</span>.<br>You have <span id="points">[Error]</span> Points.<br>Options:<br>[O1] +100 Points<br>[O2] x10 Points`;
    app.append(div1);
    var click1=document.createElement("button");
    click1.id="click1";
    click1.textContent="[O1]";
    click1.addEventListener("click",()=>{
      HandleAction("O1");
    });
    div2.append(click1);
    div3.id="delay";
    div2.append(div3);
    app.append(div2);
    document.body.append(app);
  }
  var updateHTML=function updateHTML(){
    el("round").textContent=globalThis.Data[L.get("Round")];
    el("points").textContent=globalThis.Data[L.get("Points")];
  }
  var setupData=function setupData(){
    //TODO: Implement Local Storage
    var Data={};
    L.forEach((v,k)=>{Data[v]=undefined;});
    Data[L.get("Points")]=10;
    Data[L.get("Round")]=1;
    Data[L.get("Last")]=Date.now();
    return Data;
  }
  var HandleAction=function HandleAction(action){
    if(Date.now()-Data[L.get("Last")]<60000){
      el("delay").textContent=randomDelayMsg();
      console.log(`Action "${action}" prevented due to 1 minute action cooldown.`);
      return;
    }
    switch(action){
      case "O1":
        O1();
        break;
      default:
        console.log(`Error: Action ${action} does not exist.`);
        break;
    }
    Data[L.get("Round")]+=1;
    Data[L.get("Last")]=Date.now();
    el("delay").textContent="";
  }
  var O1=function O1(){
    Data[L.get("Points")]+=100;
  }
  var main=function main(){
    setupHTML();
    globalThis.Data=setupData();
    window.setInterval(updateHTML,50);
  }
  main();
}).call(this);
