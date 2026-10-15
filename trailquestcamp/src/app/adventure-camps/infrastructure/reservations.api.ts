import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {ReservationsEntity} from '../domain/model/reservations.entity';
import {ReservationsResource, ReservationsResponse} from './reservations.response';
import {ReservationsAssembler} from './reservations.assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for reservation CRUD operations.
 *
 * @author Sofia Diaz Yurivilca
 */
export class ReservationsApiEndpoint extends BaseApiEndpoint<ReservationsEntity, ReservationsResource, ReservationsResponse, ReservationsAssembler> {
  /**
   * Creates an instance of ReservationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`,
      new ReservationsAssembler());
  }
}
