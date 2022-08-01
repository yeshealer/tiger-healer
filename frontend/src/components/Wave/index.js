import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import abi from "../../utils/TigerWave.json";

const Wave = () => {
    const [allWaves, setAllWaves] = useState([]);
    const [message, setMessage] = useState("")
    const { address, iseConnected } = useAccount();
    const contractAddress = "0x2f0F1b976CE4fD6D58D190090CC6Ccb751bF33d3";
    const contractABI = abi.abi;

    const getMessage = (event) => {
        setMessage(event.target.value)
    }

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
                const waveTxn = await tigerWaveContract.wave(message, { gasLimit: 300000 });
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

    const getAllWaves = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                /*
                 * Call the getAllWaves method from your Smart Contract
                 */
                const waves = await wavePortalContract.getAllWaves();

                /*
                 * We only need address, timestamp, and message in our UI so let's
                 * pick those out
                 */
                let wavesCleaned = [];
                waves.forEach(wave => {
                    wavesCleaned.push({
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message
                    });
                });

                /*
                 * Store our data in React State
                 */
                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let wavePortalContract;

        const onNewWave = (from, timestamp, message) => {
            console.log("NewWave", from, timestamp, message);
            setAllWaves(prevState => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        };

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            wavePortalContract.on("NewWave", onNewWave);
        }

        return () => {
            if (wavePortalContract) {
                wavePortalContract.off("NewWave", onNewWave);
            }
        };
    }, []);

    useEffect(() => {
        (async () => {
            await getAllWaves()
        })();
    })

    return (
        <div className="w-full flex justify-center">
            <div className="w-1/3 flex flex-col justify-center items-start">
                <div className="w-full flex flex-col items-start">
                    <textarea rows={3} className="w-full bg-slate-500/20 border-none outline-none px-4 py-2 rounded-xl" onChange={(e) => getMessage(e)} />
                    <div className="w-full flex items-center justify-between">
                        <div className="text-xl cursor-pointer">😃</div>
                        <button className="relative px-5 py-1 font-medium text-white group mt-1" onClick={() => wave()}>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-sky-500 group-hover:bg-sky-700 group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-sky-700 group-hover:bg-sky-500 group-hover:-skew-x-12"></span>
                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-sky-600 -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-sky-400 -rotate-12"></span>
                            <span className="relative">Wave</span>
                        </button>
                    </div>
                </div>
                <div className="w-full mt-5 flex flex-col">
                    {allWaves.map((wave, index) => {
                        return (
                            <div key={index} className={address === wave.address ? "w-fit bg-sky-500/20 py-2 px-4 rounded-xl mt-1 self-end" : "w-fit bg-slate-500/20 py-2 px-4 rounded-xl mt-1"}>
                                <div className="text-sm">Address: {wave.address}</div>
                                <div className="text-sm">Time: {wave.timestamp.toLocaleString()}</div>
                                <div className="text-sm">Message: {wave.message}</div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Wave