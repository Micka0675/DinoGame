let startButton = document.getElementById("startGame");
let player = document.getElementsByClassName("player")[0];
let soundTrack = document.getElementById("soundTrack");
let theBoss = document.getElementsByClassName('stone-giant')[0];
let lifeBar = document.getElementsByClassName('life-bar')[0];
let lifeBarContent = document.getElementsByClassName('life-bar-content')[0];
let toggle = true;
var walk;
let health = 0;
let lives = 3;
let dammage = 100 / lives; 

//commencer une partie
startButton.addEventListener('click',play);
//mise en place du jeu
function play(){
    //---------------------PAR DEFAUT--------------------//
    //santé du joueur
    health = 100;
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
    lifeBar.style.visibility = 'visible';
    lifeBarContent.style.width = '0%';
    //remplissage de la barre de vie
    lifeBarContent.style.width = '100%';
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
    var interval = new Promise((resolve,reject) => {
        let delay = Math.floor(Math.random()*3000)+6000;
        let touchAnim = null;
        bloc.style.animation = 'wallMove 4s running';
        let timer = setInterval(()=>{
            //on vérifie s'il y a collision
            if(isCollide(bloc,player)){
                //s'il y a collision
                if(touchAnim === null)
                {
                    touchAnim = blink(player,1000);
                    health = health - dammage;
                    if(health > 0)
                    {
                        lifeBarContent.style.width = health+'%';
                    }
                    else
                    {
                        gameOver();
                    }
                    console.log('vie restante:'+ health);
                }
            }
        },100);
        setTimeout(()=>{
            clearInterval(timer);
            //promesse de renvoyer bloc une fois les instructions précédentes réalisées
            resolve(bloc);
        },delay);
    });
    return interval;
}
//fonction de vérification de collision
function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return!(
        //si le bloc passe au dessus
        ((aRect.top + aRect.height) < (bRect.top)) ||
        //si le bloc passe en dessous
        (aRect.top > (bRect.top + bRect.height)) ||
        //si le bloc est passé derrière le joueur
        ((aRect.left + aRect.width) < bRect.left) ||
        //si le bloc est avant le joueur
        (aRect.left > (bRect.left + bRect.width)));
}

//fonction de clignotement en cas de collision
function blink(elem,duration)
{
    //heure du début
    let timeStart = Date.now();
    //booléen de visibilité
    let visible = true;
    //intervalle de clignotement
    let intVal = setInterval(()=>{
        //calcul du temps écoulé
        let timePassed = Date.now()-timeStart; 
        //si le temps écoulé est plus élevé ou égal à la durée paramétrée
        if(timePassed >= duration)
        {
            clearInterval(intVal);
            elem.style.visibility = 'visible';
            return;
        }
        else
        {
            // on change la valeur de visibilité de notre élément en fonction de la valeur de visible
            elem.style.visibility = visible ? 'hidden' : 'visible';
            //on inverse la valeur de visible en conséquence
            visible = !visible;
        }
    },50);
    return intVal;
}

function gameOver(){
    gameSpace.style.display = 'none';
    soundTrack.removeEventListener('ended',function(){
        this.currenTime = 0;
        this.play();
    });
    soundTrack.pause();
    soundTrack.currenTime = 0;
    document.body.innerHTML = "You lose";

};