import {createReducer, on} from "@ngrx/store";
import {initialUsersState, userAdapter} from "./state";
import * as UserActions from "./actions";

export const userReducers = createReducer(
    initialUsersState,
    on(UserActions.allUsersLoaded, (state, action) => userAdapter.setAll(action.users, state)),
)
