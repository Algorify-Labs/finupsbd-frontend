"use client";

import { useFormContext } from "react-hook-form";

export function StepThree() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <div className="space-y-2">
      <p>
        <strong>First Name:</strong> {data.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {data.lastName}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
    </div>
  );
}
