import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero, ToastService } from '../../core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;
  @Input() isInsertingUser: boolean;
  @Input() isUpdatingUser: boolean;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Hero>();
  @Output() update = new EventEmitter<Hero>();

  @ViewChild('name') nameElement: ElementRef;
  addMode = false;

  form = this.fb.group({
    id: [],
    first_name: ['', Validators.required],
    email: ['']
  });

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hero) {
      this.setFocus();
      if (this.hero && this.hero.id) {
        this.form.patchValue(this.hero);
        this.addMode = false;
      } else {
        this.form.reset();
        this.addMode = true;
      }
    }
    if (
      (changes.isInsertingUser &&
        (!changes.isInsertingUser.currentValue &&
          changes.isInsertingUser.previousValue)) ||
      (changes.isUpdatingUser &&
        (!changes.isUpdatingUser.currentValue &&
          changes.isUpdatingUser.previousValue))
    ) {
      setTimeout(() => {
        this.close();
        this.toastService.openSnackBar('OK', 'SUCCEEDED');
      });
    }
  }

  addHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.add.emit({ ...this.hero, ...value });
    }
  }

  close() {
    this.unselect.emit();
  }

  saveHero(form: FormGroup) {
    if (this.addMode) {
      this.addHero(form);
    } else {
      this.updateHero(form);
    }
  }

  setFocus() {
    setTimeout(() => {
      this.nameElement.nativeElement.focus();
    });
  }

  updateHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.hero, ...value });
    }
  }
}
