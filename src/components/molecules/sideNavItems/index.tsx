import { Tooltip } from "@/components/atoms/tooltip";
import { NavItem } from "@/lib/sideNav";
import Link from "next/link";


interface SidebarNavItemProps {
  item: NavItem;
  active?: boolean;
}


export function SidebarNavItem({ item, active = false }: SidebarNavItemProps) {
  const { label, href, icon: Icon } = item;

  return (
    <Tooltip label={label}>
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          active
            ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30"
            : "text-icon-nav hover:bg-background-secondary hover:text-foreground"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
      </Link>
    </Tooltip>
  );
}