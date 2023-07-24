import Box from "./Box";

export type ProgressProps = JSX.IntrinsicElements["div"] & {
  progress: number;
};

export const Progress = (props: ProgressProps) => {
  const domProps = { ...props } as Partial<ProgressProps>;
  delete domProps.progress;

  return (
    <Box
      as="div"
      {...domProps}
      className="progress"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={props.progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <Box
        as="div"
        className="progress-bar"
        style={{ width: `${props.progress}%` }}
      />
    </Box>
  );
};

export default Progress;
