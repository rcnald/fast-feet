import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"
import { DeliveryPersonRepository } from "../repositories/delivery-person-repository"
import { HashGenerator } from "../cryptography/hash-generator"
import { bad, nice } from "@/core/error"

export interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
}

export class RegisterDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, cpf, password }: RegisterDeliveryPersonUseCaseRequest) {
    const deliveryPersonExists =
      await this.deliveryPersonRepository.findByCPF(cpf)

    if (deliveryPersonExists) {
      return bad({ code: "RESOURCE_ALREADY_EXISTS" })
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryPerson = DeliveryPerson.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliveryPersonRepository.create(deliveryPerson)

    return nice({
      deliveryPerson,
    })
  }
}
