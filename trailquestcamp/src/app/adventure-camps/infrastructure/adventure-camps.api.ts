import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {AdventureCampsEntity} from '../domain/model/adventure-camps.entity';
import {AdventureCampsResource, AdventureCampsResponse} from './adventure-camps.response';
import {AdventureCampsAssembler} from './adventure-camps.assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Endpoint client for adventure camp CRUD operations.
 *
 * @author Sofia Diaz Yurivilca
 */
export class AdventureCampsApiEndpoint extends BaseApiEndpoint<AdventureCampsEntity, AdventureCampsResource, AdventureCampsResponse, AdventureCampsAssembler> {
  /**
   * Creates an instance of AdventureCampsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdventureCampsEndpointPath}`,
      new AdventureCampsAssembler());
  }
}
