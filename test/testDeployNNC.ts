import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import {privateKeyToAccount} from "viem/accounts";

import dotenv from "dotenv";

dotenv.config();

import { network } from "hardhat";
import { sign } from "node:crypto";
import { getContract, parseAbi, parseEther } from "viem";

describe("NNC Token", async () => {
    // const {viem} = await network.connect("giwaSepoliaForked");
    const {viem} = await network.connect("sepoliaForked");

    const [signer, acc1] = await viem.getWalletClients();

    const nnc = await viem.deployContract("NNCToken");
    const contract = getContract({
        address: nnc.address,
        abi: parseAbi([
            'function transfer(address,uint256) public returns (bool)',
            'function balanceOf(address) public view returns (uint256)'
        ]),
        client: signer
    })

    const BALANCE = parseEther('10000000');

    it('Should balanceOf equal 10_000_000 ether', async () => {
        const balanceof = await nnc.read.balanceOf([signer.account.address]);
        assert.equal(BALANCE, balanceof);
    })

    it('transfer token', async () => {
        const tx = await contract.write.transfer([
            acc1.account.address,
            parseEther('1000')
        ]);

        const balanceofSigner = await nnc.read.balanceOf([signer.account.address]);
        assert.equal(BALANCE - parseEther('1000'), balanceofSigner);

        const balanceofAcc1 = await nnc.read.balanceOf([acc1.account.address]);
        assert.equal(parseEther('1000'), balanceofAcc1);
    })

})