import {WeatherEntity} from '../domain/model/weather.entity';
import {WeatherResource, WeatherResponse} from './weather.response';

/**
 * Maps weather provider resources and responses to weather entities.
 *
 * @author Sofia Diaz Yurivilca
 */
export class WeatherAssembler {
  /**
   * Converts a WeatherResource to a WeatherEntity.
   * @param resource - The resource to convert.
   * @returns The converted WeatherEntity.
   */
  toEntityFromResource = (resource: WeatherResource): WeatherEntity =>
    new WeatherEntity({temperature: resource.temperature_2m});

  /**
   * Converts a WeatherResponse to a WeatherEntity.
   * @param response - The API response with the current weather.
   * @returns The converted WeatherEntity.
   */
  toEntityFromResponse = (response: WeatherResponse): WeatherEntity =>
    this.toEntityFromResource(response.current);
}
