import React from "react";
import { useEthers } from "@usedapp/core";
import DisconnectedWalet from "./DisconnectedWalet";
import ClassicLottery from "../ClassicLottery";

declare const window: any;

export default function TokenList(props: any) {
  const { chainId, account } = useEthers();

  if (account != undefined || account != null) {
    return <ClassicLottery />;
  }

  return <DisconnectedWalet {...props}></DisconnectedWalet>;
}
