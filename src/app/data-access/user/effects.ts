import {Injectable} from "@angular/core";
import {EMPTY} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {BackendService} from "../backend.service";
import * as UserActions from "./actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private backend: BackendService) {};

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadAllUsers),
        mergeMap(() => this.backend.users().pipe(
            map(users => UserActions.allUsersLoaded({ users })),
            catchError(() => EMPTY)
        ))
    ))
}
