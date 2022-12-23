import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

export const chainName = 'cosmwasmtestnet';
export const stakingDenom = 'umlg';
export const feeDenom = 'uand';

//export const cw20ContractAddress = 'wasm15np2phnz7wvuxcc49d3fz3nfv4g298n7kxfvar9yhg3f93ccrheq56zkcj'
export const cw20ContractAddress = 'wasm1kfqnjnrcmkvakx3wercgxt2vpm3sp97ga5q0yfykfsngu903dd0susqjju';

export const chainassets: AssetList = assets.find(
    (chain) => chain.chain_name === chainName
) as AssetList;

export const coin: Asset = chainassets.assets.find(
    (asset) => asset.base === stakingDenom
) as Asset;