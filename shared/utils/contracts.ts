import Web3 from "web3";
import { AbiItem } from 'web3-utils'

import { ERC721 } from "shared/types/ERC721";
import { Staking } from "shared/types/Staking";
import { CLAIM_CONTRACT, ERC721_CONTRACT, STAKING_CONTRACT } from "shared/utils/constants";
import ERC721ABI from 'shared/contracts/ERC721.json'
import StakingABI from 'shared/contracts/Staking.json'
import ClaimAbi from 'shared/contracts/Claim.json'
import { Claim } from "shared/types/Claim";

export const web3 = new Web3(Web3.givenProvider);
export const ERC721Contract: ERC721 = (new web3.eth.Contract(ERC721ABI as AbiItem[], ERC721_CONTRACT)) as any
export const StakingContract: Staking = (new web3.eth.Contract(StakingABI as AbiItem[], STAKING_CONTRACT)) as any
export const ClaimContract: Claim = (new web3.eth.Contract(ClaimAbi as AbiItem[], CLAIM_CONTRACT)) as any
