import { useAuthContext } from "../hooks/UseAuth";

export type ShowIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export const ShowIf = (props: ShowIfProps) => {
  return props.condition ? props.children : null;
};

export type ShowIfAdminProps = Pick<ShowIfProps, "children">;

export const ShowIfAdmin = (props: ShowIfAdminProps) => {
  const auth = useAuthContext();

  return <>{auth.state.user?.role.name === "admin" ? props.children : null}</>;
};

export type ShowIfEmployeeProps = Pick<ShowIfProps, "children">;

export const ShowIfEmployee = (props: ShowIfEmployeeProps) => {
  const auth = useAuthContext();

  return (
    <>{auth.state.user?.role.name === "employee" ? props.children : null}</>
  );
};

ShowIf.Admin = ShowIfAdmin;
ShowIf.Employee = ShowIfEmployee;

export default ShowIf;
