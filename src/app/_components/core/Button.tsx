import Link from "next/link";
import { ReactElement } from "react";

export function Button({
  isPrimary = false,
  withPadding = true,
  isFullWidth = false,
  noUnderline = false,
  isDisabled = false,
  children,
  customClass,
  onClick,
  route,
  type,
}: {
  isPrimary?: boolean;
  withPadding?: boolean;
  isFullWidth?: boolean;
  noUnderline?: boolean;
  isDisabled?: boolean;
  children?: ReactElement | string;
  customClass?: string;
  onClick?: (event?: any) => void;
  route?: string;
  type?: "submit" | "reset" | "button";
}) {
  const buttonStyle = isDisabled
    ? "bg-gray-300 text-white cursor-not-allowed"
    : isPrimary
    ? "font-semibold text-primary border border-primary hover:bg-primary hover:text-white "
    : "text-secondary hover:text-primary hover:bg-primary hover:bg-opacity-10";

  const padding = withPadding ? "px-3 py-2" : "";

  const width = isFullWidth ? "w-full" : "";

  const button = (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={`${padding} rounded-md ${
        noUnderline ? "" : "hover:underline"
      }  ${buttonStyle} ${width} ${customClass}`}
    >
      {children}
    </button>
  );

  return route ? <Link href={route}>{button}</Link> : button;
}
