"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border-2 border-gray-300 bg-white p-4 text-sm text-gray-800 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-300 resize-none hover:shadow-md",
        "hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
