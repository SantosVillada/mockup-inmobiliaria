import {
  Archive,
  ArrowDownUp,
  ArrowRight,
  Bath,
  Bed,
  Building2,
  Calendar,
  Camera,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  Cpu,
  DoorOpen,
  Dumbbell,
  Eye,
  Flame,
  Globe,
  Handshake,
  Heart,
  Home,
  Key,
  Landmark,
  Lock,
  Mail,
  Map,
  MapPin,
  Maximize,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Shirt,
  Siren,
  Snowflake,
  Sofa,
  Sparkles,
  Star,
  Store,
  Sun,
  Thermometer,
  TreeDeciduous,
  TreePine,
  TrendingUp,
  Users,
  User,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  "building-2": Building2,
  "tree-deciduous": TreeDeciduous,
  "tree-pine": TreePine,
  flame: Flame,
  waves: Waves,
  car: Car,
  package: Package,
  archive: Archive,
  "arrow-up-down": ArrowDownUp,
  "shield-check": ShieldCheck,
  users: Users,
  dumbbell: Dumbbell,
  snowflake: Snowflake,
  thermometer: Thermometer,
  "door-open": DoorOpen,
  sofa: Sofa,
  utensils: Utensils,
  "washing-machine": WashingMachine,
  shirt: Shirt,
  siren: Siren,
  camera: Camera,
  lock: Lock,
  wifi: Wifi,
  cpu: Cpu,
  key: Key,
  store: Store,
  sun: Sun,
  handshake: Handshake,
  heart: Heart,
  map: Map,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
  "map-pin": MapPin,
  bed: Bed,
  bath: Bath,
  maximize: Maximize,
  phone: Phone,
  mail: Mail,
  star: Star,
  calendar: Calendar,
  clock: Clock,
  check: Check,
  "circle-check": CircleCheck,
  x: X,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  menu: Menu,
  search: Search,
  eye: Eye,
  message: MessageCircle,
  linkedin: Globe,
  globe: Globe,
  landmark: Landmark,
  user: User,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}

export default function Icon({ name, className, size = 20, strokeWidth = 1.8, ...rest }: IconProps) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} {...rest} />;
}

export function WhatsAppIcon({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.12.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28-.25-.12-1.47-.72-1.69-.81-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.53.07-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01Z" />
    </svg>
  );
}
