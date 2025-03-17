import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common"
import { ZodError, ZodSchema } from "zod"
import { fromZodError } from "zod-validation-error"

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          fromZodError(error, { includePath: false }).toString(),
        )
      }

      throw new BadRequestException("Validation failed")
    }
  }
}
