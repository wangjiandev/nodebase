import { CircleCheckIcon, CircleXIcon, LoaderCircleIcon } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { NodeStatus } from "./node-status-indicator";

export type BaseNodeProps = HTMLAttributes<HTMLDivElement> & {
  status?: NodeStatus;
};

export const BaseNode = forwardRef<HTMLDivElement, BaseNodeProps>(
  ({ className, status, ...props }, ref) => (
    <div
      className={cn(
        "relative rounded-sm border bg-card text-card-foreground hover:bg-accent",
        "hover:ring-1",
        className
      )}
      ref={ref}
      tabIndex={0}
      {...props}
    >
      {props.children}
      {status === "error" && (
        <CircleXIcon className="absolute right-0.5 bottom-0.5 size-2 stroke-3 text-red-500" />
      )}
      {status === "success" && (
        <CircleCheckIcon className="absolute right-0.5 bottom-0.5 size-2 stroke-3 text-emerald-600" />
      )}
      {status === "loading" && (
        <LoaderCircleIcon className="-right-0.5 -bottom-0.5 absolute size-2 animate-spin stroke-3 text-blue-700" />
      )}
    </div>
  )
);
BaseNode.displayName = "BaseNode";

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const BaseNodeHeader = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    {...props}
    className={cn(
      "-mb-1 mx-0 my-0 flex flex-row items-center justify-between gap-2 px-3 py-2",
      // Remove or modify these classes if you modify the padding in the
      // `<BaseNode />` component.
      className
    )}
  />
));
BaseNodeHeader.displayName = "BaseNodeHeader";

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const BaseNodeHeaderTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={cn("user-select-none flex-1 font-semibold", className)}
    data-slot="base-node-title"
    ref={ref}
    {...props}
  />
));
BaseNodeHeaderTitle.displayName = "BaseNodeHeaderTitle";

export const BaseNodeContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col gap-y-2 p-3", className)}
    data-slot="base-node-content"
    ref={ref}
    {...props}
  />
));
BaseNodeContent.displayName = "BaseNodeContent";

export const BaseNodeFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "flex flex-col items-center gap-y-2 border-t px-3 pt-2 pb-3",
      className
    )}
    data-slot="base-node-footer"
    ref={ref}
    {...props}
  />
));
BaseNodeFooter.displayName = "BaseNodeFooter";
