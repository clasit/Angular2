// El modelo recibe varias acciones

import { Action } from '@ngrx/store';


export const EDIT_TEXT = '[Post] Edit';
export const UPVOTE = '[Post] UpVote';
export const DOWNVOTE = '[Post] DownVote';
export const RESET = '[Post] Reset';


/*
 * Se definen las acciones que recibe el modelo
 */
export class EditText implements Action {
    readonly type: string = EDIT_TEXT;
    constructor(public payload: string) {}
}

export class UpVote implements Action {
    readonly type: string = UPVOTE;
}

export class DownVote implements Action {
    readonly type: string = DOWNVOTE;
}

export class Reset implements Action {
    readonly type: string = RESET;
}


// Encierra todas las acciones
export type All = UpVote | DownVote | Reset | EditText;
