import { Flex, useColorMode, Button, Spacer,  Heading, AbsoluteCenter } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

function TopNav() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <>
      <Flex
      p={6}
      position={'sticky'}
      top={'0'}
      backdropFilter='blur(20px)'
      bgColor={"dark-lg"}
      boxShadow={colorMode === 'light' ? "none" : "dark-lg"}
      >
        <AbsoluteCenter p='4' axis='both'>
        <Heading>Map Street View</Heading>
            </AbsoluteCenter>
        <Spacer/>
          <Button  onClick={toggleColorMode}>{colorMode === 'dark' ?  <FaSun /> : <FaMoon />}</Button>
      </Flex>
      </>
    );
  }

  export default TopNav;