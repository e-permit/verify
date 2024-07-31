import { ReactNode, useId } from "react";
import { clsx } from "clsx";

export default function Button({
  label,
  onClick,
  severity,
  children,
}: {
  label: string;
  onClick: any;
  severity: "primary" | "danger";
  children: ReactNode;
}) {
  const id = useId();
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-4 py-2 border min-w-[10rem] max-w-2/3 flex gap-2 text-[2rem] items-center font-semibold rounded-lg shadow-xl bg-white uppercase",
        { "text-emerald-600 active:bg-emerald-600 active:text-white": severity == "primary" },
        { "text-rose-600 active:bg-rose-600 active:text-white": severity == "danger" }
      )}
      name={"button-" + id}
    >
      {children}
      <label htmlFor={"button-" + id}>{label}</label>
    </button>
  );
}
