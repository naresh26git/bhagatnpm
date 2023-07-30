import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { addressRoutes } from "./routes/addresses";
import { companyRoutes } from "./routes/company";
import { departmentRoutes } from "./routes/department";
import { designationRoutes } from "./routes/designation";
import { familyDetailRoutes } from "./routes/family-details";
import { helpDeskRoutes } from "./routes/help-desks";
import { helpDeskCategoryRoutes } from "./routes/helpdesk-category";
import { helpDeskStatusRoutes } from "./routes/helpdesk-status";
import { hrRoutes } from "./routes/hr";
import { identificationRoutes } from "./routes/identification";
import { identificationTypeRoutes } from "./routes/identification/identificationType";
import { leaveRoutes } from "./routes/leaves";
import { leaveTypeRoutes } from "./routes/leaves/leave-types";
import { payRollRoutes } from "./routes/pay-rolls";
import { paySlipRoutes } from "./routes/pay-slip";
import { paySlipComponentRoutes } from "./routes/payslip-component";
import { personalInfoRoutes } from "./routes/personal-infos";
import { qualificationRoutes } from "./routes/qualification";
import { roleRoutes } from "./routes/roles";
import { timeSheetRoutes } from "./routes/time-sheets";
import { userRoutes } from "./routes/users";
import { visitorPassRoutes } from "./routes/visitor-pass";
import { trpc } from "./trpc";

export const appRouter = trpc.router({
  address: addressRoutes,
  familyDetail: familyDetailRoutes,
  leave: leaveRoutes,
  payRoll: payRollRoutes,
  personalInfo: personalInfoRoutes,
  timeSheet: timeSheetRoutes,
  helpDeskCategories: helpDeskCategoryRoutes,
  helpDeskStatus: helpDeskStatusRoutes,
  helpDesk: helpDeskRoutes,
  visitorPass: visitorPassRoutes,
  user: userRoutes,
  role: roleRoutes,
  leaveType: leaveTypeRoutes,
  department: departmentRoutes,
  designation: designationRoutes,
  hr: hrRoutes,
  company: companyRoutes,
  qualifications: qualificationRoutes,
  identification: identificationRoutes,
  identificationTypes: identificationTypeRoutes,
  paySlipComponent: paySlipComponentRoutes,
  paySlip: paySlipRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
