import Stack from "ui/Stack";
import Typography, { TypographyAsKeys, TypographyProps } from "ui/Typography";

export type PageHeaderProps = {
  title: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <Stack
      orientation="horizontal"
      justifyContent="between"
      alignItems="center"
    >
      {props.title}

      {props.actions || null}
    </Stack>
  );
};

export type PageHeaderTitleProps = TypographyProps<TypographyAsKeys>;

export const PageHeaderTitle = (props: PageHeaderTitleProps) => {
  return <Typography as="h5" {...(props as TypographyProps<"h5">)} />;
};

PageHeader.Title = PageHeaderTitle;

export default PageHeader;
