import Image from "ui/Image";
import Typography from "ui/Typography";

const UnderMaintenance = () => {
  return (
    <>
      <Image
        variant="fluid"
        src="images/under-maintenance.png"
        className="rounded mx-auto d-block h-75"
      />
      <Typography as="h1" align="center">
        Work in progress
      </Typography>
    </>
  );
};

export default UnderMaintenance;
