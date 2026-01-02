"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}
