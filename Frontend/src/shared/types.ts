import { ReactNode } from "react";

import { Address } from "../models/address";

export type MessageContent = {
  description: string,
  type: MessageType
};

export type MessageType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export type MessageReceiver = (message: string, messageType: MessageType, success: boolean) => void;

export type ValidationResult = {
  isValid: boolean,
  errors: Record<string, string>
}

export type WithAddress<T extends string> = {
  [key in T]: Address
}

export interface IActionModalProps {
  children: ReactNode;
  callback?: MessageReceiver;
}
