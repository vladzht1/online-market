import { Market } from "../models/market";
import { ValidationResult } from "../shared/types";

export const validateMarketForm = (marketForm: Market): ValidationResult => {
  const errors: Record<string, string> = {};

  if (marketForm.name.trim().length === 0) {
    errors["name"] = "Название магазина не может быть пустым"
  } else if (marketForm.description.trim().length === 0) {
    errors["description"] = "Описание магазина не может быть пустым"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
