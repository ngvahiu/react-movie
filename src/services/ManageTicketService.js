import axiosService from "./BaseService"

export const getTicketListAPI = async (showtimeID) => {
    const { data } = await axiosService.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeID}`);

    return data;
}

export const bookingTicketAPI = async (showtimeID, choosingTickets) => {
    const { data } = await axiosService.post('/QuanLyDatVe/DatVe', {
        maLichChieu: showtimeID,
        danhSachVe: choosingTickets
    })

    return data;
}

export const createShowtimeAPI = async (values) => {
    await axiosService.post('/QuanLyDatVe/TaoLichChieu', values);
}