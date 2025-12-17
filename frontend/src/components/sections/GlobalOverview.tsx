import type { Metadata } from "../../types";
import {  UserCheck, AlertCircle, ClipboardList } from "lucide-react";
import MetadataCard from "../card/MetadataCard";
const metadata: Metadata[] = [
  {
    label: "Created Tasks",
    value: 10,
    icon: ClipboardList,
  },
  {
    label: "Assigned Tasks",
    value: 20,
    icon: UserCheck,
  },
  {
    label: "Overdue Tasks",
    value: 10,
    icon: AlertCircle,
  },
];


function GlobalOverview() {
  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-10">
       {
        metadata.map((data,index)=><MetadataCard data={data} key={index}/>)
      }
     </div>
  )
}

export default GlobalOverview