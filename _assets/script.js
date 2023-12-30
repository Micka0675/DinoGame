let startButton = document.getElementById("startGame");
let player = document.getElementsByClassName("player")[0];
let toggle = true;
var walk;
//commencer une partie
startButton.addEventListener('click',play);
//mise en place du jeu
function play(){
    let gameSpace = document.getElementById("gameSpace");

    startButton.style.display = 'none';
    gameSpace.style.transition = '1s';
    player.style.transition = '1s';
    player.style.left = '10%';
    gameSpace.style.backgroundImage = 'url("./_assets/images/bckd.webp")';
    gameSpace.style.backgroundRepeat = 'repeat';
    gameSpace.style.backgroundPosition = "0px 0px";
    gameSpace.style.animation = 'animateBckd 5s linear infinite';
    // document.addEventListener('keyup', stopAnim);
    document.addEventListener('keydown', movement);
    gameSpace.addEventListener('click', movement);
    animation('walk',toggle); 
};

//mouvement du joueur
function movement(Event){
    alert(Event);
        //alert(Event.keyCode);
        switch(Event.keyCode){
            case 32:
                player.style.animation = 'jump 1s running';
                animation('jump');
                setTimeout(() => {
                    player.style.animation = 'none';
                },1000);
                
                break;
            case 32:
                player.style.animation = 'jump 1s running';
                animation('jump');
                setTimeout(() => {
                    player.style.animation = 'none';
                },1000);
                
                break;
            default:
        }

       
}
//animation du joueur
function animation(type,toggle){
    switch(type){
        case 'walk':

            detailWalkMovement();

            break;
        case 'jump':
            
            document.removeEventListener('keydown', movement);
            clearInterval(walk);
            player.src = "./_assets/images/start-jump.webp";
            setTimeout(() => {
                player.src = "./_assets/images/end-jump.webp";
                setTimeout(() => {
                    player.src = "./_assets/images/initial.webp";
                },300);
                detailWalkMovement(); 
            },300);
            
            
            break;
        default:
            clearInterval(walk);
            player.src = "./_assets/images/initial.webp";
    }
}

//detail du mouvement de course
function detailWalkMovement(){
    walk = clearInterval(walk);
    walk = setInterval(async()=>{
        player.src = "./_assets/images/start-run.webp";
        setTimeout(() => {
            player.src = "./_assets/images/run-1.webp";
            setTimeout(() => {
                player.src = "./_assets/images/run-2.webp";
                setTimeout(() => {
                },100);
            },100);
        },100);
        document.addEventListener('keydown', movement);
    },300);
}

//Stop animation
function stopAnim(Event)
{
    switch(Event.keyCode){
        case 39:
            animation('none');
            break;
        default:
    }
}