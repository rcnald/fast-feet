import { Encrypter } from "../cryptography/encrypter"
import { HashComparer } from "../cryptography/hash-comparer"
import { UserRepository } from "../repositories/user-repository"

export interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
}

export interface AuthenticateUserUseCaseResponse {
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByCPF(cpf)

    if (!user) {
      throw Error()
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw Error()
    }

    const token = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    })

    return {
      token,
    }
  }
}
