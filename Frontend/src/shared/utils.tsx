import { calloutRootPropDefs } from "@radix-ui/themes/dist/cjs/props";
import { ReactNode } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

import { MessageType } from "./types";

const messageTypeColorsMatch: Record<
  MessageType,
  typeof calloutRootPropDefs.color.default
> = {
  INFO: "blue",
  ERROR: "red",
  SUCCESS: "green",
  WARNING: "orange",
};

const messageTypeIconsMatch: Record<MessageType, ReactNode> = {
  INFO: <FaInfoCircle />,
  ERROR: <FaExclamationCircle />,
  SUCCESS: <FaCheckCircle />,
  WARNING: <FaExclamationCircle />,
};

export const getColorByMessageType = (
  messageType: MessageType
): typeof calloutRootPropDefs.color.default => {
  return messageTypeColorsMatch[messageType];
};

export const getIconByMessageType = (messageType: MessageType): ReactNode => {
  return messageTypeIconsMatch[messageType];
};
