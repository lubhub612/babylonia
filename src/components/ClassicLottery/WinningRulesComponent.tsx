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
import styled from "styled-components";

const WinningRulesComponent = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "#C5C5C5");
  const bgBuyBtnColor = useColorModeValue("gray.100", "gray.800");
  const bgBuyBtnTextColor = useColorModeValue("gray.900", "gray.200");

  const router = useRouter();
  const result = [8, 5, 1, 4, 7, 6];
  const a = [8, 5, 1, 3, 7, 6];
  const b = [0, 5, 1, 4, 7, 6];
  return (
    <Stack justifyContent="center" alignItems="center" mb={"100px"}>
      <Box
        {...props}
        w={["100vw", "90vw", "618px"]}
        minHeight={"262px"}
        borderRadius="10px"
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
          paddingX="15px"
          borderColor={colorMode === "dark" ? "black" : "black"}
          minHeight="244px"
        >
          <Text
            fontSize={"2xl"}
            mt="15px"
            color={colorMode === "dark" ? "#C5C5C5" : ""}
          >
            WINNING RULES
          </Text>
          <Container>
            <div>
              <p>
                The digits on your ticket must match in the correct order to
                win.
              </p>
              <p>
                {
                  "Here’s an example lottery draw, with two tickets, A and B. Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize."
                }
              </p>
              <p>
                {
                  "Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize."
                }
              </p>
              <p>
                {
                  "Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’."
                }
              </p>
            </div>
            <div>
              <NumberContainer>
                {result.map((item, index) => (
                  <Number key={index}>{item}</Number>
                ))}
              </NumberContainer>
              <NumberContainer>
                <h2 className="resultOf">A: </h2>
                {a.map((item, index) => (
                  <ResultContainer key={index}>
                    <Image
                      src={`${
                        item === result[index]
                          ? "/icons/tick.png"
                          : "/icons/cross.png"
                      }`}
                      className="icon"
                      alt="result"
                    />
                    <h2 className="resultNumber">{item}</h2>
                  </ResultContainer>
                ))}
              </NumberContainer>
              <NumberContainer>
                <h2 className="resultOf">B: </h2>
                {b.map((item, index) => (
                  <ResultContainer key={index}>
                    <Image
                      src={`${
                        item === result[index]
                          ? "/icons/tick.png"
                          : "/icons/cross.png"
                      }`}
                      className="icon"
                      alt="result"
                    />
                    <h2 className="resultNumber">{item}</h2>
                  </ResultContainer>
                ))}
              </NumberContainer>
            </div>
          </Container>
        </Box>
      </Box>
    </Stack>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: space-around;

  padding: 0px 0px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  div {
    padding: 0;
    p {
      font-family: "Ropa Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 15px;
      color: #000000;
    }
  }
`;

const NumberContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  .resultOf {
    font-family: "Ropa Sans";
    font-size: 40px;
    position: relative;
    top: 10px;
    margin-left: 20px;
  }
`;

const Number = styled.h3`
  background-color: #6fbafe;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 37px;
  border: 1px solid #000000;
  box-shadow: inset -2px -2px 3px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  margin: 0 2px 15px;
  color: white;
  -webkit-text-stroke: 0.1px black;
  font-family: "Ropa Sans";
  font-size: 40px;
  font-weight: ;
  @media screen and (max-width: 768px) {
    margin: 20px 2px 15px;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 3px;
  .icon {
    width: 24px;
  }
  .resultNumber {
    font-family: "Ropa Sans";
    font-size: 40px;
    line-height: 20px;
  }
`;
export default WinningRulesComponent;
