// import * importa todo y lo mete en la constate PostActions
import * as PostActions from '../actions/post.action';
import { Post } from '../models/post.model';

export type Action = PostActions.All;

// Estado incial
const defaultState: Post = {
    text: 'Post inicial',
    likes: 0
};

// Funciól que provoca el cambio de estado
const newState = function(state, newData){
    // Gnera un nuevo objeto actualizado
    return Object.assign({}, state, newData);
};

export function postReducer(state: Post = defaultState, action: Action) {
    switch (action.type) {
        case PostActions.EDIT_TEXT:
            return newState(state, {text: action.payload});
        case PostActions.UPVOTE:
            return newState(state, {likes: ++state.likes });
        case PostActions.DOWNVOTE:
            return newState(state, {likes: --state.likes });
        case PostActions.RESET:
        default:
    }
}
