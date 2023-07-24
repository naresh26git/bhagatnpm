import Typography, { TypographyProps } from "ui/Typography";

export type InfoProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const Info = (props: InfoProps) => {
  const domProps = { ...props };

  return <div {...domProps} />;
};

export type InfoTitleProps = TypographyProps<"span">;
export const InfoTitle = (props: InfoTitleProps) => {
  const typographyProps = { ...props };

  return <Typography as="span" className="text-muted" {...typographyProps} />;
};

export type InfoSubtitleProps = Omit<TypographyProps<"p">, "as">;
export const InfoSubTitle = (props: InfoSubtitleProps) => {
  const typographyProps = { ...props };

  return <Typography className="m-0" {...typographyProps} />;
};

Info.Title = InfoTitle;
Info.SubTitle = InfoSubTitle;

export default Info;
