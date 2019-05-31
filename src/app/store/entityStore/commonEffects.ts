import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { head, split } from 'lodash';
import { REDUX_SUFFIXES } from '../reduxConstants';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
const {
  GET_ALL_AJAX,
  GET_ALL_SUCCEEDED,
  GET_ALL_FAILED,

  INSERT_AJAX,
  INSERT_SUCCEEDED,
  INSERT_FAILED,

  DELETE_AJAX,
  DELETE_SUCCEEDED,
  DELETE_FAILED,

  UPDATE_AJAX,
  UPDATE_SUCCEEDED,
  UPDATE_FAILED
} = REDUX_SUFFIXES;


@Injectable()
export class CommonEffects {
  @Effect()
  getAllAjax$ = this.actions$
    .pipe(
      filter(action => action.type.endsWith(GET_ALL_AJAX)),
      mergeMap(({ payload: { url }, type }: any) => this.http.get(url, httpOptions)
        .pipe(
          map(items => ({
            type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_SUCCEEDED}`,
            payload: { items }
          })),
          catchError((error) => of({
            type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_FAILED}`,
            payload: { error },
          }))
        ))
    );

  @Effect()
  insertAjax$ = this.actions$
    .pipe(
      filter(action => action.type.endsWith(INSERT_AJAX)),
      mergeMap(({ payload: { url, data }, type }: any) => this.http.post(url, data, httpOptions)
        .pipe(
          map(res => ({
            type: `${head(split(type, `${INSERT_AJAX}`))}${INSERT_SUCCEEDED}`,
            payload: { data: res }
          })),
          catchError((error) => of({
            type: `${head(split(type, `${INSERT_AJAX}`))}${INSERT_FAILED}`,
            payload: { error },
          }))
        ))
    );

  @Effect()
  deleteAjax$ = this.actions$
    .pipe(
      filter(action => action.type.endsWith(DELETE_AJAX)),
      mergeMap(({ payload: { url }, type }: any) => this.http.delete(url, httpOptions)
        .pipe(
          map(res => ({
            type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_SUCCEEDED}`,
            payload: { data: res }
          })),
          catchError((error) => of({
            type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_FAILED}`,
            payload: { error },
          }))
        ))
    );

  @Effect()
  updateAjax$ = this.actions$
    .pipe(
      filter(action => action.type.endsWith(UPDATE_AJAX)),
      mergeMap(({ payload: { url, data }, type }: any) => this.http.put(url, data, httpOptions)
        .pipe(
          map(res => ({
            type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_SUCCEEDED}`,
            payload: { data: res }
          })),
          catchError((error) => of({
            type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_FAILED}`,
            payload: { error },
          }))
        ))
    );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
