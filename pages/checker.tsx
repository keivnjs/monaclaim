import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Button from "components/elements/Buttons";
import { ClaimContract } from "shared/utils/contracts";

const Checker: NextPage = () => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkToken = async () => {
    if (tokenId !== null) {
      const isClaimed = await ClaimContract.methods
        .isMonaIdsClaimed([tokenId])
        .call();
      setIsAvailable(!isClaimed[0]);
    } else {
      alert("Please enter a token ID");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title> Checker | Monaverse</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl mb-4 text-yellow-300">
        Check Monaverse Availability
      </h1>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="0"
          defaultValue=""
          placeholder="Enter token ID"
          className="bg-white border-2 border-blue-500 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm px-2 py-1 rounded mr-5"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setTokenId(null);
              setIsAvailable(null);
            } else {
              setTokenId(parseInt(value));
            }
          }}
        />

        <Button onClick={checkToken}>Check</Button>
      </div>
      {tokenId !== null && isAvailable !== null && (
        <div className="mt-4">
          {isAvailable ? (
            <p className="text-green-500">
              Token ID {tokenId} is available to claim.
            </p>
          ) : (
            <p className="text-red-500">
              Token ID {tokenId} is not available to claim.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checker;
