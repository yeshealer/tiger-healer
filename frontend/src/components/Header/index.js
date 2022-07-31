import React from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Icon } from '@iconify/react';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full flex items-center mt-5 mb-3 justify-around">
            <div className="flex py-3 px-6 bg-slate-500/20 rounded-2xl shadow-md">
                <div className="flex items-end hover:text-sky-500 ease-in duration-200 cursor-pointer" onClick={() => navigate('/')}>
                    <Icon icon="carbon:home" width="24" height="24" />
                    <p className="font-bold ml-1">Home</p>
                </div>
                <div className="flex items-center hover:text-sky-500 ease-in duration-200 cursor-pointer ml-5" onClick={() => navigate('/wave')}>
                    <Icon icon="bxs:chat" width="24" height="24" />
                    <p className="font-bold ml-1">Wave</p>
                </div>
            </div>
            <ConnectButton />
        </div>
    )
}

export default Header