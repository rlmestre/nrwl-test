import {createAction, props} from "@ngrx/store";
import {User} from "./state";

export const loadAllUsers = createAction(
    '[Page Load] Load all users',
)

export const allUsersLoaded = createAction(
    '[Load Users Effect] All users loaded',
    props<{ users: User[] }>()
)
