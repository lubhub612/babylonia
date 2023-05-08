import React, { useState, useEffect } from "react";
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
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import TrophyImg from "../../assets/icons/general/64x64/icon_trophy_001_64x64.png";
import { useAppSelector } from "@hooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import JackpotComponent from "@components/JackpotComponent";
import { BabyAbI, BabyAddress } from "../../babies/contractss/baby";
import Web3 from "web3";
import { useEthers } from "@usedapp/core";
import config from "@config/index";
import tokenJSON from "../../babies/abis/BABYToken2.json";
import lotteryJSON from "../../babies/abis/Lottery.json";
import Countdown from "react-countdown";

const ClassicLotteryComponent = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "#C5C5C5");
  const bgBuyBtnColor = useColorModeValue("gray.100", "gray.800");
  const bgBuyBtnTextColor = useColorModeValue("gray.900", "gray.200");

  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, account } = useEthers();
  const [Id, setId] = useState(chainId);
  const [amount, setAmount] = useState(0.0);
  const [lotteryEndTime, setLotteryEndTime] = useState(0);
  const [finalNumber, setFinalNumber] = useState(0);
  const [winnerNumber, setWinnerNumber] = useState(0);

  const getBabyAddress = () => {
    if (Id === 80001) {
      return config.contractAddress.babyToken[80001];
    } else if (Id === 137) {
      return config.contractAddress.babyToken[137];
    } else if (Id === 97) {
      return config.contractAddress.babyToken[97];
    }
  };
  const getLotteryAddress = () => {
    if (Id === 80001) {
      return config.contractAddress.lottery[80001];
    } else if (Id === 137) {
      return config.contractAddress.lottery[137];
    } else if (Id === 97) {
      return config.contractAddress.lottery[97];
    }
  };
  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const ITokenContract = new web3.eth.Contract(
    tokenJSON.abi as any,
    getBabyAddress()
  );
  const ILotteryContract = new web3.eth.Contract(
    lotteryJSON.abi as any,
    getLotteryAddress()
  );
  const tokenContract = {
    address: getBabyAddress(),
    abi: tokenJSON.abi,
    contract: ITokenContract,
    decimals: 18,
  };
  const lotteryContract = {
    address: getLotteryAddress(),
    abi: lotteryJSON.abi,
    contract: ILotteryContract,
    decimals: 18,
  };

  const handleLotteryInfo = async () => {
    try {
      if (account == "No Wallet") {
        // toast.info("Not Connected");
        console.log("no wallet");
      } else if (account == "Wrong Network") {
        // toast.info("Not Connected");
        console.log("wrong");
      } else if (account == "Connect Wallet") {
        // toast.info("Not Connected");
        console.log("not conneted ");
      } else {
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();
        if (values.status == 1) {
          handleLotery(id - 1);
        } else {
          handleLotery(id);
        }
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  // Random component
  const Completionist = () => (
    <p>
      {"00"}h : {"00"}m
    </p>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <p>
          {hours < 10 ? "0" + hours : hours}h : {minutes < 10 ? "0" + minutes : minutes}m
        </p>
      );
    }
  };
  function reversedNum(num: any) {
    return (
      parseFloat(num.toString().split("").reverse().join("")) * Math.sign(num)
    );
  }
  const handleLotery = async (id: any) => {
    try {
      let lotteryInfo = await lotteryContract.contract.methods
        .viewLottery(id)
        .call();

      let finalNumber = lotteryInfo.finalNumber;
      finalNumber = finalNumber % 1000000;
      let num: any = reversedNum(finalNumber);
      if (num.toString().length == 6) {
        num = num.toString();
      } else if (num.toString().length == 5) {
        num = "0" + num.toString();
      } else if (num.toString().length == 4) {
        num = "00" + num.toString();
      } else if (num.toString().length == 3) {
        num = "000" + num.toString();
      } else if (num.toString().length == 2) {
        num = "0000" + num.toString();
      } else if (num.toString().length == 1) {
        num = "00000" + num.toString();
      } else {
        num = "000000" + num.toString();
      }

      setWinnerNumber(num);
      setAmount(lotteryInfo.amountCollectedInBABY * 0.000000000000000001);
    } catch (error) {
      console.log("error while setting lottery");
    }
  };
  const handleEndTime = async () => {
    try {
      const id = await lotteryContract.contract.methods
        .viewCurrentLotteryId()
        .call();
      let lotteryEndTime = await lotteryContract.contract.methods
        .getTime(id)
        .call();
      let endTime = Number(lotteryEndTime);
      setLotteryEndTime(endTime);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleLotteryInfo();
    handleEndTime();
  }, [account]);
  useEffect(() => {
    setTimeout(() => {
      handleEndTime();
    }, 10000);
  }, [lotteryEndTime]);
  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        {...props}
        w={["100vw", "90vw", "340px"]}
        h={"480px"}
        borderRadius="10px"
        whiteSpace="nowrap"
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
          minH={"462px"}
          borderColor={colorMode === "dark" ? "black" : "black"}
        >
          <Image
            src={Babylonia_Logo.src}
            className={grayscaleMode === "gray" ? "grayscale" : ""}
            alt="babylonia logo"
            marginTop={"8px"}
            w="140px"
          />
          <Text
            fontSize={"2xl"}
            pl="6px"
            color={colorMode === "dark" ? "#C5C5C5" : ""}
          >
            CLASSIC LOTTERY
          </Text>
          <Container style={{ background: "#F0B90B" }}>
            <h2>PRIZE POOL</h2>
            <Image
              src={TrophyImg.src}
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              alt="babylonia logo"
              w="32px"
              h="32px"
            />
            <Box display={`flex`} alignItems="center">
              <p
                style={{
                  display: "flex",
                  cursor: "pointer",
                  marginRight: 5
                }}
                data-toggle="popover"
                data-placement="top"
                data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                title={`${amount.toString()}`}
              >
                {amount.toFixed(2)}
                {/* <br /> <span>- $ 123456.00</span> */}
              </p>
              <h2>BABY</h2>
            </Box>
          </Container>
          <Container style={{ background: "#B49EF2" }}>
            <h2>NEXT DRAW</h2>
            {lotteryEndTime !== 0 ? <Countdown
              date={Date.now() + 60000 * lotteryEndTime}
              renderer={renderer}
            /> : <p>00h : 00m</p>}
          </Container>
          <Container style={{ background: "#37A93B" }}>
            <h2>LAST WINNER</h2>
            <p
              style={{
                fontSize: "32px",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {winnerNumber}
            </p>
          </Container>
          <ButtonContainer>
            <button onClick={onOpen}>BUY TICKET</button>
            <Modal isOpen={isOpen} size="sm" onClose={onClose}>
              <ModalOverlay />

              {/* <ModalCloseButton /> */}
              <ModalContent background={"none"}>
                <ModalBody>
                  <JackpotComponent onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </ButtonContainer>
        </Box>
      </Box>
    </Stack>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 8px;
  padding: 10px;
  height: 55px;

  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  h2 {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #000000;
  }
  p {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid #8e8e8e;
    border-radius: 5px;
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
    color: #000000;
    padding: 0 15px;
    height: 40px;
    margin-left: 5px;
    span {
      font-size: 12px;
      margin: 0;
      padding: 0;
      position: relative;
      top: -12px;
      line-height: 18px;
      font-weight: 400;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  margin: 100px 40px 20px 40px;
  button {
    font-family: "Ropa Sans";
    font-style: normal;

    font-weight: 400;
    font-size: 24px;
    line-height: 26px;

    display: flex;
    align-items: center;

    color: #000000;
    padding: 5px 20px;
  }
`;

export default ClassicLotteryComponent;
