import React from "react";

export type BoxAsKeys = keyof JSX.IntrinsicElements;

export type BoxProps<Key extends BoxAsKeys> = {
  as: Key;
} & Omit<JSX.IntrinsicElements[Key], "ref">;

export const sanitizeClasses = (props: { className?: string }) => {
  return (
    String(props.className).replaceAll("undefined", "").trim() || undefined
  );
};

export const Box = <Key extends BoxAsKeys>(props: BoxProps<Key>) => {
  const Element = props.as as React.ElementType;

  const elementProps = { ...props } as Partial<BoxProps<Key>>;
  delete elementProps.as;

  return <Element {...elementProps} className={sanitizeClasses(props)} />;
};

export type BoxWithRefProps<Key extends BoxAsKeys> = BoxProps<Key> &
  JSX.IntrinsicElements[Key];

export const BoxWithRef = React.forwardRef(
  <Key extends BoxAsKeys>(
    props: BoxWithRefProps<Key>,
    ref?: React.LegacyRef<HTMLElement>
  ) => {
    const Element = props.as as React.ElementType;

    const elementProps = { ...props } as Partial<BoxWithRefProps<Key>>;
    delete elementProps.as;

    return (
      <Element {...elementProps} ref={ref} className={sanitizeClasses(props)} />
    );
  }
);

Box.WithRef = BoxWithRef;

export default Box;
