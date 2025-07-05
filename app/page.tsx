"use client";

import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  History,
  Settings,
  ListChecks,
  FileText,
  PlayCircle,
  Clock,
  Smartphone,
  Monitor,
  Palette,
  Workflow,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Terminal,
  Glasses,
  Store,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@heroui/react";

import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

// Gallery images configuration
const galleryImages = [
  {
    id: "desktop-1",
    src: "/Demo3.png",
    alt: "BRS Desktop Application - Main Interface",
    title: "Desktop Application",
    description: "Complete render management suite with advanced controls",
  },
  {
    id: "desktop-2",
    src: "/Demo1.png",
    alt: "BRS Desktop Application - Mobile Companion",
    title: "Mobile Companion",
    description: "Control your renders remotely from your smartphone",
  },
  {
    id: "desktop-3",
    src: "/Demo2.png",
    alt: "BRS Desktop Application - Advanced System Usage",
    title: "Advanced System Usage",
    description: "Monitor your system usage and performance in real-time",
  },
  {
    id: "mobile-1",
    src: "/DemoMobile1.jpg",
    alt: "BRS Mobile Companion App - Main Screen",
    title: "Mobile Companion",
    description: "Control your renders remotely from your smartphone",
  },
  {
    id: "mobile-2",
    src: "/DemoMobile2.jpg",
    alt: "BRS Mobile Companion App - Controls",
    title: "Mobile Controls",
    description: "Advanced control panel for mobile render management",
  },
  {
    id: "mobile-3",
    src: "/DemoMobile3.jpg",
    alt: "BRS Mobile Companion App - Control Panel",
    title: "Mobile Control Panel",
    description:
      "Create, start and manage renders directly from your smartphone",
  },
];

