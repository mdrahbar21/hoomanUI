import React from "react";
import {
  Home,
  Phone,
  Package,
  Users2,
  LineChart,
  Settings,
} from "lucide-react";

export const links = [
  {
    title: "Agent Builder",
    links: [
      {
        name: "Agents",
        address: "main/agents",
      },
      {
        name: "Knowledge Base",
        address: "KnowledgeBase",
      },
      {
        name: "Integrations",
        address: "Integrations",
      },
    ],
  },
  {
    title: "Statistics",
    links: [
      {
        name: "Overview",
        address: "Overview",
      },
      {
        name: "CallLogs",
        address: "analytics/callLogs",
      },
      {
        name: "TicketInsights",
        address: "TicketInsights",
      },
    ],
  },
  {
    title: "Voice",
    links: [
      {
        name: "Call Analysis",
        address: "deepgram/pre-recorded",
      },
      {
        name: "All Analysis",
        address: "deepgram/allAnalysis",
      },
    ],
  },
];

export const sidebar = [
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home",
    address: "/",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Calls",
    address: "/analytics/callLogs",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Products",
    address: "/products",
  },
  {
    icon: <Users2 className="h-5 w-5" />,
    title: "Customers",
    address: "/customers",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Analytics",
    address: "/analytics",
  },
];
