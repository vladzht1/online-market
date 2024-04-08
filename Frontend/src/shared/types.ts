export type MessageContent = {
  description: string,
  type: MessageType
};

export type MessageType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";
