import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount)
// }

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export const formatBDT = (amount: number) => {
  return new Intl.NumberFormat("en-IN").format(amount);
};

export function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  // Adjust age if today's date is before the birth date this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
}

export function cleanFormData<T extends Record<string, any>>(
  data: T,
): Partial<T> {
  const cleanedData: Partial<T> = {};

  for (const key in data) {
    const value = data[key];
    // Only keep if value is NOT undefined, NOT null, and NOT empty string
    if (value !== undefined && value !== null && value !== "") {
      cleanedData[key] = value;
    }
  }

  return cleanedData;
}

// export function calculateEMI({principal, months, annualInterestRate}: {principal: number, months: number, annualInterestRate: number}) {
//   // Convert annual interest rate to a monthly rate in decimal form.
//   const monthlyRate = annualInterestRate / 12 / 100;

//   // Calculate EMI using the formula.
//   const EMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
//               (Math.pow(1 + monthlyRate, months) - 1);

//   return EMI;
// }

// // Example usage:
// const amount = 100000;             // Principal amount
// const periodInMonths = 60;         // Loan period in months
// const annualInterestRate = 12;     // Annual interest rate in percent

// const emiValue = calculateEMI({ principal: amount, months: periodInMonths, annualInterestRate });
// console.log(`The EMI is: ${emiValue.toFixed(2)}`);
