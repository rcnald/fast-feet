import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliveryPerson } from 'test/factories/make-delivery-person'

let inMemoryUserRepository: InMemoryUserRepository
let hasher: FakeHasher
let encrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    encrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(inMemoryUserRepository, encrypter, hasher)
  })

  it('should be able to authenticate', async () => {
    const user = makeDeliveryPerson({ password: 'password-hashed' })

    inMemoryUserRepository.items.push(user)

    const [error, result] = await sut.execute({
      cpf: user.cpf,
      password: 'password',
    })

    expect(error).toEqual(undefined)
    expect(result?.token).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid password', async () => {
    const user = makeDeliveryPerson({ password: 'password-hashed' })

    inMemoryUserRepository.items.push(user)

    const [error, result] = await sut.execute({
      cpf: '38979332092',
      password: 'invalid-password',
    })

    expect(error).toEqual({
      code: 'INVALID_CREDENTIALS',
    })
    expect(result?.token).toEqual(undefined)
  })
})
