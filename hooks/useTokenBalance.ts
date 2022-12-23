// import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useWallet } from "@cosmos-kit/react";
import { useEffect, useState } from "react";
import { Cw20QueryClient } from "../codegen/Cw20.client";

export function useTokenBalance(contractAddress: string) {
    //offline signer
    const { getCosmWasmClient, address} = useWallet();
    const [cw20Client, setCw20Client] = useState<Cw20QueryClient | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    
    //cw20Client
    useEffect(() => {
        getCosmWasmClient().then((cosmWasmClient) => {
            if (!cosmWasmClient) {
                console.error("no CosmWasmClient!")
                return;
            }
            const newClient = new Cw20QueryClient(cosmWasmClient, contractAddress);
            setCw20Client(newClient);
        });
    },[contractAddress, address, getCosmWasmClient]);
    //query and return token balance
    useEffect(() => {
        if (cw20Client && address) {
            cw20Client.balance({address}).then((res) => setBalance(res.balance));
        }
    });

    return balance ?? undefined;
}