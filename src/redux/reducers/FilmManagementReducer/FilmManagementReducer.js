import { SET_DETAILS_FILM, SET_FILM_LIST } from "./FilmManagementTypes";

const initialState = {
    arrFilm: [],
    detailsFilm: {}
}

export const FilmManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILM_LIST: {
            return { ...state, arrFilm: action.payload };
        }
        case SET_DETAILS_FILM: {
            return {...state, detailsFilm: action.payload};
        }
        default:
            return state;
    }
}