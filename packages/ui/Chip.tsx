import Typography, { TypographyProps } from "./Typography";

export const baseClasses =
  "d-inline-flex px-2 py-1 fw-semibold rounded-2" as const;

// border border-warning-subtle
export const variantsColorsMap = {
  primary: "bg-primary-subtle text-primary-emphasis",
  secondary: "bg-secondary-subtle text-secondary-emphasis",
  success: "bg-success-subtle text-success-emphasis",
  info: "bg-info-subtle text-info-emphasis",
  warning: "bg-warning-subtle text-warning-emphasis",
  danger: "bg-danger-subtle text-danger-emphasis",
  light: "bg-light-subtle text-light-emphasis",
  dark: "bg-dark-subtle text-dark-emphasis",
} as const;

export const getClasses = (props: ChipProps) => {
  return `${baseClasses} ${variantsColorsMap[props.variant || "success"]}${
    props.className
  }`;
};

export type ChipProps = TypographyProps<"small"> & {
  children: React.ReactNode;
  variant?: keyof typeof variantsColorsMap;
};

export const Chip = (props: ChipProps) => {
  const typographyProps = { ...props };

  return (
    <Typography as="small" {...typographyProps} className={getClasses(props)} />
  );
};

export default Chip;
