import { AppWindow, Banknote, type LucideIcon } from "lucide-react";
import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
interface SubItem {
  name: string;
  href: string;
  // icon?: React.ComponentType<{ className?: string }>;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavItem {
  title: string;
  href: string;
  // icon?: React.ComponentType<{ className?: string }>;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Loans",
    href: "#",
    icon: Banknote,
    subItems: [
      { name: "Personal Loan", href: "/loans/personal" },
      { name: "Home Loan", href: "/loans/home" },
      { name: "Education Loan", href: "/loans/education" },
      { name: "Business Loan", href: "/loans/business" },
    ],
  },
  {
    title: "Cards",
    href: "#",
    icon: FaRegCreditCard,
    subItems: [
      { name: "Credit Cards", href: "/cards/credit" },
      { name: "Debit Cards", href: "/cards/debit" },
      { name: "Prepaid Cards", href: "/cards/prepaid" },
    ],
  },
  {
    title: "Other Products",
    href: "#",
    icon: AppWindow,
    subItems: [
      { name: "Insurance", href: "/products/insurance" },
      { name: "Investment", href: "/products/investment" },
      { name: "Savings Accounts", href: "/products/savings" },
    ],
  },
  {
    title: "FinUps Islamic",
    href: "#",
    icon: AppWindow,
    subItems: [
      { name: "Islamic Banking", href: "/islamic-banking" },
      { name: "Shariah-Compliant Loans", href: "/islamic-banking/loans" },
      { name: "Zakat Calculator", href: "/islamic-banking/zakat-calculator" },
    ],
  },
];
