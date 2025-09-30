
import {giwaSepolia} from "./config.js";
import {erc20Abi, parseAbi} from "viem";
import {sepolia} from "viem/chains";

// Contract addresses for ERC-20 bridging
export const l1TokenAddress = '0x387395d680a523e278ACd63f4cba4dd109fb236D';
export const l2TokenAddress = '0x32Dc2250618193bBc5b74a7Cc1f9F6A75F15d4a9';
export const l1StandardBridgeAddress = giwaSepolia.contracts.l1StandardBridge[sepolia.id].address;

// ABIs for the ERC-20 token and L1StandardBridge
export const tokenAbi = [
  ...erc20Abi
];
export const l1StandardBridgeAbi = parseAbi([
  'function depositERC20To(address _l1Token, address _l2Token, address _to, uint256 _amount, uint32 _minGasLimit, bytes calldata _extraData) external'
]);
