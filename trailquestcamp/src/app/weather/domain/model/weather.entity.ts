/**
 * Represents the current weather observed at a location, as provided by the weather provider.
 *
 * @author Sofia Diaz Yurivilca
 */
export class WeatherEntity {
  /**
   * The current temperature in degrees Celsius.
   */
  #temperature: number;

  /**
   * Creates a new weather entity.
   * @param props - Initialization values.
   */
  constructor(props: { temperature: number }) {
    this.#temperature = props.temperature;
  }

  get temperature(): number {
    return this.#temperature;
  }

  set temperature(value: number) {
    this.#temperature = value;
  }
}
