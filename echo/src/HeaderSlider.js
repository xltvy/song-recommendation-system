import React from "react";
import './style.css'

const HeaderSlider = () => {
    return (
        <div id="mainmodal">
            <div class="modalconent">
                <marquee class = "marquee" behavior="scroll" direction="left" scrollamount="30">
                    GET RECOMMENDATIONS
                </marquee>
            </div>
        </div>
    );
};

export default HeaderSlider;