import { Geocoder } from "@/domain/delivery/application/geolocation/geocoder";
import { Module } from "@nestjs/common"
import { GoogleGeocoder } from "./geocoder";

@Module({
  providers: [
    {
      provide: Geocoder,
      useClass: GoogleGeocoder,
    },
  ],
  exports: [Geocoder],
})
export class GeolocationModule {}
