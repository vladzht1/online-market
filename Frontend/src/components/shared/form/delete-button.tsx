import { IconButton, Tooltip } from "@radix-ui/themes";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface IDeleteButtonProps {
  onClick?: (event: any) => void;
}

export const DeleteButton: FC<IDeleteButtonProps> = ({ onClick }) => (
  <Tooltip content="Удалить">
    <IconButton onClick={onClick} color="red" variant="outline">
      <FaTrash />
    </IconButton>
  </Tooltip>
);
