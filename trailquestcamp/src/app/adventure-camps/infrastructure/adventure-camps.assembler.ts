import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AdventureCampsEntity} from '../domain/model/adventure-camps.entity';
import {AdventureCampsResource, AdventureCampsResponse} from './adventure-camps.response';

/**
 * Maps adventure camp entities to and from API resources.
 *
 * @author Sofia Diaz Yurivilca
 */
export class AdventureCampsAssembler implements BaseAssembler<AdventureCampsEntity, AdventureCampsResource, AdventureCampsResponse> {

  /**
   * Converts an AdventureCampsResponse to an array of AdventureCampsEntity.
   * @param response - The API response containing adventure camps.
   * @returns An array of AdventureCampsEntity.
   */
  toEntitiesFromResponse = (response: AdventureCampsResponse): AdventureCampsEntity[] =>
    response.adventureCamps.map(resource => this.toEntityFromResource(resource as AdventureCampsResource));

  /**
   * Converts an AdventureCampsResource to an AdventureCampsEntity.
   * @param resource - The resource to convert.
   * @returns The converted AdventureCampsEntity.
   */
  toEntityFromResource = (resource: AdventureCampsResource): AdventureCampsEntity =>
    new AdventureCampsEntity({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });

  /**
   * Converts an AdventureCampsEntity to an AdventureCampsResource.
   * @param entity - The entity to convert.
   * @returns The converted AdventureCampsResource.
   */
  toResourceFromEntity = (entity: AdventureCampsEntity): AdventureCampsResource =>
    ({
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    } as AdventureCampsResource);
}
