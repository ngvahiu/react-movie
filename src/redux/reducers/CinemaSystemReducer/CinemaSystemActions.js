import { getCinemaSystemAPI, getShowtimeWithFilmID } from "../../../services/ManageCinemaService"
import { SET_CINEMA_SYSTEM, SET_FILM_SELECTED } from "./CinemaSystemTypes";

export const setCinemaSystemAction = () => {
    return async (dispatch) => {
        try {
            const { content: cinemaSystem } = await getCinemaSystemAPI();

            dispatch({
                type: SET_CINEMA_SYSTEM,
                payload: cinemaSystem
            })
        } catch (error) {
            console.log('error');
        }
    }
}

export const setFilmSelectedAction = (filmID) => {
    return async (dispatch) => {
        try {
            const { content: filmSelected } = await getShowtimeWithFilmID(filmID);

            dispatch({
                type: SET_FILM_SELECTED,
                payload: filmSelected
            })
        } catch (error) {
            console.log('error');
        }
    }
}