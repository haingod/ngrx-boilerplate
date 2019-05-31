import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Hero, ModalComponent } from '../../core';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {
  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() deleted = new EventEmitter<Hero>();
  @Output() selected = new EventEmitter<Hero>();
  isDeletingUser$: Observable<boolean>;
  dialogRef: any;
  JSON: any;

  constructor(public dialog: MatDialog, private heroService: HeroService) {
    this.JSON = JSON;
    this.isDeletingUser$ = heroService.getIsDeleting();
    this.isDeletingUser$.pipe(distinctUntilChanged()).subscribe(val => {
      if (!val && this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }

  byId(hero: Hero) {
    return hero.id;
  }

  select(hero: Hero) {
    this.selected.emit(hero);
  }

  deleteHero(hero: Hero) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = {
      title: 'Delete Hero',
      message: `Do you want to delete ${hero.first_name}`,
      onSubmit: () => {
        this.deleted.emit(hero);
      },
      isLoading$: this.isDeletingUser$
    };

    this.dialogRef = this.dialog.open(ModalComponent, dialogConfig);
  }
}
