import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

export class EntityService {
  constructor(
    private store: Store<any>,
    private actions: any,
    private selectors: any
  ) {}

  // Connect select to store
  public getAll() {
    return this.store
      .select(this.selectors.items)
      .pipe(map(item => item && item.toJS()));
  }

  public getIsDeleting() {
    return this.store.select(this.selectors.isDeleting);
  }

  public getIsInserting() {
    return this.store.select(this.selectors.isInserting);
  }

  public getIsUpdating() {
    return this.store.select(this.selectors.isUpdating);
  }

  public getIsLoading() {
    return this.store.select(this.selectors.isLoadingItems);
  }

  public getPageInfo() {
    return this.store.select(this.selectors.pageInfo);
  }

  // Dispatch action to store
  public loadAll(url) {
    this.store.dispatch(this.actions.getAllAjax({ url }));
  }

  public addOne(url, data) {
    this.store.dispatch(this.actions.insertAjax({ url, data }));
  }

  public deleteOne(url, data) {
    const deleteUrl = `${url}/${data.id}`;
    this.store.dispatch(this.actions.deleteAjax({ url: deleteUrl }));
  }

  public updateOne(url, data) {
    const updateUrl = `${url}/${data.id}`;
    this.store.dispatch(this.actions.updateAjax({ url: updateUrl, data }));
  }
}
