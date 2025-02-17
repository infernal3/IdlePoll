(function(){
  
  var U1Scaling=function U1Scaling(x){
    if(typeof(x)!=='number'||!isFinite(x)||x<0)return 0;
  }
  var main=function main(){
    // TODO
    document.body.innerHTML+=`<div id="root">If this text appears, then my code is working</div>`;
  }
  main();
}).call(this);
