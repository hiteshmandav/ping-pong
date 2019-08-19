const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var player = {
    height : 100,
    width : 10,
    x : 0,
    y : canvas.height/2 - 100/2,
    color : "white",
    score : 0,
}

var computer = {
    height : 100,
    width : 10,
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    color : "white",
    score : 0,
}

var ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    color : "white",
    speed : 5,
    velocityX : 5,
    velocityY : 5,
}
var net = {
    width : 2,
    height : 10,
    color : "white",
    x : canvas.width/2 - 2/2,
    gap : 10,
}
function drawRect(color, x, y, w, h){
    ctx.rect(x,y,w,h);
    ctx.fillStyle = color;
    ctx.fill()
}

function drawCircle(color, x, y, radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function writeText(text, x , y, size_font="30px Comic Sans MS", color="white"){
    ctx.font = size_font,
    ctx.fillStyle = color,
    ctx.fillText(text,x,y);
}

function drawNet(){
    for( let i = net.gap ; i < canvas.height  ; i+= (net.height+net.gap)){
        drawRect(net.color, net.x, i, net.width, net.height);
    }
}


function render(){
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    drawRect(player.color, player.x,player.y,player.width, player.height);
    drawRect(computer.color, computer.x,computer.y,computer.width, computer.height);
    drawCircle(ball.color, ball.x, ball.y ,ball.radius);
    drawNet()
    writeText(player.score, canvas.width/4, canvas.height/5);
    writeText(computer.score, 3*canvas.width/4, canvas.height/5);
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if ( ball.y + ball.radius  > canvas.height || ball.y - ball.radius  < 0 ){
        ball.velocityY = -ball.velocityY;
    }else if ( ball.x + ball.radius  > canvas.width || ball.x - ball.radius  < 0){
        ball.velocityX = -ball.velocityX;
    }
}
function game(){
    update();
    render();
}

const framesRate = 50;

setInterval(game, (1000/framesRate))