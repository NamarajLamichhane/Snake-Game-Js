// Game ko constant sound ani veriables haru

let inputdir = { x: 0, y: 0 };
let foodsound = new Audio('food.mp3');
let movesound = new Audio('move.mp3');
let musicsound = new Audio('music.mp3');
let gameoversound = new Audio('gameover.mp3');
let speed = 11;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]

food = { x: 10, y: 11 };



// Game ko functions haru 

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();

}

function iscollide (snake) {
    // aafusangai thikkiyo vaney

    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        
    }

    // wall ma thokkida
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0 ){
        return true;
    }
    return false;
    
}

function gameEngine() {
    // part I  updating the saanp
    if(iscollide(snakearr)){
        gameoversound.play();
        // musicsound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play againnnn");
        snakearr = [{ x: 13, y: 15 }];
        // musicsound.play();
        score = 0;
    }


    // if you have khana khaye and increase score and food 
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML = "Highest Score :" + highscoreval;
        }
        scorebox.innerHTML = "Score : " + score;
        snakearr.unshift({x: snakearr[0].x + inputdir.x, y:snakearr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
    }


    // Moving the snake 
    for (let i = snakearr.length-2; i>=0; i-- ) { 
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;





    // part II Display the saanp 
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeelement.classList.add('head');
        }
        else {

            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);

    });  


    // I made one of the siliest mistake i.e wrote Html instead of HTML and it took my almost one hour to find so this commented code is tribute for my time
    
    // board.innerHtml = "";
    // snakearr.forEach((e, index)=>{
    //     snakeelement = document.createElement('div');
    //     snakeelement.style.gridRowStart = e.y;
    //     snakeelement.style.gridColumnStart = e.x;

    //     if(index === 0){
    //         snakeelement.classList.add('head');
    //     }
    //     else{
    //         snakeelement.classList.add('snake');
    //     }
    //     board.appendChild(snakeelement);
    // });













    // Display the khana
    board.innerHtml = "";
    snakearr.forEach((e, index) => {
        foodelement = document.createElement('div');
        foodelement.style.gridRowStart = food.y;
        foodelement.style.gridColumnStart = food.x;
        foodelement.classList.add('food');
        board.appendChild(foodelement);

    });








}

// Main logic starts here 

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "Highest Score :" + highscore;
}





window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };  //starts the game
    // movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }

});

























