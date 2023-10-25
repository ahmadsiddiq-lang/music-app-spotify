import { Container, ContainerProps } from "@chakra-ui/react"
import React from "react"
import { Header } from ".."
import { tw } from "@/utility/function/styles"
import { When } from "react-if"
import FooterPlaying from "../FooterPlaying"

const Wrapper = ({ children, p = 0, props, className, header = true }: { children: React.ReactNode, p?: number, props?: ContainerProps, className?: string, header?: boolean }) => {
  return (
    <>
      <When condition={header}><Header /></When>
      <Container className={tw(className)} p={p} {...props}>
        {children}
      </Container>
      <FooterPlaying />
    </>
  )
}

export default Wrapper