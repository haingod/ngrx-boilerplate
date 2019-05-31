import { action, payload, reducer } from 'ts-action';
import { on } from 'ts-action-immer';
import { camelCase, reduce, upperCase } from 'lodash';
import { fromJS, Map } from 'immutable';
import { REDUX_SUFFIXES } from '../reduxConstants';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const reduxGenerator = featureName => {
  // ActionTypes
  const featureNameUpperCase = upperCase(featureName);
  const EntityActionTypes = reduce(
    REDUX_SUFFIXES,
    (acc, value, key) => {
      return {
        ...acc,
        [key]: `${featureNameUpperCase}_${key}`
      };
    },
    {}
  );

  // Actions
  const actions = reduce(
    EntityActionTypes,
    (acc, value) => {
      return {
        ...acc,
        [camelCase(value.split(featureNameUpperCase)[1])]: action(
          value,
          payload<{}>()
        )
      };
    },
    {}
  );
  // State
  const initialState = fromJS({
    items: []
  });
  const args = reduce(
    actions,
    (acc, value) => {
      // tslint:disable-next-line:no-shadowed-variable
      const handler = on(value, (state: Map<string, any>, { payload }) => {
        switch (value.type) {
          case EntityActionTypes.GET_ALL_SUCCEEDED:
            return state.set('items', fromJS(payload.items));
          case EntityActionTypes.GET_ALL_FAILED:
            return state.set('getAllError', fromJS(payload.error));
          case EntityActionTypes.GET_ALL_CLEAN:
            return state
              .set('items', fromJS([]))
              .set('getAllError', fromJS({}));
          case EntityActionTypes.GET_SUCCEEDED:
            return state
              .set('items', fromJS([]))
              .set('item', fromJS(payload.data));
          case EntityActionTypes.GET_FAILED:
            return state
              .set('items', fromJS([]))
              .set('getError', fromJS(payload.error));
          case EntityActionTypes.GET_CLEAN:
            return state.set('item', fromJS({})).set('getError', fromJS({}));
          case EntityActionTypes.INSERT_AJAX:
            return state
              .set('isInsertSucceeded', undefined)
              .set('insertError', undefined);
          case EntityActionTypes.INSERT_SUCCEEDED:
            return state.set('isInsertSucceeded', true);
          case EntityActionTypes.INSERT_FAILED:
            return state.set('insertError', fromJS(payload.error));
          case EntityActionTypes.INSERT_CLEAN:
            return state
              .set('insertError', fromJS({}))
              .set('isInsertSucceeded', false);
          case EntityActionTypes.UPDATE_AJAX:
            return state
              .set('updateError', undefined)
              .set('isUpdateSucceeded', undefined);
          case EntityActionTypes.UPDATE_SUCCEEDED:
            return state.set('isUpdateSucceeded', true);
          case EntityActionTypes.UPDATE_FAILED:
            return state
              .set('updateError', fromJS(payload.error))
              .set('isUpdateSucceeded', false);
          case EntityActionTypes.UPDATE_CLEAN:
            return state
              .set('updateError', fromJS({}))
              .set('isUpdateSucceeded', false);
          case EntityActionTypes.DELETE_AJAX:
            return state
              .set('isDeleteSucceeded', undefined)
              .set('deleteError', undefined);
          case EntityActionTypes.DELETE_SUCCEEDED:
            return state.set('isDeleteSucceeded', true);
          case EntityActionTypes.DELETE_FAILED:
            return state
              .set('deleteError', fromJS(payload.error))
              .set('isDeleteSucceeded', false);
          case EntityActionTypes.DELETE_CLEAN:
            return state
              .set('deleteError', fromJS({}))
              .set('isDeleteSucceeded', false);
          default:
            return state;
        }
      });
      return [...acc, handler];
    },
    []
  );
  const reducers = reducer(initialState, ...args);

  // Selectors
  const selectState = createFeatureSelector<any>(featureName);
  const selectAjaxState = createFeatureSelector<any>('ajax');
  const selectors = {
    pageInfo: createSelector(
      state => state[featureName].getIn(['items', 'total']),
      state => state[featureName].getIn(['items', 'total_pages']),
      state => state[featureName].getIn(['items', 'per_page']),
      (total, total_pages, per_page) => ({ total, total_pages, per_page })
    ),
    items: createSelector(
      selectState,
      f => f.getIn(['items', 'data'])
    ),
    item: createSelector(
      selectState,
      f => f.get('item')
    ),
    insertError: createSelector(
      selectState,
      f => f.get('insertError')
    ),
    updateError: createSelector(
      selectState,
      f => f.get('updateError')
    ),
    deleteError: createSelector(
      selectState,
      f => f.get('deleteError')
    ),
    isInsertSucceeded: createSelector(
      selectState,
      f => f.get('isInsertSucceeded')
    ),
    isUpdateSucceeded: createSelector(
      selectState,
      f => f.get('isUpdateSucceeded')
    ),
    isDeleteSucceeded: createSelector(
      selectState,
      f => f.get('isDeleteSucceeded')
    ),
    // progress selectors
    isLoadingItems: createSelector(
      selectAjaxState,
      ajax => ajax.get(`${featureNameUpperCase}_GET_ALL`) === 1
    ),
    isLoadingItem: createSelector(
      selectAjaxState,
      ajax => ajax.get(`${featureNameUpperCase}_GET`) === 1
    ),
    isDeleting: createSelector(
      selectAjaxState,
      ajax => ajax.get(`${featureNameUpperCase}_DELETE`) === 1
    ),
    isInserting: createSelector(
      selectAjaxState,
      ajax => ajax.get(`${featureNameUpperCase}_INSERT`) === 1
    ),
    isUpdating: createSelector(
      selectAjaxState,
      ajax => ajax.get(`${featureNameUpperCase}_UPDATE`) === 1
    )
  };

  return {
    actions,
    reducers: {
      [featureName]: reducers
    },
    selectors
  };
};
