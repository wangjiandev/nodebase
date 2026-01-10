import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  FolderCodeIcon,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  TriangleAlertIcon,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Spinner } from "./ui/spinner";

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

type EntitySearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const EntitySearch = ({
  value,
  onChange,
  placeholder,
}: EntitySearchProps) => (
  <div className="flex max-w-sm flex-row items-center justify-center">
    <InputGroup>
      <InputGroupInput
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
);

type EntityPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => (
  <div className="flex w-full items-center justify-between gap-x-2">
    <div className="flex-1 text-muted-foreground text-sm">
      Page {page} of {totalPages || 1}
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        disabled={disabled || page === 1}
        onClick={() => onPageChange(page - 1)}
        variant="outline"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </Button>
      <Button
        disabled={disabled || page === totalPages}
        onClick={() => onPageChange(page + 1)}
        variant="outline"
      >
        <ChevronRightIcon className="h-4 w-4" />
        Next
      </Button>
    </div>
  </div>
);

type StateViewProps = {
  message?: string;
};

export const LoadingView = ({ message }: StateViewProps) => (
  <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
    <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
    {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
  </div>
);

export const ErrorView = ({ message }: StateViewProps) => (
  <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
    <TriangleAlertIcon className="size-6 text-destructive" />
    {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
  </div>
);

type EmptyViewProps = {
  onNew?: () => void;
} & StateViewProps;

export const EmptyView = ({ message, onNew }: EmptyViewProps) => (
  <Empty className="border border-dashed bg-muted/30">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderCodeIcon />
      </EmptyMedia>
      <EmptyTitle>No Item Yet</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
    </EmptyHeader>
    <EmptyContent>
      <Button onClick={onNew}>Create Item</Button>
    </EmptyContent>
  </Empty>
);

type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
};

export const EntityList = <T,>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) => {
  if (items.length === 0 && emptyView) {
    return emptyView;
  }
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

type EntityItemProps = {
  href: string;
  title: string;
  subtitle?: string;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export const EntityItem = ({
  href,
  title,
  subtitle,
  onRemove,
  isRemoving,
  image,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onRemove) {
      await onRemove();
    }

    toast.success(`${title} removed`);
  };
  return (
    <Item asChild variant="outline">
      <Link href={href} prefetch>
        <ItemMedia variant="icon">
          {isRemoving ? (
            <Spinner className="size-5" />
          ) : image ? (
            image
          ) : (
            <Workflow className="size-5" />
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{subtitle}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem onClick={handleRemove}>
                <TrashIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Link>
    </Item>
  );
};
