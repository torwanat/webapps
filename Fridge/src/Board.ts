import { Box } from "./Box"
import { IBoard, INote } from "./Templates";

export class Board{
    public active: number = 0;
    public all: number = 0;
    public maxIndex: number = 0;
    public notes: Array<Box> = [];
    private activeCounter: HTMLElement;
    private allCounter: HTMLElement;
    private data: IBoard;
    private sendData: string;
    private boardId: string;

    constructor(active: number, all: number, boardId: string, maxIndex: number, notes: Array<INote>){
        this.active = active;
        this.all = all;
        this.activeCounter = document.querySelector(".active");
        this.allCounter = document.querySelector(".all");
        this.boardId = boardId;
        this.maxIndex = maxIndex;
        if(notes.length > 0){
            let temp = JSON.parse((notes as unknown as string));
            for (const note of temp) {
                let tempBox: Box = new Box(this, note.x, note.y, note.zIndex, note.width, note.height, note.id, decodeURIComponent(note.content), true);
                this.notes.push(tempBox);
            }
            this.postBoard();
        }
        this.updateActive();
        this.updateAll();
    }

    updateActive(){
        this.activeCounter.innerHTML = `Karteczki: ${this.active}`;
    }

    updateAll(){
        this.allCounter.innerHTML = `Przebieg: ${this.all}`;
    }

    increaseActive(){
        this.active++;
    }

    increaseAll(){
        this.all++;
    }

    async postBoard(){
        let filteredNotes = [...new Map(this.notes.map(v => [v.id, v])).values()]
        this.data = {
            boardId: this.boardId,
            active: this.active,
            all: this.all,
            maxIndex: this.maxIndex,
            notes: filteredNotes.map((noteEl) => {
                return {
                    x: noteEl.x,
                    y: noteEl.y,
                    content: encodeURIComponent(noteEl.content),
                    id: noteEl.id,
                    width: noteEl.width,
                    height: noteEl.height,
                    zIndex: noteEl.zIndex,
                }
            })
        }
        this.sendData = JSON.stringify(this.data);
        const response = await fetch("./send.php", {method: "POST", body: this.sendData});
        return response.text();
    }
}