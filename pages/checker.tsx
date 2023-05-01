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
      {/* Header */}
      <div className="fixed top-0 z-30 bg-black text-white flex items-center justify-center sm:justify-between px-4 md:px-12 py-3 md:py-5 w-full">
        <a href="/">
        <img src="/assets/MOBILE/logo.webp" className="h-8 sm:h-8" />
        </a>
        <div className="hidden md:flex md:space-x-2 md:mr-1">
          <a
            href="https://www.instagram.com/baslove.you/?igshid=Mzc1MmZhNjY%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/IG.webp" className="w-auto h-10 hover:-translate-y-1 transition duration-300" />
          </a>
          <a
            href="https://twitter.com/_____basloveyou?s=21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/TWITTER.webp" className="w-auto h-10 hover:-translate-y-1 transition duration-300" />
          </a>
          <a
            href="https://opensea.io/collection/monaverse"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/OPENSEAB.webp" className="w-auto h-10 hover:-translate-y-1 transition duration-300" />
          </a>
          <a
            href="https://discord.gg/QW4TQKjR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/DICORD.webp" className="w-auto h-10 hover:-translate-y-1 transition duration-300" />
          </a>
        </div>

        <div className="fixed bottom-16 sm:bottom-0 left-0 p-2 hidden sm:block">
        <p className="text-sm text-white">&copy; 2023 Monaverse. All Rights Reserved</p>
      </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full md:hidden flex justify-center py-4 space-x-3 bg-black">
        <a
            href="https://www.instagram.com/baslove.you/?igshid=Mzc1MmZhNjY%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/IG.webp" className="w-auto h-10" />
          </a>
          <a
            href="https://twitter.com/_____basloveyou?s=21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/TWITTER.webp" className="w-auto h-10" />
          </a>
          <a
            href="https://opensea.io/collection/monaverse"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/OPENSEAB.webp" className="w-auto h-10" />
          </a>
          <a
            href="https://discord.gg/QW4TQKjR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/MOBILE/DICORD.webp" className="w-auto h-10" />
          </a>
        </div>
      </div>


      <Head>
        <title> Checker | Monaverse</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>


      <div className="absolute h-screen w-screen">
        <img
          src="/assets/MOBILE/brick-wall.webp"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-10/12 sm:w-4/5 h-3/5 sm:h-4/5 bg-black bg-opacity-80 rounded-lg mt-0 sm:mt-20">
        <div className="flex flex-col items-center justify-center">
        <img src="/assets/MOBILE/CHECK-AVAILABILITY.png" className="w-11/12 h-11/12 sm:w-3/4 sm:h-3/4 mt-24 sm:mt-32 sm:mb-4" />
        <div className="flex items-center justify-center mt-5 space-x-3">
          <input
            type="number"
            min="1"
            defaultValue=""
            placeholder="ENTER TOKEN ID"
            className="bg-white border-2 border-blue-500 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-2xl py-1 px-4 sm:py-5 sm:px-24 rounded ml-5 sm:mr-5 text-center"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setTokenId(null);
                setIsAvailable(null);
              } else {
                if (tokenId !== null && isAvailable !== null) {
                  setTokenId(parseInt(value));
                  setIsAvailable(null);
                } else {
                  setTokenId(parseInt(value));
                }
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                checkToken();
              }
            }}
          />
          <button onClick={checkToken}>
            <img src="/assets/MOBILE/BUTTON-CHECK.png" className="w-4/6 sm:w-3/4 h-4/6 sm:h-3/4" />
          </button>
        </div>
      </div>
      {tokenId !== null && isAvailable !== null && (
        <div className="items-center justify-center mt-10 flex">
          {isAvailable ? (
            <p className="text-green-500 text-2xl sm:text-4xl">
              Token ID {tokenId} is available to claim.
            </p>
          ) : (
            <p className="text-red-500 text-2xl sm:text-4xl">
              Token ID {tokenId} is not available to claim
            </p>
          )}
        </div>
      )}
              </div>
            </div>
      </div>
    </div>
  );
};

export default Checker;
