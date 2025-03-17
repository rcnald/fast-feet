import { bad, nice } from '@/core/error'

import { HashComparer } from '../cryptography/hash-comparer'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'

export interface ChangePasswordUseCaseRequest {
  currentPassword: string
  password: string
  userId: string
}

export class ChangePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private hasherGenerator: HashGenerator,
  ) {}

  async execute({
    currentPassword,
    password,
    userId,
  }: ChangePasswordUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return bad({ code: 'RESOURCE_NOT_FOUND' })
    }

    const isPasswordValid = await this.hashComparer.compare(
      currentPassword,
      user.password,
    )

    if (!isPasswordValid) {
      return bad({ code: 'PASSWORD_INVALID' })
    }

    const newPassword = await this.hasherGenerator.hash(password)

    user.password = newPassword

    await this.userRepository.save(user)

    return nice()
  }
}
