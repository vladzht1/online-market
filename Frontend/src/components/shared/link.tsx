import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: var(--accent-10);

  &:hover {
    text-decoration: underline;
  }
`;
