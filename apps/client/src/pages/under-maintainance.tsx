import Image from "ui/Image";
import Typography from "ui/Typography";
const UnderMaintainance = () => {
  return (
    <>
      <Image
        variant="fluid"
        src="images/under-maintenance.png"
        className="rounded mx-auto d-block h-75"
      />
      <Typography as="h1" align="center">
        This page is under maintainance
      </Typography>
    </>
  );
};

export default UnderMaintainance;
