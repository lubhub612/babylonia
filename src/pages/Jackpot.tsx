import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Menu from "@components/Menu";
import JackpotComponent from "@components/JackpotComponent";
const Jackpot = () => {
  const bgColor = useColorModeValue("gray.400", "gray.700");
  return (
    <Box>
      <Box position="fixed" zIndex="-1" w="full" h="full" bg={bgColor}></Box>
      <Header></Header>
      <JackpotComponent />
      <Menu />
      <Footer></Footer>
    </Box>
  );
};

export default Jackpot;
