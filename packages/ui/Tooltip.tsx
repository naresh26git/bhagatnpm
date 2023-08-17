import React from "react";

export const placementsClassesMap = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
} as const;

export type TooltipProps = {
  children: React.ReactElement;
  title: string;
  className?: string;
  placement?: keyof typeof placementsClassesMap;
  dangerouslySetInnerHTML?: boolean;
};

export const Tooltip = (props: TooltipProps) => {
  const { children, title, className } = props;

  return React.cloneElement(children, {
    "data-bs-toggle": "tooltip",
    "data-bs-title": title,
    "data-bs-placement": placementsClassesMap[props.placement || "top"],
    "data-bs-html": props.dangerouslySetInnerHTML || false,
    ...(className
      ? {
          "data-bs-custom-class": className,
        }
      : {}),
  });
};

export type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = (props: ProviderProps) => {
  React.useEffect(() => {
    (async () => {
      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.js");

      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      ) as any;
      [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
    })();
  }, []);

  return <>{props.children}</>;
};

Tooltip.Provider = Provider;

export default Tooltip;
