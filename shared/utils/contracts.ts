import Web3 from "web3";
import { AbiItem } from "web3-utils";

import { CLAIM_CONTRACT, ERC721_CONTRACT } from "shared/utils/constants";
import ClaimAbi from "shared/contracts/Claim.json";
import { Claim } from "shared/types/Claim";

export const web3 = new Web3(Web3.givenProvider);
export const ClaimContract: Claim = new web3.eth.Contract(
  ClaimAbi as AbiItem[],
  CLAIM_CONTRACT
) as any;
