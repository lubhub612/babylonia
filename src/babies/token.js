import { presaleContract, tokenContract, busdContract } from "./contracts";
import { callMethod, bnDivdedByDecimals } from "./utils";
import { web3 } from "./web3";
import { ethers } from "ethers";

//Getters
export const getDepositRate = async () => {
  const result = await presaleContract.contract.methods.depositRate().call();
  return result;
}

export const getBalance = async (address) => {
  //const result = await callMethod(tokenContract.contract.methods['balanceOf'], [address]);
  const result = await tokenContract.contract.methods.balanceOf(address).call();
  return new web3.utils.toBN(result);
};

export const getBusdBalance = async (address) => {
  const result = await busdContract.contract.methods.balanceOf(address).call();
  return new web3.utils.toBN(result);
}

export const checkAllowanceBusd = async (owner) => {
  const spender = presaleContract.address;
  const result = await busdContract.contract.methods
    .allowance(owner, spender)
    .call();
  return new web3.utils.toBN(result);
};

export const getUserDetail = async (address) => {
  const result = await presaleContract.contract.methods
    .userDetail(address)
    .call();
  return result;
};

export const getAmountUnlocked = async (address) =>
  new web3.utils.toBN(
    await presaleContract.contract.methods.unlockedToken(address).call()
  );

export const checkWhitelistMember = async (address) => {
  const result = await presaleContract.contract.methods
    .whitelist(address)
    .call();
  return result;
};

export const getPresaleTokenPrice = async () => {
  const result = await presaleContract.contract.methods.tokenPrice().call();
  return result;
};
export const getTotalDepositedAmount = async () => {
  const result = await presaleContract.contract.methods
    .totalDepositedBusdBalance()
    .call();
  return new web3.utils.toBN(result);
};

//Setters
export const ApproveBusd = async (address) => {
  const spender = presaleContract.address;
  const gasPrice = await web3.eth.getGasPrice();
  const result = await busdContract.contract.methods
    .approve(spender, ethers.constants.MaxUint256)
    .send({ from: address, gasPrice });
  return result;
};

export const ApproveToken = async (address) => {
  const spender = presaleContract.address;
  const gasPrice = await web3.eth.getGasPrice();
  const result = await tokenContract.contract.methods
    .approve(spender, ethers.constants.MaxInt256)
    .send({ from: address, gasPrice });
  return result;
}

export const DepositBusd = async (address, amount) => {
  console.log(address, amount);
  const gasPrice = await web3.eth.getGasPrice();
  const result = await presaleContract.contract.methods
    .DepositBusd(amount)
    .send({ from: address, gasPrice });
  return result;
};

export const deposit = async (amount, address) => {
  const gasPrice = await web3.eth.getGasPrice();
  await presaleContract.contract.methods
    .deposit(amount)
    .send({ from: address, gasPrice });
}

export const withdrawToken = async (amount, address) => {
  const gasPrice = await web3.eth.getGasPrice();
  await presaleContract.contract.methods
    .withdrawToken(amount)
    .send({ from: address, gasPrice });
}