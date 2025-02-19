(function(){
  var el=E=>document.getElementById(E);
  var U1Scaling=function U1Scaling(x){
    if(typeof(x)!=='number'||!isFinite(x)||x<0)return 0;
    return void 0;
  }
  var L=new Map([["Points",".UG9pbnR"],["Round",".Um91bmQ"],["U",".VXBncmF"],["O",".T3B0aW9"],[void 0,".VW5kZWZ"]]);
  var setupHTML=function setupHTML(){
    var app=document.createElement("div"),div1=document.createElement("div"),div2=document.createElement("div");
    app.id="app";
    div1.id="idleData";
    div2.id="choices";
    div1.innerHTML=`Idle Poll, Round #<span id="round">[Error]</span>.<br>You have <span id="points">[Error]</span> Points.<br>Options:<br>[O1] +100 Points<br>[O2] x10 Points`;
    app.append(div1);
    var click1=document.createElement("button");
    click1.id="click1";
    click1.textContent="[O1]";
    click1.addEventListener("click",()=>{document.body.innerHTML+="You did not gain 100 points sadly";});
    div2.append(click1);
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
    return Data;
  }
  var main=function main(){
    setupHTML();
    globalThis.Data=setupData();
    window.setInterval(updateHTML,50);
  }
  main();
}).call(this);
