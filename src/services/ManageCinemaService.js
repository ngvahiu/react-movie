import { GROUP_ID } from "../util/settings/Config";
import axiosService from "./BaseService";

export const getCinemaSystemAPI = async () => {
    const { data } = await axiosService.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);

    return data;
}

export const getShowtimeWithFilmID = async (filmID) => {
    const { data } = await axiosService.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmID}`)

    return data;
}

export const getCinemaBrandListAPI = async () => {
    const { data } = await axiosService.get('/QuanLyRap/LayThongTinHeThongRap');

    return data;
}

export const getCinemaListAPI = async (id) => {
    const { data } = await axiosService.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`);

    return data;
}