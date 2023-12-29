let startButton = document.getElementById("startGame");
let player = document.getElementsByClassName("player")[0];
//commencer une partie
startButton.addEventListener('click',play);
//mise en place du jeu
function play(){
    let gameSpace = document.getElementById("gameSpace");

    startButton.style.display = 'none';
    gameSpace.style.transition = '1s';
    player.style.transition = '1s';
    player.style.left = '50px';
    gameSpace.style.backgroundImage = 'url("./_assets/images/bckd.webp")';
    gameSpace.style.backgroundRepeat = 'repeat';
    gameSpace.style.backgroundPosition = "0px 0px";
    gameSpace.style.animation = 'animateBckd 5s linear infinite';
    document.addEventListener('keyup', stopAnim);
    document.addEventListener('keydown', movement);
    animation('walk');
};

//mouvement du joueur
function movement(Event){
    //alert(Event.keyCode);
    switch(Event.keyCode){
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
function animation(type){
    switch(type){
        case 'walk':
            

            setInterval(()=>{
                player.src = "./_assets/images/start-run.webp";
                setTimeout(() => {
                    player.src = "./_assets/images/run-1.webp";
                    setTimeout(() => {
                        player.src = "./_assets/images/run-2.webp";
                        setTimeout(() => {
                        },100);
                    },100);
                },100);
            },300);
            break;
        case 'jump':
            
            player.src = "./_assets/images/start-jump.webp";
            setTimeout(() => {
                player.src = "./_assets/images/end-jump.webp";
                setTimeout(() => {
                    player.src = "./_assets/images/initial.webp";
                },500);
            },500);
            
            
            
            break;
        default:
            document.removeEventListener('keydown',movement);
            player.src = "./_assets/images/initial.webp";
    }
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