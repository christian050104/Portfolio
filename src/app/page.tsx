import { loadProjectsWithAutoImages } from "@/lib/loadProjectImages";
import PortfolioClient from "@/components/PortfolioClient";

export default function Home() {
  const projects = loadProjectsWithAutoImages();
  return <PortfolioClient projects={projects} />;
}
