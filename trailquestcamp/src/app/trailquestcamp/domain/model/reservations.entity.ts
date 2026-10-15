import {BaseEntity} from '../../../../shared/domain/model/base-entity';
import {AdventureCampsEntity} from './adventurecamps.entity';

/**
 * Represents a reservation made at an adventure camp in the TrailQuest domain model.
 *
 * @author Sofia Diaz Yurivilca
 */
export class ReservationsEntity implements BaseEntity {
  /**
   * The unique identifier for the reservation.
   */
  #id: number;

  /**
   * The identifier of the adventure camp associated with the reservation.
   */
  #adventureCampId: number;

  /**
   * The activity type of the reservation.
   */
  #activityType: string;

  /**
   * The name of the participant who makes the reservation.
   */
  #participantName: string;

  /**
   * The number of attendees of the reservation.
   */
  #participants: number;

  /**
   * The temperature obtained from the weather provider when the reservation was made.
   */
  #weatherTemperature: number;

  /**
   * The date and time at which the reservation was registered.
   */
  #reservedAt: Date;

  /**
   * The adventure camp associated with the reservation, or null if not set.
   */
  #adventureCamp: AdventureCampsEntity | null;

  /**
   * Creates a new reservation entity.
   * @param props - Initialization values.
   */
  constructor(props: {
    id: number;
    adventureCampId: number;
    activityType: string;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
    adventureCamp?: AdventureCampsEntity | null;
  }) {
    this.#id = props.id;
    this.#adventureCampId = props.adventureCampId;
    this.#activityType = props.activityType;
    this.#participantName = props.participantName;
    this.#participants = props.participants;
    this.#weatherTemperature = props.weatherTemperature;
    this.#reservedAt = props.reservedAt;
    this.#adventureCamp = props.adventureCamp ?? null;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get adventureCampId(): number {
    return this.#adventureCampId;
  }

  set adventureCampId(value: number) {
    this.#adventureCampId = value;
  }

  get activityType(): string {
    return this.#activityType;
  }

  set activityType(value: string) {
    this.#activityType = value;
  }

  get participantName(): string {
    return this.#participantName;
  }

  set participantName(value: string) {
    this.#participantName = value;
  }

  get participants(): number {
    return this.#participants;
  }

  set participants(value: number) {
    this.#participants = value;
  }

  get weatherTemperature(): number {
    return this.#weatherTemperature;
  }

  set weatherTemperature(value: number) {
    this.#weatherTemperature = value;
  }

  get reservedAt(): Date {
    return this.#reservedAt;
  }

  set reservedAt(value: Date) {
    this.#reservedAt = value;
  }

  get adventureCamp(): AdventureCampsEntity | null {
    return this.#adventureCamp;
  }

  set adventureCamp(value: AdventureCampsEntity | null) {
    this.#adventureCamp = value;
  }
}
