import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Users, Calendar, Newspaper, ShoppingBag, Ticket } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Team", url: "/team", icon: Users },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Shop", url: "/shop", icon: ShoppingBag },
  { title: "Tickets", url: "/tickets", icon: Ticket },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/e/e3/Oxford_United_FC_logo.svg" 
              alt="Oxford United Logo" 
              className="h-16 w-16 mx-auto"
            />
          </div>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className="hover-elevate transition-all duration-200"
                  >
                    <Link href={item.url} className="flex items-center gap-3 px-4 py-2">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
