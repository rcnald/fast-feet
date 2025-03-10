import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  private SALT = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.SALT)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
