import { Geocoder } from "@/domain/delivery/application/geolocation/geocoder"

import { env } from "../env/env"

const API_KEY = env.GEOLOCATION_API_KEY
const API_URL = env.GEOLOCATION_API_URL

export class GoogleGeocoder implements Geocoder {
  async geocode(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    const encodedAddress = encodeURIComponent(address)
    const url = `${API_URL}?address=${encodedAddress}&key=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== "OK" || !data.results.length) {
      throw new Error("Geocoding failed")
    }

    const location = data.results[0].geometry.location

    return {
      latitude: location.lat,
      longitude: location.lng,
    }
  }
}

// export class GoogleGeocoder implements Geocoder {
//   async geocode(
//     address: string,
//   ): Promise<{ latitude: number; longitude: number }> {
//     const encodedAddress = encodeURIComponent(address)
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`

//

//     const location = data.results[0].geometry.location
//     return {
//       latitude: location.lat,
//       longitude: location.lng,
//     }
//   }
// }
