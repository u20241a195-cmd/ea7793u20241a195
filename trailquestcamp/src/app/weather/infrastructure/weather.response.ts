import {BaseResponse} from '../../../shared/infrastructure/base-response';

/**
 * resource representation of the current weather returned by Open-Meteo.
 *
 * @author Sofia Diaz Yurivilca
 */
export interface WeatherResource {
  /**
   * air temperature at 2 meters above ground, in degrees Celsius.
   */
  temperature_2m: number;
}

/**
 * response envelope of the Open-Meteo forecast endpoint (only the attributes used by the application).
 */
export interface WeatherResponse extends BaseResponse {
  current: WeatherResource;
}
