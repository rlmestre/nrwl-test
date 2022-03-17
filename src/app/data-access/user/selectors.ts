import { createFeatureSelector, createSelector, defaultMemoize } from "@ngrx/store";
import { User, userAdapter, UsersState } from "./state";

export const getUsersState = createFeatureSelector<UsersState>('users');

export const usersSelector = userAdapter.getSelectors(getUsersState)
// Alternative pattern to selectors with props without losing memoization
const _selectUserById = (id: User['id']) =>
    createSelector(usersSelector.selectEntities, (users) => users[id] ?? {});

export const selectUserById = (id: User['id']) => defaultMemoize(_selectUserById).memoized(id);
