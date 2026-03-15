import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CircleScore, ResourceCategory } from "../backend.d";
import { useActor } from "./useActor";

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<ResourceCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTopScores(limit = 10) {
  const { actor, isFetching } = useActor();
  return useQuery<CircleScore[]>({
    queryKey: ["topScores", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopCircleScores(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitCircleScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (percentage: number) => {
      if (!actor) throw new Error("No actor");
      await actor.submitCircleScore(BigInt(percentage));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topScores"] });
    },
  });
}

export function useSeedCategories() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const categories = [
        {
          name: "Design Tools",
          description:
            "Essential tools for UI/UX designers and creative professionals",
          items: [
            {
              title: "Figma",
              description:
                "Collaborative interface design tool used by top design teams worldwide",
              url: "https://figma.com",
              tag: "Design",
            },
            {
              title: "Adobe Color",
              description:
                "Create and explore beautiful color palettes for your projects",
              url: "https://color.adobe.com",
              tag: "Colors",
            },
            {
              title: "Coolors",
              description: "Super fast color palette generator for designers",
              url: "https://coolors.co",
              tag: "Colors",
            },
            {
              title: "Unsplash",
              description:
                "Beautiful, free photos gifted by the world's most generous community of photographers",
              url: "https://unsplash.com",
              tag: "Photos",
            },
          ],
        },
        {
          name: "Developer Tools",
          description:
            "Powerful tools to supercharge your development workflow",
          items: [
            {
              title: "GitHub",
              description:
                "Where the world builds software — the largest open source platform",
              url: "https://github.com",
              tag: "Code",
            },
            {
              title: "VS Code",
              description:
                "Free, powerful source-code editor built on open source by Microsoft",
              url: "https://code.visualstudio.com",
              tag: "Editor",
            },
            {
              title: "Postman",
              description:
                "Platform for building and using APIs with powerful testing capabilities",
              url: "https://postman.com",
              tag: "API",
            },
            {
              title: "Vercel",
              description:
                "Deploy web projects with the best developer experience and highest end-user performance",
              url: "https://vercel.com",
              tag: "Deploy",
            },
          ],
        },
        {
          name: "Learning",
          description:
            "Top-tier resources for developers to master modern web technologies",
          items: [
            {
              title: "MDN Web Docs",
              description:
                "The definitive reference documentation for web developers",
              url: "https://developer.mozilla.org",
              tag: "Docs",
            },
            {
              title: "freeCodeCamp",
              description:
                "Learn to code — free courses, certifications and projects",
              url: "https://freecodecamp.org",
              tag: "Learn",
            },
            {
              title: "CSS-Tricks",
              description:
                "Daily articles about CSS, HTML, JavaScript and all things web design",
              url: "https://css-tricks.com",
              tag: "CSS",
            },
            {
              title: "JavaScript.info",
              description:
                "The modern JavaScript tutorial — from basics to advanced topics",
              url: "https://javascript.info",
              tag: "JS",
            },
          ],
        },
        {
          name: "UI Libraries",
          description:
            "Premium component libraries for building beautiful interfaces fast",
          items: [
            {
              title: "Tailwind CSS",
              description:
                "A utility-first CSS framework for rapidly building modern websites",
              url: "https://tailwindcss.com",
              tag: "CSS",
            },
            {
              title: "shadcn/ui",
              description:
                "Beautifully designed components built with Radix UI and Tailwind CSS",
              url: "https://ui.shadcn.com",
              tag: "Components",
            },
            {
              title: "Radix UI",
              description:
                "Unstyled, accessible components for building high-quality design systems",
              url: "https://radix-ui.com",
              tag: "Primitives",
            },
            {
              title: "Framer Motion",
              description:
                "Production-ready motion library for React with a simple declarative syntax",
              url: "https://framer.com/motion",
              tag: "Animation",
            },
          ],
        },
      ];

      for (let ci = 0; ci < categories.length; ci++) {
        const cat = categories[ci];
        await actor.addCategory(cat.name, cat.description);
        for (const item of cat.items) {
          await actor.addItemToCategory(
            BigInt(ci),
            item.title,
            item.description,
            item.url,
            item.tag,
          );
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
