import { GROUP_ID } from "../util/settings/Config";
import axiosService from "./BaseService";

export const getBannerAPI = async () => {
    const { data } = await axiosService.get("/QuanLyPhim/LayDanhSachBanner");

    return data;
}

export const getMovieDetailsAPI = async (movieID) => {
    const { data } = await axiosService.get("/QuanLyPhim/LayThongTinPhim", {
        params: {
            MaPhim: movieID
        }
    });

    return data;
}

export const getFilmListAPI = async (searchTerm) => {
    if (searchTerm && searchTerm !== '') {
        const { data } = await axiosService.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${searchTerm}`);

        return data;
    } else {
        const { data } = await axiosService.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);

        return data;
    }
}

export const addFilmAPI = async (values) => {
    const formData = new FormData();
    for (let key in values) {
        if (values[key] !== null) {
            formData.append(key, values[key]);
        }
    }

    await axiosService.post('/QuanLyPhim/ThemPhimUploadHinh', formData);
}

export const deleteFilmAPI = async (id) => {
    await axiosService.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`);
}

export const updateFilmAPI = async (values) => {
    const formData = new FormData();
    for (let key in values) {
        if (values[key] !== null) {
            formData.append(key, values[key]);
        }
    }
    await axiosService.post('/QuanLyPhim/CapNhatPhimUpload', formData);
}
