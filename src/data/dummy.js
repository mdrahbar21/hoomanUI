import { list } from "firebase/storage";
import React from "react";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
  FiPlus,
  FiSearch,
  FiPhoneMissed,
  FiXSquare,
  FiSquare,
  FiCrosshair,
} from "react-icons/fi";


export const links = [
    {
      title: "Agent Builder",
      links: [
        {
          name: "Agents",
          address: "Agents",
        },
        {
          name: "Knowledge Base",
          address: "KnowledgeBase",
        },
        {
          name: "Integrations",
          address: "Integrations",
        }
      ]
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
          address: "CallLogs",
        },
        {
          name: "TicketInsights",
          address: "TicketInsights",
        },
      ],
    },
]