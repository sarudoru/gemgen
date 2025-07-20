import { cn } from "/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { ChevronRight } from "lucide-react";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"div"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const AnimatedGradientText = ({ children, className }: AnimatedGradientTextProps) => {
  return (
    <div className={cn("relative inline-block p-[1px] overflow-hidden rounded-full", className)}>
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <div className="relative z-10 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full">
        {children}
      </div>
    </div>
  );
};

export const AnimatedGradientTextDemo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4">
       <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">🎉 The waitlists are open!</AnimatedGradientText>
      <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
  );
};