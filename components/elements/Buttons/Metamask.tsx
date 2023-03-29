import React from "react";
import { useMetamask } from "shared/hooks/useMetamask";
import { truncateAddress } from "shared/utils/string";
import Button from ".";

const MetamaskButton: React.FC = () => {
  const { connect, status, switchChains, accounts, error } = useMetamask();

  if (status === "ERROR" && error.message === "Incorrect Network") {
    return (
      <Button
        type="button"
        className="mx-auto mt-8 text-sm font-bold !h-[3rem] !w-64"
        onClick={async () => {
          await switchChains();
        }}
      >
        Incorrect Chain
      </Button>
    );
  }

  if (status !== "READY") {
    return (
      <Button
        type="button"
        className="mx-auto mt-8 text-sm font-bold !h-[3rem] !w-64"
        onClick={async () => {
          await connect();
        }}
        loading={status === "CONNECTING"}
        loadingText="Waiting for user to sign"
      >
        {status === "IDLE" && "Connect wallet"}
        {status === "ONBOARDING" && "Install MetaMask"}
      </Button>
    );
  }

  return (
    <div className="text-white">
      <div className="flex p-1 text-sm items-center justify-center rounded">
        <a className="px-4 tracking-wider">
          {truncateAddress(accounts[0], 5)}
        </a>
      </div>
    </div>
  );
};

export default MetamaskButton
