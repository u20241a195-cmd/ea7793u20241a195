import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {ReservationsEntity} from '../domain/model/reservations.entity';
import {ReservationsResource, ReservationsResponse} from './reservations.response';

/**
 * Maps reservation entities to and from API resources.
 *
 * @author Sofia Diaz Yurivilca
 */
export class ReservationsAssembler implements BaseAssembler<ReservationsEntity, ReservationsResource, ReservationsResponse> {

  /**
   * Converts a ReservationsResponse to an array of ReservationsEntity.
   * @param response - The API response containing reservations.
   * @returns An array of ReservationsEntity.
   */
  toEntitiesFromResponse = (response: ReservationsResponse): ReservationsEntity[] =>
    response.reservations.map(resource => this.toEntityFromResource(resource as ReservationsResource));

  /**
   * Converts a ReservationsResource to a ReservationsEntity.
   * @param resource - The resource to convert.
   * @returns The converted ReservationsEntity.
   */
  toEntityFromResource = (resource: ReservationsResource): ReservationsEntity =>
    new ReservationsEntity({
      id: resource.id,
      adventureCampId: resource.adventureCampId,
      activityType: resource.activityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt),
      adventureCamp: null
    });

  /**
   * Converts a ReservationsEntity to a ReservationsResource.
   * The id is omitted for new reservations (id 0) because JSON Server generates it.
   * @param entity - The entity to convert.
   * @returns The converted ReservationsResource.
   */
  toResourceFromEntity = (entity: ReservationsEntity): ReservationsResource =>
    ({
      ...(entity.id ? {id: entity.id} : {}),
      adventureCampId: entity.adventureCampId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString()
    } as ReservationsResource);
}
