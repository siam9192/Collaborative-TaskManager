import type { LucideIcon } from "lucide-react";

export interface Metadata {
  label: string;
  icon: LucideIcon;
  value: number;
}

export type Params = {
  [key: string]: string | number;
};
