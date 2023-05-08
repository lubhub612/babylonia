import { useEffect, useState } from "react";
// import "./BuyConfirm.css";

import { Box, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useAppSelector } from "@hooks";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import Web3 from "web3";
import Babylonia_Logo from "../../assets/Babylonia_Logo.png";

import { useEthers } from "@usedapp/core";
import config from "@config/index";
import lotteryJSON from "../../babies/abis/Lottery.json";
import { toast } from "react-toastify";
function ClaimConfirmComponent(props) {
  const { chainId, account } = useEthers();
  const [Id, setId] = useState(chainId);
  const [totalReward, setTotalReward] = useState(0);
  let web3 = new Web3();
  if (typeof window !== "undefined") {
    web3 = new Web3(window.ethereum);
  }

  const grayscaleMode = useAppSelector((state) => state.grayscale.value);
  const { colorMode } = useColorMode();
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
    lotteryJSON.abi,
    getLotteryAddress()
  );

  const lotteryContract = {
    address: getLotteryAddress(),
    abi: lotteryJSON.abi,
    contract: ILotteryContract,
    decimals: 18,
  };

  const getReward = async () => {
    let ids = props.ticketIdsForClaim;
    let reward = 0;

    ids.map(async (item, index) => {
      let rewardInfo = await lotteryContract.contract.methods
        .viewRewardsForTicketId(
          props?.round,
          item,
          props?.countForBracket[index]
        )
        .call();
      reward = parseFloat(reward) + parseFloat(web3.utils.fromWei(rewardInfo));

      reward = reward.toFixed(4);
      setTotalReward(reward);
    });
  };
  const claimReward = async () => {
    let tickets = props.ticketIdsForClaim.map((item) => {
      return Number(item);
    });

    let res;
    props.boolTicketIdsForClaim.map((item) => {
      if (item == true) {
        res = true;
      } else {
        res = false;
      }
    });
  
   



    try {

      if (res != true) {

        let _gasPrice = await web3.eth.getGasPrice();
        console.log('gas before', _gasPrice);
        let parseGasPriceInInt = (parseInt(_gasPrice) * 130) / 100;
        console.log('gas after', parseGasPriceInInt);
        
        await lotteryContract.contract.methods
          .claimTickets(props?.round, tickets, props?.countForBracket)
          .send({
             from: account,
             gasLimit: 500000,
             gasPrice: parseInt(parseGasPriceInInt.toString()),
            });

        toast.success("You claim reward ");
        props.onClose();
      } else {
        toast.info("You already claimed the Reward");
        props.onClose();
      }
    } catch (error) {
      toast.error("Transaction Failed");
    }
  };
  useEffect(() => {
    getReward();
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
          minHeight="50vh"
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
          <Text fontSize={"2xl"} color={colorMode === "dark" ? "#C5C5C5" : ""}>
            Collect Winnings
          </Text>
          <MainContainer>
            <ColumnContainer>
              <Text fontSize={"lg"} style={{ display: "flex" }} mt="10px">
                YOU WON!
              </Text>

              <Text
                fontSize={"3xl"}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  fontWeight: "700",
                  letterSpacing: 1.4,
                }}
                mb="3px"
              >
                <span>{totalReward} BABY!</span>
                <span>🎁</span>
              </Text>
              {/* <Text
                fontSize={"lg"}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                mb="3px"
              >
                -0.00 USD
              </Text> */}
              <Text
                fontSize={"lg"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
                mt="15px"
              >
                Round #{props.round}
              </Text>
            </ColumnContainer>
            <ButtonContainer>
              <button onClick={() => claimReward()}>Claim</button>
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

export default ClaimConfirmComponent;
