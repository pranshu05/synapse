"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MysticWoods = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let speed = 100;

        // Scene 1: two layers of mountains svg (positioned at the bottom)
        // Scene 2: two layers of tree svg (positioned at the bottom)
        // Scroll trigger: scene 1 fades out and scene 2 fades in with parallax effect, one mountain layer moves faster than the other in opposite direction and the tree layer moves slower than the mountain layer, fades in opposite direction on scroll

        // Scene 1
        let scene1 = gsap.timeline();
        ScrollTrigger.create({
            animation: scene1,
            trigger: ".scrollElement",
            start: "top top",
            end: "45% 100%",
            scrub: 3
        });

        // Odd mountains go left, even mountains go right
        scene1.to(".mountains svg:nth-child(odd)", { x: -speed, opacity: 0, duration: 2 }, 0)
              .to(".mountains svg:nth-child(even)", { x: speed, opacity: 0, duration: 2 }, 0);


        // Scene 2
        let scene2 = gsap.timeline();
        ScrollTrigger.create({
            animation: scene2,
            trigger: ".scrollElement",
            start: "top top",
            end: "45% 100%",
            scrub: 3
        });
        
        // Odd trees fade in from right, even trees fade in from left
        scene2.from(".trees svg:nth-child(odd)", { x: speed, opacity: 0, duration: 2 }, 2)
              .from(".trees svg:nth-child(even)", { x: -speed, opacity: 0, duration: 2 }, 2);

    })

    return (
        <div className="mystic-woods">
            <div className="scrollElement">
                <div className="mountains">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                        <path fill="#B7B7B7" d="M1920 1080H0V0h1920z"/>
                        <path fill="#A3A3A3" d="M1920 1080H0V0h1920z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                        <path fill="#B7B7B7" d="M1920 1080H0V0h1920z"/>
                        <path fill="#A3A3A3" d="M1920 1080H0V0h1920z"/>
                    </svg>
                </div>
                <div className="trees">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                        <path fill="#4C4C4C" d="M1920 1080H0V0h1920z"/>
                        <path fill="#4C4C4C" d="M1920 1080H0V0h1920z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                        <path fill="#4C4C4C" d="M1920 1080H0V0h1920z"/>
                        <path fill="#4C4C4C" d="M1920 1080H0V0h1920z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MysticWoods;