import React, { useState } from 'react'
import Image from "next/image"
import Button from 'components/elements/Buttons'
import Decrement from 'components/elements/Buttons/Decrement'
import Increment from 'components/elements/Buttons/Increment'
import { ERC721Contract, web3 } from 'shared/utils/contracts'
import { useMetamask } from 'shared/hooks/useMetamask'

const WhitelistMint: React.FC = () => {
  const MAX_MINT_QUANTITY = 5
  const MINT_PRICE = 0.05

  const { accounts } = useMetamask();
  const [disableMinting, setDisableMinting] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const validateQuantity = (value: number) => {
    if (value >= 1 && value <= MAX_MINT_QUANTITY) {
      setQuantity(value)
      setDisableMinting(false)
    } else {
      setQuantity(0)
      setDisableMinting(true)
    }
  }

  const increaseQuantity = () => {
    validateQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    validateQuantity(quantity - 1)
  }

  const handleMint = async () => {
    const amountInWei = web3.utils.toWei((quantity * MINT_PRICE).toFixed(2), 'ether')
    const amount = web3.utils.toHex(amountInWei);
    console.log(quantity)
    setLoading(true)

    try {
      ERC721Contract.methods.whitelistMint(quantity)
        .send({ from: accounts[0], value: amount })
        .once('transactionHash', (txHash) => {
        })
        .once('receipt', (receipt) => {
          setLoading(false)
        })
        .once('error', (error) => {
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <img src="/assets/minting-container.png" className="w-full mx-auto" />
      <div className="absolute top-56 left-[7.75rem]">
        <div className="relative w-20 h-20">
          <Image src="/assets/knight-silhouette.gif" layout="fill" />
        </div>
      </div>
      <div className="absolute flex flex-col bottom-8 inset-x-10 h-48 justify-center">
        <div className="flex items-center mx-auto">
          <Decrement className="w-10" onClick={decreaseQuantity} />
          <div className="relative w-24 h-10 mx-2">
            <img src="/assets/box-quantity.png" className="absolute w-full h-full" />
            <input
              id="quantity_field"
              min={1}
              max={MAX_MINT_QUANTITY}
              value={quantity}
              className="absolute w-full h-full bg-transparent text-white text-center font-bold"
              onChange={(e) => validateQuantity(+e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9\.]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <Increment className="w-10" onClick={increaseQuantity} />
        </div>
        <Button
          className="mt-4 text-sm"
          onClick={() => handleMint()}
          loading={loading}
          loadingText="Minting.."
          disabled={disableMinting}
        >
          {!loading &&
            <span>Mint {quantity}
              <span className="text-white/75 ml-1 text-xs is-small">for {+((quantity * MINT_PRICE).toFixed(2))} ETH</span>
            </span>
          }
        </Button>
      </div>
    </>
  )
}

export default WhitelistMint
