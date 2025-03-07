import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCodeBranch } from "react-icons/fa";
import { stylesWithCssVar } from "../Utils/motion";

const animationOrder = {
  initial: 0,
  fadeInEnd: 0.15,
  showParagraphOne: 0.25,
  hideParagraphOne: 0.3,
  showParagraphTwoStart: 0.35,
  showParagraphTwoEnd: 0.4,
  hideParagraphTwo: 0.5,
  showLoadingScreenStart: 0.53,
  showLoadingScreenEnd: 0.58,
  createBranchStart: 0.65,
  createBranchEnd: 0.7,
  createBranchFadeInStart: 0.78,
  createBranchFadeInEnd: 0.85,
  endTextFadeInStart: 0.95,
  endTextFadeInEnd: 1,
};

const Branches = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.createBranchEnd,
      animationOrder.endTextFadeInStart,
    ],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.showLoadingScreenEnd,
      animationOrder.createBranchStart,
    ],
    isMobile ? [2, 1, 1, 0.7] : [3, 1, 1, 0.5]
  );

  const x = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
      animationOrder.showLoadingScreenStart,
      animationOrder.showLoadingScreenEnd,
      animationOrder.createBranchEnd,
    ],
    isMobile
      ? ["50%", "50%", "52%", "-30%", "-30%", "-32%", "0%", "0%", "-15%"]
      : ["50%", "50%", "55%", "-50%", "-50%", "-55%", "0%", "0%", "-27%"]
  );

  const loadingScreenOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.showLoadingScreenStart,
      animationOrder.showLoadingScreenEnd,
    ],
    [0, 1]
  );

  const loadingScreenX = useTransform(
    scrollYProgress,
    [animationOrder.createBranchStart, animationOrder.createBranchEnd],
    isMobile ? ["0%", "15%"] : ["0%", "27%"]
  );

  const loadingScreenscale = useTransform(
    scrollYProgress,
    [animationOrder.createBranchStart, animationOrder.createBranchEnd],
    isMobile ? [1, 0.7] : [1, 0.5]
  );

  const paragraph1Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    [0, 1, 0]
  );

  const paragraph1TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const paragraph2Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    [0, 1, 0]
  );

  const paragraph2TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const newBranchOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.createBranchFadeInStart,
      animationOrder.createBranchFadeInEnd,
    ],
    [0, 1]
  );

  const endTextOpacity = useTransform(
    scrollYProgress,
    [animationOrder.endTextFadeInStart, animationOrder.endTextFadeInEnd],
    [0, 1]
  );

  const endTexty = useTransform(
    scrollYProgress,
    [animationOrder.endTextFadeInStart, animationOrder.endTextFadeInEnd],
    ["4rem", "0rem"]
  );

  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  const avatarOpacity = useTransform(scrollYProgress, (pos) =>
    pos >= animationOrder.fadeInEnd ? 1 : 0
  );

  return (
    <section ref={targetRef}>
      <div className='relative h-[600vh] md:h-[800vh]'>
        <div className='sticky top-1/2 flex origin-center -translate-y-1/2 justify-center'>
          <motion.div
            className='translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[80vw] md:w-[50vw] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center'
            style={stylesWithCssVar({
              opacity,
              "--x": x,
              "--scale": scale,
            })}
          >
            <img
              src='/main-screen.svg'
              className='h-auto w-full'
              alt='Main screen'
            />
            <motion.img
              style={{ opacity: avatarOpacity }}
              className='absolute left-[13%] top-1/2 h-[2.5vw] w-[2.5vw] md:h-[1.5vw] md:w-[1.5vw] translate-y-1/2 rounded-full border border-[#c82] object-cover will-change-transform'
              src='https://unsplash.com/photos/sibVwORYqs0/download?force=true&w=128&h=128'
              alt='User avatar'
            />
            <motion.span
              className='mt-3 block text-lg md:text-2xl text-white'
              style={{ opacity: newBranchOpacity }}
            >
              <FaCodeBranch className='mr-2 md:mr-3 inline-block h-8 w-8 md:h-12 md:w-12' />{" "}
              Feature branch
            </motion.span>
          </motion.div>
          <motion.div
            className='translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[80vw] md:w-[50vw] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center'
            style={stylesWithCssVar({
              opacity: loadingScreenOpacity,
              "--x": loadingScreenX,
              "--scale": loadingScreenscale,
            })}
          >
            <img
              src='/loading-screen.svg'
              className='h-auto w-full'
              alt='Loading screen'
            />
            <motion.div
              style={{ opacity: newBranchOpacity }}
              className='absolute inset-0'
            >
              <img
                src='/main-screen.svg'
                className='h-auto w-full'
                alt='Branch screen'
              />
            </motion.div>
            <motion.span
              className='mt-3 block text-lg md:text-2xl text-white'
              style={{ opacity: newBranchOpacity }}
            >
              <FaCodeBranch className='mr-2 md:mr-3 inline-block h-8 w-8 md:h-12 md:w-12' />{" "}
              Orel Chalfon's branch
            </motion.span>
          </motion.div>

          <motion.p
            className='translate-y-centered-offset absolute top-1/2 left-4 md:left-[calc(50%-60rem)] w-[280px] md:w-[50rem] px-4 md:pl-16 text-xl md:text-2xl leading-tight text-white'
            style={stylesWithCssVar({
              opacity: endTextOpacity,
              "--y": endTexty,
            })}
          >
            <span className='text-primary'>Built for flow</span>
            <br />
            Spin up a new branch for any sized project in seconds.
          </motion.p>
        </div>
        <motion.p
          style={stylesWithCssVar({
            opacity: paragraph1Opacity,
            "--y": paragraph1TranslateY,
            position,
          })}
          className='translate-y-centered-offset top-1/2 left-4 md:left-[20px] w-[250px] md:w-[300px] px-4 md:pl-16 text-xl md:text-2xl leading-tight text-white'
        >
          Not only share code,
          <br />
          <span className='text-primary'>share the context.</span>
        </motion.p>
        <motion.p
          style={stylesWithCssVar({
            opacity: paragraph2Opacity,
            "--y": paragraph2TranslateY,
            position,
          })}
          className='translate-y-centered-offset top-1/2 right-4 md:right-[20px] w-[250px] md:w-[300px] px-4 md:pr-16 text-lg md:text-xl leading-tight text-white'
        >
          Sometimes it's not about code.
          <br />
          <span className='text-primary'>
            Get everybody on the same page. Literally.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default Branches;
