import Swal from "sweetalert2";
import { addFilmAPI, deleteFilmAPI, getFilmListAPI, getMovieDetailsAPI, updateFilmAPI } from "../../../services/ManageFilmService"
import { SET_DETAILS_FILM, SET_FILM_LIST } from "./FilmManagementTypes";

export const getDetailsFilmAction = (id) => {
    return async (dispatch) => {
        try {
            const { content: details } = await getMovieDetailsAPI(id);

            dispatch({
                type: SET_DETAILS_FILM,
                payload: details
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const setFilmListAction = (searchTerm) => {
    return async (dispatch) => {
        try {
            const { content: arrFilm } = await getFilmListAPI(searchTerm);

            dispatch({
                type: SET_FILM_LIST,
                payload: arrFilm
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const addFilmAction = (values, resetFormFunc) => {
    return async () => {
        try {
            await addFilmAPI(values);

            await setFilmListAction();

            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Add film successfully !',
                showConfirmButton: false,
                timer: 1500
            })

            //reset form
            resetFormFunc();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Add film failed.',
                text: error.response?.data?.content,
                confirmButtonColor: "#ff0000"
            })
        }
    }
}

export const deleteFilmAction = (id) => {
    return async () => {
        try {
            await deleteFilmAPI(id);

            await setFilmListAction();

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete film successfully !',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Delete film failed.',
                text: error.response?.data?.content,
                confirmButtonColor: "#ff0000"
            })
        }
    }
}

export const updateFilmAction = (values, resetFormFunc) => {
    return async () => {
        try {
            await updateFilmAPI(values);

            await setFilmListAction();

            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Update film successfully !',
                showConfirmButton: false,
                timer: 1500
            });

            //reset form
            resetFormFunc();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Update film failed.',
                text: error.response?.data?.content,
                confirmButtonColor: "#ff0000"
            })
        }
    }
}