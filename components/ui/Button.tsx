import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LiquidMetal } from "@paper-design/shaders-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden transition-all bg-linear-to-t from-black to-gray-600 text-white shadow-gray-500/50 shadow-sm hover:shadow-lg",
        liquid:
          "relative rounded-2xl overflow-hidden cursor-pointer transition-all",
        destructive:
          "bg-linear-to-br from-red-600 via-red-400 to-red-600 text-white hover:bg-red-500/90",
        outline: "border-3 hover:bg-black hover:text-white border-black",
        ghost: "hover:bg-gray-500/20",
        link: "text-blue-500 underline-offset-4 hover:underline",
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
