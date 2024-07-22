import { ReactElement } from "react";

export function Button({
  isPrimary = false,
  withPadding = true,
  isFullWidth = false,
  noUnderline = false,
  children,
  customClass,
  onClick,
}: {
  isPrimary?: boolean;
  withPadding?: boolean;
  isFullWidth?: boolean;
  noUnderline?: boolean;
  children?: ReactElement | string;
  customClass?: string;
  onClick?: () => void;
}) {
  const buttonStyle = isPrimary
    ? "font-semibold text-primary border border-primary hover:text-white "
    : "text-secondary hover:text-primary hover:bg-opacity-10";

  const padding = withPadding ? "px-3 py-2" : "";

  const width = isFullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      className={`${padding} rounded-md ${
        noUnderline ? "" : "hover:underline"
      } hover:bg-primary ${buttonStyle} ${width} ${customClass}`}
    >
      {children}
    </button>
  );
}
