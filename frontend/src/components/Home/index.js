import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="w-fit flex justify-center m-auto mt-36 rotate-45">
            <div className="mr-2">
                <div
                    className="w-[17rem] h-[17rem] flex relative justify-center items-center bg-slate-500/20 hover:bg-sky-500/30 ease-in duration-200 shadow-xl cursor-pointer mb-2 border-t border-l border-sky-400"
                    onClick={() => navigate('/chat')}
                >
                    <div className="w-[8.5rem] h-[8.5rem] bg-slate-500/20 absolute rounded-lg" />
                    <Player
                        autoplay
                        loop
                        src="https://assets10.lottiefiles.com/packages/lf20_rcuthdnb.json"
                        className="w-56 h-56 -rotate-45"
                    />
                </div>
                <div
                    className="w-[17rem] h-[17rem] flex relative justify-center items-center bg-slate-500/20 hover:bg-sky-500/30 ease-in duration-200 shadow-xl cursor-pointer border-l border-b border-sky-400"
                >
                    <div className="w-44 h-44 flex justify-center items-center bg-slate-500/20 rounded-full -rotate-45">
                        <h1 className="text-3xl font-black"></h1>
                    </div>
                </div>
            </div>
            <div>
                <div
                    className="w-[17rem] h-[17rem] flex relative justify-center items-center bg-slate-500/20 hover:bg-sky-500/30 ease-in duration-200 shadow-xl cursor-pointer mb-2 border-t border-r border-sky-400"
                >
                    <div className="w-44 h-44 flex justify-center items-center bg-slate-500/20 rounded-full -rotate-45">
                        <h1 className="text-3xl font-black"></h1>
                    </div>
                </div>
                <div
                    className="w-[17rem] h-[17rem] flex relative justify-center items-center bg-slate-500/20 hover:bg-sky-500/30 ease-in duration-200 shadow-xl cursor-pointer mb-2 border-r border-b border-sky-400"
                >
                    <div className="w-44 h-44 flex justify-center items-center bg-slate-500/20 rounded-full -rotate-45">
                        <h1 className="text-3xl font-black"></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home