import {useQuery} from '@tanstack/react-query';
import {
  getCoordinatesFromAddress,
  getAddressFromCoordinates,
} from '../services/mapsService';

export const useCoordinatesFromAddress = (address, enabled) =>
  useQuery({
    queryKey: ['geocode', address],
    queryFn: () => getCoordinatesFromAddress(address),
    enabled: !!address && enabled, // only run if address exists
    retry: 1, // optional
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });

export const useAddressFromCoordinates = (
  latitude,
  longitude,
  enabled = true,
) =>
  useQuery({
    queryKey: ['reverse-geocode', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Invalid coordinates');
      }
      return getAddressFromCoordinates(latitude, longitude);
    },
    enabled: !!latitude && !!longitude && enabled,
    staleTime: 5 * 60 * 1000,// Optional: cache for 5 min
  }); 
