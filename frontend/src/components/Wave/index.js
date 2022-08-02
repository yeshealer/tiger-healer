import React, { useEffect, useState } from "react";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Icon } from '@iconify/react';
import ReactTooltip from 'react-tooltip';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import abi from "../../utils/TigerWave.json";

const Wave = () => {
    const [allWaves, setAllWaves] = useState([]);
    const [message, setMessage] = useState("");
    const [walletTooltip, showWalletTooltip] = useState(true);
    const [timeTooltip, showTimeTooltip] = useState(true);
    const [paidTooltip, showPaidTooltip] = useState(true);
    const { openConnectModal } = useConnectModal();
    const { address, isConnected } = useAccount();

    const contractAddress = "0x1179c470757b9b8Caa16f00fD6f0a6D6e1d918a5";
    const contractABI = abi.abi;

    const getMessage = (event) => {
        setMessage(event.target.value)
    }

    const wave = async () => {
        if (message === '') {
            toast('Let me know what you think of me!', {
                style: {
                    border: '1px solid #38bdf8',
                    padding: '8px 16px',
                    color: '#38bdf8',
                },
                iconTheme: {
                    primary: '#38bdf8',
                    secondary: '#FFFAEE',
                },
                icon: '🤞'
            });
        } else {
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
                    getAllWaves()
                } else {
                    console.log("Ethereum object doesn't exist!");
                }
            } catch (error) {
                console.log(error);
            }
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
                        message: wave.message,
                        isPaid: wave.isPaid
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
                    <div className="w-full flex items-center justify-between mt-1">
                        <div className="text-xl cursor-pointer">😃</div>
                        {isConnected ? <button className="relative px-5 py-1 font-medium text-white group" onClick={() => wave()}>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-sky-500 group-hover:bg-sky-700 group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-sky-700 group-hover:bg-sky-500 group-hover:-skew-x-12"></span>
                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-sky-600 -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-sky-400 -rotate-12"></span>
                            <span className="relative">Wave</span>
                        </button> : openConnectModal && <button className="relative px-5 py-1 font-medium text-white group" onClick={openConnectModal}>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-sky-500 group-hover:bg-sky-700 group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-sky-700 group-hover:bg-sky-500 group-hover:-skew-x-12"></span>
                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-sky-600 -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-sky-400 -rotate-12"></span>
                            <span className="relative">Connect</span>
                        </button>}
                    </div>
                </div>
                <Toaster />
                <div className="w-full mt-5 flex flex-col">
                    {allWaves.map((wave, index) => {
                        return (
                            <div key={index} className={address === wave.address ? "w-fit bg-sky-500/20 py-2 px-4 pr-2 rounded-xl mt-1 self-end" : "w-fit bg-slate-500/20 py-2 px-4 pr-2 rounded-xl mt-1"}>
                                <div className="flex justify-between items-start">
                                    <div className="text-sm">{wave.message}</div>
                                    <div className="flex ml-3 mt-2 opacity-70">
                                        <div data-tip data-for={`wallet-${index}`}
                                            onMouseEnter={() => showWalletTooltip(true)}
                                            onMouseLeave={() => {
                                                showWalletTooltip(false);
                                                setTimeout(() => showWalletTooltip(true), 50);
                                            }}
                                            className="cursor-pointer"
                                        ><Icon icon="fluent:wallet-credit-card-16-filled" width="14px" height="14px" /></div>
                                        {walletTooltip && <ReactTooltip id={`wallet-${index}`}>{wave.address}</ReactTooltip>}
                                        <div data-tip data-for={`time-${index}`}
                                            onMouseEnter={() => showTimeTooltip(true)}
                                            onMouseLeave={() => {
                                                showTimeTooltip(false);
                                                setTimeout(() => showTimeTooltip(true), 50);
                                            }}
                                            className="cursor-pointer"
                                        ><Icon icon="bx:time-five" className="ml-1" width="14px" height="14px" /></div>
                                        {timeTooltip && <ReactTooltip id={`time-${index}`}>{wave.timestamp.toLocaleString()}</ReactTooltip>}
                                        {wave.isPaid && <div
                                            data-tip data-for={`paid-${index}`}
                                            onMouseEnter={() => showPaidTooltip(true)}
                                            onMouseLeave={() => {
                                                showPaidTooltip(false);
                                                setTimeout(() => showPaidTooltip(true), 50);
                                            }}
                                            className="text-xs ml-1 cursor-pointer"
                                        >🎉</div>}
                                        {paidTooltip && <ReactTooltip id={`paid-${index}`}>{address === wave.address ? '🎉 Congratulations! You' : 'This user'} won 0.0001ETH!</ReactTooltip>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Wave