// Maps each tech-stack item string to a brand icon + brand color.
// Icons render monochrome (the tag's text color) at rest and reveal their
// brand color on hover (via the --brand CSS var set in Skills.tsx).
// Items without a real brand mark (REST API, gRPC) use a neutral generic
// icon and no brand color. Unmapped items render text-only (graceful).
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDotnet,
  SiSpringboot,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { TbApi, TbArrowsExchange } from "react-icons/tb";

type TechIcon = { Icon: IconType; color?: string };

export const TECH_ICONS: Record<string, TechIcon> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  ReactJS: { Icon: SiReact, color: "#61DAFB" },
  NextJS: { Icon: SiNextdotjs, color: "#000000" },
  TailwindCSS: { Icon: SiTailwindcss, color: "#06B6D4" },
  "C# (.NET)": { Icon: SiDotnet, color: "#512BD4" },
  "Java Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "REST API": { Icon: TbApi },
  "Protobuf gRPC": { Icon: TbArrowsExchange },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Git: { Icon: SiGit, color: "#F05032" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
};
