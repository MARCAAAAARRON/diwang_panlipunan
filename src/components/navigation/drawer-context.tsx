"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { DrawerContextType } from "@/types/navigation";
import { CANONICAL_TOPICS } from "@/lib/navigation-data";

const defaultDrawerContext: DrawerContextType = {
  isOpen: false,
  openDrawer: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-content-drawer"));
    }
  },
  closeDrawer: () => {},
  toggleDrawer: () => {},
  activeTopicSlug: "kapaligiran",
  setActiveTopicSlug: () => {},
};

const DrawerContext = createContext<DrawerContextType>(defaultDrawerContext);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopicSlug, setActiveTopicSlug] = useState<string | null>("kapaligiran");
  const pathname = usePathname();

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  // Listen to external trigger event (e.g. from Header)
  useEffect(() => {
    const handleOpenEvent = () => openDrawer();
    window.addEventListener("open-content-drawer", handleOpenEvent);
    return () => window.removeEventListener("open-content-drawer", handleOpenEvent);
  }, [openDrawer]);

  // Handle route change: close drawer and detect active topic from URL
  useEffect(() => {
    setIsOpen(false);

    if (pathname) {
      // Check if pathname contains a topic slug
      const foundTopic = CANONICAL_TOPICS.find((topic) =>
        pathname.includes(`/${topic.slug}`)
      );
      if (foundTopic) {
        setActiveTopicSlug(foundTopic.slug);
      }
    }
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        activeTopicSlug,
        setActiveTopicSlug,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
