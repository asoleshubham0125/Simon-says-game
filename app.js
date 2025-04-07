let gameSeq=[];
let userSeq=[];
let hScore = 0;

let btnCol = ["orange","red","purple","green"];

let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function startGame() {
    if(start == false){
        levelUP();
        start = true;       
    }
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function levelUP() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randCol = btnCol[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);  
    console.log(gameSeq);
    btnFlash(randBtn);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click",btnPress);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUP,1000);
        }
    }else{
        hScore = HighScore();
        h2.innerHTML = `Game Over! Your Score <b>${level}</b><br> Highest Score ${hScore}<br>Press any key to reset `
        setTimeout(reset, 500);
    }
}

function reset() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function HighScore(){
    if(hScore < level){
        return level;
    } else {
        return hScore;
    }
}

document.querySelector(".hint").addEventListener("click", () => {
    let p = document.querySelector(".hintP");
    p.innerText = gameSeq.join(" → ");
    setTimeout(() => {
        p.innerText = "";
    }, 2000);
}); 