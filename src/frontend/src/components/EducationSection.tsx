import { motion } from "motion/react";

const sections = [
  {
    id: "definition",
    label: "What Are Resources?",
    title: "Resources & Their Types",
    image: "/assets/generated/resources-types.dim_800x500.jpg",
    imageAlt: "Types of natural resources illustration",
    definition:
      "Resources are any materials, substances, or assets that exist in nature or are created by humans that can be used to satisfy needs and wants. They form the foundation of all economic activity and human survival.",
    subsections: [
      {
        name: "Natural Resources",
        color: "text-emerald-400",
        dot: "bg-emerald-400",
        desc: "Occur naturally in the environment — sunlight, wind, water, soil, minerals, forests, and wildlife.",
      },
      {
        name: "Renewable Resources",
        color: "text-sky-400",
        dot: "bg-sky-400",
        desc: "Can be replenished naturally over time: solar energy, wind energy, water, biomass, and geothermal heat.",
      },
      {
        name: "Non-Renewable Resources",
        color: "text-orange-400",
        dot: "bg-orange-400",
        desc: "Exist in finite quantities and cannot be replenished on a human timescale: coal, oil, natural gas, and minerals.",
      },
      {
        name: "Human Resources",
        color: "text-purple-400",
        dot: "bg-purple-400",
        desc: "People's skills, knowledge, and labor that contribute to economic production and innovation.",
      },
      {
        name: "Capital Resources",
        color: "text-gold-400",
        dot: "bg-gold-400",
        desc: "Human-made goods used to produce other goods and services: tools, machinery, buildings, and technology.",
      },
    ],
  },
  {
    id: "sustainable",
    label: "Sustainable Development",
    title: "Sustainable Development",
    image: "/assets/generated/sustainable-development.dim_800x500.jpg",
    imageAlt: "Sustainable development illustration",
    definition:
      "Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. It balances economic growth, social equity, and environmental protection — often called the three pillars of sustainability.",
    subsections: [
      {
        name: "Economic Pillar",
        color: "text-gold-400",
        dot: "bg-gold-400",
        desc: "Ensures long-term economic growth without harming the environment or society through responsible resource use.",
      },
      {
        name: "Social Pillar",
        color: "text-pink-400",
        dot: "bg-pink-400",
        desc: "Promotes equity, education, health, and community well-being so all people can live dignified lives.",
      },
      {
        name: "Environmental Pillar",
        color: "text-green-400",
        dot: "bg-green-400",
        desc: "Protects ecosystems, reduces pollution, limits carbon emissions, and preserves biodiversity for the future.",
      },
      {
        name: "UN SDGs",
        color: "text-blue-400",
        dot: "bg-blue-400",
        desc: "The United Nations' 17 Sustainable Development Goals provide a global blueprint for peace, prosperity, and planet protection by 2030.",
      },
    ],
  },
  {
    id: "conservation",
    label: "Conservation",
    title: "Resources Conservation",
    image: "/assets/generated/resources-conservation.dim_800x500.jpg",
    imageAlt: "Resources conservation illustration",
    definition:
      "Resources conservation is the careful management and protection of natural resources to prevent depletion, degradation, or waste. It aims to ensure that resources remain available for both present and future generations through wise, efficient use.",
    subsections: [
      {
        name: "Water Conservation",
        color: "text-cyan-400",
        dot: "bg-cyan-400",
        desc: "Reducing water waste through efficient irrigation, rainwater harvesting, and fixing leaks to protect freshwater supplies.",
      },
      {
        name: "Forest Conservation",
        color: "text-emerald-400",
        dot: "bg-emerald-400",
        desc: "Preventing deforestation, promoting reforestation, and adopting sustainable timber harvesting practices.",
      },
      {
        name: "Energy Conservation",
        color: "text-yellow-400",
        dot: "bg-yellow-400",
        desc: "Using energy-efficient appliances, reducing consumption, and shifting to renewable energy sources.",
      },
      {
        name: "Biodiversity Conservation",
        color: "text-violet-400",
        dot: "bg-violet-400",
        desc: "Protecting endangered species, establishing wildlife reserves, and preventing habitat destruction.",
      },
      {
        name: "Soil Conservation",
        color: "text-amber-400",
        dot: "bg-amber-400",
        desc: "Preventing soil erosion through crop rotation, terracing, and reducing the use of harmful pesticides.",
      },
    ],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-32 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Learn & Understand
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5">
            Understanding{" "}
            <span className="text-gradient-gold italic">Resources</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the definition of resources, the principles of sustainable
            development, and why conservation matters.
          </p>
        </motion.div>

        {/* Topic sections */}
        <div className="space-y-32">
          {sections.map((section, idx) => (
            <motion.div
              key={section.id}
              data-ocid={`education.${section.id}.section`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                className={`relative rounded-3xl overflow-hidden shadow-2xl order-1 ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="w-full h-72 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
                    {section.label}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <div
                className={`order-2 ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="mb-2">
                  <div className="h-px w-12 bg-gradient-to-r from-gold-400 to-transparent mb-4" />
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {section.definition}
                  </p>
                </div>

                <ul className="space-y-4">
                  {section.subsections.map((sub) => (
                    <li key={sub.name} className="flex items-start gap-3">
                      <span
                        className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${sub.dot}`}
                      />
                      <div>
                        <span className={`font-semibold text-sm ${sub.color}`}>
                          {sub.name}:{" "}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {sub.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
