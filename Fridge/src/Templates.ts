export interface IBoard{
    boardId: string;
    active: number;
    all: number;
    maxIndex: number;
    notes: Array<INote>;
}

export interface INote{
    x: number;
    y: number;
    content: string;
    id: number;
    width: number;
    height: number;
    zIndex: number;
}

export interface IRequestBoard{
    boardId: string;
    activeNotes: number;
    allNotes: number;
    maxIndex: number;
    notes: Array<INote>;
}