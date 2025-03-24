const words = ["SALUT", "ADIEU", "CRÊPE", "RATER", "MENER",  "GERER", "MANGÉ", "PORTE", "TABLE", "STYLO", "EMBLÉ", "AMOUR", "CHÉRI", "BISOU","TASSE", "BOUSE", "CHAUD", "BOÎTE", "AUTRE", "FAIRE", "TEMPS", "TROIS", "AUSSI", "JOUER", "PETIT", "GRAND", "TERRE", "GENRE", "IMAGE", "POINT", "VIVRE", "APRÈS", "HOMME", "ANNÉE", "NOTRE", "JUSTE", "FORME", "AIDER", "LIGNE", "AVANT", "DROIT", "VIEUX", "QUAND", "VOTRE", "ALLER", "VENIR", "APPEL", "ÉCCOLE", "ÉTUDE", "USINE", "ENTRE", "FEMRE", "DÉBUT", "TIRER", "LIVRE", "COUPE", "BLANC", "PIEDS", "SOINS", "ASSEZ", "JEUNE", "ROUGE", "LISTE", "CHIEN", "PORTE", "CORPS", "COURT", "ORDRE", "PREND", "POUCE", "PLEIN", "FORCE", "OBJET", "COURS", "MILLE", "NEIGE", "ENTRE", "UNITÉ", "VILLE", "VOLER", "RESTE", "DONNÉ", "OCÉAN", "CLAIR", "HEURE", "MIEUX", "ÉTAPE", "TENIR", "OUEST", "VERBE", "MATIN", "POSER", "ROUTE", "CARTE", "PLUIE", "RÈGLE", "TIRER", "FROID", "FRÈRE", "CARRÉ", "SUJET", "GLACE", "PAIRE", "BALLE", "VAGUE", "TRAIN", "PIÈCE","LIBRE", "BOIRE", "CHÈRE", "DANSE","VERRE"];
const motivation = ["Je crois en toi!", "Continuez à faire du bon travail", "Bonne idée!", "Beau progrés!", "Tu t’améliores!", "Fabuleux!", "Ne jamais abandonner", "N’abandonnez pas", "Ça va aller", "Tu y es presque!", "Continuez comme ça" ,"Tu peux le faire"];
let k = Math.floor(Math.random() * words.length);
let word = words[k];

let btns = document.querySelectorAll(".alphabet button")
const inputs = Array.from(document.querySelector(".grid").querySelectorAll("input"));

let idx =0;
let tries=0;
let right = false;

btns.forEach(btn => {
    btn.addEventListener("click",()=>{
        const letter = btn.id;

        if(letter!="Delete" ){
            if(idx<inputs.length && letter!="Enter" && idx<(tries+1)*5){
                inputs[idx].value = letter;
                idx++;
                
            }
            if(letter==="Enter"&& (idx % 5 === 0)){
                checkWord(idx-1);
                if(right){
                    success();
                    return;
                }
                tries++;
            }
        }else{
            if(idx>(tries*5)){
                idx--;
                inputs[idx].value="";
            }
            
        }

        if(tries >= 7 && !right){
            fail();
        }
    });
});

function checkWord(lastidx){
    let tempWord = word;
    let checkValid = inputs[lastidx - 4].value + inputs[lastidx - 3].value + inputs[lastidx - 2].value + inputs[lastidx - 1].value + inputs[lastidx].value;
    let valid = false;
    for(let j = 0; j < words.length; j++){
        if (checkValid === words[j]){
            valid = true;
        }
    }
    if(checkValid === word){
        right = true;
    }
    if(!(valid)){
        tries--;

    }
    let myInterval = setInterval(() => {
        if(!(valid)){
            document.getElementById("caption").innerHTML = "Pas dans la liste de mots!!";
            return;
        } else {
            for(let i = 0; i < 5; i++){
                if (word.substring(i,i+1) === inputs[lastidx - 4 + i].value){
                    tempWord=tempWord.replace(word.substring(i,i+1)," ");
                    //one should be grey when 2 letters r not in the spot
                    console.log(tempWord)
                    inputs[lastidx - 4 + i].style.background = "green";
                    
                    
                    btns.forEach(btn=>{
                        if(btn.id===(inputs[lastidx - 4 + i].value)){
                            btn.style.background="green";
                        }
                    })

                    

            
                }else if(tempWord.indexOf (inputs[lastidx - 4 + i].value)!=-1){
                    inputs[lastidx-4+i].style.background = "yellow";
                    
                    btns.forEach(btn=>{
                        if(btn.id===(inputs[lastidx - 4 + i].value)){
                            btn.style.background="yellow";
                        }
                    })
                } else {
                    inputs[lastidx - 4 + i].style.background = "gray";
                    btns.forEach(btn=>{
                        if(btn.id===(inputs[lastidx - 4 + i].value)){
                            btn.style.background="grey";
                        }
                    })
                }
            }
        }
    }, 20);

    let k = Math.floor(Math.random() * motivation.length);
            console.log(motivation[k]);
            document.getElementById("caption").innerHTML = motivation[k];

    setTimeout(() => {
        clearInterval(myInterval);
        document.getElementById("caption").innerHTML = "";
    }, 1000);
    
}

function success(){
    btns.forEach(btn => btn.disabled=true);
    showEndScreen("Bravo, tu as trouvé le mot!","success")
}

function fail(){
    btns.forEach(btn => btn.disabled=true);
    showEndScreen(`Dommage! Le mot était: ${word}`,"failure")
}

function showEndScreen(message, type){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay",type);
    const modal=document.createElement("div");
    modal.classList.add("modal",type)
    const messageEl = document.createElement("h2");
    messageEl.innerHTML = message;
    modal.appendChild(messageEl)
    const restartBtn = document.createElement("button");
    restartBtn.innerText="Rejouer";
    restartBtn.classList.add("restart-btn");
    restartBtn.addEventListener("click",()=>location.reload());
    modal.appendChild(restartBtn);

    overlay.appendChild(modal)
    document.body.appendChild(overlay)
}
