'use client'

export default function HorizontalMottos() {
  return(
    <></>
  )
}






// import { motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
// import { useRef } from "react";

// export default function HorizontalMottos() {
//     const targetRef = useRef<HTMLDivElement | null>(null);
//     const { scrollYProgress } = useScroll({
//        target: targetRef,
//        offset: ["start end"],
//     });

//     useMotionValueEvent(scrollYProgress, "change", (latest) => {
//       console.log("Page scroll: ", latest)
//     })
    
//     const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

//     return (
//       // <section ref={targetRef} className="relative">

//       // </section>

//         <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
//             <div className="sticky top-0 flex h-screen items-center overflow-hidden">
//               <motion.div style={{ x }} className="flex gap-4">
//                   <div className="h-[450px] w-[450px] relative bg-white">1</div>
//                   <div className="h-[450px] w-[450px] relative bg-white">2</div>
//                   <div className="h-[450px] w-[450px] relative bg-white">3</div>
//                   <div className="h-[450px] w-[450px] relative bg-white">4</div>
//                   <div className="h-[450px] w-[450px] relative bg-white">5</div>
//                   <div className="h-[450px] w-[450px] relative bg-white">6</div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };