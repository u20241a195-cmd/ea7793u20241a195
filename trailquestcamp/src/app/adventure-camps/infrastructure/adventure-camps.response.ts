import {BaseResource, BaseResponse} from '../../../shared/infrastructure/base-response';

/**
 * Resource representation of an adventure camp.
 *
 * @author Sofia Diaz Yurivilca
 */
export interface AdventureCampsResource extends BaseResource {

  id: number;

  name: string;

  activityType: string;

  capacity: number;

  latitude: number;

  longitude: number;
}

/**
 * Response envelope for adventure camp collection queries.
 */
export interface AdventureCampsResponse extends BaseResponse {
  adventureCamps: AdventureCampsResource[];
}
