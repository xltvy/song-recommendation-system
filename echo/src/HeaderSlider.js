import React from "react";
import './style.css'

const HeaderSlider = () => {
    return (
        <div id="mainmodal">
            <div class="modalconent">
                <div class = "marquee" behavior="scroll" direction="left" scrollamount="30">
                    GET RECOMMENDATIONS
                </div>
            </div>
        </div>
    );
};

export default HeaderSlider;