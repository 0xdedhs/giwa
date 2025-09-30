import {
    account,
    publicClientL1,
    publicClientL2,
    walletClientL1,
} from "./config.js";

import {
    l1StandardBridgeAbi,
    l1StandardBridgeAddress,
    l1TokenAddress,
    l2TokenAddress,
    tokenAbi
} from "./contract.js";


import { formatEther, parseUnits, formatUnits } from "viem";
import { getL2TransactionHashes } from "viem/op-stack";

const l1TokenBalance = await publicClientL1.readContract({
    address: l1TokenAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [account.address]
});

console.log(`L1 Token Balance: ${formatUnits(l1TokenBalance, 18)}`)

const approveHash = await walletClientL1.writeContract({
    address: l1TokenAddress,
    abi: tokenAbi,
    functionName: 'approve',
    args: [l1StandardBridgeAddress, parseUnits('12', 18)],
});
console.log(`Approve transaction hash on L1: ${approveHash}`);

// Wait until the L1 transaction above is fully processed.
const approveReceipt = await publicClientL1.waitForTransactionReceipt({
    hash: approveHash
});
console.log('L1 transaction confirmed:', approveReceipt.transactionHash);

// Send the deposit transaction on L1.
// In this process, your ERC-20 tokens are sent to the L1StandardBridge contract.
const depositHash = await walletClientL1.writeContract({
    address: l1StandardBridgeAddress,
    abi: l1StandardBridgeAbi,
    functionName: 'depositERC20To',
    args: [
        l1TokenAddress,
        l2TokenAddress,
        account.address,
        parseUnits('12', 18),
        200000,
        '0x',
    ],
});
console.log(`Deposit transaction hash on L1: ${depositHash}`);

// Wait until the L1 transaction above is fully processed.
const depositReceipt = await publicClientL1.waitForTransactionReceipt({ 
        hash: depositHash 
    });
console.log('L1 transaction confirmed:', depositReceipt.transactionHash);

// From the L1 receipt, precompute the L2 deposit transaction hash.
const [l2Hash] = getL2TransactionHashes(depositReceipt);
console.log(`Corresponding L2 transaction hash: ${l2Hash}`);

// Wait until the L2 deposit transaction above is processed.
// This takes roughly 1–3 minutes.
const l2Receipt = await publicClientL2.waitForTransactionReceipt({
    hash: l2Hash,
});
console.log('L2 transaction confirmed:', l2Receipt.transactionHash);
console.log('Deposit completed successfully!');