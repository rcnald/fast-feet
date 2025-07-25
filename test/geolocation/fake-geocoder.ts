import { Geocoder } from "@/domain/delivery/application/geolocation/geocoder"

export class FakeGeocoder implements Geocoder {
  async geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    if (address.includes("sao")) {
      return { latitude: -23.555771, longitude: -46.639557 }
    }

    return { latitude: -22.906847, longitude: -43.172896 }
  }
}
