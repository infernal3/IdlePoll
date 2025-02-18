(function(){
  var U1Scaling=function U1Scaling(x){
    if(typeof(x)!=='number'||!isFinite(x)||x<0)return 0;
    return void 0;
  }
  var main=function main(){
    var app=document.createElement("div"),div1=document.createElement("div"),div2=document.createElement("div");
    app.id="app";
    div1.id="idleData";
    div2.id="choices";
    div1.innerHTML=`Idle Poll, Round #1.<br>You have 10 Points.<br>Options:<br>[O1] +100 Points<br>[O2] x10 Points`;
    app.append(div1);
    var click1=document.createElement("button");
    click1.id="click1";
    click1.textContent="[O1]";
    click1.addEventListener("click",()=>{document.body.innerHTML+="You did not gain 100 points sadly";});
    div2.append(click1);
    app.append(div2);
    document.body.append(app);
  }
  main();
}).call(this);
