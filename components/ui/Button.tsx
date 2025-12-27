import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LiquidMetal } from "@paper-design/shaders-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden rounded-xl transition-all bg-linear-to-t from-black to-gray-600 text-white shadow-gray-700/50 shadow-sm hover:shadow-lg active:scale-95",
        liquid:
          "relative rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-95",
        destructive:
          "rounded-xl bg-linear-to-br from-red-600 via-red-400 to-red-600 text-white hover:bg-red-500/90 active:scale-95",
        outline:
          "rounded-xl border-3 hover:bg-black hover:text-white border-black active:scale-95",
        ghost: "rounded-xl hover:bg-gray-500/20",
        link: "relative text-gray-200 hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60%] after:h-[1px] after:bg-white after:transition-all after:duration-300 after:scale-90 after:opacity-0 hover:after:scale-100 hover:after:opacity-100",
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
                style={{
                  width: 300,
                  height: 90,
                }}
                className="shrink-0"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute size-[calc(100%-5px)] bg-linear-to-t from-black to-gray-500 rounded-xl transition-all"></div>
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
