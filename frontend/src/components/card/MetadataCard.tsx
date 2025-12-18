import type { Metadata } from "../../types";

interface Props {
  data: Metadata;
}

const MetadataCard = ({ data }: Props) => {
  const Icon = data.icon;

  return (
    <div className="flex flex-col items-center justify-center p-3 md:p-5 bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 space-y-4">
      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-full">
        <Icon size={28} />
      </div>

      {/* Label */}
      <span className="text-lg font-medium text-center opacity-80">{data.label}</span>

      {/* Value */}
      <p className="text-3xl md:text-4xl font-bold text-center text-base-content">{data.value}</p>
    </div>
  );
};

export default MetadataCard;
