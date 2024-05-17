import { Flex, Spinner } from "@radix-ui/themes";
import { FC } from "react";

interface ILoadingAreaProps {
  show?: boolean;
}

export const LoadingArea: FC<ILoadingAreaProps> = ({ show }) => (
  <>
    {(show !== undefined ? show : true) && (
      <Flex width="100%" height="200px" align="center" justify="center">
        <Spinner />
      </Flex>
    )}
  </>
);
