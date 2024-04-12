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
