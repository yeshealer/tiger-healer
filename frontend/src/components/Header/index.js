import React from "react";
import { Icon } from '@iconify/react';

const Header = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="fixed top-5 py-3 px-6 bg-slate-500/10 rounded-2xl shadow-md">
                <div className="flex">
                    <Icon icon="bxs:chat" width="24" height="24" />
                    <p className="font-bold ml-1">Chat</p>
                </div>
            </div>
        </div>
    )
}

export default Header