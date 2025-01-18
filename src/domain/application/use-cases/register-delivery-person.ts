import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"
import { DeliveryPersonRepository } from "../repositories/delivery-person-repository"

export interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
}

export interface RegisterDeliveryPersonUseCaseResponse {
  deliveryPerson: DeliveryPerson
}

export class RegisterDeliveryPersonUseCase {
  constructor(private deliveryPersonRepository: DeliveryPersonRepository) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliveryPersonUseCaseRequest): Promise<RegisterDeliveryPersonUseCaseResponse> {
    const deliveryPerson = DeliveryPerson.create({ name, cpf, password })

    await this.deliveryPersonRepository.create(deliveryPerson)

    return {
      deliveryPerson,
    }
  }
}
