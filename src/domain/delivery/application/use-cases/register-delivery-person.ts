import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"
import { DeliveryPersonRepository } from "../repositories/delivery-person-repository"
import { HashGenerator } from "../cryptography/hash-generator"

export interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
}

export interface RegisterDeliveryPersonUseCaseResponse {
  deliveryPerson: DeliveryPerson
}

export class RegisterDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliveryPersonUseCaseRequest): Promise<RegisterDeliveryPersonUseCaseResponse> {
    const deliveryPersonExists =
      await this.deliveryPersonRepository.findByCPF(cpf)

    if (deliveryPersonExists) {
      throw new Error()
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryPerson = DeliveryPerson.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliveryPersonRepository.create(deliveryPerson)

    return {
      deliveryPerson,
    }
  }
}
