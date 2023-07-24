import Box from "./Box";
import Grid from "./Grid";
import Typography from "./Typography";

export const cardBaseClasses = "card" as const;

// export const backgroundClassesMap = {
//   primary: "bg-primary",
//   "primary-subtle": "bg-primary-subtle",
//   secondary: "bg-secondary",
//   "secondary-subtle": "bg-secondary-subtle",
//   success: "bg-success",
//   "success-subtle": "bg-success-subtle",
//   danger: "bg-danger",
//   "danger-subtle": "bg-danger-subtle",
//   warning: "bg-warning",
//   "warning-subtle": "bg-warning-subtle",
//   info: "bg-info",
//   "info-subtle": "bg-info-subtle",
//   light: "bg-light",
//   "light-subtle": "bg-light-subtle",
//   dark: "bg-dark",
//   "dark-subtle": "bg-dark-subtle",
//   body: "bg-body",
//   "body-secondary": "bg-body-secondary",
//   "body-tertiary": "bg-body-tertiary",
//   black: "bg-black",
//   white: "bg-white",
//   transparent: "bg-transparent",
// };

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

export const getCardClasses = (props: CardProps) => {
  return `${cardBaseClasses} ${
    textBackgroundsClassesMap[props.textBackground!]
  } ${props.className}`;
};

export type CardProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  textBackground?: keyof typeof textBackgroundsClassesMap;
};

export const Card = (props: CardProps) => {
  const domProps = { ...props };

  return <Box as="div" {...domProps} className={getCardClasses(props)} />;
};

export const cardBodyBaseClasses = "card-body" as const;

export const getCardBodyClasses = (props: CardBodyProps) => {
  return `${cardBodyBaseClasses} ${props.className}`;
};

export type CardBodyProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const CardBody = (props: CardBodyProps) => {
  const domProps = { ...props };

  return <Box as="div" {...domProps} className={getCardBodyClasses(props)} />;
};

export type CardHeaderProps = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  subtitle?: React.ReactNode;
};

export const CardHeader = (props: CardHeaderProps) => {
  return (
    <Grid.Row rowCols="2">
      <Grid.Col cols="auto">
        <Grid.Row rowCols="2">
          {props.icon ? <Grid.Col cols="auto">{props.icon}</Grid.Col> : null}

          <Grid.Col cols="auto">
            <Typography as="h5" className="card-title">
              {props.title}
            </Typography>
            {props.subtitle ? (
              <Typography
                as="h6"
                className="card-subtitle mb-2 text-body-secondary"
              >
                {props.subtitle}
              </Typography>
            ) : null}
          </Grid.Col>
        </Grid.Row>
      </Grid.Col>

      <Grid.Col cols="auto" marginStart="auto">
        {props.action ? props.action : null}
      </Grid.Col>
    </Grid.Row>
  );
};

Card.Body = CardBody;
Card.Header = CardHeader;

export default Card;
