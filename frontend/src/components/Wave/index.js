import React from "react";
import { ethers } from "ethers";
import abi from "../../utils/TigerWave.json";

const Wave = () => {
    const contractAddress = "0x00780C8645387f271fcE5A06C1E52606410Fc694";
    const contractABI = abi.abi;
    const wave = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tigerWaveContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await tigerWaveContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                /*
                * Execute the actual wave from your smart contract
                */
                const waveTxn = await tigerWaveContract.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await tigerWaveContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-full flex justify-center">
            <button class="relative px-5 py-2 font-medium text-white group">
                <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-sky-500 group-hover:bg-sky-700 group-hover:skew-x-12"></span>
                <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-sky-700 group-hover:bg-sky-500 group-hover:-skew-x-12"></span>
                <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-sky-600 -rotate-12"></span>
                <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-sky-400 -rotate-12"></span>
                <span class="relative">Button Text</span>
            </button>
        </div>
    )
}

export default Wave