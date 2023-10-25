import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const sizes = {
  sm: defineStyle({
    maxW: '45ch',
    p: '4',
  }),
  md: defineStyle({
    maxW: 'container.sm',
    p: '6',
    fontSize: 'lg',
  }),
  lg: defineStyle({
    maxW: '75ch',
    p: '8',
    fontSize: 'xl',
  }),
}

export const containerTheme = defineStyleConfig({ sizes })