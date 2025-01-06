import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative border-4 border-blue-400 bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-200 text-black rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center space-y-4 p-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-t-3xl shadow-md",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-3xl font-extrabold text-center tracking-tight text-blue-700 drop-shadow-lg",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-lg text-center text-gray-800 font-medium tracking-wide",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 p-4 bg-white rounded-2xl shadow-inner space-y-3",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-4 flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-b-3xl shadow-md space-y-3",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
