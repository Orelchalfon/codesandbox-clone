import Hero from "./Hero";
import Branches from "./Branches";
import { lazy } from "react";
const Collaboration= lazy(() => import("./Collaboration"));
const Features = lazy(() => import("./Features"));
const MoreFeatures = lazy(() => import("./MoreFeatures"));
const NoLock = lazy(() => import("./NoLock"));
const StreamLineExp = lazy(() => import("./StreamLineExp"));


export { Branches, Collaboration, Features, Hero, MoreFeatures, NoLock, StreamLineExp };

