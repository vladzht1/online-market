import { Container } from "@radix-ui/themes";
import styled from "styled-components";

interface IContainerWithPaddingProps {
  $paddingTopBottom?: string;
}

export const ContainerWithPadding = styled(
  Container
)<IContainerWithPaddingProps>`
  padding: ${(props) => props.$paddingTopBottom ?? "0"} 1rem;
`;