// ImageGallery Component
const ImageGallery = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      } else if (e.key === "ArrowRight") {
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(
                  currentIndex > 0 ? currentIndex - 1 : images.length - 1
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(
                  currentIndex < images.length - 1 ? currentIndex + 1 : 0
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-7xl max-h-[90vh] w-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative flex-1 flex items-center justify-center min-h-0">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Info */}
          <div className="mt-4 p-4 bg-neutral-900 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-2">
              {currentImage.title}
            </h3>
            <p className="text-neutral-300">{currentImage.description}</p>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-neutral-400">
                  {currentIndex + 1} of {images.length}
                </span>
                <div className="flex gap-2">
                  {images.map((_, index: number) => (
                    <button
                      key={index}
                      onClick={() => onNavigate(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-primary" : "bg-neutral-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const bentoRef = useRef(null);
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  const openGallery = (imageId: string) => {
    const index = galleryImages.findIndex((img) => img.id === imageId);
    setGalleryState({
      isOpen: true,
      currentIndex: index >= 0 ? index : 0,
    });
  };

  const closeGallery = () => {
    setGalleryState({ isOpen: false, currentIndex: 0 });
  };

  const navigateGallery = (index: number) => {
    setGalleryState((prev) => ({ ...prev, currentIndex: index }));
  };

  useEffect(() => {
    // Animate bento grid cards on scroll
    gsap.fromTo(
      ".bento-card",
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center gap-8 py-20"
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Manage your Blender renders
            <span className="text-primary drop-shadow-[0_0_20px_rgba(235,94,40,0.7)] underline decoration-primary">
              {" "}
              intelligently
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            BRS is your complete solution for managing Blender renders.
            <br />
            Simplify, automate, and optimize your rendering workflow.
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            <Link href={siteConfig.links.download}>Learn more</Link>
          </Button>
        </motion.div>
      </section>

      {/* Bento Grid Section */}
      <section
        id="features"
        ref={bentoRef}
        className="w-full max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {/* Main Desktop App Showcase - Large */}
          <div className="bento-card md:col-span-6 lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 min-h-[400px]">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Desktop Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete render management suite • 3 screenshots
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center relative group">
                <div
                  className="relative cursor-pointer"
                  onClick={() => openGallery("desktop-1")}
                >
                  <Image
                    alt="BRS Desktop App"
                    className="shadow-2xl shadow-neutral-50/20 rounded-lg w-full max-w-2xl transition-transform duration-300 group-hover:scale-105"
                    src="/Demo3.png"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 rounded-full p-3">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid - Right Side - Compatte */}
          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ListChecks className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Render Queue</h3>
                  <p className="text-xs text-muted-foreground">
                    Intelligent queue management
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Easily manage your renders with an intelligent queue and
                customizable priorities.
              </p>
            </div>
          </div>

          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Custom Presets</h3>
                  <p className="text-xs text-muted-foreground">
                    Save your configurations
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Create and manage presets for your most common render settings.
              </p>
            </div>
          </div>

          {/* Mobile App Showcase - Single Image */}
          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Mobile Companion</h3>
                  <p className="text-xs text-muted-foreground">
                    Control renders on the go • 3 screenshots
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center relative group">
                <div
                  className="relative cursor-pointer"
                  onClick={() => openGallery("mobile-1")}
                >
                  <Image
                    alt="BRS Mobile App"
                    className="shadow-lg shadow-neutral-50/20 rounded-lg max-w-[120px] transition-transform duration-300 group-hover:scale-105"
                    src="/DemoMobile1.jpg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 rounded-full p-2">
                      <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features - Compatte */}
          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Complete History</h3>
                  <p className="text-xs text-muted-foreground">
                    Track all your renders
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor all your renders with detailed history and statistics.
              </p>
            </div>
          </div>

          {/* Smart Logging System */}
          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Smart Logging</h3>
                  <p className="text-xs text-muted-foreground">
                    Intuitive log visualization
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced logging system with intuitive visualization and easy
                debugging.
              </p>
            </div>
          </div>

          {/* VR Meta Quest Support */}
          <div className="bento-card md:col-span-3 lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Glasses className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold">VR Compatible</h3>
                  <p className="text-xs text-muted-foreground">
                    Meta Quest 2+ support
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Full compatibility with Meta Quest 2 and newer VR headsets.
              </p>
            </div>
          </div>

          {/* Workflow Section - Full Width */}
          <div className="bento-card md:col-span-6 lg:col-span-12 bg-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold">
                  <span className="text-primary">Optimized</span> Workflow
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                  Manage your renders efficiently with an intelligent queue and
                  customizable presets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workflow.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex flex-col items-center gap-4 p-4 rounded-lg border border-neutral-700 bg-neutral-900/50"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced App Screenshot */}
          <div className="bento-card md:col-span-6 lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 min-h-[350px]">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Advanced Interface</h3>
                  <p className="text-sm text-muted-foreground">
                    Powerful tools at your fingertips • View gallery
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center relative group">
                <div
                  className="relative cursor-pointer"
                  onClick={() => openGallery("desktop-3")}
                >
                  <Image
                    alt="BRS Advanced Interface"
                    className="shadow-2xl shadow-neutral-50/20 rounded-lg w-full max-w-2xl transition-transform duration-300 group-hover:scale-105"
                    src="/Demo2.png"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 rounded-full p-3">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon to Stores */}
          <div className="bento-card md:col-span-6 lg:col-span-4 bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-800/50 rounded-2xl p-6 hover:border-blue-700/50 transition-all duration-300 min-h-[200px]">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Store className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple platforms & stores
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-4">
                  BRS is expanding to multiple platforms:
                </p>
                <ul className="text-sm text-blue-300 space-y-2">
                  <li>• Google Play Store</li>
                  <li>• Meta Quest Store</li>
                  <li>• Blender Add-on Marketplace</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bento-card md:col-span-6 lg:col-span-8 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 min-h-[200px]">
            <div className="flex flex-col gap-4 h-full justify-center items-center text-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Ready to optimize your workflow?
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                  Transform your Blender rendering experience today.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  color="primary"
                  size="lg"
                  startContent={<Zap className="h-4 w-4" />}
                  variant="shadow"
                >
                  <Link href={siteConfig.links.download}>Download BRS</Link>
                </Button>
                <Button
                  size="lg"
                  startContent={<Activity className="h-4 w-4" />}
                  variant="bordered"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <Link href="#gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <div id="gallery">
        <ImageGallery
          images={galleryImages}
          currentIndex={galleryState.currentIndex}
          isOpen={galleryState.isOpen}
          onClose={closeGallery}
          onNavigate={navigateGallery}
        />
      </div>
    </div>
  );
}

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
