import Box from "./Box";

export const breadcrumbBaseClasses = "breadcrumb mb-0" as const;

export const getBreadcrumbClasses = (props: BreadcrumbProps) => {
  return `${breadcrumbBaseClasses} ${props.className}`;
};

export type BreadcrumbProps = JSX.IntrinsicElements["ol"] & {
  children: React.ReactNode;
};

export const Breadcrumb = (props: BreadcrumbProps) => {
  const domProps = { ...props };
  return (
    <Box as="nav" aria-label="breadcrumb">
      <Box as="ol" {...domProps} className={getBreadcrumbClasses(props)} />
    </Box>
  );
};

export const breadcrumbItemBaseClasses = "breadcrumb-item" as const;

export const getBreadcrumbItemClasses = (props: BreadcrumbItemProps) => {
  return `${breadcrumbItemBaseClasses} ${props.className}`;
};

export type BreadcrumbItemProps = JSX.IntrinsicElements["li"] & {
  children: React.ReactNode;
};

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const domProps = { ...props };

  return (
    <Box
      as="li"
      {...domProps}
      className={getBreadcrumbItemClasses(props)}
      style={{ ...props.style, minWidth: "fit-content" }}
    />
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
