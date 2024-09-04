'use client'

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function HorizontalMottos() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return(
        <section className="flex items-center bg-[#F9FAFB] h-[500px] w-auto rounded-md overflow-x-scroll overflow-y-hidden" >
            <motion.div ref={targetRef} style={{x}} className="flex space-x-4 pl-[50px] pr-[50px]">
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
                <div className="w-[250px] h-[400px] bg-white shadow-sm rounded-lg p-2 flex border-2 border-black"></div>
            </motion.div>
        </section>
    );
}