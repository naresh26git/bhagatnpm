import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import Avatar, { AvatarProps } from "./Avatar";
import Box from "./Box";
import Typography, { TypographyAsKeys, TypographyProps } from "./Typography";

const PillButtonContext = React.createContext<PillButtonProps | null>(null);

const usePillButtonContext = () => {
  const context = React.useContext(PillButtonContext);

  if (!context) throw new Error("");

  return context;
};

export const pillButtonBaseClasses =
  "d-flex justify-content-center align-items-center rounded-pill border-0 p-1" as const;

export const getPillButtonClasses = (props: PillButtonProps) => {
  return `${pillButtonBaseClasses} ${props.className}`;
};

export const sizeHeightsMap = {
  lg: "4rem",
  base: "3rem",
  sm: "2rem",
} as const;

export const getHeight = (props: PillButtonProps): CSSProperties => {
  return {
    maxHeight: `${sizeHeightsMap[props.size || "base"]}`,
  };
};

export type PillButtonProps = JSX.IntrinsicElements["button"] & {
  children?: React.ReactNode;
  avatar?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: keyof typeof sizeHeightsMap;
};

export const PillButton = (props: PillButtonProps) => {
  const domProps = { ...props };
  delete domProps.size;
  delete domProps.endIcon;
  delete domProps.avatar;

  return (
    <PillButtonContext.Provider value={props}>
      <Box
        as="button"
        {...domProps}
        className={getPillButtonClasses(props)}
        style={{ ...props.style, ...getHeight(props) }}
      >
        {props.avatar ? props.avatar : null}

        {props.children}

        {props.endIcon ? props.endIcon : null}
      </Box>
    </PillButtonContext.Provider>
  );
};

export type PillButtonAvatarProps = AvatarProps;

export const PillButtonAvatar = (props: PillButtonAvatarProps) => {
  const pillButtonProps = usePillButtonContext();
  const avatarProps = { ...props };

  return <Avatar size={pillButtonProps.size} {...avatarProps} />;
};

export const pillButtonLabelBaseClasses = "m-0 mx-2" as const;

export const getPillButtonLabelClasses = <Key extends TypographyAsKeys>(
  props: PillButtonLabelProps<Key>
) => {
  return `${pillButtonLabelBaseClasses} ${props.className}`;
};

export type PillButtonLabelProps<Key extends TypographyAsKeys> =
  TypographyProps<Key>;

export const PillButtonLabel = <Key extends TypographyAsKeys>(
  props: PillButtonLabelProps<Key>
) => {
  const typographyProps = { ...props };

  return (
    <Typography
      {...typographyProps}
      className={getPillButtonLabelClasses(props)}
    />
  );
};

export const PillButtonDropdownIcon = () => {
  return <FontAwesomeIcon icon={faAngleDown} className="m-1" />;
};

PillButton.Avatar = PillButtonAvatar;
PillButton.Label = PillButtonLabel;
PillButton.DropdownIcon = PillButtonDropdownIcon;

export default PillButton;
