import { HIDE_TRAILER, SHOW_TRAILER } from "./TrailerUrlTypes";

const initialState = {
    trailerUrl: ''
}

export const TrailerUrlReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TRAILER: {
            return { ...state, trailerUrl: action.payload };
        }
        case HIDE_TRAILER: {
            return { ...state, trailerUrl: '' };
        }
        default:
            return state;
    }
}