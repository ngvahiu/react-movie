import { SET_CINEMA_SYSTEM, SET_FILM_SELECTED } from "./CinemaSystemTypes";

const initialState = {
    cinemaSystem: [],
    filmSelected: {}
}

export const CinemaSystemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CINEMA_SYSTEM: {
            return { ...state, cinemaSystem: action.payload };
        }
        case SET_FILM_SELECTED: {
            return { ...state, filmSelected: action.payload };  
        }
        default:
            return state
    }
}

