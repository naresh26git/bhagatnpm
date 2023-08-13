import Button from "ui/Button";

export const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button variant="primary" onClick={handlePrint}>
      Print
    </Button>
  );
};

export default PrintButton;
