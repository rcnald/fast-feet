import { Module } from '@nestjs/common'

import { HashComparer } from '@/domain/delivery/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/delivery/application/cryptography/hash-generator'

import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [HashComparer, HashGenerator],
})
export class CryptographyModule {}
