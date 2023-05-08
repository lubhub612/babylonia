import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Body from "../Body";
import {
  Box,
  Container,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// import theme from "./theme";
// import Layout from "./components/Layout";
import TokenSwap from "../TokenSwap";
import ContactForm from "../ContactForm";
import Menu from "../Menu";
import { useAppSelector, useAppDispatch } from "@hooks";
import { selectThemeMode } from "@store/themeSlice";

const EmailPage = () => {
  const bgColor = useColorModeValue("gray.300", "gray.700");

  const dispatch = useAppDispatch();

  return (
    <Container maxW="100vw" w="100vw" pt="0" pb="0" pl="0" pr="0">
      <Box>
      <Header></Header>
      <title> Babylonia Pool on Blockchain </title>
      <Box>
        <Flex
          maxW="100vw"
          w={["100vw", "100vw", "100vw"]}
          h={["full", "100vh", "100vh", "100vh"]}
          pt={["100px", "100px", "80px", "130px"]}
          align="top"
          bg={bgColor}
          pb={["200px", "10px", "10px", "10px"]}
        >
          <Box flex="1">
            <VStack>
              <ContactForm></ContactForm>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Menu></Menu>
      <Footer></Footer>
      </Box>
    </Container>
  );
};

export default EmailPage;
