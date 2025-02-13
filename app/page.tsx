import Image from "next/image";
import Link from 'next/link';
import MottosWocheDisplay from "./ui/homepage/mottoWocheDisplay";
import { motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import AbiMottoDisplay from "./ui/homepage/abiMottoDisplay";
import LehrerSelection from "./ui/homepage/lehrerSelection";

const pfeilSVG = (
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"width="32.000000pt" height="32.000000pt" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
    fill="#ffffff" stroke="none">
      <path d="M7556 10480 c-384 -61 -686 -316 -799 -676 -88 -278 -46 -583 115
      -832 40 -62 200 -228 806 -834 l756 -758 -3289 -3 -3290 -2 -83 -23 c-412
      -110 -696 -437 -742 -850 -50 -453 224 -878 662 -1028 166 -57 -15 -54 3503
      -54 l3240 0 -756 -757 c-470 -471 -772 -781 -796 -818 -266 -399 -218 -911
      117 -1245 186 -187 417 -282 685 -283 169 -1 295 28 445 103 168 85 66 -15
      2024 1955 l1441 1450 52 95 c196 364 159 787 -98 1104 -32 39 -772 785 -1646
      1657 -1369 1367 -1600 1594 -1674 1643 -157 102 -315 153 -504 160 -60 3 -137
      1 -169 -4z"/>
    </g>
  </svg>
)



export default function Home() {
  return (
    
    <div className="overflow-y-auto scrollbar-none max-h-[100dvh]">
      <div className="relative flex items-center mt-10 flex-col lg:flex-row">
        <div className="flex justify-center scale-[80%] sm:scale-100 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <span className="text-8xl text-abi-black">ABI 25</span>
          <span className="absolute text-4xl rotate-12 text-abi-black ml-96">THG</span>
        </div>
        <Link href={"/dashboard"} className="btn btn-primary w-64 h-20 text-3xl text-white lg:ml-auto lg:mr-10 mt-10 lg:mt-0">{"Login"}{pfeilSVG}</Link>
      </div>
      {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
              Scroll down
          </span>
      </div> */}
      {/* <h1 className="text-5xl font-semibold text-abi-black font-serif mb-4 text-center mt-20">Abimotto</h1> */}
      <div className="flex mt-20 justify-center flex-wrap gap-20">
        {/* <div className="flex justify-center">
            <LehrerSelection/>
        </div> */}
        <div className="flex justify-center">
            <AbiMottoDisplay/>
        </div>
      </div>
      
      <h1 className="text-5xl font-semibold text-abi-black font-serif mb-4 text-center mt-20">Mottowoche</h1>
      <div className="flex justify-center">
        <MottosWocheDisplay/>
      </div>
      
      {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
              Scroll up
          </span>
      </div> */}
    </div>
  );
}