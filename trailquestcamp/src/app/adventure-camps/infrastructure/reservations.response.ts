import {BaseResource, BaseResponse} from '../../../shared/infrastructure/base-response';

/**
 * Resource representation of a reservation
 *
 * @author Sofia Diaz Yurivilca
 */
export interface ReservationsResource extends BaseResource {

  id: number;
  adventureCampId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export interface ReservationsResponse extends BaseResponse {
  reservations: ReservationsResource[];
}
