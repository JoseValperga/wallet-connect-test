import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  checkIfWalletIsConnect,
  connectMetamask,
} from "../Utils/connectMetamask";
import {
  createCampaign,
  getCampaignsDetail,
  getUserCampaigns,
} from "../Utils/CampaignManager";
import { getCampaignDetail } from "../Utils/CampaignContract";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  // connect to metamask
  const connectMetamaskWithAccount = async () => {
    const result = await connectMetamask();

    if (!result) {
      console.warn("connectMetamask() returned null. Aborting connect.");
      return;
    }

    const { provider } = result;
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      window.location.reload();
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
      alert("Error connecting to Metamask. Please try again.");
    }
  };

  // check if wallet is connect
  useEffect(() => {
    checkIfWalletIsConnect(setAccount);
  }, [setAccount]);

  return (
    <MainContext.Provider
      value={{
        account,
        connectMetamaskWithAccount,
        createCampaign,
        getCampaignsDetail,
        getCampaignDetail,
        getUserCampaigns,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
