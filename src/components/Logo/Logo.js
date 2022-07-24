import React from 'react';
import Tilt from 'react-parallax-tilt';
import Brain from "./Brain.png";

const Logo = () => {
    return (
        <Tilt 
        className="tilt-img"
        tiltMaxAngleX={35}
        tiltMaxAngleY={35}
        perspective={500}
        scale={1.1}
        transitionSpeed={1000}
        gyroscope={false}
        >
            <div>
                <img className="inner-element br2 shadow-2 ma4 mt0 " style={{ height: "100px", width: "100px", paddingTop: "5px"}} alt='logo' src={Brain}></img>
            </div>
        </Tilt>
    )
}

export default Logo;