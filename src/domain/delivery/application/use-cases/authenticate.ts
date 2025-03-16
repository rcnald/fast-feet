import { bad, nice } from '@/core/error'

import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UserRepository } from '../repositories/user-repository'

export interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({ cpf, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.userRepository.findByCPF(cpf)

    if (!user) {
      return bad({ code: 'INVALID_CREDENTIALS' })
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return bad({ code: 'INVALID_CREDENTIALS' })
    }

    const token = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    })

    return nice({ token })
  }
}
