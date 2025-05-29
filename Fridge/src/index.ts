import { Box } from "./Box";
import { Board } from "./Board";
import { IRequestBoard } from "./Templates";

document.title = `${decodeURIComponent(sessionStorage.getItem("boardId"))}`;
let btn = document.createElement("button");
let requestedBoard: IRequestBoard;
let board: Board;
btn.innerHTML = "Nowa karteczka";
document.querySelector(".container").appendChild(btn);
sessionStorage.setItem("boardId", decodeURIComponent(sessionStorage.getItem("boardId")));
fetch(`./get.php?boardId=${sessionStorage.getItem("boardId")}`, {method: "GET"}).then((response) =>{
    return response.text();
}).then((response) =>{
    if(response !== "noIdFound"){
        requestedBoard = JSON.parse(response);
        board = new Board(requestedBoard.activeNotes, requestedBoard.allNotes, sessionStorage.getItem("boardId"), requestedBoard.maxIndex, requestedBoard.notes);
    }else{
        board = new Board(0, 0, sessionStorage.getItem("boardId"), 0, []);
    }
        btn.onclick = () => {
        board.increaseActive();
        board.increaseAll();
        board.updateActive();
        board.updateAll();
        new Box(board, 40, 40, -1, 100, 100, -1, "");
    }
}); 
