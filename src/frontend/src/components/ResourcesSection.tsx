import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import type { ResourceCategory } from "../backend.d";
import { useGetCategories, useSeedCategories } from "../hooks/useQueries";

const tagColorMap: Record<string, string> = {
  Design: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Colors: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Photos: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Code: "bg-green-500/20 text-green-300 border-green-500/30",
  Editor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  API: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Deploy: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Docs: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Learn: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  CSS: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  JS: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Components: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Primitives: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Animation: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
};

function getTagColor(tag: string) {
  return tagColorMap[tag] || "bg-gold-400/20 text-gold-300 border-gold-400/30";
}

function ResourceCard({
  item,
  index,
  globalIndex,
}: {
  item: { title: string; description: string; url: string; tag: string };
  index: number;
  globalIndex: number;
}) {
  const ocid = `resource.item.${globalIndex}`;
  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 group cursor-default flex flex-col gap-4 hover:border-gold-500/20 hover:shadow-gold-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-gold-300 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${getTagColor(item.tag)}`}
        >
          <Tag className="w-3 h-3" />
          {item.tag}
        </span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors group/link"
          onClick={(e) => e.stopPropagation()}
        >
          Visit
          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

function CategorySection({
  category,
  startIndex,
}: { category: ResourceCategory; startIndex: number }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          {category.name}
        </h3>
        <p className="text-muted-foreground">{category.description}</p>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {category.items.map((item, i) => (
          <ResourceCard
            key={item.title}
            item={item}
            index={i}
            globalIndex={startIndex + i + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default function ResourcesSection() {
  const { data: categories, isLoading, isError } = useGetCategories();
  const seedMutation = useSeedCategories();
  const {
    mutate: seed,
    isPending: isSeeding,
    isSuccess: seeded,
  } = seedMutation;

  useEffect(() => {
    if (categories && categories.length === 0 && !isSeeding && !seeded) {
      seed();
    }
  }, [categories, isSeeding, seeded, seed]);

  let globalIndex = 0;

  return (
    <section id="resources" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Curated Collection
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5">
            Premium <span className="text-gradient-gold italic">Resources</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every tool, library, and resource handpicked for quality and
            reliability.
          </p>
        </motion.div>

        {(isLoading || isSeeding) && (
          <div data-ocid="resources.loading_state" className="space-y-16">
            {[0, 1].map((ci) => (
              <div key={ci}>
                <div className="mb-8">
                  <Skeleton className="h-8 w-48 mb-2 bg-white/5" />
                  <Skeleton className="h-4 w-96 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-48 rounded-2xl bg-white/5" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-destructive">
            <p>Failed to load resources. Please try refreshing.</p>
          </div>
        )}

        {!isLoading &&
          !isSeeding &&
          categories &&
          categories.length === 0 &&
          seeded && (
            <div
              data-ocid="resources.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <p>No resources found. Check back soon!</p>
            </div>
          )}

        {!isLoading && !isSeeding && categories && categories.length > 0 && (
          <div>
            {categories.map((cat) => {
              const start = globalIndex;
              globalIndex += cat.items.length;
              return (
                <CategorySection
                  key={cat.name}
                  category={cat}
                  startIndex={start}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
