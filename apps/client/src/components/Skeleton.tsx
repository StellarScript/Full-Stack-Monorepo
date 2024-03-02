import { cn } from "@utils";

type SkeletonProps = React.PropsWithChildren & {
   className?: string;
   childClass?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ className, childClass, children }) => (
   <div className={cn("flex size-full bg-lightgray rounded-sm animate-pulse duration-100", className)}>
      <span className={cn("flex h-full min-h-2.5", childClass)}></span>
      {children}
   </div>
);
