import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Collaboration = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const overlapRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: scrollYProgressOverLap } = useScroll({
    target: overlapRef,
    offset: ["start end", "end end"],
  });

  // Responsive scaling factors based on viewport width
  const getScaleValues = () => {
    if (typeof window === "undefined") return [1, 2.5, 4.2, 1];
    const width = window.innerWidth;
    if (width < 640) return [1, 1.8, 2.5, 1]; // Mobile
    if (width < 1024) return [1, 2.2, 3.5, 1]; // Tablet
    return [1, 2.5, 4.2, 1]; // Desktop
  };

  const scale = useTransform(
    scrollYProgressOverLap,
    [0.1, 0.4, 0.75, 1],
    getScaleValues()
  );

  // Responsive x transform values
  const getXValues = () => {
    if (typeof window === "undefined")
      return ["0vw", "-55vw", "-135vw", "-18vw"];
    const width = window.innerWidth;
    if (width < 640) return ["0vw", "-40vw", "-80vw", "-10vw"]; // Mobile
    if (width < 1024) return ["0vw", "-45vw", "-100vw", "-15vw"]; // Tablet
    return ["0vw", "-55vw", "-135vw", "-18vw"]; // Desktop
  };

  const x = useTransform(
    scrollYProgressOverLap,
    [0.1, 0.25, 0.75, 1],
    getXValues()
  );

  const y = useTransform(scrollYProgressOverLap, [0.75, 1], ["0vh", "40vh"]);

  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const avatarGroupOpacity = useTransform(
    scrollYProgress,
    [0.23, 0.25],
    [0, 1]
  );

  const avatarGroupX = useTransform(
    scrollYProgress,
    [0, 0.23, 0.25, 0.4, 0.45, 0.6, 0.65],
    ["30px", "30px", "20px", "20px", "10px", "10px", "0px"]
  );

  const avatarOneScale = useTransform(
    scrollYProgress,
    [0, 0.23, 0.25, 0.85, 0.9],
    [0, 0, 1, 1, 0]
  );

  const avatarTwoScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45],
    [0, 0, 1]
  );

  const avatarTwoOpacity = useTransform(
    scrollYProgressOverLap,
    [0.9999, 1],
    [1, 0]
  );

  const avatarThreeScale = useTransform(
    scrollYProgress,
    [0, 0.6, 0.65, 0.85, 0.9],
    [0, 0, 1, 1, 0]
  );

  return (
    <section
      ref={targetRef}
      className='relative z-10 mt-[-20vh] sm:mt-[-25vh] md:mt-[-30vh] h-[250vh] sm:h-[275vh] md:h-[300vh]'
    >
      <div
        ref={overlapRef}
        className='mb-[-100vh] sm:mb-[-110vh] md:mb-[-120vh] h-[350vh] sm:h-[385vh] md:h-[420vh] w-full'
      >
        <div className='sticky top-[5vh] sm:top-[7.5vh] md:top-[10vh]'>
          <div className='flex justify-center'>
            <motion.div
              style={{ scale, x, y }}
              className='origin-top transform-gpu'
            >
              <motion.img
                style={{ opacity }}
                src='/main-screen.svg'
                className='h-auto max-h-none w-[85vw] sm:w-[75vw] md:w-[70vw]'
                alt='Main screen visualization'
              />
              <motion.div
                style={{ opacity: avatarGroupOpacity, x: avatarGroupX }}
                className='absolute right-[10%] top-[1.5%] flex gap-1 sm:gap-1.5 md:gap-2'
              >
                <motion.img
                  style={{ scale: avatarOneScale }}
                  className='h-[2vw] w-[2vw] sm:h-[1.75vw] sm:w-[1.75vw] md:h-[1.5vw] md:w-[1.5vw] rounded-full border border-[#4ca] object-cover'
                  src='/images/avatarPic-1.jpg'
                  alt='Collaborator 1'
                />
                <motion.img
                  style={{ scale: avatarTwoScale, opacity: avatarTwoOpacity }}
                  className='h-[2vw] w-[2vw] sm:h-[1.75vw] sm:w-[1.75vw] md:h-[1.5vw] md:w-[1.5vw] rounded-full border border-[#c82] object-cover'
                  src='/images/avatarPic-2.jpg'
                  alt='Collaborator 2'
                />
                <motion.img
                  style={{ scale: avatarThreeScale }}
                  className='h-[2vw] w-[2vw] sm:h-[1.75vw] sm:w-[1.75vw] md:h-[1.5vw] md:w-[1.5vw] rounded-full border border-[#f0f] object-cover'
                  src='/images/avatarPic-3.jpg'
                  alt='Collaborator 3'
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
