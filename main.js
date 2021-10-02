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
    level : 0.1,
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

function paddlecolitiion(ball, paddle){
    paddle.top = paddle.y;
    paddle.left = paddle.x;
    paddle.right = paddle.x + paddle.width;
    paddle.bottom = paddle.y + paddle.height;

    ball.top = ball.y-ball.radius;
    ball.left = ball.x -ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    // console.log(ball.x)

        // return paddle.top < ball.bottom && paddle.left < ball.right && paddle.right > ball.left && paddle.bottom > ball.top;

    var collision = (paddle.top < ball.bottom && paddle.left < ball.right && paddle.right > ball.left && paddle.bottom > ball.top)

    // if (collision) {
    //     // console.log(ball.x)
    // }
    return collision;
    // return paddle.top < ball.bottom && paddle.left < ball.right && paddle.right > ball.left && paddle.bottom > ball.top;
}

function render(){
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    //drawRect("black", 0, 0 , canvas.width, canvas.height);
    drawRect(player.color, player.x,player.y,player.width, player.height);
    drawRect(computer.color, computer.x,computer.y,computer.width, computer.height);
    drawCircle(ball.color, ball.x, ball.y ,ball.radius);
    drawNet();
    writeText(player.score, canvas.width/4, canvas.height/5);
    writeText(computer.score, 3*canvas.width/4, canvas.height/5);
}

function resetall(){
    console.log(computer.level)
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    computer.x = canvas.width - 10;
    computer.y = canvas.height/2 - 100/2;
    ball.speed  = 5;
    computer.level = 0.1;
    ball.speed =- ball.speed;
}

function moveUserPaddle(e){
    let rect = canvas.getBoundingClientRect();
    let relativeY = e.clientY - rect.top ;
    if(relativeY > 0 && relativeY < canvas.height) {
        player.y = relativeY - player.height/2;
    }
}

function computerAI(){
    computer.y += (ball.y - (computer.y + computer.height/2)) * computer.level;
}

function update(){
    
    
    computerAI();

    if ( ball.y + ball.radius  > canvas.height || ball.y - ball.radius  < 0 ){
        ball.velocityY = -ball.velocityY;
    }

    var paddle = (ball.x < canvas.width/2) ? player : computer; 

    if (paddlecolitiion(ball, paddle)) {
        // console.log(`collide`)
       let colidepoint = ((ball.y -(paddle.y + paddle.height/2))/paddle.height/2);

       let radangle =   (Math.PI/4)* colidepoint;

       let direction = (ball.x < canvas.width/2)? 1 : -1;
        // console.log(`direction :: ${direction}`)
       ball.velocityX = direction * ball.speed * Math.cos(radangle);
       ball.velocityY = direction * ball.speed * Math.sin(radangle);
       
       ball.speed += 1;
       if(computer.level <2){
        
        computer.level+=0.1;
       }
       
       
    }  
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if ( ball.x - ball.radius  > canvas.width ){
        player.score += 1;
        resetall();
    }  if(ball.x + ball.radius  < 0 ){
        // console.log('comp')
        computer.score += 1;
        resetall();
    }
    // console.log("velocityx , velocityy :: ", ball.velocityX, ball.velocityY);
       
    
}
function game(){
    
    update();
    render();
   
}

const framesRate = 50;

document.addEventListener("mousemove",moveUserPaddle)
setInterval(game, (1000/framesRate))