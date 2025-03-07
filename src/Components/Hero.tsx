import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";

const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMotionValues = (x: number, y: number) => {
      if (!targetRef.current) return;
      targetRef.current.style.setProperty("--x", `${x}px`);
      targetRef.current.style.setProperty("--y", `${y}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMotionValues(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      updateMotionValues(touch.clientX, touch.clientY);
    };

    // Only add mouse events on non-touch devices
    const isTouchDevice = "ontouchstart" in window;
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className='relative mb-[4rem] md:mb-[8rem] min-h-[100dvh] py-8 md:py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_50%)_var(--y,_50%),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40'
    >
      <motion.div
        style={{ position, scale, x: "-50%" }}
        className='left-1/2 z-10 flex flex-col items-center px-4 md:px-0'
      >
        <p className='mb-2 text-base md:text-xl font-light'>
          <span className='font-medium'>Projects</span> Beta
        </p>
        <p className='mb-6 md:mb-8 text-center text-xs font-light text-text'>
          by{" "}
          <a
            href='https://www.codesandbox.com'
            target='_blank'
            rel='noopener nofollow noreferrer'
            className='hover:text-primary transition-colors'
          >
            CodeSandbox
          </a>
          ,
          <br className='md:hidden' />
          <span className='hidden md:inline'> </span>
          rebuilt by{" "}
          <a
            href='https://orelyofolio.netlify.app'
            target='_blank'
            rel='noopener nofollow noreferrer'
            className='hover:text-primary transition-colors'
          >
            Orel Chalfon
          </a>
        </p>

        <h1 className='mb-8 md:mb-12 text-center font-heading text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-[1]'>
          Development
          <br />
          reimagined.
        </h1>

        <a
          href='#'
          className='flex items-center text-base md:text-lg text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-4 py-2'
        >
          <FaGithub className='mr-2 inline h-5 w-5' />
          Import GitHub project
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
