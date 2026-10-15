import {computed, inject, Service, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry, switchMap, throwError} from 'rxjs';
import {AdventureCampsEntity} from '../domain/model/adventure-camps.entity';
import {ReservationsEntity} from '../domain/model/reservations.entity';
import {AdventureCampsService} from '../infrastructure/adventure-camps.service';

/**
 * Summary of an adventure camp with its reservations and capacity indicators.
 */
export interface AdventureCampOverview {
  adventureCamp: AdventureCampsEntity;
  reservations: ReservationsEntity[];
  totalParticipants: number;
  availableCapacity: number;
}

/**
 * Application store that manages adventure camps and reservations state with Angular Signals.
 *
 * @author Sofia Diaz Yurivilca
 */
@Service()
export class AdventureCampsStore {
  private readonly adventureCampsService = inject(AdventureCampsService);

  readonly adventureCampCount = computed(() => this.adventureCamps().length);
  readonly reservationCount = computed(() => this.reservations().length);
  readonly adventureCampSummaries = computed<AdventureCampOverview[]>(() =>
    this.adventureCamps().map(adventureCamp => {
      const reservations = this.reservations().filter(r => r.adventureCampId === adventureCamp.id);
      const totalParticipants = this.sumParticipants(reservations, adventureCamp.id);
      return {
        adventureCamp,
        reservations,
        totalParticipants,
        availableCapacity: adventureCamp.capacity - totalParticipants
      };
    }));

  private readonly adventureCampsSignal = signal<AdventureCampsEntity[]>([]);

  readonly adventureCamps = this.adventureCampsSignal.asReadonly();
  private readonly reservationsSignal = signal<ReservationsEntity[]>([]);
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();
  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadAdventureCamps();
    this.loadReservations();
  }

  /**
   * Selects an adventure camp by identifier.
   * @param id - Adventure camp identifier.
   * @returns Reactive selection for the requested adventure camp.
   */
  getAdventureCampById = (id: number): Signal<AdventureCampsEntity | undefined> =>
    computed(() => id ? this.adventureCamps().find(c => c.id === id) : undefined);

  /**
   * Selects the adventure camp that is specialized in an activity type (one camp per type).
   * @param activityType - Activity type (hiking, trekking, camping or climbing).
   * @returns Reactive selection for the matching adventure camp.
   */
  getAdventureCampByActivityType = (activityType: string): Signal<AdventureCampsEntity | undefined> =>
    computed(() => this.adventureCamps().find(c => c.activityType === activityType));

  /**
   * Selects the reservations of an adventure camp.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive list of reservations of the camp.
   */
  getReservationsByAdventureCampId = (adventureCampId: number): Signal<ReservationsEntity[]> =>
    computed(() => this.reservations().filter(r => r.adventureCampId === adventureCampId));

  /**
   * Total Participants: sum of participants of all reservations of an adventure camp.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive total of participants.
   */
  getTotalParticipants = (adventureCampId: number): Signal<number> =>
    computed(() => this.sumParticipants(this.reservations(), adventureCampId));

  /**
   * Available Capacity: capacity of the adventure camp minus its total participants.
   * @param adventureCampId - Adventure camp identifier.
   * @returns Reactive available capacity.
   */
  getAvailableCapacity = (adventureCampId: number): Signal<number> =>
    computed(() => {
      const adventureCamp = this.getAdventureCampById(adventureCampId)();
      return adventureCamp ? adventureCamp.capacity - this.sumParticipants(this.reservations(), adventureCampId) : 0;
    });

  /**
   * Adds a new reservation. Before the POST, reservations are queried again and the available
   * capacity is recalculated; the reservation is created only if participants is greater than zero
   * and not greater than the available capacity.
   * @param reservation - The reservation to add.
   * @param onSuccess - Callback invoked only after the reservation was saved successfully.
   */
  addReservation = (reservation: ReservationsEntity, onSuccess?: () => void): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getReservations().pipe(
      switchMap(currentReservations => {
        this.reservationsSignal.set(currentReservations);
        this.assignAdventureCampsToReservations();
        const adventureCamp = this.getAdventureCampById(reservation.adventureCampId)();
        const available = adventureCamp
          ? adventureCamp.capacity - this.sumParticipants(currentReservations, adventureCamp.id)
          : 0;
        if (reservation.participants <= 0 || reservation.participants > available) {
          return throwError(() => new Error('capacity-exceeded'));
        }
        return this.adventureCampsService.createReservation(reservation);
      })
    ).subscribe({
      next: createdReservation => {
        createdReservation = this.assignAdventureCampToReservation(createdReservation);
        this.reservationsSignal.update(reservations => [...reservations, createdReservation]);
        this.loadingSignal.set(false);
        onSuccess?.();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-create-reservation'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all adventure camps from the API.
   */
  private loadAdventureCamps = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getAdventureCamps().pipe(retry(2), takeUntilDestroyed()).subscribe({
      next: adventureCamps => {
        this.adventureCampsSignal.set(adventureCamps);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignAdventureCampsToReservations();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-load-adventure-camps'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all reservations from the API.
   */
  private loadReservations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.adventureCampsService.getReservations().pipe(retry(2), takeUntilDestroyed()).subscribe({
      next: reservations => {
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignAdventureCampsToReservations();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'error-load-reservations'));
        this.loadingSignal.set(false);
      }
    });
  };



  private assignAdventureCampsToReservations = (): void => {
    this.reservationsSignal.update(reservations =>
      reservations.map(reservation => this.assignAdventureCampToReservation(reservation)));
  };

  private assignAdventureCampToReservation = (reservation: ReservationsEntity): ReservationsEntity => {
    const adventureCampId = reservation.adventureCampId ?? 0;
    reservation.adventureCamp = adventureCampId ? this.getAdventureCampById(adventureCampId)() ?? null : null;
    return reservation;
  };

  private sumParticipants = (reservations: ReservationsEntity[], adventureCampId: number): number =>
    reservations
      .filter(r => r.adventureCampId === adventureCampId)
      .reduce((total, r) => total + r.participants, 0);

  /**
   * Normalizes unknown errors into a translation key for the error message.
   * @param error - Source error.
   * @param fallback - Translation key used when details are unavailable.
   * @returns Translation key of the message to display.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error && error.message === 'capacity-exceeded') {
      return 'error-capacity-exceeded';
    }
    if (error instanceof Error && error.message.includes('Resource not found')) {
      return 'error-not-found';
    }
    return fallback;
  };
}
