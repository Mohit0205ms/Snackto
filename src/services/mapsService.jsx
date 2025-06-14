export const getCoordinatesFromAddress = async (address) => {
  const apiKey = 'AIzaSyD50iUVH9Nn53uJ_j-wTY9wdCXmty0z5OY';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK') {
    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } else {
    throw new Error('Address not found');
  }
};

export const getAddressFromCoordinates = async (latitude, longitude) => {
  const apiKey = 'AIzaSyD50iUVH9Nn53uJ_j-wTY9wdCXmty0z5OY'; // Secure this in .env or native config
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data,"<<---data");

  if (data.status === 'OK') {
    return data.results[0].formatted_address;
  } else {
    throw new Error('Address not found');
  }
};
