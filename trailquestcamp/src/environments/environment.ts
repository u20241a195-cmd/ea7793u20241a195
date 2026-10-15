/**
 * Environment variables: API base URLs, endpoint paths and i18n settings.
 *
 * @author Sofia Diaz Yurivilca
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderAdventureCampsEndpointPath: '/adventure-camps',
  platformProviderReservationsEndpointPath: '/reservations',
  weatherProviderApiBaseUrl: 'https://api.open-meteo.com',
  weatherProviderForecastEndpointPath: '/v1/forecast',
  i18nPath: '/i18n/',
  defaultLanguage: 'en'
};
