// import Stack from "ui/Stack";
// import PageHeader from "../../components/PageHeader";
// import ContactDataPage from "./contact";
// import FamilyPage from "./family";
// import PersonalInfoPage from "./personal-info";

// export const Layout = () => {
//   return (
//     <>
//       <Stack gap="3">
//         <PageHeader title={<PageHeader.Title>Account</PageHeader.Title>} />

//         <ul className="nav nav-tabs" id="myTab" role="tablist">
//           <li className="nav-item" role="presentation">
//             <button
//               className="nav-link active"
//               id="overall-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#overall"
//               type="button"
//               role="tab"
//               aria-controls="overall"
//               aria-selected="true"
//             >
//               Overall
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className="nav-link"
//               id="personalinformation-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#personalinformation"
//               type="button"
//               role="tab"
//               aria-controls="personalinformation"
//               aria-selected="false"
//             >
//               Personal Info
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className="nav-link"
//               id="contact-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#contact"
//               type="button"
//               role="tab"
//               aria-controls="contact"
//               aria-selected="false"
//             >
//               Contact
//             </button>
//           </li>

//           <li className="nav-item" role="presentation">
//             <button
//               className="nav-link"
//               id="family-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#family"
//               type="button"
//               role="tab"
//               aria-controls="family"
//               aria-selected="false"
//             >
//               Family
//             </button>
//           </li>
//         </ul>

//         <div className="tab-content" id="myTabContent">
//           <div
//             className="tab-pane fade show active"
//             id="overall"
//             role="tabpanel"
//             aria-labelledby="overall-tab"
//           >
//             <Stack gap="3">
//               <PersonalInfoPage />

//               <ContactDataPage />

//               <FamilyPage />
//             </Stack>
//           </div>

//           <div
//             className="tab-pane fade"
//             id="personalinformation"
//             role="tabpanel"
//             aria-labelledby="personalinformation-tab"
//           >
//             <PersonalInfoPage />
//           </div>

//           <div
//             className="tab-pane fade"
//             id="contact"
//             role="tabpanel"
//             aria-labelledby="contact-tab"
//           >
//             <ContactDataPage />
//           </div>

//           <div
//             className="tab-pane fade"
//             id="family"
//             role="tabpanel"
//             aria-labelledby="family-tab"
//           >
//             <FamilyPage />
//           </div>
//         </div>
//       </Stack>
//     </>
//   );
// };

// export default Layout;

import Button from "ui/Button";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import CreateUserDialog from "../../components/CreateUserDialog";
import PageHeader from "../../components/PageHeader";
import ContactDataPage from "./contact";
import FamilyPage from "./family";
import PersonalInfoPage from "./personal-info";
import Qualifications from "./qualification";
export const Layout = () => {
  return (
    <>
      <Stack gap="3">
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<CreateUserDialog />}
        />
        {/* <PageHeader title={<PageHeader.Title>Account</PageHeader.Title>} /> */}
        <Grid.Row>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Emp Code"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="From"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="DOJ"
            />
          </Grid.Col>
          <Grid.Row>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Emp Name"
              />
            </Grid.Col>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="To"
              />
            </Grid.Col>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <Button variant="primary" className="w-100">
                Search
              </Button>
            </Grid.Col>
          </Grid.Row>
        </Grid.Row>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="overall-tab"
              data-bs-toggle="tab"
              data-bs-target="#overall"
              type="button"
              role="tab"
              aria-controls="overall"
              aria-selected="true"
            >
              Overall
            </button>
          </li> */}

          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="personalinformation-tab"
              data-bs-toggle="tab"
              data-bs-target="#personalinformation"
              type="button"
              role="tab"
              aria-controls="personalinformation"
              aria-selected="true"
            >
              Personal Info
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Contact
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="family-tab"
              data-bs-toggle="tab"
              data-bs-target="#family"
              type="button"
              role="tab"
              aria-controls="family"
              aria-selected="false"
            >
              Family
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="qualification-tab"
              data-bs-toggle="tab"
              data-bs-target="#qualification"
              type="button"
              role="tab"
              aria-controls="qualification"
              aria-selected="false"
            >
              Qualification
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="identification-tab"
              data-bs-toggle="tab"
              data-bs-target="#identification"
              type="button"
              role="tab"
              aria-controls="identification"
              aria-selected="false"
            >
              Identification
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="identification-tab"
              data-bs-toggle="tab"
              data-bs-target="#identification"
              type="button"
              role="tab"
              aria-controls="identification"
              aria-selected="false"
            >
              Payroll
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="overall"
            role="tabpanel"
            aria-labelledby="overall-tab"
          >
            {/* <Stack gap="3">
              <PersonalInfoPage />

              <ContactDataPage />

              <FamilyPage />
            </Stack> */}
          </div>

          <div
            className="tab-pane fade show active"
            id="personalinformation"
            role="tabpanel"
            aria-labelledby="personalinformation-tab"
          >
            <PersonalInfoPage />
          </div>

          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <ContactDataPage />
          </div>

          <div
            className="tab-pane fade"
            id="family"
            role="tabpanel"
            aria-labelledby="family-tab"
          >
            <FamilyPage />
          </div>
          <div
            className="tab-pane fade"
            id="qualification"
            role="tabpanel"
            aria-labelledby="qualification-tab"
          >
            <Qualifications />
          </div>
        </div>
      </Stack>
    </>
  );
};

export default Layout;
