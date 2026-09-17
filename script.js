const screens = [...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.next));
});

document.querySelectorAll(".choice").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.toggle("revealed");
    btn.querySelector("span").textContent = btn.classList.contains("revealed") ? "♥" : "♡";
  });
});

const meter = document.getElementById("meterFill");
const percent = document.getElementById("percent");
let started = false;

const meterObserver = new MutationObserver(()=>{
  if(document.getElementById("meter").classList.contains("active") && !started){
    started=true;
    let value=0;
    const timer=setInterval(()=>{
      value += Math.ceil(Math.random()*8);
      if(value>=120){value=120;clearInterval(timer);setTimeout(()=>show("quiz"),700)}
      percent.textContent=value+"%";
      meter.style.width=Math.min(value,100)+"%";
    },70);
  }
});
meterObserver.observe(document.querySelector(".app"),{subtree:true,attributes:true,attributeFilter:["class"]});

document.getElementById("restart").addEventListener("click",()=>{
  started=false;
  meter.style.width="0%";
  percent.textContent="0%";
  document.querySelectorAll(".choice").forEach(b=>b.classList.remove("revealed"));
  show("welcome");
});
