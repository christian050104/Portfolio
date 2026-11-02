import fs from "node:fs";
import path from "node:path";
import baseProjects, {
  type ProjectItem,
  getScreenshotPlatform,
} from "@/data/projects";

const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|webp|avif)$/i;

function getSortPriority(filename: string): number {
  const lower = filename.toLowerCase();
  const platformOffset = getScreenshotPlatform(filename) === "mobile" ? 10 : 0;

  if (
    lower.includes("dashboard") ||
    lower.includes("dasboard") ||
    lower.startsWith("beranda") ||
    lower.startsWith("home") ||
    lower.startsWith("1")
  ) {
    return platformOffset + 0;
  }
  if (lower.includes("login") || lower.includes("register") || lower.includes("auth")) {
    return platformOffset + 2;
  }
  return platformOffset + 1;
}

export function loadProjectsWithAutoImages(): ProjectItem[] {
  const publicDir = path.join(process.cwd(), "public");

  return baseProjects.map((project) => {
    const folderPath = path.join(publicDir, project.imageFolder);
    if (!fs.existsSync(folderPath)) {
      return project;
    }

    let entries: string[] = [];
    try {
      entries = fs
        .readdirSync(folderPath)
        .filter((file) => IMAGE_EXT_REGEX.test(file));
    } catch {
      return project;
    }

    const diskSet = new Set(entries.map((file) => `/${project.imageFolder}/${file}`));

    // Keep curated images that exist on disk in their curated order
    const orderedExisting = project.images.filter((img) => diskSet.has(img));
    const existingSet = new Set(orderedExisting);

    // Automatically append any newly dropped screenshots sorted cleanly (Web first -> Mobile, Dashboard first -> Login last)
    const newlyAdded = entries
      .filter((file) => !existingSet.has(`/${project.imageFolder}/${file}`))
      .sort((a, b) => {
        const prioDiff = getSortPriority(a) - getSortPriority(b);
        if (prioDiff !== 0) return prioDiff;
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
      })
      .map((file) => `/${project.imageFolder}/${file}`);

    return {
      ...project,
      images: [...orderedExisting, ...newlyAdded],
    };
  });
}
