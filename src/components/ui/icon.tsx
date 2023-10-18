import * as LucideIcons from "lucide-react";

type LucideIconNames = keyof typeof LucideIcons;

const Icon = ({ name }: { name: LucideIconNames }) => {
  if (name in LucideIcons) {
    const IconComponent = LucideIcons[name] as LucideIcons.LucideIcon;
    return <IconComponent />;
  }
};

export default Icon;
