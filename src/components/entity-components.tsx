import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonLabel,
  newButtonHref,
  disabled,
  isCreating,
}: EntityHeaderProps) => (
  <div className="flex flex-row items-center justify-between gap-x-4">
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-xs md:text-sm">
          {description}
        </p>
      )}
    </div>
    {onNew && !newButtonHref && (
      <Button
        disabled={disabled || isCreating}
        onClick={onNew}
        variant="secondary"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        {newButtonLabel}
      </Button>
    )}
    {newButtonHref && !onNew && (
      <Button asChild size="lg">
        <Link href={newButtonHref} prefetch>
          <PlusIcon className="mr-2 h-4 w-4" />
          {newButtonLabel}
        </Link>
      </Button>
    )}
  </div>
);

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => (
  <div className="h-full w-full p-4 md:px-10 md:py-6">
    <div className="mx-auto flex h-full flex-col gap-y-8">
      {header}
      <div className="flex h-full flex-col gap-y-4">
        {search}
        {children}
      </div>
      {pagination}
    </div>
  </div>
);
