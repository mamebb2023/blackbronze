import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LiquidMetal } from "@paper-design/shaders-react";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-2xl active:scale-95",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden bg-linear-to-t from-black to-gray-600 text-white shadow-gray-700/50 shadow-sm hover:shadow-lg",
        liquid: "relative overflow-hidden",
        destructive:
          "bg-linear-to-br from-red-600 via-red-400 to-red-600 text-white hover:bg-red-500/90",
        outline:
          "border-3 text-bold border-white hover:bg-white hover:text-black duration-300",
        ghost: "hover:bg-gray-500/20",
        link: `relative text-gray-200 transition-colors
        after:content-['']
        after:absolute 
        after:bottom-0 
        after:left-1/2 
        after:-translate-x-1/2 
        after:w-[50%] 
        after:h-[1px] 
        after:bg-white 
        after:transition-all 
        after:duration-300 
        after:scale-90 
        after:opacity-0 
        hover:text-white
        hover:after:scale-100 
        hover:after:opacity-100 
        hover:after:w-[60%]`,
      },
      size: {
        default: "px-7 py-3",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "liquid",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const isLiquid = variant === "liquid";

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLiquid && (
          <>
            {/* LiquidMetal background */}
            <div className="absolute inset-0 flex-center">
              <LiquidMetal
                shape="none"
                distortion={1}
                contour={0.6}
                softness={0.4}
                repetition={1}
                speed={0.6}
                angle={45}
                className="shrink-0 w-[calc(100%+160px)] h-[calc(100%+50px)]"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute size-[calc(100%-7px)] bg-linear-to-t from-black to-gray-600 rounded-xl transition-all"></div>
          </>
        )}
        <span
          className={cn(
            "flex h-full w-full items-center justify-center font-medium",
            isLiquid ? "relative z-20 text-white" : ""
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
