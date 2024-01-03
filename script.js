let startButton = document.getElementById("startGame");
let player = document.getElementsByClassName("player")[0];
let soundTrack = document.getElementById("soundTrack");
let theBoss = document.getElementsByClassName('stone-giant')[0];
let toggle = true;
var walk;
//commencer une partie
startButton.addEventListener('click',play);
//mise en place du jeu
function play(){
    //---------------------PAR DEFAUT--------------------//
    //recupération de l'élément du dom espace de jeu
    let gameSpace = document.getElementById("gameSpace");
    //on enlève le button play
    startButton.style.display = 'none';
    //ajout des paramètres de transition sur l'espace de jeu
    gameSpace.style.transition = '1s';
    //activation de la musique
    soundTrack.play();
    soundTrack.addEventListener('ended',function(){
        this.currenTime = 0;
        this.play();
    });
    //ajout des paramètres de style sur l'avatar du joueur
    //player.style.transition = '0.6s';
    player.style.left = '10%';
    //ajout du background sur l'espace de jeu
    gameSpace.style.backgroundImage = 'url("./images/bckd.webp")';
    //affichage et positionnement du background
    gameSpace.style.backgroundRepeat = 'repeat';
    gameSpace.style.backgroundPosition = "0px 0px";
    //défilement du background
    gameSpace.style.animation = 'animateBckd 5s linear infinite';
    //aparition du boss
    theBoss.style.display='block';
    theBoss.style.delay = '5s';
    
    setTimeout(()=>{
        theBoss.style.left = '92%';
        generateWalls();
    },5000); 
    theBoss.style.animation = 'bossMove 10s infinite';
    //ajout des écoutes d'évenement sur l'espace de jeu
    document.addEventListener('keydown', function(Event){toggle = movement(Event,toggle)});
    gameSpace.addEventListener('click', function(Event){toggle = movement(Event,toggle)});
    animation('walk'); 
    
};

//mouvement du joueur déclenché à la pression de la touche espace ou au clic
function movement(Event,toggle){
    console.log(toggle);
    if(toggle)
    {
        toggle = false;
        document.removeEventListener('keydown', function(Event){toggle = movement(Event,toggle)});
        document.removeEventListener('click', function(Event){toggle = movement(Event,toggle)});
        switch(Event.keyCode)
        {
            case 32:
                player.style.animation = 'jump 1s running';
                animation('jump'); 
                setTimeout(() => {
                    player.style.animation = 'none';
                    document.addEventListener('click', function(Event){toggle = movement(Event,toggle)});
                    document.addEventListener('keydown', function(Event){toggle = movement(Event,toggle)}); 
                    toggle = true;
                },1000);
                break;
            default:
                if(Event.type == 'click')
                {
                    player.style.animation = 'jump 1s running';
                    animation('jump');
                    setTimeout(() => {
                        player.style.animation = 'none';
                        document.addEventListener('keydown', function(Event){toggle = movement(Event,toggle)});
                        document.addEventListener('click', function(Event){toggle = movement(Event,toggle)});
                        toggle = true; 
                    },1000);
                }
        }
    }  
}
//animation du joueur
function animation(type){
    switch(type){
        case 'walk':

            detailWalkMovement();

            break;
        case 'jump':
            toggle = false;
            clearInterval(walk);
            player.src = "./images/start-jump.webp";
            setTimeout(() => {
                player.src = "./images/end-jump.webp";
                setTimeout(() => {
                    player.src = "./images/initial.webp";                     
                },300);
                detailWalkMovement();
            },300);
            
            
            break;
        default:
            clearInterval(walk);
            player.src = "./images/initial.webp";
    }
}

//detail du mouvement de course
function detailWalkMovement(){
    walk = clearInterval(walk);
    walk = setInterval(()=>{
        player.src = "./images/start-run.webp";
        setTimeout(() => {
            player.src = "./images/run-1.webp";
            setTimeout(() => {
                player.src = "./images/run-2.webp";
                setTimeout(() => {
                },100);
            },100);
        },100);  
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

//générer les obstacles
async function generateWalls(){
    //création des blocs aléatoires
    for(i=0;i<100;i++)
    {
        var bloc = document.createElement('img');
        bloc.setAttribute('id','bloc'+i);
        bloc.setAttribute('class','game-walls');
        bloc.setAttribute('src', './images/cube.webp');
        //specifier les blocs en tant qu'enfants de l'espace de jeu 
        document.body.querySelectorAll('main')[0].appendChild(bloc);

        //générer une largeur de mur aléatoire entre 1 et 50px
        let width = Math.floor(Math.random()*101)+60
        bloc.style.width = width+'px';
        
        let exec =  await moveTheWall(bloc);
    }

    
};

async function moveTheWall(bloc){
    // var interval = new Promise(setTimeout(() => {
    //     bloc.style.animationDelay = '3s';
    //     bloc.style.animation = 'wallMove 4s running';
    // }, interval));

    var interval = new Promise((resolve,reject) => {
        let delay = Math.floor(Math.random()*3000)+6000;

        setTimeout(()=>{
            bloc.style.animation = 'wallMove 4s running';

            //promesse de renvoyer bloc une fois les instructions précédentes réalisées
            resolve(bloc);
        },delay);
    });
    return interval;
}