import { getBannerAPI, getMovieDetailsAPI } from '../../../services/ManageFilmService';
import { SET_CAROUSEL } from './CarouselTypes'

export const setBannerCarouselAction = () => {
    return async (dispatch) => {
        try {
            const { content: arrBanner } = await getBannerAPI();

            const trailers = [
                "https://www.youtube.com/embed/8jraVtX821Q",
                "https://www.youtube.com/embed/kBY2k3G6LsM",
                "https://www.youtube.com/embed/Eu9G8nO5-Ug"
            ]
            for (let i = 0; i < arrBanner.length; i++) {
                const { content: bannerDetail } = await getMovieDetailsAPI(arrBanner[i].maPhim);

                arrBanner[i] = {
                    ...arrBanner[i],
                    tenPhim: bannerDetail.tenPhim,
                    moTa: bannerDetail.moTa,
                    trailer: trailers[i]
                }
            }
            
            dispatch({
                type: SET_CAROUSEL,
                payload: arrBanner
            })
        } catch (error) {
            console.log(error)
        }
    }
}