import { GROUP_ID } from "../util/settings/Config";
import axiosService from "./BaseService"

export const singInAPI = async (values) => {
    const { data } = await axiosService.post("/QuanLyNguoiDung/DangNhap", values);

    return data;
}

export const singUpAPI = async (values) => {
    const payload = { ...values, maNhom: GROUP_ID };
    const { data } = await axiosService.post("/QuanLyNguoiDung/DangKy", payload);

    return data;
}

export const getInforAccountAPI = async () => {
    const { data } = await axiosService.post("/QuanLyNguoiDung/ThongTinTaiKhoan");

    return data;
}

export const getInforUserAPI = async (taiKhoan) => {
    const { data } = await axiosService.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);

    return data;
}

export const editInforAccountAPI = async (values) => {
    const payload = { ...values, maNhom: GROUP_ID };
    const { data } = await axiosService.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);

    return data;
}

export const getUserListAPI = async (searchTerm) => {
    if (searchTerm && searchTerm !== '') {
        const { data } = await axiosService.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${searchTerm}`);

        return data;
    } else {
        const { data } = await axiosService.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`);

        return data;
    }
}

export const deleteUserAPI = async (username) => {
    await axiosService.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`)
}

export const addUserAPI = async (values) => {
    values = { ...values, maNhom: "GP00" };

    await axiosService.post('/QuanLyNguoiDung/ThemNguoiDung', values);
}

export const updateUserAPI = async (values) => {
    values = { ...values, maNhom: "GP00" };

    await axiosService.post('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', values);
}