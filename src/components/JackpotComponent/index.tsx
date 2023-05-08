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
  Tooltip,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import Web3 from "web3";
import config from "@config/index";
import tokenJSON from "../../babies/abis/BABYToken2.json";
import lotteryJSON from "../../babies/abis/Lottery.json";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import { useAppSelector } from "@hooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { AiOutlineDown, AiOutlineInfoCircle } from "react-icons/ai";
import { useEthers } from "@usedapp/core";
import DisconnectedWalet from "@components/TokenList/DisconnectedWalet";
import BuyPointOne from "./BuyConfirm";
import { ethers } from "ethers";
import { log } from "console";
import { default as chains } from "@config/chains.json";
import { toast } from "react-toastify";

const JackpotComponent = (props: any) => {
  const [number, setNumber] = useState(100);
  const { chainId, account } = useEthers();
  const grayscaleMode = useAppSelector((state: any) => state.grayscale.value);
  const { colorMode } = useColorMode();
  const [babyBalance, setBabyBalance] = useState("0");
  const [percent, setPercent] = useState(0);
  const [valueInput, setInputValue] = useState(1);
  const [costValue, setCostValue] = useState(0);
  const [actualCost, setActualCost] = useState("0");
  const [Id, setId] = useState(chainId);
  const [approved, setApproved] = useState(false);
  const [eidtLotteryNumber, setEidtLotteryNumber] = useState([]);

  const walletAddress = useAppSelector(
    (state: any) => state.wallet.walletAddress
  );
  const selectedNetwork = useAppSelector(
    (state: any) => state.wallet.selectedNetwork
  );
  const selectedWallet = useAppSelector(
    (state: any) => state.wallet.selectedWallet
  );

  // const increaseNumber = () => {
  //   console.log("valueInput", valueInput, valueInput + 1);

  //   if (valueInput < 100) {
  //     setInputValue(valueInput + 1);
  //   } else {
  //     toast.info("Maximum ticket limit is 100");
  //   }
  // };
  // const decreaseNumber = () => {
  //   if (valueInput > 1) {
  //     setInputValue(valueInput - 1);
  //   }
  // };
  const maxNumber = (value: any) => {
    setInputValue(value);
  };
  // const handleLotteryOnChange = (e: any) => {
  //   if (e.target.value >= 0) {
  //     setInputValue(e.target.value);
  //     // getCost();
  //   }
  // };

  const decreaseNumber = () => {
    if (valueInput > 1) {
      setInputValue(valueInput - 1);
      getCost();
    }
  };
  const increaseNumber = () => {
    if (valueInput <= 99) {
      setInputValue(valueInput + 1);
      getCost();
    }
  };
  const handleLotteryOnChange = (e: any) => {
    if (e.target.value >= 0 && e.target.value <= 99) {
      setInputValue(e.target.value);
      getCost();
    } else {
      setInputValue(0);
      getCost();
    }
  };
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
  const random = () => {
    let randomNumber = 100000 + Math.floor(Math.random() * 900000);
    randomNumber = 1000000 + randomNumber;
    return randomNumber;
  };
  const getBalance = async (address: string) => {
    try {
      const result = await tokenContract.contract.methods
        .balanceOf(address)
        .call();
      return web3.utils.toBN(result).toString();
    } catch (error) {
      console.log("Babybal Error:", error);
    }
  };
  const getCost = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
        console.log("no wallet");
      } else if (account == "Wrong Network") {
        toast.info("Not Connected");
        console.log("wrong");
      } else if (account == "Connect Wallet") {
        toast.info("Not Connected");
        console.log("not conneted ");
      } else {
        // lotteryContract.address = add;
        // const lotteryContract = new web3.eth.Contract(BabyAbI, BabyAddress);
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();

        if (valueInput == 0) {
          setPercent(0);
        } else {
          let costForOne = await lotteryContract.contract.methods
            .calculateTotalPriceForBulkTickets(
              values.discountDivisor,
              values.priceTicketInBABY,
              1
            )
            .call();
          costForOne = web3.utils.fromWei(costForOne);
          let val = costForOne * 1;
          setCostValue(val);

          let acutalCostForBuy = await lotteryContract.contract.methods
            .calculateTotalPriceForBulkTickets(
              values.discountDivisor,
              values.priceTicketInBABY,
              valueInput
            )
            .call();

          acutalCostForBuy = web3.utils.fromWei(acutalCostForBuy);
          acutalCostForBuy = parseFloat(acutalCostForBuy).toFixed(4);
          setActualCost(acutalCostForBuy);

          let percentage: any = values.discountDivisor / 10000;
          percentage = parseFloat(percentage).toFixed(2);
          percentage = (percentage * valueInput).toFixed(2);

          setPercent(percentage);
        }
      }
    } catch (error) {
      console.log("error while getting baby balance", error);
    }
  };
  const getRates = async () => {
    try {
      if (account) {
        const babybalance = await getBalance(account ? account : "");
        // const depositRate: any = await getDepositRate();
        let test: string = babybalance!;
        setBabyBalance(web3.utils.fromWei(test as string));
        // if (swapTokenBalance) {
        //   setSwapTokenBalance(web3.utils.fromWei(swaptokenbalance));
        // }
      }
    } catch (error) {}
  };






  const handleEnable = async () => {
    let arrayOf: any = [];
    for (let i = 1; i <= valueInput; i++) {
      let num = random();
      arrayOf = [...arrayOf, num];
    }
    // setApproved(true);
    setEidtLotteryNumber(arrayOf);
    try {
      if (valueInput > 0) {
        if (parseFloat(actualCost) <= parseFloat(babyBalance)) {
          const id = await lotteryContract.contract.methods
            .viewCurrentLotteryId()
            .call();
          const values = await lotteryContract.contract.methods
            .viewLottery(id)
            .call();

          let acutalCostForBuy = await lotteryContract.contract.methods
            .calculateTotalPriceForBulkTickets(
              values.discountDivisor,
              values.priceTicketInBABY,
              valueInput
            )
            .call();
          // const approveBlock = await web3.eth.getBlock("latest");
          let _gasPrice = await web3.eth.getGasPrice();
          console.log('gas before', _gasPrice);
          let parseGasPriceInInt = (parseInt(_gasPrice) * 130) / 100;
          console.log('gas after', parseGasPriceInInt);

     

          await tokenContract.contract.methods
          .approve(lotteryContract.address, acutalCostForBuy)
          .send({
            from: account,
            gasLimit: 500000,
            gasPrice: parseInt(parseGasPriceInInt.toString()),
          });
         
          setApproved(true);
          toast.success("Approved Sucessfully");
        } else {
          toast.info("Insufficient Balance!");
        }
      } else {
        toast.info("Please input how many tickets you want to buy");
      }
    } catch (error) {
      console.error("Error while approval", error);
      toast.error("Transaction Failed");
    }
  };
  const getAllowance = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
        console.log("no wallet");
      } else if (account == "Wrong Network") {
        toast.info("Not Connected");
        console.log("wrong");
      } else if (account == "Connect Wallet") {
        toast.info("Not Connected");
        console.log("not conneted ");
      } else {
        let arrayOf: any = [];
        for (let i = 1; i <= valueInput; i++) {
          let num = random();
          arrayOf = [...arrayOf, num];
        }
        // setApproved(true);
        setEidtLotteryNumber(arrayOf);
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        const values = await lotteryContract.contract.methods
          .viewLottery(id)
          .call();

        let acutalCostForBuy = await lotteryContract.contract.methods
          .calculateTotalPriceForBulkTickets(
            values.discountDivisor,
            values.priceTicketInBABY,
            valueInput
          )
          .call();

        const result = await tokenContract.contract.methods
          .allowance(account, lotteryContract.address)
          .call();
        if (parseFloat(result) != 0) {
          if (parseFloat(acutalCostForBuy) <= parseFloat(result)) {
            setApproved(true);
          } else {
            toast.info("You Approved less Lottery Tickets!");
            setApproved(true);
          }
        } else {
          // toast.info("Please Approve first!");
          console.log("parse", result);
        }
      }
    } catch (error) {
      console.log("error while getting Allowance", error);
    }
  };
  const getBuyTicket = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Not Connected");
      } else if (account == "Connect Wallet") {
        toast.info("Not Connected");
      } else {
        await getAllowance();
        if (approved == true) {
          const id = await lotteryContract.contract.methods
            .viewCurrentLotteryId()
            .call();
          let array: any = [];
          for (let i = 1; i <= valueInput; i++) {
            let num = random();
            array = [...array, num];
          }
          // const gasPrice = await web3.eth.getGasPrice();

          let _gasPrice = await web3.eth.getGasPrice();
          console.log('gas before', _gasPrice);
          let parseGasPriceInInt = (parseInt(_gasPrice) * 130) / 100;
          console.log('gas after', parseGasPriceInInt);

          await lotteryContract.contract.methods
            .buyTickets(id, array)
            .send({
               from: account,
               gasLimit: 500000,
               gasPrice: parseInt(parseGasPriceInInt.toString()),
             });

          toast.success("Transaction Sucessful");
          setApproved(false);
        } else {
          toast.info("Please approve first !");
        }
      }
    } catch (error) {
      toast.error("Transaction Failed");
      console.log("error while getting baby balance", error);
    }
  };
  useEffect(() => {
    getRates();
  }, []);
  useEffect(() => {
    getRates();
    getCost();
  }, [valueInput]);
  useEffect(() => {
    getAllowance();
  }, [account]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (account != undefined) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Box
          {...props}
          w={["100vw", "90vw", "320px"]}
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
            minHeight="63vh"
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
                marginTop={"15px"}
                w="120px"
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
            <Text
              fontSize={"2xl"}
              pl="6px"
              color={colorMode === "dark" ? "#C5C5C5" : ""}
            >
              Buy Tickets
            </Text>
            <MainContainer>
              <Container style={{ background: "white" }}>
                <RowContainer>
                  <Image
                    src={"/babylogo.png"}
                    className={grayscaleMode === "gray" ? "grayscale" : ""}
                    alt="babylonia logo"
                    w="24px"
                    h="24px"
                  />
                  <p style={{ fontSize: 18, margin: 0 }}>
                    BABY
                    <AiOutlineDown style={{ cursor: "pointer" }} />
                  </p>
                </RowContainer>
                <p className="balanceText">
                  Balance: {Number(babyBalance).toFixed(2)}
                </p>
              </Container>
              <Container style={{ background: "#fff", width: "100%" }}>
                <RowContainer>
                  <p
                    className="button"
                    onClick={() => decreaseNumber()}
                  >{`-`}</p>
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
                    // onChange={(e) => {
                    //   handleLotteryOnChange(e);
                    // }}
                    maxLength={3}
                    value={valueInput}
                  />
                  {/* <p className="number">{valueInput}</p> */}
                  <p
                    className="button"
                    onClick={() => increaseNumber()}
                  >{`+`}</p>
                </RowContainer>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => maxNumber(100)}
                >
                  Max
                </h3>
              </Container>
              <ColumnContainer style={{ width: "100%" }}>
                <p>
                  Cost <span>{costValue}</span> BABY
                </p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  Discount &nbsp;<span>{percent}%</span>
                  <Tooltip label="Description of the product" fontSize="lg">
                    <AiOutlineInfoCircle
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    />
                  </Tooltip>
                </p>
                <p style={{ fontSize: "16px" }}>
                  Total <span>{actualCost}</span> BABY + gas
                </p>
              </ColumnContainer>
              {!approved && (
                <ButtonContainer>
                  <button onClick={() => handleEnable()}>Approval</button>
                </ButtonContainer>
              )}
              {approved && (
                <>
                  <ButtonContainer>
                    <button
                      onClick={() => {
                        getBuyTicket();
                      }}
                    >
                      Buy Instantly
                    </button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <button onClick={onOpen}>View/Edit Number</button>
                  </ButtonContainer>
                </>
              )}

              <Modal isOpen={isOpen} size="sm" onClose={onClose}>
                <ModalOverlay />
                <ModalContent background={"none"}>
                  <ModalBody>
                    <BuyPointOne
                      onClose={onClose}
                      eidtLotteryNumber={eidtLotteryNumber}
                      setEidtLotteryNumber={setEidtLotteryNumber}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </MainContainer>
          </Box>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack justifyContent="center" alignItems="center" mt={"80px"}>
      <DisconnectedWalet></DisconnectedWalet>
    </Stack>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  margin: 10px;
  padding: 10px;
  min-height: 55px;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 100%;
  .balanceText {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
  }
  .number {
    border: 1px solid #8e8e8e;
    border-radius: 5px;
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
    padding: 5px 8px;
    min-width: 56px;
  }
  h3 {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 26px;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    /* font-size: 14px; */
    line-height: 19px;
  }
  .button {
    cursor: pointer;
    font-size: 24px;
    margin: 0px 3px;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
  padding: 10px;
  div {
    display: flex;
  }
  p {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    word-spacing: 5px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  margin: 5px 40px 5px 40px;
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

export default JackpotComponent;
