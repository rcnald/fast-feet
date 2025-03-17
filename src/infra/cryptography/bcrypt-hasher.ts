import { compare, hash } from 'bcryptjs'

import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private SALT = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.SALT)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
