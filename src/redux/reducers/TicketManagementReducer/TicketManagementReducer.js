import { CHOOSE_SEAT, SET_TICKET_LIST, RESET_CHOOSING_SEATS, BOOKING_TICKET } from "./TicketManagementTypes";

const initialState = {
    ticketList: {},
    choosingSeats: []
}

export const TicketManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_LIST: {
            return { ...state, ticketList: action.payload };
        }
        case CHOOSE_SEAT: {
            let newChoosingSeats = [...state.choosingSeats];
            let index = newChoosingSeats.findIndex(seat => seat.maGhe === action.payload.maGhe);

            if (index !== -1) {
                newChoosingSeats.splice(index, 1);
            } else {
                newChoosingSeats.push(action.payload);
            }

            return { ...state, choosingSeats: newChoosingSeats };
        }
        case RESET_CHOOSING_SEATS: {
            return { ...state, choosingSeats: [] };
        }
        default:
            return state;
    }
}