import {Component, computed, inject} from '@angular/core';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {AdventureCampsStore} from '../../../application/adventure-camps.store';
import {ReservationsEntity} from '../../../domain/model/reservations.entity';
import {WeatherStore} from '../../../../weather/application/weather.store';

/**
 * New Reservation view: reactive form that registers participants at an adventure camp.
 *
 * @author Sofia Diaz Yurivilca
 */
@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInput, MatButtonModule, TranslatePipe],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly weatherStore = inject(WeatherStore);
  readonly store = inject(AdventureCampsStore);

  /**
   * Activity types the user can select.
   */
  readonly activityTypes = ['hiking', 'trekking', 'camping', 'climbing'];

  /**
   * Form-group for the reservation form.
   */
  readonly form = this.fb.group({
    activityType: new FormControl<string | null>(null, {validators: [Validators.required]}),
    participantName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, this.notBlank]}),
    participants: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1), (control: AbstractControl) => this.withinCapacity(control)]
    })
  });

  private readonly activityType = toSignal(this.form.controls.activityType.valueChanges, {initialValue: null});

  /**
   * The adventure camp determined by the selected activity type.
   */
  readonly selectedCamp = computed(() =>
    this.store.adventureCamps().find(camp => camp.activityType === this.activityType()));

  /**
   * Available capacity of the selected adventure camp.
   */
  readonly availableCapacity = computed(() => {
    const camp = this.selectedCamp();
    return camp ? this.store.adventureCampSummaries()
      .find(summary => summary.adventureCamp.id === camp.id)?.availableCapacity ?? 0 : 0;
  });

  /**
   * Current temperature of the selected adventure camp, or null while unavailable.
   */
  readonly temperature = this.weatherStore.temperature;
  readonly weatherLoading = this.weatherStore.loading;
  readonly weatherError = computed(() => this.weatherStore.error() !== null);

  /**
   * Creates the form and keeps the weather and capacity validation in sync with the selection.
   */
  constructor() {
    toObservable(this.selectedCamp).pipe(takeUntilDestroyed()).subscribe(camp => {
      if (camp) {
        this.weatherStore.loadTemperature(camp.latitude, camp.longitude);
      } else {
        this.weatherStore.clear();
      }
    });

    toObservable(this.availableCapacity).pipe(takeUntilDestroyed())
      .subscribe(() => this.form.controls.participants.updateValueAndValidity());
  }

  /**
   * Creates the reservation; navigates to /home only after it was saved.
   */
  submit(): void {
    const camp = this.selectedCamp();
    const temperature = this.temperature();
    if (this.form.invalid || !camp || temperature === null) return;
    const reservation = new ReservationsEntity({
      id: 0,
      adventureCampId: camp.id,
      activityType: camp.activityType,
      participantName: this.form.controls.participantName.value.trim(),
      participants: this.form.controls.participants.value!,
      weatherTemperature: temperature,
      reservedAt: new Date()
    });
    this.store.addReservation(reservation, () => this.router.navigate(['/home']).then());
  }

  /**
   * Returns to /home without saving.
   */
  cancel(): void {
    this.router.navigate(['/home']).then();
  }

  private notBlank(control: AbstractControl): ValidationErrors | null {
    return String(control.value ?? '').trim().length === 0 ? {blank: true} : null;
  }

  private withinCapacity(control: AbstractControl): ValidationErrors | null {
    const value = control.value as number | null;
    return value !== null && this.selectedCamp() && value > this.availableCapacity() ? {capacity: true} : null;
  }
}
