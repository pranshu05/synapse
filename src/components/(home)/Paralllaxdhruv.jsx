"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Parallax = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    })

    return(
        <>
        </>
    )
}

export default Parallax;