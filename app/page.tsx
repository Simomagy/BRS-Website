"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  History,
  Settings,
  ListChecks,
  FileText,
  PlayCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@heroui/react";

import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);

  useEffect(() => {
    // Parallax effect for hero section
    gsap.to(heroRef.current, {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate features on scroll
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });

    // Animate workflow steps
    gsap.from(".workflow-step", {
      scrollTrigger: {
        trigger: workflowRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section with Parallax */}

      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center gap-8 py-32"
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Manage your Blender renders
            <span className="text-primary drop-shadow-[0_0_20px_rgba(235,94,40,0.7)] underline decoration-primary">
              {" "}
              intelligently
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BRS is your complete solution for managing Blender renders.
            <br />
            Simplify, automate, and optimize your rendering workflow.
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            color="primary"
            endContent={<Zap className="h-4 w-4" />}
            size="lg"
            variant="shadow"
          >
            <Link href={siteConfig.links.download}>Download now</Link>
          </Button>
          <Button
            endContent={<ArrowRight className="h-4 w-4" />}
            size="lg"
            variant="light"
          >
            <Link href={siteConfig.links.github}>Learn more</Link>
          </Button>
        </motion.div>
      </section>

      {/* Interactive Demo Preview */}

      <div className="w-full h-full flex items-center justify-center">
        <Image
          alt="BRS Demo"
          className="shadow-2xl shadow-neutral-50/20 rounded-lg"
          src="/demo.png"
        />
      </div>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="feature-card flex flex-col gap-4 p-6 rounded-lg border border-neutral-600 bg-card hover:border-primary/50 transition-colors"
          >
            <feature.icon className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Interactive Workflow Section */}
      <section
        ref={workflowRef}
        className="flex flex-col items-center justify-center text-center gap-8 py-20"
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">
            <span className="text-primary">Optimized</span> Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your renders efficiently with an intelligent queue and
            customizable presets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {workflow.map((step) => (
            <motion.div
              key={step.title}
              className="workflow-step flex flex-col items-center gap-4 p-6 rounded-lg border border-neutral-600 bg-card"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center text-center gap-8 py-20 bg-neutral-900 rounded-2xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">
            Ready to optimize your workflow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download BRS and transform the way you manage your Blender renders.
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            color="primary"
            size="lg"
            startContent={<Zap />}
            variant="shadow"
          >
            <Link href="/download">Download BRS</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Render Queue",
    description:
      "Easily manage your renders with an intelligent queue and customizable priorities.",
    icon: ListChecks,
  },
  {
    title: "Custom Presets",
    description:
      "Create and manage presets for your most common render settings.",
    icon: Settings,
  },
  {
    title: "Complete History",
    description: "Track all your renders with detailed history and statistics.",
    icon: History,
  },
  {
    title: "Log Viewer",
    description: "Monitor render progress with an integrated log viewer.",
    icon: FileText,
  },
];

const workflow = [
  {
    title: "Configure",
    description: "Set up your presets and preferred render parameters.",
    icon: Settings,
  },
  {
    title: "Add to Queue",
    description: "Add your Blender files to the render queue.",
    icon: PlayCircle,
  },
  {
    title: "Monitor",
    description: "Track render progress in real-time.",
    icon: Clock,
  },
];
