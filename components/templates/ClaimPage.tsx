import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { classNames } from "shared/utils/classNames";
import { ClaimContract, ERC721Contract } from "shared/utils/contracts";
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
// import { abi } from "../contract-abi";
import type {
  UsePrepareContractWriteConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from "wagmi";

const Claim: NextPage = () => {
  const containerRef = useRef<any>(null);

  // const { status, accounts, error } = useMetamask();
  const { isConnected, address } = useAccount();
  const [selected, setSelected] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [ownedMona, setOwnedMona] = useState<Array<number | string>>([]);
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
    ownedMona.forEach((item) => {
      setSelected((prev: any) => {
        return { ...prev, [item]: !selectedAll };
      });
    });
    setSelectedAll(!selectedAll);
  };

  const handleClaim = () => {
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

  const next = () => {
    scrollState.scroller.scrollBy({
      left: scrollState.itemWidth * 3,
      top: 0,
      behavior: "smooth",
    });

    // Hide if is the last item
    setScrollState({ ...scrollState, isNextHidden: true, isPrevHidden: false });
  };

  const prev = () => {
    scrollState.scroller.scrollBy({
      left: -scrollState.itemWidth * 3,
      top: 0,
      behavior: "smooth",
    });
    setScrollState({ ...scrollState, isNextHidden: false, isPrevHidden: true });
    // Hide if is the last item
    // Show remaining
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
    if (isConnected) {
      ClaimContract.methods
        .tokensOfOwner(address)
        .call()
        .then((response) => {
          console.log(response);
          setOwnedMona(response);
        });
    }
  }, [address]);

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden">
      <Head>
        <title>Claim Mona | Monaverse</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <ClaimSuccessModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        address={address}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 h-full w-full">
        <div className="relative w-full h-full">
          <Image
            src="/assets/cover_house-alt-2-0343dbcd09210d15bf8543e4d28b1c77.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* {!isConnected && (
        <div className="absolute inset-0 z-20 w-full h-screen bg-white bg-opacity-50" />
      )} */}

      <div className="relative flex top-4 h-full items-center justify-center mx-auto max-w-5xl z-20">
        {!isConnected && (
          <div className="h-screen w-full flex flex-col justify-center space-y-4">
            <p className="text-3xl text-center text-yellow-500 font-bold">
              Connect wallet to claim your MONA!
            </p>
            <div className="relative flex flex-col inset-x-0 justify-center items-center">
              <ConnectButton />
            </div>
          </div>
        )}

        {isConnected && (
          <Card className="lg:h-2/3 lg:max-h-[34.75rem]">
            <div className="relative w-full h-1/4 mb-4">
              <img
                src="/assets/daovinci-b221c8125668459d6f66816934a38064.png"
                className="absolute inset-0 h-full w-full object-scale-down"
              />
            </div>

            <div className="relative flex mb-2 items-center space-x-4 text-white w-full h-2/4">
              <button
                className="hover:-translate-y-px w-1/12"
                onClick={() => prev()}
              >
                <ArrowLeftIcon className="mx-auto w-14 h-14" />
              </button>
              <div className="relative flex items-center w-10/12 h-full px-[2.5px]">
                <img
                  src="/assets/containers/inner-board-lg.png"
                  className="absolute inset-0 h-full w-full"
                />
                {!ownedMona.length && (
                  <div className="relative flex flex-col w-full items-center text-center">
                    <p className="text-2xl font-sans">{`You don't have any Mona :(`}</p>
                    <a
                      href="https://opensea.io/collection/monaverse"
                      target="_blank"
                    >
                      <Button className="!w-60 h-14 mt-4" variant="secondary">
                        <span> Buy on Opensea </span>
                        <img
                          src="/assets/icons/icon-opensea.png"
                          className="w-6 h-6 ml-2"
                        />
                      </Button>
                    </a>
                  </div>
                )}
                {!!ownedMona.length && (
                  <div
                    ref={containerRef}
                    className="snap-mandatory snap-x overflow-x-auto flex gap-6 py-4 h-full"
                  >
                    {ownedMona.map((item) => (
                      <MonaCard
                        key={+item}
                        tokenId={+item}
                        isSelected={selected[item]}
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
              <button
                className="hover:-translate-y-px w-1/12"
                onClick={() => next()}
              >
                <ArrowRightIcon className="mx-auto w-14 h-14" />
              </button>
            </div>

            <div className="relative flex items-center justify-between space-x-4 w-10/12 h-1/4 mx-auto">
              <Button
                className="!w-44 h-14 text-lg"
                onClick={() => handleSelectAll()}
                variant="secondary"
              >
                {!selectedAll && "Select All"}
                {selectedAll && "Unselect All"}
              </Button>
              {/* <Button
                className="!w-56 h-14 text-lg"
                disabled={!getSelected().length}
                onClick={() => handleClaim()}
                loading={isLoading}
              >
                Claim Selected
              </Button> */}
            </div>
          </Card>
        )}
      </div>

      <div className="absolute top-0 flex w-full min-h-screen">
        <div className="speed-slow relative flex w-full">
          <div
            className={classNames(
              "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
              "z-[2] left-[0vw]"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src="/assets/cloud.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="speed-slow relative flex w-full">
          <div
            className={classNames(
              "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
              "z-[2] left-[100vw]"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src="/assets/cloud.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="speed-slow relative flex w-full">
          <div
            className={classNames(
              "absolute bottom-0 h-[95vh] w-[300vw] sm:w-[200vw] lg:w-[100vw]",
              "z-[2] left-[200vw]"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src="/assets/cloud.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 min-h-screen w-full">
        <Image src="/assets/bg-sky.png" layout="fill" />
      </div>
    </div>
  );
};

type MonaCardProps = {
  tokenId: number;
  isSelected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const MonaCard: React.FC<MonaCardProps> = (props) => {
  const { tokenId, isSelected, ...rest } = props;

  const [isExist, setExist] = useState<boolean>(true);

  useEffect(() => {
    ClaimContract.methods
      .isExists(tokenId)
      .call()
      .then((response) => {
        setExist(response);
      });
  }, [tokenId, isSelected]);

  return (
    <button
      className={classNames(
        isSelected && "ring-2 ring-yellow-200 shadow-glow",
        "disabled:grayscale disabled:cursor-not-allowed",
        "group snap-center flex-none relative w-44 h-44 rounded-lg cursor-pointer transition",
        "first:ml-6 last:mr-6"
      )}
      disabled={isExist}
      {...rest}
    >
      <img
        src="/assets/borders/card-frame.png"
        className="absolute inset-0 h-full w-full group-hover:brightness-125"
      />
      <img
        src={"https://knights.game/api/knights/image/" + tokenId}
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
