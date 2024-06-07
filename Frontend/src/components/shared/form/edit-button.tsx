import { IconButton } from "@radix-ui/themes";
import { FC } from "react";
import { FaPen } from "react-icons/fa";

interface IEditButtonProps {
  onClick?: (event: any) => void;
}

export const EditButton: FC<IEditButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} color="teal" variant="soft">
    <FaPen />
  </IconButton>
);
