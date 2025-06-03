import { Geocoder } from "@/domain/delivery/application/geolocation/geocoder"

import { env } from "../env/env"

const API_KEY = env.GEOLOCATION_API_KEY
const API_URL = env.GEOLOCATION_API_URL

export class GoogleGeocoder implements Geocoder {
  async geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    const encodedAddress = encodeURIComponent(address)
    const url = `${API_URL}?address=${encodedAddress}&key=${API_KEY}`

    const response = await fetch(url).then((data) => data.json())

    if (response.status !== "OK" || !response.results.length) {
      return null
    }

    const location = response.results[0].geometry.location

    return {
      latitude: location.lat,
      longitude: location.lng,
    }
  }
}
