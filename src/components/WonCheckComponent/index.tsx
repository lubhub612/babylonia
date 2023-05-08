import { useEffect, useState } from "react";
// import "./BuyConfirm.css";

import {
  Box,
  Image,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
} from "@chakra-ui/react";
import { useAppSelector } from "@hooks";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import Web3 from "web3";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import { useEthers } from "@usedapp/core";
import JackpotComponent from "@components/JackpotComponent";
import config from "@config/index";
import lotteryJSON from "../../babies/abis/Lottery.json";
import ClaimConfirmComponent from "@components/CollectPrizesComponent/ClaimConfirmComponent";

function WonCheckComponent(props: any) {
  const { chainId, account } = useEthers();
  const [Id, setId] = useState(chainId);

  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const grayscaleMode = useAppSelector((state) => state.grayscale.value);
  const { colorMode } = useColorMode();
  const [lotteryTicketLength, setTotalTicketsLength] = useState(0);
  const [lotteryNumber, setLotteryNumbers] = useState([]);
  const [winnerCount, setWinnerCount] = useState(0);
  const [countForBracket, setCountForBracket] = useState([]);
  const [ticketIdsForClaim, setTicketIdsForClaim] = useState([]);
  const [boolTicketIdsForClaim, setBoolTicketIdsForClaim] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLotteryAddress = () => {
    if (Id === 80001) {
      return config.contractAddress.lottery[80001];
    } else if (Id === 137) {
      return config.contractAddress.lottery[137];
    } else if (Id === 97) {
      return config.contractAddress.lottery[97];
    }
  };
  const ILotteryContract = new web3.eth.Contract(
    lotteryJSON.abi as any,
    getLotteryAddress()
  );

  const lotteryContract = {
    address: getLotteryAddress(),
    abi: lotteryJSON.abi,
    contract: ILotteryContract,
    decimals: 18,
  };

  function reversedNum(num: any) {
    return (
      parseFloat(num.toString().split("").reverse().join("")) * Math.sign(num)
    );
  }
  const handleLottery = async () => {
    try {
      let lotteryInfo = await lotteryContract.contract.methods
        .viewUserInfoForLotteryId(account, props.inputField, 0, 100)
        .call();
      setTotalTicketsLength(lotteryInfo[3]);
      let array = [...lotteryInfo[1]];
      let newArray: any = array.map((item) => {
        item = reversedNum(item % 1000000);
        if (item.toString().length == 6) {
          item = item.toString();
        } else if (item.toString().length == 5) {
          item = "0" + item.toString();
        } else if (item.toString().length == 4) {
          item = "00" + item.toString();
        } else if (item.toString().length == 3) {
          item = "000" + item.toString();
        } else if (item.toString().length == 2) {
          item = "0000" + item.toString();
        } else if (item.toString().length == 1) {
          item = "00000" + item.toString();
        } else {
          item = "000000" + item.toString();
        }
        return item;
      });

      setLotteryNumbers(newArray);
      let num = props.winnerNumber;
      num = num.toString().split("");
      let totalLotteryWinnerNumber = 0;
      let countArray: any = [];
      let ticketIDs: any = [];
      let boolForTicketIds: any = [];
      newArray.map((item: any, index: any) => {
        let count = 1;
        let bool = true;
        let splitted = item.toString().split("");

        for (let i = 0; i < num.length; i++) {
          if (splitted[i] == num[i] && count > i) {
            count++;
            if (bool == true) {
              totalLotteryWinnerNumber++;
              bool = false;
              ticketIDs.push(lotteryInfo[0][index]);
              boolForTicketIds.push(lotteryInfo[2][index]);
            }
          }
        }
        if (count > 1) {
          countArray.push(count - 2);
        }

        setTicketIdsForClaim(ticketIDs);
        setCountForBracket(countArray);
        setBoolTicketIdsForClaim(boolForTicketIds);
        setWinnerCount(totalLotteryWinnerNumber);
      });
    } catch (error) {
      console.log("error while setting lottery");
    }
  };

  useEffect(() => {
    handleLottery();
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        {...props}
        w={["100vw", "90vw", "320px"]}
        borderRadius="10px"
        // whiteSpace="nowrap"
        bg={colorMode === "dark" ? "black" : "white"}
        border={"1px"}
        borderColor={colorMode === "dark" ? "white" : "black"}
        p="10px"
        m={["10px"]}
      >
        <Box
          bg={colorMode === "dark" ? "#5C5C5C" : "#E2E2E2"}
          borderRadius="5px"
          border="1px"
          paddingX="15px"
          minHeight="30vh"
          borderColor={colorMode === "dark" ? "black" : "black"}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              src={Babylonia_Logo.src}
              className={grayscaleMode === "gray" ? "grayscale" : ""}
              alt="babylonia logo"
              marginTop={"8px"}
              w="140px"
            />

            <FaTimes
              style={{
                backgroundColor: "white",
                padding: "1px",
                borderRadius: "2px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={props.onClose}
            />
          </div>
          {winnerCount && winnerCount > 1 ? (
            <MainContainer>
              <ColumnContainer>
                <NumberContainer>
                  <Text fontSize={"lg"} style={{ display: "flex" }} mb="3px">
                    YOUR TICKETS:
                  </Text>
                  <Text
                    fontSize={"lg"}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    mb="3px"
                  >
                    <span style={{ paddingLeft: 20 }}>💸 Total tickets:</span>
                    <span>{lotteryTicketLength}</span>
                  </Text>
                  <Text
                    fontSize={"lg"}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    mb="3px"
                  >
                    <span style={{ paddingLeft: 20 }}>🎁 Winning tickets:</span>
                    <span>{winnerCount}</span>
                  </Text>
                  <ButtonContainer>
                <button onClick={onOpen}>Collect Prizes</button>

              <Modal isOpen={isOpen} size="sm" onClose={onClose}>
                <ModalOverlay />
                <ModalContent background={"none"}>
                  <ModalBody>
                    <ClaimConfirmComponent
                      onClose={onClose}
                      countForBracket={countForBracket}
                      ticketIdsForClaim={ticketIdsForClaim}
                      round={props.inputField}
                      boolTicketIdsForClaim={boolTicketIdsForClaim}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </ButtonContainer>
                </NumberContainer>
              </ColumnContainer>
            </MainContainer>
          ) : (
            <div>
              <Text
                fontSize={"2xl"}
                color={colorMode === "dark" ? "#C5C5C5" : ""}
              >
                Are you a winner?
              </Text>
              <MainContainer>
                <ColumnContainer>
                  <Text fontSize={"lg"} style={{ display: "flex" }} mt="10px">
                    No prizes to collect... Better luck next time!
                  </Text>
                </ColumnContainer>
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
              </MainContainer>
            </div>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: #fff; */
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  p {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  margin: 20px 0px 20px 0px;
  width: 100%;

  text-align: center;
  button {
    font-family: "Ropa Sans";
    font-style: normal;
    width: 100%;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;

    color: #000000;
    padding: 5px 20px;
  }
`;
const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  scroll-snap-type: proximity;
  #input {
    width: 265px;
    height: 30px;
    text-align: center;
    margin-bottom: 10px;
    padding-left: 25px;
    background: #fff;
    border: #000 1px solid;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    letter-spacing: 30px;
    font-size: 1.2rem;
    outline: none;
  }
`;

export default WonCheckComponent;
