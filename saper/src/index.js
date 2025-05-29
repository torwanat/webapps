const widthInput = document.querySelector(".input[name=\"width\"]");
const heightInput = document.querySelector(".input[name=\"height\"]");
const minesInput = document.querySelector(".input[name=\"mines\"]");
const nameInput = document.querySelector(".input[name=\"nick\"]");
const container = document.querySelector(".app");
const flagContainer = document.querySelector(".flags");
const timeDisplay = document.querySelector(".timer");
const warningDisplay = document.querySelector(".warnings");
const group = document.querySelector(".container");
let timerInterval;

let variables = {
    width: 0,
    height: 0,
    mines: 0,
    name: "",
};

const variablesForm = document.querySelector(".starting-values");
let game;

variablesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if(+widthInput.value !== NaN && +heightInput.value !== NaN && +minesInput.value !== NaN && +minesInput.value < +heightInput.value * +widthInput.value && nameInput.value !== "" && +widthInput.value <= 75 && +heightInput.value <= 75 && +widthInput.value > 0 && +heightInput.value > 0 && +minesInput.value > 0) {
        variables = {
            width: +widthInput.value,
            height: +heightInput.value,
            mines: +minesInput.value,
            name: nameInput.value,
        };
        warningDisplay.classList.remove("warnings-style");
        warningDisplay.innerText = "";
    }else{
        warningDisplay.classList.add("warnings-style");
        warningDisplay.innerText = "Błędne dane!";
        return;
    }
    container.innerHTML = "";
    container.style.pointerEvents = "auto";
    clearInterval(timerInterval);
    let currentBestTimes = JSON.parse(Cookies.getScores(variables));
    Cookies.displayScores(currentBestTimes);
    game = new Minesweeper(variables);
});

class Box{
    constructor(){
        this.status = 0;
        this.isUncovered = false;
        this.isFlagged = false;
    }
    uncover(){
        this.isUncovered = true;
    }
    toggleFlag(){
        this.isFlagged = !this.isFlagged;
    }
    raiseStatus(){
        if(this.status !== -1){
            this.status++;
        }
    }
    makeBomb(){
        this.status = -1;
    }
}

