import { getMovieDetailsAPI } from '../../../services/ManageFilmService';
import { SET_CAROUSEL } from './CarouselTypes'

const initialState = {
    arrBannerFilm: [{
        maBanner: 1,
        maPhim: 1282,
        hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
        tenPhim: "Ban tay diet quy 4",
        moTa: "Cuoc chien sinh tu hohi",
    }]
}

export const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAROUSEL: {
            return { ...state, arrBannerFilm: action.payload };
        }
        default:
            return state;
    }
}