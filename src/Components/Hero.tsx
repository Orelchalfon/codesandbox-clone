import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";

const Hero = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['end end', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, .5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
    const position = useTransform(scrollYProgress, pos => pos === 1 ? "relative" : "fixed");
    useEffect(() => {
        const updateHoveredMotionValues = (e: MouseEvent) => {

            const { clientX, clientY } = e;
            if (!targetRef.current) return;
            targetRef.current.style.setProperty("--x", `${clientX}px`);
            targetRef.current.style.setProperty("--y", `${clientY}px`);

        }
        const updateTouchedMotionValues = (e: TouchEvent) => {
            const { clientX, clientY } = e.touches[0];
            if (!targetRef.current) return;
            targetRef.current.style.setProperty("--x", `${clientX}px`);
            targetRef.current.style.setProperty("--y", `${clientY}px`);
        }
        window.addEventListener("mousemove", updateHoveredMotionValues);
        window.addEventListener("touchmove", updateTouchedMotionValues);

        return () => {
            window.removeEventListener("mousemove", updateHoveredMotionValues);

            window.removeEventListener("touchmove", updateTouchedMotionValues);
        }


    }, []);

    return <motion.section
        style={{ opacity }}
        ref={targetRef}
        className="relative mb-[8rem] h-dvh py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40"
    >
        <motion.div
            style={{ position, scale, x: "-50%" }}
            className=" left-1/2 z-10 flex flex-col items-center"
        >
            <p className="mb-2 text-xl font-light">
                <span className="font-medium">Projects</span> Beta
            </p>
            <p className="mb-8 text-center text-xs font-light text-text">
                by{" "}
                <a
                    href="https://www.codesandbox.com"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                >
                    CodeSandbox
                </a>
                ,
                <br />
                rebuilt by{" "}
                <a
                    href="https://orelyofolio.netlify.app"
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                >
                    Orel Chalfon 
                </a>
            </p>

            <h1 className="mb-12 text-center font-heading text-3xl leading-[1]">
                Development
                <br />
                reimagined.
            </h1>

            <a href="#" className="flex items-center text-lg text-primary">
                <FaGithub className="mr-2 inline h-5 w-5" />
                Import GitHub project
            </a>
        </motion.div>
    </motion.section>
};

export default Hero;
