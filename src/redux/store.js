import { configureStore } from "@reduxjs/toolkit";
import { CarouselReducer } from "./reducers/CarouselReducer/CarouselReducer";
import { UserManagementReducer } from "./reducers/UserManagementReducer/UserManagementReducer";
import { FilmManagementReducer } from "./reducers/FilmManagementReducer/FilmManagementReducer";
import { CinemaSystemReducer } from "./reducers/CinemaSystemReducer/CinemaSystemReducer"
import { TrailerUrlReducer } from "./reducers/TrailerUrlReducer/TrailerUrlReducer"
import { TicketManagementReducer } from "./reducers/TicketManagementReducer/TicketManagementReducer";
import UserReducer from "./reducers/slices/userSlice/userSlice"

const store = configureStore({
    reducer: {
        CarouselReducer,
        UserManagementReducer,
        FilmManagementReducer,
        CinemaSystemReducer,
        TrailerUrlReducer,
        TicketManagementReducer,
        UserReducer
    }
});

export default store;

