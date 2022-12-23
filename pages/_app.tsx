// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import { WalletProvider } from '@cosmos-kit/react';
// import { ChakraProvider } from '@chakra-ui/react';
// import { defaultTheme, chainName } from '../config';
// import { wallets as keplrWallets } from '@cosmos-kit/keplr';
// import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
// import { wallets as leapWallets } from '@cosmos-kit/leap';


// import { SignerOptions } from '@cosmos-kit/core';
// import { chains, assets } from 'chain-registry';
// import { Chain } from "@chain-registry/types";
// import { GasPrice } from "@cosmjs/stargate";

// function CreateCosmosApp({ Component, pageProps }: AppProps) {
//   const signerOptions: SignerOptions = {
//     signingStargate: (_chain: Chain) => {
//       return getSigningCosmosClientOptions();
//     },
//     cosmwasm: (chain: Chain) => {
//       switch (chain.chain_name) {
//         case "cosmwasmtestnet":
//           return {
//             gasPrice: GasPrice.fromString("0.0025umlga"),
//           };
//       }
//     },
//   };

//   return (
//     <ChakraProvider theme={defaultTheme}>
//       <WalletProvider
//         chains={chains}
//         assetLists={assets}
//         wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
//         signerOptions={signerOptions}

//       >
//         <Component {...pageProps} />
//       </WalletProvider>
//     </ChakraProvider>
//   );
// }

// export default CreateCosmosApp;


//----------------------


import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletProvider } from '@cosmos-kit/react';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme } from '../config';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';

import { assets, chains } from 'chain-registry';
//import { getSigningCosmosClientOptions } from 'interchain';
import { GasPrice } from '@cosmjs/stargate';

import { SignerOptions } from '@cosmos-kit/core';
import { Chain } from '@chain-registry/types';

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
  //   signingStargate: (_chain: Chain) => {
  //     return getSigningCosmosClientOptions();
  //   },
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case 'cosmwasmtestnet':
          return {
            gasPrice: GasPrice.fromString('0.0025umlg')
          };
      }
    }
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <WalletProvider
        chains={chains}
        assetLists={assets}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        signerOptions={signerOptions}
        endpointOptions={{
          cosmwasmtestnet: {
            rpc: ['https://rpc.malaga-420.cosmwasm.com/'], 
            rest: ['https://api.malaga-420.cosmwasm.com']
          }
        }}
      >
        <Component {...pageProps} />
      </WalletProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
