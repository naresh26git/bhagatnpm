import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { client } from "../main";
// import { useDialog } from "ui/hooks/UseDialog";
import { Company } from "server/dist/trpc/routes/company/get-many";
import { Hr } from "server/dist/trpc/routes/hr/get-many";
import { DialogHeader } from "ui/Dialog";
import Typography from "ui/Typography";
import { useAuthContext } from "../hooks/UseAuth";
import { uploadFileToBlob } from "../utils/azure-blob-upload";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const VisitorPass = () => {
  const auth = useAuthContext();
  const [photo, setPhoto] = React.useState("");
  const [name, setName] = React.useState("");
  const [fromPlace, setFromPlace] = React.useState("");
  // const [hr, setHR] = React.useState("");
  const [hrId, setHrId] = React.useState<number>();
  const [companyId, setCompanyId] = React.useState<number>();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [date, setDate] = React.useState(`${new Date()}`);
  const [inTime, setInTime] = React.useState<string>(`${new Date()}`);
  const [outTime, setOutTime] = React.useState<string>(`${new Date()}`);
  const [company, setCompany] = React.useState<Company[]>([]);
  const [hr, setHr] = React.useState<Hr[]>([]);
  const [reason, setReason] = React.useState<string>("");
  const [fileSelected, setFileSelected] = React.useState<File>();
  const [uploading, setUploading] = React.useState(false);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const [file] = event.target.files;

    if (!file) return;

    setFileSelected(file);
  };
  const handleSubmit = async () => {
    try {
      console.log({ hrId });
      if (!fileSelected) return;

      const { sasToken } = await client.sasToken.get.query();

      if (!sasToken) return;

      setUploading(true);

      await uploadFileToBlob(fileSelected, sasToken);
      setFileSelected(undefined);
      setUploading(false);
      if (hrId === undefined) return;
      console.log({ companyId });
      if (companyId === undefined) return;

      await client.visitorPass.set.mutate({
        name,
        fromPlace,
        mobileNumber,
        hrId,
        companyId,
        date,
        inTime,
        outTime,
        reason,

        // email: email || undefined,,
        // mobile: mobile || undefined,
      });
      window.location.reload();
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-info",
    labelId: "create-info-label",
  };
  // const handleDepartmentId = (e: any) => {
  //   setDepartmentId(e.target.value);
  // };

  React.useEffect(() => {
    (async () => {
      const companies = await client.company.getMany.query();
      setCompany(companies);

      const [firstCompany] = companies;
      if (firstCompany === undefined) return;
      setCompanyId(firstCompany.id);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (companyId === undefined) return;

        const hr = await client.hr.getMany.mutate({ companyId });
        // API call successfully done
        // window.location.reload();
        console.log(companyId);
        setHr(hr);
      } catch (error) {
        // API call failed
        // Why failed?
      }
    })();
  }, [companyId]);

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Create VisitorPass
      </Dialog.Trigger>

      <Dialog {...value}>
        <DialogHeader title="VisitorPass" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "xl-12"]}>
                <label htmlFor="Photo">
                  <Typography fontWeight="bolder">Photo</Typography>
                </label>
                <Stack gap="5" orientation="vertical">
                  <Grid.Col cols={["12", "lg-1"]}>
                    <label
                      style={{
                        height: "100px",
                        width: "100px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                      className="form-control"
                      htmlFor="customFile"
                    >
                      <input
                        type="file"
                        className="form-control"
                        onChange={onFileChange}
                      />
                      {/* <Button type="submit" onClick={onFileUpload}>
          Upload
        </Button> */}
                      {/* <FontAwesomeIcon
                        icon={faPlus}
                        style={{ height: "30px", width: "30px" }}
                      /> */}
                    </label>

                    <input
                      type="file"
                      style={{
                        display: "none",
                      }}
                      className="form-control"
                      id="customFile"
                    />
                  </Grid.Col>
                </Stack>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="First Name">
                  <Typography fontWeight="bolder">Visitor Name</Typography>{" "}
                </label>
                <div
                //  className="form-floating"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="Fromplace">
                  <Typography fontWeight="bolder">From Place</Typography>
                </label>
                <div
                //  className="form-floating"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={fromPlace}
                    onChange={(event) => setFromPlace(event.target.value)}
                  />
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="username">
                  <Typography fontWeight="bolder">Company</Typography>
                </label>
                <div>
                  <select
                    className="form-control"
                    value={companyId}
                    onChange={(e) => setCompanyId(parseInt(e.target.value))}
                  >
                    <option value={undefined}>Select Company</option>
                    {company.map((company, index) => {
                      return <option value={company.id}>{company.name}</option>;
                    })}
                  </select>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="username">
                  <Typography fontWeight="bolder">Hr</Typography>
                </label>
                <div>
                  <select
                    className="form-control"
                    value={hrId}
                    onChange={(e) => setHrId(parseInt(e.target.value))}
                  >
                    <option value={undefined}>Select HR</option>
                    {hr.map((hr, index) => {
                      return <option value={hr.id}>{hr.user.name}</option>;
                    })}
                  </select>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="From date">
                  {" "}
                  <Typography fontWeight="bolder">From date</Typography>
                </label>
                <div
                //  className="form-floating"
                >
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setDate(event.target.value)}
                  />
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="Mobilenumber">
                  {" "}
                  <Typography fontWeight="bolder">Mobile Number</Typography>
                </label>
                <div
                //  className="form-floating"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}
                  />
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="InTime">
                  {" "}
                  <Typography fontWeight="bolder">In-Time</Typography>
                </label>
                <div className="form-floating">
                  <input
                    type="date-time"
                    className="form-control"
                    value={inTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setInTime(event.target.value)
                    }
                  />
                  <label htmlFor="InTime">In-Time</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="OutTime">
                  <Typography fontWeight="bolder">Out-Time</Typography>
                </label>
                <div className="form-floating">
                  <input
                    type="date-time"
                    className="form-control"
                    value={outTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setOutTime(event.target.value)
                    }
                  />
                  <label htmlFor="OutTime">Out-Time</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "xl-12"]}>
                <label htmlFor="floatingTextarea2">
                  {" "}
                  <Typography fontWeight="bolder">Reason</Typography>
                </label>

                <div
                //  className="form-floating"
                >
                  <textarea
                    className="form-control"
                    // placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    rows={2}
                  ></textarea>
                </div>
                {/* <div

                >
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    //
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                  />
                </div> */}
              </Grid.Col>
            </Grid.Row>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          {/* <Button
            variant="outline-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Cancel
          </Button> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              className="center"
              onClick={handleSubmit}
              data-bs-toggle="modal"
              data-bs-target={`#${value.id}`}
            >
              Confirm
            </Button>
          </div>
        </Dialog.Footer>
        {/* <Dialog.Footer>
          <Button
            variant="outline-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSubmit}
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Submit
          </Button>
        </Dialog.Footer> */}
      </Dialog>
    </>
  );
};

export default VisitorPass;
