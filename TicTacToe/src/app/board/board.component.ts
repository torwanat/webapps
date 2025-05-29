import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../cell/cellEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  private currentPlayer: CellEnum = CellEnum.X;
  public board: CellEnum[][] = [];
  private gameOver: boolean = false;
  public status: string = "";
  private waiting: boolean = false;

  constructor(){
  }

  ngOnInit(){
    this.newGame();
  }

  get isGameOver(): boolean{
    return this.gameOver;
  }

  newGame(){
    this.board = [];
    this.waiting = false;
    for(let i = 0; i < 3; i++){
      this.board[i] = [];
      for(let j = 0; j < 3; j++){
        this.board[i][j] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.X;
    this.gameOver = false;
    this.status = `Teraz gra ${this.currentPlayer}`;
  }

  move(row: number, col: number){
    if(!this.gameOver && this.board[row][col] == CellEnum.EMPTY && !this.waiting){
      this.waiting = true;
      this.board[row][col] = this.currentPlayer;
      if(this.isWin(this.board)){
        this.status = `Wygrywa ${this.currentPlayer}`;
        this.gameOver = true;
      }else{
        if(this.isDraw(this.board)){
          this.status = `Remis!`;
          this.gameOver = true
        }else{
          this.currentPlayer == CellEnum.X ? this.currentPlayer = CellEnum.O : this.currentPlayer = CellEnum.X;
          this.status = `Teraz gra ${this.currentPlayer}`;
          setTimeout(() => {
            this.aiMove();
          }, 500);
        }
      }
    }
  }

  aiMove(){
    let best = this.findBestMove(this.board);
    this.board[best.row][best.col] = this.currentPlayer;
    if(this.isWin(this.board)){
      this.status = `Wygrywa ${this.currentPlayer}`;
      this.gameOver = true;
    }else{
      if(this.isDraw(this.board)){
        this.status = `Remis!`;
        this.gameOver = true;
      }else{
        this.currentPlayer == CellEnum.X ? this.currentPlayer = CellEnum.O : this.currentPlayer = CellEnum.X;
        this.status = `Teraz gra ${this.currentPlayer}`;
        this.waiting = false;
      }
    }
  }

  moveIsAvailable(board: CellEnum[][], row: number, col: number): boolean{
    return board[row][col] == CellEnum.EMPTY ? true : false;
  }

  copyBoard(board: CellEnum[][]): CellEnum[][]{
    return board.slice();
  }

  evaluate(b: CellEnum[][]): number{
    for(let row = 0; row < 3; row++){
      if (b[row][0] == b[row][1] && b[row][1] == b[row][2]){
        if (b[row][0] == CellEnum.X){
          return Infinity;
        }else if (b[row][0] == CellEnum.O){
          return -Infinity;
        }
      }
    }

    for(let col = 0; col < 3; col++){
      if (b[0][col] == b[1][col] && b[1][col] == b[2][col]){
        if (b[0][col] == CellEnum.X){
          return Infinity;
        }else if (b[0][col] == CellEnum.O){
          return -Infinity;
        }
      }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]){
      if (b[0][0] == CellEnum.X){
        return Infinity;
      }else if (b[0][0] == CellEnum.O){
        return -Infinity;
      }
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]){
      if (b[0][2] == CellEnum.X){
        return Infinity;
      }else if (b[0][2] == CellEnum.O){
        return -Infinity;
      }
    }

	  return 0;
  }

  minimax(board: CellEnum[][], depth: number, isMax: boolean){
    let score = this.evaluate(board);

    if (score == Infinity){
      return score;
    }

    if (score == -Infinity){
      return score;
    }

    if (this.isDraw(board)){
      return 0;
    }

    if(isMax){
      let best = -Infinity;

      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if (board[i][j] == CellEnum.EMPTY){
            board[i][j] = CellEnum.X;
            best = Math.max(best, this.minimax(board, depth + 1, !isMax));
            board[i][j] = CellEnum.EMPTY;
          }
        }
      }
      return best;
    }else{
      let best = Infinity;
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if (board[i][j] == CellEnum.EMPTY){
            board[i][j] = CellEnum.O;
            best = Math.min(best, this.minimax(board, depth + 1, !isMax));
            board[i][j] = CellEnum.EMPTY;
          }
        }
      }
      return best;
    }
  }

  findBestMove(board: CellEnum[][]){
    let bestVal = Infinity;
    let bestMove = {row: -1, col: -1};

    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if (board[i][j] == CellEnum.EMPTY){
          board[i][j] = CellEnum.O;
          let moveVal = this.minimax(board, 0, true);
          board[i][j] = CellEnum.EMPTY;
          if (moveVal < bestVal){
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }

    return bestMove;
}


  isWin(board: CellEnum[][]): boolean{
    for(const columns of board){
      if(columns[0] !== CellEnum.EMPTY && columns[0] == columns[1] && columns[0] == columns[2]){
        return true;
      }
    }

    for(let i = 0; i < board[0].length; i++){
      if(board[0][i] !== CellEnum.EMPTY && board[0][i] == board[1][i] && board[0][i] == board[2][i]){
        return true;
      }
    }

    if(board[0][0] !== CellEnum.EMPTY && board[0][0] == board[1][1] && board[0][0] == board[2][2]){
      return true;
    }

    if(board[0][2] !== CellEnum.EMPTY && board[0][2] == board[1][1] && board[0][2] == board[2][0]){
      return true;
    }

    return false;
  }

  isDraw(board: CellEnum[][]): boolean{
    for(const columns of board){
      for(const col of columns){
        if(col == CellEnum.EMPTY){
          return false;
        }
      }
    }
    return true;
  }
}
