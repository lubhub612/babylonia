import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ClassicLotteryComponent from './ClassicLotteryComponent'
import HowToPlay from './HowToPlay'
import HistoryComponent from './HistoryComponent'
import WinningRulesComponent from './WinningRulesComponent'
import PrizePool from './PrizePool'

const ClassicLottery = () => {
  return (
    <Flex
      w="100vw"
      wrap={'wrap'}
      justifyContent="center"
      alignItems="flex-start"
    >
      <ClassicLotteryComponent />
      <HowToPlay />
      <HistoryComponent />
      <WinningRulesComponent />
      <PrizePool />
    </Flex>
  )
}

export default ClassicLottery
