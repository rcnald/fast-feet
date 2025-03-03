export abstract class Geocoder {
  abstract geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number }>
}
