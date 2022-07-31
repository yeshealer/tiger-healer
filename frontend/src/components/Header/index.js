import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Icon } from '@iconify/react';

const Header = () => {
    return (
        <div className="w-full flex items-center mt-5 justify-around">
            <div className="py-3 px-6 bg-slate-500/10 rounded-2xl shadow-md">
                <div className="flex">
                    <Icon icon="bxs:chat" width="24" height="24" />
                    <p className="font-bold ml-1">Chat</p>
                </div>
            </div>
            <ConnectButton />
        </div>
    )
}

export default Header