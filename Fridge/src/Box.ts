import tinymce from "tinymce";
import { Board } from "./Board";
import { INote } from "./Templates";

export class Box{
    private dragzone: HTMLElement;
    private remove: HTMLElement;
    private resize: HTMLElement;
    private edit: HTMLElement;
    private container: HTMLElement;
    private saveBtn: HTMLElement;
    private closeBtn: HTMLElement;
    private buttonPlace: HTMLElement;
    private boxContent: HTMLElement;
    private closeButton: HTMLElement;
    private dx: number;
    private dy: number;
    public x: number;
    public y: number;
    public content: string = "";
    private board: Board;
    public readonly id: number;
    public zIndex: number;
    public width: number;
    public height: number;
    private observer: ResizeObserver;
  
    constructor(board: Board, x: number, y: number, zIndex: number, width: number, height: number, id: number, content: string, first?: boolean){
      this.dx = 0;
      this.dy = 0;
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.board = board;
      id === -1 ? this.id = board.all : this.id = id;
      this.content = content;
      this.container = document.querySelector(".container");
      this.createBox();
      this.createRemoveButton();
      this.createEditButton();
      zIndex === -1 ? this.updateIndex() : this.zIndex = zIndex;
      this.board.notes.push(this);
      if (!first) {
        this.postBoard();
      }
    }

    createBox(){
        this.resize = document.createElement("div");
        this.resize.classList.add("background");
        this.resize.id = `${this.id}`;
        this.container.appendChild(this.resize);
        this.dragzone = document.createElement("div");
        this.dragzone.classList.add("moveable-container");
        this.dragzone.classList.add("dragzone");
        this.resize.appendChild(this.dragzone);
        this.boxContent = document.createElement("div");
        this.boxContent.classList.add("box-content");
        this.dragzone.appendChild(this.boxContent);
        this.resize.style.top = `${this.y}px`;
        this.resize.style.left = `${this.x}px`;
        this.resize.style.zIndex = `${this.zIndex}`;
        this.resize.style.width = `${this.width}px`;
        this.resize.style.height = `${this.height}px`;
        this.boxContent.innerHTML = `${this.content}`;
        this.dragDiv();
        this.watchDimensions();
    }

    watchDimensions(){
        this.observer = new ResizeObserver(this.saveDimensions.bind(this));
        this.observer.observe(this.resize);
        this.resize.onmouseup = this.postBoard.bind(this);
    }

    saveDimensions(){
        const dimensions: HTMLElement = document.getElementById(`${this.id}`);
        this.width = dimensions.offsetWidth;
        this.height = dimensions.offsetHeight;
    }

    async postBoard(){
        await this.board.postBoard();
    }

    createRemoveButton(){
        this.remove = document.createElement("button");
        this.remove.innerHTML = "X";
        this.remove.classList.add("remove");
        this.dragzone.appendChild(this.remove);
        this.remove.onclick = this.removeButton.bind(this);
    }

    createEditButton(){
        this.edit = document.createElement("div");
        this.edit.classList.add("edit");
        this.edit.innerHTML = "Edytuj";
        this.dragzone.appendChild(this.edit);
        this.edit.onclick = this.editButton.bind(this);
    }

    removeButton(){
        this.observer.disconnect();
        this.resize.remove();
        this.board.active--;
        this.board.updateActive();
        this.board.notes = this.board.notes.filter((note) =>{
            return note.id !== this.id;
        });
        this.postBoard();
    }

    editButton(){
        this.container.style.pointerEvents = "none";
        this.content = this.boxContent.innerHTML;
        tinymce.init({
            selector: "div#invisible"
        }).then(() => {
            tinymce.activeEditor.insertContent(this.content);
            this.buttonPlace = document.querySelector(".tox-statusbar__branding");
            this.buttonPlace.innerHTML = "";
            this.saveBtn = document.createElement("button");
            this.saveBtn.innerHTML = "Save";
            this.saveBtn.onclick = () => {
                this.content = tinymce.activeEditor.getContent();
                this.boxContent.innerHTML = this.content;
            };
            this.closeBtn = document.createElement("button");
            this.closeBtn.innerHTML = "Close";
            this.closeBtn.onclick = async () => {
                tinymce.activeEditor.resetContent();
                tinymce.activeEditor.remove();
                this.container.style.pointerEvents = "auto";
                await this.postBoard();
            }
            this.saveBtn.classList.add("tinymce-button");
            this.closeBtn.classList.add("tinymce-button");
            this.buttonPlace.appendChild(this.saveBtn);
            this.buttonPlace.append(this.closeBtn);
        });
    }
  
    dragDiv(){
        this.dragzone.onmousedown = this.dragMouseDown.bind(this);
    }

    dragMouseDown(ev: MouseEvent){
        ev.preventDefault();
        this.x = ev.clientX;
        this.y = ev.clientY;
        this.updateIndex();
        document.onmouseup = this.closeDragDiv.bind(this);
        document.onmousemove = this.moveDiv.bind(this);
    }

    moveDiv(ev: MouseEvent){
        ev.preventDefault();
        this.dx = this.x - ev.clientX;
        this.dy = this.y - ev.clientY;
        this.x = ev.clientX;
        this.y = ev.clientY;
        this.resize.style.top = (this.resize.offsetTop - this.dy) + "px";
        this.resize.style.left = (this.resize.offsetLeft - this.dx) + "px";
    }

    closeDragDiv(){
        document.onmouseup = null;
        document.onmousemove = null;
    }

    
    updateIndex(){
        this.board.maxIndex++;
        this.zIndex = this.board.maxIndex;
        this.resize.style.zIndex = `${this.board.maxIndex}`;
    }
}