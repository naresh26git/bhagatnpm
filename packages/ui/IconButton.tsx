import Box from "./Box";

export const baseClasses =
  "d-flex justify-content-center align-items-center rounded-circle border-0" as const;

export const getClasses = (props: IconButtonProps) => {
  return `${baseClasses} ${props.className}`;
};

export type IconButtonProps = JSX.IntrinsicElements["button"] & {
  children: React.ReactNode;
};

export const IconButton = (props: IconButtonProps) => {
  const domProps = { ...props };

  return (
    <Box
      as="button"
      {...domProps}
      className={getClasses(props)}
      style={{
        ...props.style,
        width: "2rem",
        height: "2rem",
      }}
    />
  );
};

export default IconButton;
