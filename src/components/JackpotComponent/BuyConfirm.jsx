import React, { useEffect, useState } from "react";
// import "./BuyConfirm.css";

import {
  Box,
  Text,
  Stack,
  Image,
  useColorMode,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Web3 from "web3";

// import { TokenAbI, TokenAddress } from "../Utils/token";
// import { BabyAbI, BabyAddress } from "../Utils/baby";
// import BabyLogo from "../../Assets/Babylonia_Logo.png";
import { FaTimes } from "react-icons/fa";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";
import { useAppSelector } from "@hooks";
import { useRouter } from "next/router";
import styled from "styled-components";

import { AiOutlineDown, AiOutlineInfoCircle } from "react-icons/ai";
import { useEthers } from "@usedapp/core";
import DisconnectedWalet from "@components/TokenList/DisconnectedWalet";
import { toast } from "react-toastify";
import tokenJSON from "../../babies/abis/BABYToken2.json";
import lotteryJSON from "../../babies/abis/Lottery.json";
import config from "@config/index";
function BuyPointOne(props) {
  // const [open, setOpen] = useState(false);
  // const textTitleColor = useColorModeValue("black", "gray.100");
  // const textColor = useColorModeValue("black", "gray.200");
  // const { colorMode, toggleColorMode } = useColorMode();
  // const [lotteryCard, setLotteryCard] = useState(false);
  // const [lotteryBuyEnable, setlotteryBuyEnable] = useState(false);
  // const bgColor = useColorModeValue("gray.300", "gray.700");
  // const bgBoxColor = useColorModeValue("#E2E2E2", "FFFFFF");
  // const buttonColor = useColorModeValue("#F58634", "#0E1555");
  // const buttonTxtColor = useColorModeValue("gray.900", "gray.200");
  // const [valueInput, setInputValue] = useState("");
  // const [eidtLotteryNumber, setEidtLotteryNumber] = useState([]);
  // const [actualCost, setActualCost] = useState(0);
  // const [costValue, setCostValue] = useState(0);
  // const [bulkDiscount, setBulkDiscount] = useState(0);
  // const [babyBalance, setBabyBalance] = useState(0);
  // const [percent, setPercent] = useState(0);
  // const [approved, setApproved] = useState(false);
  // const dispatch = useDispatch();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // let account = useSelector((state) => state.connect?.connection);
  // const handleConnect = async () => {
  //   setLotteryCard(true);
  //   dispatch(connectionAction());
  // };
  // const handleBuyInstantly = () => {
  //   setLotteryCard(true);
  // };
  // const handleConfirm = () => {
  //   getBuyTicket();
  // };
  // const handleChangeInput = (e) => {
  //   if (e.target.value >= 0 && e.target.value <= 100) {
  //     setInputValue(e.target.value);
  //     getCost();
  //     setEidtLotteryNumber("");
  //   } else {
  //     getCost();
  //   }
  // };
  // const getBabyBalance = async () => {
  //   try {
  //     if (account == "No Wallet") {
  //       console.log("no wallet");
  //     } else if (account == "Wrong Network") {
  //       console.log("wrong");
  //     } else if (account == "Connect Wallet") {
  //       console.log("not conneted ");
  //     } else {
  //       const web3 = window.web3;
  //       const tokenContract = new web3.eth.Contract(TokenAbI, TokenAddress);
  //       let balance = await tokenContract.methods.balanceOf(account).call();
  //       balance = web3.utils.fromWei(balance);
  //       balance = parseFloat(balance).toFixed(4);
  //       console.log("token balance", balance);
  //       setBabyBalance(balance);
  //     }
  //   } catch (error) {
  //     console.log("error while getting baby balance");
  //   }
  // };
  // const getCost = async () => {
  //   try {
  //     if (account == "No Wallet") {
  //       // toast.info("Not Connected");
  //       console.log("no wallet");
  //     } else if (account == "Wrong Network") {
  //       // toast.info("Not Connected");
  //       console.log("wrong");
  //     } else if (account == "Connect Wallet") {
  //       // toast.info("Not Connected");
  //       console.log("not conneted ");
  //     } else {
  //       const web3 = window.web3;
  //       const lotteryContract = new web3.eth.Contract(BabyAbI, BabyAddress);
  //       const id = await lotteryContract.methods.viewCurrentLotteryId().call();
  //       const values = await lotteryContract.methods.viewLottery(id).call();

  //       if (valueInput == 0) {
  //         setBulkDiscount(0);
  //         setPercent(0);
  //         setCostValue(0);
  //         setActualCost(0);
  //       } else {
  //         let costForOne = await lotteryContract.methods
  //           .calculateTotalPriceForBulkTickets(
  //             values.discountDivisor,
  //             values.priceTicketInBABY,
  //             1
  //           )
  //           .call();
  //         costForOne = web3.utils.fromWei(costForOne);
  //         let val = costForOne * valueInput;
  //         setCostValue(val);

  //         let acutalCostForBuy = await lotteryContract.methods
  //           .calculateTotalPriceForBulkTickets(
  //             values.discountDivisor,
  //             values.priceTicketInBABY,
  //             valueInput
  //           )
  //           .call();
  //         acutalCostForBuy = web3.utils.fromWei(acutalCostForBuy);
  //         acutalCostForBuy = parseFloat(acutalCostForBuy).toFixed(4);
  //         console.log(acutalCostForBuy, "acutalCostForBuy");
  //         setActualCost(acutalCostForBuy);

  //         let discount = val - acutalCostForBuy;
  //         discount = parseFloat(discount).toFixed(4);
  //         setBulkDiscount(discount);

  //         let percentage = discount / val;
  //         percentage = percentage * 100;
  //         percentage = parseFloat(percentage).toFixed(2);
  //         setPercent(percentage);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error while getting baby balance");
  //   }
  // };
  // const handleEnable = async () => {
  //   let arrayOf = [];
  //   for (let i = 1; i <= valueInput; i++) {
  //     let num = random();
  //     arrayOf = [...arrayOf, num];
  //   }
  //   // setApproved(true);
  //   setEidtLotteryNumber(arrayOf);
  //   try {
  //     if (valueInput > 0) {
  //       if (parseFloat(actualCost) <= parseFloat(babyBalance)) {
  //         const web3 = window.web3;
  //         const tokenContract = new web3.eth.Contract(TokenAbI, TokenAddress);

  //         const lotteryContract = new web3.eth.Contract(BabyAbI, BabyAddress);

  //         const id = await lotteryContract.methods
  //           .viewCurrentLotteryId()
  //           .call();
  //         const values = await lotteryContract.methods.viewLottery(id).call();
  //         let acutalCostForBuy = await lotteryContract.methods
  //           .calculateTotalPriceForBulkTickets(
  //             values.discountDivisor,
  //             values.priceTicketInBABY,
  //             valueInput
  //           )
  //           .call();
  //         // let amount = web3.utils.toWei(acutalCostForBuy);
  //         await tokenContract.methods
  //           .approve(BabyAddress, acutalCostForBuy)
  //           .send({
  //             from: account,
  //           });
  //         // .on("receipt", (receipt) => {
  //         //   console.log("mintValue", receipt);
  //         // });
  //         setApproved(true);
  //         toast.success("Approved Sucessfully");
  //         console.log("token approveed");
  //       } else {
  //         toast.info("Insufficient Balance!");
  //       }
  //     } else {
  //       toast.info("Please input how many tickets you want to buy");
  //     }
  //   } catch (error) {
  //     toast.error("Transaction Failed");
  //     console.error("error while getting baby balance", error);
  //   }
  // };
  // const getBuyTicket = async () => {
  //   try {
  //     if (account == "No Wallet") {
  //       toast.info("Not Connected");
  //     } else if (account == "Wrong Network") {
  //       toast.info("Not Connected");
  //     } else if (account == "Connect Wallet") {
  //       toast.info("Not Connected");
  //     } else {
  //       if (approved == true) {
  //         const web3 = window.web3;
  //         const lotteryContract = new web3.eth.Contract(BabyAbI, BabyAddress);
  //         const id = await lotteryContract.methods
  //           .viewCurrentLotteryId()
  //           .call();
  //         console.log("viewCurrentLotteryId", id);
  //         let array = [];
  //         for (let i = 1; i <= valueInput; i++) {
  //           let num = random();
  //           array = [...array, num];
  //         }
  //         console.log("array and id", array, id);
  //         const result = await lotteryContract.methods
  //           .buyTickets(id, array)
  //           .send({ from: account });
  //         toast.success("Transaction Sucessful");
  //         setApproved(false);
  //       } else {
  //         toast.info("Please enable first !");
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Transaction Failed");
  //     console.log("error while getting baby balance", error);
  //   }
  // };
  // const random = () => {
  //   let randomNumber = 100000 + Math.floor(Math.random() * 900000);
  //   randomNumber = 1000000 + randomNumber;
  //   return randomNumber;
  // };

  // const handleLotteryNumberEdit = (e, item) => {
  //   if (e.target.value <= 999999) {
  //     for (let i = 0; i <= eidtLotteryNumber.length; i++) {
  //       if (eidtLotteryNumber[i] == item) {
  //         eidtLotteryNumber[i] = e.target.value;
  //       }
  //     }
  //     setEidtLotteryNumber(e.target.value);
  //   } else {
  //     toast.info("You can add only upto 6 digit number !");
  //   }
  // };

  // useEffect(() => {
  //   getBabyBalance();
  //   getCost();
  // }, [account]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     getCost();
  //   }, 1000);
  // }, [valueInput]);
  // // useEffect(() => {
  // //   handleLotteryNumberEdit();
  // // }, [eidtLotteryNumber]);
  // useEffect(() => {
  //   document.getElementById("input").focus();
  // });
  const { chainId, account } = useEthers();
  const [Id, setId] = useState(chainId);
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
    }
    else if (Id === 97) {
      return config.contractAddress.lottery[97];
    }
  };
  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const ITokenContract = new web3.eth.Contract(tokenJSON.abi, getBabyAddress());
  const ILotteryContract = new web3.eth.Contract(
    lotteryJSON.abi,
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
  const [number, setNumber] = useState(123312);
  const grayscaleMode = useAppSelector((state) => state.grayscale.value);
  const { colorMode } = useColorMode();
  const [lotteryNumber, setLotteryNumbers] = useState(props?.eidtLotteryNumber);

  const getBuyTicket = async () => {
    try {
      if (account == "No Wallet") {
        toast.info("Not Connected");
      } else if (account == "Wrong Network") {
        toast.info("Not Connected");
      } else if (account == "Connect Wallet") {
        toast.info("Not Connected");
      } else {
        const id = await lotteryContract.contract.methods
          .viewCurrentLotteryId()
          .call();
        console.log("viewCurrentLotteryId in edit and buy", id);
        let array = [];
        array = lotteryNumber;
        console.log("array", array);
        const result = await lotteryContract.contract.methods
          .buyTickets(id, array)
          .send({ from: account });
        toast.success("Transaction Sucessful");
      }
    } catch (error) {
      toast.error("Transaction Failed");
      console.log("error while getting baby balance", error);
    }
  };
  const handleChangeLotteryNumber = (e, targetIndex) => {
    let newArray = lotteryNumber.map((item, index) => {
      if (index == targetIndex) {
        return Number((item = e.target.value));
      } else {
        return item;
      }
    });
    setLotteryNumbers(newArray);
  };
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
          <Text
            fontSize={"2xl"}
            pl="6px"
            textAlign={"left"}
            color={colorMode === "dark" ? "#C5C5C5" : ""}
          >
            Edit Numbers
          </Text>
          <MainContainer>
            <ColumnContainer>
              <Text fontSize={"lg"} style={{ display: "flex" }} mb="3px">
                Total cost: &nbsp;<Text fontWeight={"black"}> 1.11 BABY</Text>
              </Text>
              <Text>
                Buy Instantly, chooses random numbers, with no duplicates among
                your tickets. Prices are set before each round starts, equal to
                $5 at that time. Purchases are final.
              </Text>
              <NumberContainer>
                {lotteryNumber &&
                  lotteryNumber.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      pattern="\d*"
                      maxLength={7}
                      // id="input"
                      placeholder="123456"
                      className="input"
                      value={item}
                      onChange={(item) => {
                        handleChangeLotteryNumber(item, index);
                      }}
                    />
                  ))}
              </NumberContainer>
            </ColumnContainer>
            <ButtonContainer>
              <button
                onClick={() => {
                  getBuyTicket();
                }}
              >
                Confirm & Buy
              </button>
            </ButtonContainer>
          </MainContainer>
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
  margin: 10px;
  padding: 10px;
  width: 100%;
  h2 {
    display: flex;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 600;
      font-size: 1rem;
    }
  }
  p {
    font-family: "Ropa Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 21px;
  }
`;
const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
  max-height: 170px;
  overflow-y: scroll;
  scroll-snap-type: proximity;
  .input {
    width: 230px;
    height: 30px;
    align-self: center;
    margin-bottom: 10px;
    padding-left: 15px;
    font-size: 1.2rem;
    border: #000 1px solid;
    letter-spacing: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  margin: 15px 40px 30px 40px;
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

export default BuyPointOne;
