"use client";
import dynamic from "next/dynamic";
import React from "react";

const PDFDemo = dynamic(() => import("@/components/PDFDemo"), { ssr: false });

const PDFDemoSection = () => (
  <section className="my-16">
    <PDFDemo />
  </section>
);

export default PDFDemoSection;
