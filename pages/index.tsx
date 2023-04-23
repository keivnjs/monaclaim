import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { classNames } from "shared/utils/classNames";
import { ClaimContract } from "shared/utils/contracts";
import { Card } from "components/elements/Cards";
import Button from "components/elements/Buttons";
import ArrowRightIcon from "components/elements/Icons/ArrowRight";
import ArrowLeftIcon from "components/elements/Icons/ArrowLeft";
import { ClaimSuccessModal } from "components/modules/claim/Modals/ClaimSuccess";
import { Spinner } from "components/elements/Spinners";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import type {
  UsePrepareContractWriteConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from "wagmi";

import { AiOutlineTwitter, AiOutlineClose } from "react-icons/ai";
import { animated, useTransition } from "@react-spring/web";


const Claim: NextPage = () => {
  const containerRef = useRef<any>(null);

  const [current, setCurrent] = useState(0);

  // const { status, accounts, error } = useMetamask();
  const { isConnected, address } = useAccount();
  const [selected, setSelected] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [ownedMona, setOwnedMona] = useState<Array<number>>([]);
  const [claimStatus, setClaimStatus] = useState<Array<boolean>>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const navTransition = useTransition(isNavOpen, {
    from: { opacity: 0, transform: "translateY(-100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-100%)" },
    config: { duration: 300 },
  });

  const [scrollState, setScrollState] = useState<any>({
    scroller: null,
    itemWidth: 0,
    isPrevHidden: true,
    isNextHidden: false,
  });

  const getSelected = () => {
    let result = [];
    for (const [key, value] of Object.entries(selected)) {
      if (value === true) {
        result.push(+key);
      }
    }
    return result;
  };

  const handleSelectAll = () => {
    ownedMona.forEach((item, index) => {
      if (!claimStatus[index]) {
        setSelected((prev: any) => {
          return { ...prev, [item]: !selectedAll };
        });
      }
    });
    setSelectedAll(!selectedAll);
  };

  const handleClaim = () => {
    const selectedItems = getSelected();
    if (selectedItems.length === 0) {
      alert("No items selected");
      return;
    }

    if (selectedItems.length % 2 !== 0) {
      alert("Please select a multiple of two items");
      return;
    }

    setLoading(true);
    ClaimContract.methods
      .claim(getSelected())
      .send({ from: address })
      .once("transactionHash", (txHash) => {})
      .once("receipt", (receipt) => {
        setIsModalOpen(true);
        setLoading(false);
        setSelected({});
      })
      .once("error", (error) => {
        setLoading(false);
      });
  };

  const prev = () => {
    const numItemsToScroll = window.innerWidth < 768 ? 1 : 1; 
    scrollState.scroller.scrollBy({
      left: -scrollState.itemWidth * numItemsToScroll,
      top: 0,
      behavior: "smooth",
    });
    setScrollState({ ...scrollState, isNextHidden: false, isPrevHidden: true });
  };
  
  const next = () => {
    const numItemsToScroll = window.innerWidth < 768 ? 1 : 1;
    scrollState.scroller.scrollBy({
      left: scrollState.itemWidth * numItemsToScroll,
      top: 0,
      behavior: "smooth",
    });
    setScrollState({ ...scrollState, isPrevHidden: false, isNextHidden: true });
  };
  

  const nextSlide = () => {
    setCurrent(current === ownedMona.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? ownedMona.length - 1 : current - 1);
  };

  useEffect(() => {
    if (ownedMona.length) {
      const scroller = containerRef.current;
      const itemWidth = containerRef.current.firstElementChild?.clientWidth;

      setScrollState({ ...scrollState, scroller, itemWidth });
    }

    return () => {};
  }, [ownedMona]);

  useEffect(() => {
    ClaimContract.methods
      .isMonaIdsClaimed(ownedMona)
      .call()
      .then((response) => {
        setClaimStatus(response);
      });
  }, [ownedMona]);

  useEffect(() => {
    if (isConnected) {
      ClaimContract.methods
        .tokensOfOwner(address)
        .call()
        .then((response) => {
          const responseToNumber = response.map((item) => +item);
          console.log(responseToNumber);
          setOwnedMona(responseToNumber);
        });
    }
  }, [address]);

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden">

      {/* Header */}
      <div className="fixed top-0 z-30 bg-black text-white flex items-center justify-center sm:justify-between px-4 md:px-12 py-3 md:py-5 w-full">
        <img src="/assets/MOBILE/logo.webp" className="h-8 sm:h-8" />
        <div className="hidden md:flex md:space-x-2 md:mr-1">
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
        <title>Claim Mona | Monaverse</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      
      {!isConnected && (
      <div className="absolute inset-x-0 bottom-0 z-10 h-full w-full">
        <div className="relative max-w-full h-full sm:max-w-none sm:h-full">
          <Image
            src="/assets/MOBILE/BLANK-MAIN-1.webp"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      )};
      <div className="relative flex top-4 h-full items-center justify-center mx-auto max-w-5xl z-20">
        {!isConnected && (
          <div className="h-screen w-full flex flex-col justify-center items-center">
            <img src="/assets/MOBILE/button.webp" className="mx-auto w-full sm:w-1/2 relative z-0" />
            <div className="absolute flex flex-col justify-center items-center -mb-36 ml-10">
            
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <>
                    {(() => {
                      if (!connected) {
                        return (
                          <div
                            {...(!ready && {
                              "aria-hidden": true,
                              style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                              },
                            })}
                          >
                            <img
                            onClick={openConnectModal}
                            src="/assets/PC/CONNECT-WALLET.webp"
                            className="mx-auto w-72 sm:w-80 mb-5 sm:mb-0 h-auto cursor-pointer hover:-translate-y-1 transition"
                          />
                          </div>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }
                    })()}
                  </>
                );
              }}
            </ConnectButton.Custom>
            </div>
          </div>
          
        )}

        {isConnected && (
          <>
            <div className="absolute h-screen w-screen">
              <Image src="/assets/MOBILE/BLANK-BRICK-1.webp"
              layout="fill"
              objectFit="cover" />
              <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-10/12 sm:w-4/5 h-3/5 sm:h-4/5 bg-black bg-opacity-80 rounded-lg"></div>
            </div>
            </div>

            <div className="relative flex flex-col items-center w-10/12 mx-auto">
            <div className="relative flex mb-2 items-center justify-center space-x-[-5px] sm:space-x-0 text-white w-full h-2/4">
            {ownedMona.length > 0 && (
                <button
                  className="hover:-translate-y-px w-1/12 inset-2"
                  onClick={() => prev()}
                >
                  <img
                    src="/assets/MOBILE/ARROW-KIRI.webp"
                    className="h-14 w-14 min-w-[2rem] min-h-[2rem] mx-auto"
                  />
                </button>
              )}
              <div className="relative flex items-center w-10/12 h-full px-[2.5px]">
                  {!ownedMona.length && (
                   <div className="relative flex flex-col w-full items-center text-center">
                   <div className="flex flex-wrap justify-center items-center space-x-4 relative">
                     <img src="/assets/MOBILE/DONAT-HAVE-MONA.webp" className="h-30 w-96 sm:h-11/12 sm:w-11/12" />
                     <button 
                       className="absolute bottom-0 right-0 sm:right-20 mt-4 mr-4">
                         <a href="https://opensea.io/collection/monaverse" target="_blank" rel="noopener noreferrer">
                           <img src="/assets/MOBILE/BUY-NOW.webp" className="w-48 sm:w-96 h-auto mt-4 sm:mt-4" />
                         </a>
                     </button>
                   </div>
                 </div>
                 
                 
                  )}
                  {!!ownedMona.length && (
                    <div
                      ref={containerRef}
                      className="snap-mandatory snap-x overflow-hidden mb-4 flex gap-4 py-4 h-full"
                    >
                      {ownedMona.map((item, index) => (
                        <MonaCard
                          key={+item}
                          tokenId={+item}
                          isSelected={selected[item]}
                          isClaimed={claimStatus[index]}
                          onClick={() => {
                            setSelectedAll(false);
                            setSelected((prev: any) => {
                              return { ...prev, [item]: !selected[item] };
                            });
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {ownedMona.length > 0 && (
                <button
                  className="hover:-translate-y-px w-1/12 inset-2"
                  onClick={() => next()}
                >
                  <img
                    src="/assets/MOBILE/ARROW-KANAN.webp"
                    className="h-14 w-14 min-w-[2rem] min-h-[2rem] mx-auto"
                  />
                </button>
              )}
              </div>

              {!!ownedMona.length && (
              <div className="flex flex-col justify-center items-center space-y-10 mb-20">
                <button
                  className="cursor-pointer md:hidden"
                  onClick={() => handleSelectAll()}
                >
                <img src="/assets/MOBILE/SELECT-ALL.webp" className="h-3 justify-center items-center " />
                  {!selectedAll}
                  {selectedAll}
                </button>
                <button className="cursor-pointer hover:brightness-105 active:brightness-95 hover:-translate-y-px disabled:grayscale disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:opacity-70"
                disabled={
                  getSelected().length === 0 || getSelected().length % 2 !== 0
                }
                onClick={() => handleClaim()}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center w-full h-full">
                    <Spinner className="w-10 h-10 mr-2 text-white" />
                  </div>
                ) : (
              <img src="/assets/MOBILE/CLAIM-NOW.webp" alt="Claim Button" className="h-16 md:h-40 sm:h-32" />
                )}
              </button>
              </div>
              )}
            </div>
            
          </>
        )}

      {/* {!!isSuccess && (
        <div className="absolute h-screen w-screen">
          <Image src="/assets/MOBILE/BLANK-BRICK-1.png"
            layout="fill"
            objectFit="cover" />
            <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-10/12 sm:w-4/5 h-3/5 sm:h-4/5 bg-black bg-opacity-80 rounded-lg"></div>
          <div className="absolute inset-0 flex justify-center items-center flex-col space-y-10">
            <img src="/assets/MOBILE/CONGRATS.png" className="h-30 w-3/4 sm:h-60 sm:w-3/5" />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 space-x-4 ">
              <img src="/assets/MOBILE/THANKS.png" className="w-8/12 sm:w-3/12 cursor-pointer" onClick={() => setIsSuccess(false)} />
              <img src="/assets/MOBILE/OPENSEA.png" className="w-9/12 sm:w-3/12 cursor-pointer"  />
            </div>
          </div>
          </div>
        </div>
      )} */}
      <ClaimSuccessModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        // address={accounts[0]}
      />
      <div className="fixed bottom-16 sm:bottom-0 left-0 p-2">
        <p className="text-sm text-white">&copy; 2023 Monaverse. All Rights Reserved</p>
      </div>
      </div>
    </div>
  );
};

type MonaCardProps = {
  tokenId: number;
  isSelected: boolean;
  isClaimed: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const MonaCard: React.FC<MonaCardProps> = (props) => {
  const { tokenId, isSelected, isClaimed, ...rest } = props;

  return (
    <button
      className={classNames(
        isSelected && "ring-2 ring-yellow-200 shadow-glow",
        "disabled:grayscale disabled:cursor-not-allowed",
        "group snap-center flex-none relative w-60 h-60 sm:w-72 sm:h-72 rounded-lg cursor-pointer transition",
        "first:ml-6 last:mr-6"
      )}
      disabled={isClaimed}
      {...rest}
    >
     
      <img
        src={
          tokenId === 10
            ? "https://bafybeifbrx6lwx2u6nhiwflh4kko6oitqf6f2s7kzytb5yp74hwrgvdwka.ipfs.dweb.link/" +
              tokenId +
              ".png"
            : "https://bafybeicr7d5kouaqmqlknz7ehxn44nffedkkkgbpat3cz6xynrdcobjs5e.ipfs.dweb.link/" +
              tokenId +
              ".png"
        }
        className="absolute inset-0 p-3 h-full w-full"
      />

      <div className="absolute bottom-2 right-2">
        <p
          className={classNames(
            "text-center font-display font-bold text-yellow-300 bg-gray-900/60 rounded px-1"
          )}
        >
          #{tokenId}
        </p>
      </div>
    </button>
  );
};

export default Claim;
