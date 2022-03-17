import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface User {
    id: number;
    name: string;
}

export interface UsersState extends EntityState<User> {}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialUsersState: UsersState = userAdapter.getInitialState();

