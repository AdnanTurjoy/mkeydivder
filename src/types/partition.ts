export interface Partition {
  id: string;
  color: string;
  direction?: "horizontal" | "vertical";
  children?: Partition[]; // For vertical or horizontal splits
}
