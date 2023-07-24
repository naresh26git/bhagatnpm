import Box from "./Box";

export const baseClasses = "" as const;

export const variantsClassesMap = {
  fluid: "img-fluid",
  thumbnail: "img-thumbnail",
} as const;

export const getClasses = (props: ImageProps) => {
  return `${baseClasses} ${variantsClassesMap[props.variant || "fluid"]} ${
    props.rounded ? "rounded" : ""
  } ${props.className}`;
};

export type ImageProps = JSX.IntrinsicElements["img"] & {
  variant?: keyof typeof variantsClassesMap;
  rounded?: true;
};

export const Image = (props: ImageProps) => {
  return <Box as="img" {...props} className={getClasses(props)} />;
};

export default Image;
