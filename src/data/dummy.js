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
      title: "Dashboard",
      links: [
        {
          name: "Dashboard",
          address: "Dashboard",
          icon: <FiShoppingBag />,
        },
        {
          name: "Add Missing Case",
          address: "AddMissingCase",
          icon: <FiPlus />,
        },
        {
          name: "Find Missing Case",
          address: "FindMissingCase",
          icon: <FiSearch />,
        },
        {
          name: "Missing",
          address: "Missing",
          icon: <FiSquare />,
        },
        {
          name: "Unidentified",
          address: "Unidentified",
          icon: <FiCrosshair />,
        },
        {
          name: "Unclaimed",
          address: "Unclaimed",
          icon: <FiShoppingBag />,
        },
        {
          name: "New Case",
          address: "case-creation",
          icon: <FiPlus />,
        },
        {
          name: "Search Missing Person",
          address: "search",
          icon: <FiSearch />,
        },
      ],
    },
]