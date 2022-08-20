import { chains } from "../constants/index";
import { useEffect, useState } from "react";

const useChainInfo = (chainId) => {
  const [currency, setCurrency] = useState("");
  const [chainName, setChainName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getChainInfo = () => {
      chains
        ?.filter((chain) => chain.chainId === chainId.slice(2))
        ?.forEach(({ c, chainName, url, currency }) => {
          setCurrency(currency);
          setChainName(chainName);
          setUrl(url);
        });
    };
    getChainInfo();
  }, [chainId]);

  return { chainName, currency, url };
};

export default useChainInfo;
