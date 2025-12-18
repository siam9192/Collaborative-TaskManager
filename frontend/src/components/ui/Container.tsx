import { type ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Container({ children }: Props) {
  return <div className="max-w-7xl mx-auto  p-2 lg:p-0">{children}</div>;
}

export default Container;
