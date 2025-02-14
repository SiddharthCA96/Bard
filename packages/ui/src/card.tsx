import React from "react";
import { JSX } from "react";
export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <h1>{children}</h1>
    </div>
  );
}
