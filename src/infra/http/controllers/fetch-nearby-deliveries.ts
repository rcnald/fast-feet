import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common"
import { z } from "zod"

import { FetchNearbyDeliveriesUseCase } from "@/domain/delivery/application/use-cases/fetch-nearby-deliveries"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"
import { UserPayload } from "@/infra/auth/jwt.strategy"
import { CurrentUser } from "@/infra/auth/current-user"

const fetchNearbyDeliveriesBodySchema = z.object({
  user_latitude: z.string(),
  user_longitude: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(fetchNearbyDeliveriesBodySchema)

type FetchNearbyDeliveriesBody = z.infer<typeof fetchNearbyDeliveriesBodySchema>

@Controller("/deliveries/nearby")
export class FetchNearbyDeliveriesController {
  constructor(private fetchNearbyDeliveries: FetchNearbyDeliveriesUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: FetchNearbyDeliveriesBody,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      user_latitude, 
      user_longitude
    } = body

    const [_, result] = await this.fetchNearbyDeliveries.execute({
      deliveryPersonId: user.sub,
      deliveryPersonLatitude: user_latitude,
      deliveryPersonLongitude: user_longitude
    })

    return { deliveries: result.deliveries }
  }
}
