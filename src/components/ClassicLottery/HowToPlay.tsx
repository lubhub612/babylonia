import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  VStack,
  WrapItem,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import { useAppSelector } from "@hooks";
import { useRouter } from "next/router";
import { Baby } from "grommet-icons";

import styled from "styled-components";

const HowToPlay = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "#C5C5C5");
  const bgBuyBtnColor = useColorModeValue("gray.100", "gray.800");
  const bgBuyBtnTextColor = useColorModeValue("gray.900", "gray.200");

  const router = useRouter();

  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        {...props}
        w={["100vw", "90vw", "428px"]}
        minHeight={"480px"}
        borderRadius="10px"
        // whiteSpace="nowrap"
        bg={colorMode === "dark" ? "black" : "white"}
        border={"1px"}
        borderColor={colorMode === "dark" ? "white" : "black"}
        p="8px"
        m={["10px"]}
      >
        <Box
          bg={colorMode === "dark" ? "#5C5C5C" : "#E2E2E2"}
          borderRadius="5px"
          border="1px"
          paddingX="20px"
          minH={"462px"}
          borderColor={colorMode === "dark" ? "black" : "black"}
        >
          <Text
            fontSize={"2xl"}
            pl="6px"
            mt="15px"
            color={colorMode === "dark" ? "#C5C5C5" : ""}
          >
            HOW TO PLAY
          </Text>
          <Stack justifyContent="center" alignItems="center" mb={"50px"}>
            <Box
              {...props}
              w={["360px", "320px", "360px"]}
              borderRadius="10px"
              //   whiteSpace="nowrap"
              bg={colorMode === "dark" ? "black" : "white"}
              border={"1px"}
              borderColor={colorMode === "dark" ? "white" : "black"}
              boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              p="4px"
              mb={"20px"}
            >
              <Box
                bg={colorMode === "dark" ? "#5C5C5C" : "#E2E2E2"}
                borderRadius="5px"
                border="1px"
                borderColor={colorMode === "dark" ? "black" : "black"}
              >
                <Container>
                  <Image src="/icons/one.png" alt="one" w={50} h={50} />
                  <div>
                    <p>
                      Buy Tickets <br />
                      <span style={{fontSize: 18, lineHeight: "18px"}}>
                        Prices are set when the round starts, equal to 100 $BABY
                        per ticket.
                      </span>
                    </p>
                  </div>
                </Container>
              </Box>
            </Box>
            <Box
              {...props}
              w={["360px", "320px", "360px"]}
              borderRadius="10px"
              //   whiteSpace="nowrap"
              bg={colorMode === "dark" ? "black" : "white"}
              border={"1px"}
              borderColor={colorMode === "dark" ? "white" : "black"}
              boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              p="4px"
              mb={"20px !important"}
            >
              <Box
                bg={colorMode === "dark" ? "#5C5C5C" : "#E2E2E2"}
                borderRadius="5px"
                border="1px"
                borderColor={colorMode === "dark" ? "black" : "black"}
              >
                <Container>
                  <Image src="/icons/two.png" alt="one" w={50} h={50} />
                  <div>
                    <p>
                      Wait for the Draw <br />
                      <span style={{fontSize: 18, lineHeight: "18px"}}>
                        There is one draw every day alternating between 9 AM UTC
                        and 9 PM UTC.
                      </span>
                    </p>
                  </div>
                </Container>
              </Box>
            </Box>
            <Box
              {...props}
              w={["360px", "320px", "360px"]}
              borderRadius="10px"
              //   whiteSpace="nowrap"
              bg={colorMode === "dark" ? "black" : "white"}
              border={"1px"}
              borderColor={colorMode === "dark" ? "white" : "black"}
              boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
              p="4px"
            >
              <Box
                bg={colorMode === "dark" ? "#5C5C5C" : "#E2E2E2"}
                borderRadius="5px"
                border="1px"
                borderColor={colorMode === "dark" ? "black" : "black"}
              >
                <Container>
                  <Image src="/icons/three.png" alt="one" w={50} h={50} />
                  <div>
                    <p>
                      Check for Prizes <br />
                      <span style={{fontSize: 18, lineHeight: "18px"}}>
                        {`Once the round’s`} over, come back to the page and check to see if {` you’ve won!`}
                      </span>
                    </p>
                  </div>
                </Container>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px 5px;
  justify-content: flex-start;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    p {
      font-family: "Ropa Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 20px;
      color: #000000;
      span {
        font-size: 15px;
      }
    }
  }
`;

export default HowToPlay;