class Minesweeper{
    constructor(settings){
        this.width = settings.width;
        this.height = settings.height;
        this.mines = settings.mines;
        this.nick = settings.name;
        this.boxes = [];
        this.htmlBoxes = [];
        this.uncoveredBoxes = 0;
        this.flags = settings.mines;
        this.now = new Date();
        this.makeMinesweeper();
        container.style.gridTemplateColumns = `repeat(${this.width}, 25px)`;
        this.generateBoxes();
        this.generateBombs();
        this.startTimer();
    }
    generateBoxes(){
        flagContainer.innerText = `Pozostałe flagi: ${this.flags}`;
        for(let i = 0; i < this.height; i++){
            const tempArray = [];
            const tempHtmlArray = [];
            for(let j = 0; j < this.width; j++){
                const box = new Box();
                const htmlBox = document.createElement("div");
                htmlBox.classList.add("box");
                htmlBox.style.backgroundImage = "url(images/closed.svg)";
                container.appendChild(htmlBox);
                tempArray.push(box);
                tempHtmlArray.push(htmlBox);
                htmlBox.addEventListener("click", () => {
                    if(!box.isFlagged){
                        if(box.status !== -1){
                            this.uncoverDFS(i, j);
                        }else{
                            htmlBox.style.backgroundImage = `url(images/activemine.svg)`;
                            box.uncover();
                            this.minesweeperLose();
                        }
                    }
                });
                htmlBox.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    if(!box.isUncovered){
                        if(!box.isFlagged && this.flags > 0){
                            box.toggleFlag();
                            htmlBox.style.backgroundImage = "url(images/flag.svg)";
                            this.flags--;
                        }else if(box.isFlagged){
                            box.toggleFlag();
                            htmlBox.style.backgroundImage = "url(images/closed.svg)";
                            this.flags++;
                        }
                        flagContainer.innerText = `Pozostałe flagi: ${this.flags}`;
                    }
                });
            }
            this.boxes.push(tempArray);
            this.htmlBoxes.push(tempHtmlArray);
        }
    }
    generateBombs(){
        let bombIndexes = [];
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                bombIndexes.push([i, j]);
            }
        }
        for(let i = 0; i < this.mines; i++){
            const bombIndex = Math.floor(Math.random() * bombIndexes.length);
            this.boxes[bombIndexes[bombIndex][0]][bombIndexes[bombIndex][1]].makeBomb();
            const height = bombIndexes[bombIndex][0];
            const width = bombIndexes[bombIndex][1];
            for(let k = -1; k < 2; k++){
                if(height + k > -1 && height + k < this.height){
                    for(let j = -1; j < 2; j++){
                        if(width + j > -1 && width + j < this.width){
                            this.boxes[height + k][width + j].raiseStatus();
                        }
                    }
                }
            }
            bombIndexes = bombIndexes.filter((element) => {
                return element !== bombIndexes[bombIndex];
            });
        }
    }
    uncoverDFS(height, width){
        if(this.boxes[height][width].status !== -1 && !this.boxes[height][width].isUncovered && !this.boxes[height][width].isFlagged){
            this.uncoveredBoxes++;
            this.boxes[height][width].uncover();
            this.htmlBoxes[height][width].style.backgroundImage = `url(images/type${this.boxes[height][width].status}.svg)`;
            if(this.uncoveredBoxes === (this.height * this.width) - this.mines){
                this.minesweeperWin();
                return;
            }
            if(this.boxes[height][width].status === 0){
                for(let i = -1; i < 2; i++){
                    if(height + i > -1 && height + i < this.height){
                        for(let j = -1; j < 2; j++){
                            if(width + j > -1 && width + j < this.width){
                                this.uncoverDFS(height + i, width + j);
                            }
                        }
                    }
                }
            }
        }
    }
    minesweeperWin(){
        alert("Wygrałeś!!!");
        let currentBestTimes = JSON.parse(Cookies.getScores(variables));
        const score = new Score(this.nick, new Date() - this.now);
        if(currentBestTimes === undefined){
            currentBestTimes = [];
            currentBestTimes.push(score);
        }else if(currentBestTimes.length < 10){
            currentBestTimes.push(score);
        }else if(currentBestTimes[9].time > score.time){
            currentBestTimes[9] = score;
        }
        currentBestTimes = currentBestTimes.sort((a, b) => a.time - b.time);
        document.cookie = Cookies.setCookie(`game-${this.width}-${this.height}-${this.mines}`, JSON.stringify(currentBestTimes), "7");
        Cookies.displayScores(currentBestTimes);
        clearInterval(timerInterval);
        container.style.pointerEvents = "none";
    }
    minesweeperLose(){
        alert("Przegrałeś :c");
        container.style.pointerEvents = "none";
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(this.boxes[i][j].status === -1 && !this.boxes[i][j].isUncovered && !this.boxes[i][j].isFlagged){
                    this.boxes[i][j].uncover();
                    this.htmlBoxes[i][j].style.backgroundImage = `url(images/mine.svg)`;
                }
            }
        }
        clearInterval(timerInterval);
    }
    startTimer(){
        timerInterval = setInterval( () => {
            timeDisplay.innerText = `Czas: ${Math.floor((new Date() - this.now) / 60000)}:${((Math.floor((new Date() - this.now) / 1000)) % 60)}`;
        }, 200);
    }
    makeMinesweeper(){
        if(!group.classList.contains("container-style")){
            group.classList.add("container-style");
        }
    }
}

class Cookies{
    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    static getCookie(cname, defaultvalue="") {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
    static getScores(settings){
        let bestScores = Cookies.getCookie(`game-${settings.width}-${settings.height}-${settings.mines}`);
        if(bestScores !== ""){
            return bestScores;
        }else{
            return "[]";
        }
    }
    static displayScores(scores){
        const places = document.querySelectorAll(".scores > *");
        for(let i = 0; i < 10; i++){
            if(scores[i] !== undefined){
                places[i].innerText = ` ${scores[i].nick}: ${scores[i].time} ms (${Math.floor(scores[i].time / 60000)}:${((Math.floor(scores[i].time / 1000)) % 60)})`;
            }else{
                places[i].innerText = ``;
            }
        }
    }
}

class Score{
    constructor(nick, time){
        this.nick = nick;
        this.time = time;
    }
}