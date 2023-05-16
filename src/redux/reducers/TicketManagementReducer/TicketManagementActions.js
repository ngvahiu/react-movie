import Swal from "sweetalert2";
import { bookingTicketAPI, createShowtimeAPI, getTicketListAPI } from "../../../services/ManageTicketService";
import { SET_TICKET_LIST } from "./TicketManagementTypes";

export const setTicketListAction = (showtimeID) => {
    return async (dispatch) => {
        try {
            const { content: ticketList } = await getTicketListAPI(showtimeID);

            dispatch({
                type: SET_TICKET_LIST,
                payload: ticketList
            })
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
}

export const bookingTicketAction = (showtimeID, choosingSeats) => {
    return async () => {
        try {
            let choosingTickets = choosingSeats.map((ticket) => {
                return {
                    maGhe: ticket.maGhe,
                    giaVe: ticket.giaVe
                }
            })

            const { content } = await bookingTicketAPI(showtimeID, choosingTickets);

            console.log('content: ', content);
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
}

export const createShowtimeAction = (values, resetFieldsFunc) => {
    return async () => {
        try {
            await createShowtimeAPI(values);

            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Create showtime successfully !',
                showConfirmButton: false,
                timer: 1500
            });

            resetFieldsFunc();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Create showtime failed.',
                text: error.response?.data?.content,
                confirmButtonColor: "#ff0000"
            })
        }
    }
}