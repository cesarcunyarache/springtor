import { ChartPieIcon, FolderOpenDot, LifeBuoy, MessagesSquare, Send, Users, Map } from "lucide-react";


export const routes = {
    user: {
      name: "César Cunyarache",
      email: "cesar@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Panel",
        url: "/dashboard",
        icon: ChartPieIcon,
        isActive: true,
        permission: "user:view",
  
      },
  
      {
        title: "Gestión de Usuarios",
        url: "/usuarios",
        icon: Users,
        isActive: true,
        items: [
          {
            title: "Usuarios",
            url: "/usuarios",
          },
          {
            title: "Roles",
            url: "/usuarios/roles",
          },
          {
            title: "Permisos",
            url: "/usuarios/permisos",
          }
        ],
  
      },
      /*  {
         title: "Models",
         url: "#",
         icon: Bot,
         items: [
           {
             title: "Genesis",
             url: "#",
           },
           {
             title: "Explorer",
             url: "#",
           },
           {
             title: "Quantum",
             url: "#",
           },
         ],
       },
       {
         title: "Documentation",
         url: "#",
         icon: BookOpen,
         items: [
           {
             title: "Introduction",
             url: "#",
           },
           {
             title: "Get Started",
             url: "#",
           },
           {
             title: "Tutorials",
             url: "#",
           },
           {
             title: "Changelog",
             url: "#",
           },
         ],
       },
       {
         title: "Settings",
         url: "#",
         icon: Settings2,
         items: [
           {
             title: "General",
             url: "#",
           },
           {
             title: "Team",
             url: "#",
           },
           {
             title: "Billing",
             url: "#",
           },
           {
             title: "Limits",
             url: "#",
           },
         ],
       }, */
    ],
    navSecondary: [
  
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
        isActive: true,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
        isActive: true,
      },
    ],
    projects: [
      {
        title: "Profesionales",
        url: "/profesionales",
        icon: LifeBuoy,
        isActive: true,
      },
      {
        title: "Proyectos",
        url: "/proyectos",
        icon: FolderOpenDot,
        isActive: true,
      },
      {
        title: "Testimonios",
        url: "/testimonios",
        icon: MessagesSquare,
        isActive: true,
      },
      {
        title: "Blogs",
        url: "/blogs",
        icon: Map,
        isActive: true,
      },
    ],
  }