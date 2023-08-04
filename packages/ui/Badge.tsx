import Box from "./Box";

export const badgeBaseClasses = "badge mb-0 " as const;

export const textBackgroundsClassesMap = {
  primary: "text-bg-primary",
  secondary: "text-bg-secondary",
  success: "text-bg-success",
  danger: "text-bg-danger",
  warning: "text-bg-warning",
  info: "text-bg-info",
  light: "text-bg-light",
  dark: "text-bg-dark",
} as const;

export const positionClassesMap = {
  topRight: "position-absolute top-0 start-100 translate-middle",
  topLeft: "position-absolute top-0 start-0 translate-middle",
  topCenter: "position-absolute top-0 start-50 translate-middle",
  leftCenter: "position-absolute top-50 start-0 translate-middle",
  rightCenter: "position-absolute top-50 start-100 translate-middle",
  middleCenter: "position-absolute top-50 start-50 translate-middle",
  bottomLeft: "position-absolute top-100 start-0 translate-middle",
  bottomCenter: "position-absolute top-100 start-50 translate-middle",
  bottomRight: "position-absolute top-100 start-100 translate-middle",
} as const;
export const roundedPillClass = "rounded-pill" as const;

export const getBadgeClasses = (props: BadgeProps) => {
  return `${badgeBaseClasses}  ${
    textBackgroundsClassesMap[props.textBackground!]
  } ${props.className} ${props.roundedPill && roundedPillClass} ${
    positionClassesMap[props.position!]
  }`;
};

export type BadgeProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  textBackground?: keyof typeof textBackgroundsClassesMap;
  roundedPill?: React.ReactNode;
  position?: keyof typeof positionClassesMap;
};

export const Badge = (props: BadgeProps) => {
  const domProps = { ...props };
  delete domProps.textBackground;
  delete domProps.roundedPill;
  delete domProps.position;

  if (props.position !== undefined)
    console.warn(
      "Make sure this component's parent element has position-relative in its className"
    );

  return (
    <Box as="div" aria-label="badge">
      <Box as="div" {...domProps} className={getBadgeClasses(props)} />
    </Box>
  );
};

export default Badge;
