import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectMetamask = async () => {
  // ✅ Validar que window.ethereum exista
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    alert("No Metamask detected. Please install Metamask to continue.");
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    return { signer, provider };
  } catch (error) {
    console.error("Error creating provider:", error);
    alert("Error creating provider. Please try again.");
    return null;
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  // ✅ Validar que window.ethereum exista
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    console.warn("Metamask not detected when checking connection.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts && accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
  }
};
