import { HashComparer } from "../cryptography/hash-comparer"
import { HashGenerator } from "../cryptography/hash-generator"
import { UserRepository } from "../repositories/user-repository"

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
  }: ChangePasswordUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw Error()
    }

    const isPasswordValid = await this.hashComparer.compare(
      currentPassword,
      user.password,
    )

    if (!isPasswordValid) {
      throw Error()
    }

    const newPassword = await this.hasherGenerator.hash(password)

    user.password = newPassword

    await this.userRepository.save(user)
  }
}
