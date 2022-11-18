const canvas = document.querySelector("#canvas"), 
      ctx = canvas.getContext("2d");


let bird  = new Image(),
    fg = new Image(),
    bg = new Image(),
    pipeUp = new Image(),
    pipeBottom = new Image();

const fly = new Audio(),
      score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3'


bird.src = 'img/bird.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
bg.src = 'img/bg.png';
pipeBottom.src = 'img/pipeBottom.png';

document.addEventListener("keydown", moveUp);

function moveUp(){
  yPos -= 25;
  fly.play();
}

let pipe = [];

pipe[0] = {
  x : canvas.width,
  y : 0
};

const gap = 90;
let xPos = 10,
    yPos = 150,
    grav = 1.5,
    score = 0;
      

function draw(){
  ctx.drawImage(bg, 0, 0);

  for(let i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x === 125){
      pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }
    if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y +  pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >=  canvas.height - fg.height){
      location.reload();
    }    
    if(pipe[i].x == 5){
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);

  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;
  requestAnimationFrame(draw);

  ctx.fillStyle = 'green';
  ctx.font = '20px Verdana';
  ctx.fillText("Score: " + score, 10, canvas.height - 20)
}

pipeBottom.onload = draw;