import { Address } from "../models/address";
import { ValidationResult } from "../shared/types";

export const validateAddressForm = (addressForm: Address): ValidationResult => {
  const errors: Record<string, string> = {};

  // TODO: validate address form

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}
