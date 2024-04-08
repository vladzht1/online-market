import { calloutRootPropDefs } from "@radix-ui/themes/dist/cjs/props";
import { ReactNode, useState } from "react";

import { MessageContent, MessageType } from "../shared/types";
import { getColorByMessageType, getIconByMessageType } from "../shared/utils";

type MessageForRender = {
  message: string;
  icon: ReactNode;
  color: typeof calloutRootPropDefs.color.default;
};

export const useMessage = () => {
  const [messages, setMessages] = useState<MessageContent[]>([]);

  const getMessages = (): MessageForRender[] => {
    return messages.map((message) => ({
      message: message.description,
      color: getColorByMessageType(message.type),
      icon: getIconByMessageType(message.type),
    }));
  };

  const addMessage = (
    messageText: string,
    type: MessageType,
    removeInterval: number = 2500
  ) => {
    setMessages([
      ...messages,
      {
        description: messageText,
        type,
      },
    ]);

    setTimeout(() => {
      setMessages(
        [...messages].filter((message) => message.description !== messageText)
      );
    }, removeInterval);
  };

  const hasMessages = (): boolean => {
    return messages.length > 0;
  };

  const clearAll = () => {
    setMessages([]);
  };

  return { getMessages, addMessage, hasMessages, clearAll };
};
