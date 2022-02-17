import { types } from "../types/types";

export const setNavigation = ( page ) => ({
    type: types.adminNavigation,
    payload: page
});