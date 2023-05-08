import React, { useEffect, useState } from "react";
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
  ModalBody,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import ClaimComponent from "@components/CollectPrizesComponent";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import { useAppSelector } from "@hooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import Web3 from "web3";
import { useEthers } from "@usedapp/core";
import config from "@config/index";
import TrophyImg from "../../assets/icons/general/64x64/icon_trophy_001_64x64.png";
import tokenJSON from "../../babies/abis/BABYToken2.json";
import lotteryJSON from "../../babies/abis/Lottery.json";
import WonCheckComponent from "@components/WonCheckComponent";

const HistoryComponent = (props: any) => {
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.900", "#C5C5C5");
  const bgBuyBtnColor = useColorModeValue("gray.100", "gray.800");
  const bgBuyBtnTextColor = useColorModeValue("gray.900", "gray.200");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCheckModal,
    onOpen: onOpenCheckModal,
    onClose: onCloseCheckModal,
  } = useDisclosure();

  const { chainId, account } = useEthers();
  const [Id, setId] = useState(chainId);
  const [amount, setAmount] = useState(0.0);
  const [lotteryEndTime, setLotteryEndTime] = useState(0);
  const [winnerNumber, setWinnerNumber] = useState(0);
  const [inputField, setInputField] = useState(0);

  const getBabyAddress = () => {
    if (Id === 80001) {
      return config.contractAddress.babyToken[80001];
    } else if (Id === 137) {
      return config.contractAddress.babyToken[137];
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

  const handleMinus = () => {
    if (inputField > 0) {
      setInputField(inputField - 1);
      handleLotery(inputField - 1);
    }
  };
  const handlePlus = () => {
    if (Number(inputField) < 999) {
      setInputField(Number(inputField) + 1);
      handleLotery(Number(inputField) + 1);
    } else {
      setInputField(999);
      handleLotery(999);
    }
  };
  const handleLotteryOnChange = (e: any) => {
    if (e.target.value >= 0) {
      setInputField(e.target.value);
      handleLotery(e.target.value);
    } else {
      handleLotery(0);
    }
  };
  function reversedNum(num: any) {
    return (
      parseFloat(num.toString().split("").reverse().join("")) * Math.sign(num)
    );
  }
  const handleLotery = async (id: any) => {
    try {
      if (account == "No Wallet") {
        // toast.info("No Wallet");
        console.log("No wallet");
      } else if (account == "Wrong Network") {
        // toast.info("Wrong Network");
        console.log("Wrong Network");
      } else if (account == "Connect Wallet") {
        // toast.info("Please Connect Wallet First!");
        console.log("Please Connect Wallet First!");
      } else {
        let finalLotteryNumber = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();

        let finalNumber = finalLotteryNumber.finalNumber;
        finalNumber = finalNumber % 1000000;
        let num: any = reversedNum(finalNumber);
        if (num.toString().length == 6) {
          num = num.toString();
        } else if (num.toString().length == 5) {
          num = num.toString() + "0";
        } else if (num.toString().length == 4) {
          num = num.toString() + "00";
        } else if (num.toString().length == 3) {
          num = num.toString() + "000";
        } else if (num.toString().length == 2) {
          num = num.toString() + "0000";
        } else if (num.toString().length == 1) {
          num = num.toString() + "00000";
        } else {
          num = num.toString() + "000000";
        }

        setWinnerNumber(num);
        setAmount(
          finalLotteryNumber.amountCollectedInBABY * 0.000000000000000001
        );
      }
    } catch (error) {
      console.log("error while setting lottery");
    }
  };
  const GetRound = async () => {
    try {
      if (account == "No Wallet") {
        console.log("No Wallet");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect Wallet") {
        console.log("Please Connect Wallet First!");
      } else {
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();

        if (values.status == 1) {
          setInputField(id);
          handleLotery(id);
        } else {
          setInputField(id);
          handleLotery(id);
        }
      }
    } catch (error) {
      console.log("error while getting Round");
    }
  };

  const firstLotteryId = async () => {
    try {
      if (account == "No Wallet") {
        console.log("No Wallet");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect Wallet") {
        console.log("Please Connect Wallet First!");
      } else {
        const web3 = window.web3;
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();

        if (id > 1) {
          setInputField(1);
          handleLotery(1);
        } else {
          handleLotery(0);
          setInputField(0);
        }
      }
    } catch (error) {
      console.log("error while getting Round");
    }
  };
  const lastLotteryId = async () => {
    try {
      if (account == "No Wallet") {
        console.log("No Wallet");
      } else if (account == "Wrong Network") {
        console.log("Wrong Network");
      } else if (account == "Connect Wallet") {
        console.log("Please Connect Wallet First!");
      } else {
        const web3 = window.web3;

        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();
        if (values.status == 1) {
          setInputField(id - 1);
          handleLotery(id - 1);
        } else {
          setInputField(id);
          handleLotery(id);
        }
      }
    } catch (error) {
      console.log("error while getting Round");
    }
  };
  const attachZero = (num: any) => {
    return ("00" + num).slice(-3);
  };
  useEffect(() => {
    GetRound();
  }, [account]);
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
          minH={"462px"}
          paddingX="15px"
          borderColor={colorMode === "dark" ? "black" : "black"}
        >
          <Flex justifyContent="space-evenly" mt="15px">
            <Text
              fontSize={"2xl"}
              pl="6px"
              color={colorMode === "dark" ? "#C5C5C5" : ""}
            >
              ALL HISTORY
            </Text>
            <Text
              fontSize={"2xl"}
              pl="6px"
              color={colorMode === "dark" ? "#C5C5C5" : ""}
            >
              YOUR HISTORY
            </Text>
          </Flex>
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
                  marginRight: 5,
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
            <h2>ROUND</h2>
            <h4
              onClick={() => {
                handleMinus();
              }}
              style={{ cursor: "pointer" }}
            >{`<`}</h4>
            {/* <p> */}
            <input
              type="text"
              pattern="\d*"
              className="inputClassicRound"
              placeholder="0000"
              style={{
                width: "60px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "0px 4px",
                fontSize: 26,
                fontWeight: "600",
              }}
              onChange={(e) => {
                handleLotteryOnChange(e);
              }}
              maxLength={3}
              value={attachZero(inputField)}
            />
            {/* </p> */}
            <h4
              onClick={() => {
                handlePlus();
              }}
              style={{ cursor: "pointer" }}
            >{`>`}</h4>
            <h3
              onClick={() => {
                firstLotteryId();
              }}
              style={{ cursor: "pointer" }}
            >
              First
            </h3>
            <h3
              onClick={() => {
                lastLotteryId();
              }}
              style={{ cursor: "pointer" }}
            >
              Last
            </h3>
          </Container>
          <Container style={{ background: "#37A93B", marginBottom: 50 }}>
            <h2>WINNER NUMBER</h2>
            <p style={{ fontSize: "32px" }}> {winnerNumber}</p>
          </Container>
          <ButtonContainer>
            <button onClick={onOpen}>YOUR TICKETS</button>
            <Modal isOpen={isOpen} size="sm" onClose={onClose}>
              <ModalOverlay />
              <ModalContent background={"none"}>
                <ModalBody>
                  <ClaimComponent
                    onClose={onClose}
                    inputField={inputField}
                    winnerNumber={winnerNumber}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </ButtonContainer>
          <Text
            fontSize={"xl"}
            pl="40px"
            color={colorMode === "dark" ? "#C5C5C5" : ""}
          >
            Have I won?
          </Text>
          <ButtonContainer>
            <button onClick={onOpenCheckModal}>CHECK NOW</button>
            <Modal
              isOpen={isOpenCheckModal}
              size="sm"
              onClose={onCloseCheckModal}
            >
              <ModalOverlay />
              <ModalContent background={"none"}>
                <ModalBody>
                  <WonCheckComponent
                    onClose={onCloseCheckModal}
                    inputField={inputField}
                    winnerNumber={winnerNumber}
                  />
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
    color: #000000;
  }
  h3 {
    padding: 5px;
  }
  h4 {
    font-size: 20px;
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
    padding: 0 10px;
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
  margin: 0px 40px 20px 40px;
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
export default HistoryComponent;
