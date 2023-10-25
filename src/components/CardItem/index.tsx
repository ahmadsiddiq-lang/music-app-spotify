import { SampleImg } from '@/assets'
import { tw } from '@/utility/function/styles'
import { Card, CardBody, CardFooter, CardProps, Heading, Image, Text } from '@chakra-ui/react'

type CardItemProps = {
  className?: string,
  props?: CardProps,
  url?: string,
  heading?: string,
  class_heading?: string,
  text?: string,
  class_text?: string,
  onClick?: () => void
}

const CardItem = ({
  className,
  props,
  url,
  text,
  heading,
  class_heading,
  class_text,
  onClick
}: CardItemProps) => {
  return (
    <Card onClick={() => onClick && onClick()} size={'md'} variant={'filled'} className={tw('cursor-pointer', className)} {...props}>
      <CardBody paddingBottom={2} p={2} className='w-full h-[150px]'>
        <Image src={url ? url : SampleImg} borderRadius={'md'} />
      </CardBody>
      <CardFooter flexDirection={'column'} paddingTop={0} paddingBottom={2} px={2}>
        <Heading size={'xs'} className={tw('overflow-hidden line-clamp-2', class_heading)}>{heading}</Heading>
        <Text className={tw("text-[12px] overflow-hidden line-clamp-2 mt-2 text-gray-500", class_text)}>{text}</Text>
      </CardFooter>
    </Card>
  )
}

export default CardItem