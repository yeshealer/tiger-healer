import React from "react";
import './index.scss'

const Background = () => {
    const starArray = [];
    for (let i = 0; i < 20; i++) {
        starArray[i] = (
            <div className="shooting_star" key={i} />
        )
    }
    return (
        <div className="animation-bg">
            <div className="night">
                {starArray}
            </div>
        </div>
    )
}

export default Background