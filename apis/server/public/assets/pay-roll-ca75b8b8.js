import{u as S,R as s,b as l,F as h,j as e,S as C,G as o,B as g,c as N,h as v,d as D,T as F}from"./index-391c2605.js";import{u as x,D as A}from"./DataGrid-12b03024.js";import{D as c,P as f}from"./PageHeader-c4ca6bf1.js";import"./Checkbox-2d029de5.js";const M=()=>{const p=S();s.useState("employee");const[i,t]=s.useState(""),[d,y]=s.useState(0),[n,m]=s.useState(1),[b,R]=s.useState(0),w=async()=>{try{await N.payRoll.set.mutate({month:i,salaryId:d,statusId:n})}catch(r){v(r,p)}},u={id:"create-payroll",labelId:"create-payroll-label"},I=r=>{m(r.target.value)},P=r=>{R(r.target.value)};return l(h,{children:[e(c.Trigger,{...u,variant:"primary",children:"Add Payroll"}),l(c,{...u,children:[e(c.Header,{title:"Add Payroll"}),e(c.Body,{children:l(C,{gap:"3",children:[l(o.Row,{gutters:"3",children:[e(o.Col,{cols:["12","lg-6"],children:l("div",{className:"form-floating",children:[e("input",{type:"date",className:"form-control",placeholder:"Doe",value:i,onChange:r=>t(r.target.value)}),e("label",{htmlFor:"Month",children:"Month"})]})}),e(o.Col,{cols:["12","lg-6"],children:l("div",{className:"form-floating",children:[l("select",{className:"form-control",value:n,onChange:r=>I(r),children:[e("option",{value:1,children:"Success"}),e("option",{value:2,children:"Pending"}),e("option",{value:3,children:"Processing"}),e("option",{value:4,children:"Declined"})]}),e("label",{htmlFor:"Status",children:"Status"})]})}),e(o.Col,{cols:["12","lg-6"],children:l("div",{className:"form-floating",children:[e("input",{type:"number",className:"form-control",id:"amount",value:b,onChange:P}),e("label",{htmlFor:"email",children:"Salary"})]})})]}),e(o.Row,{gutters:"3"})]})}),l(c.Footer,{children:[e(g,{variant:"outline-primary","data-bs-toggle":"modal","data-bs-target":`#${u.id}`,children:"Cancel"}),e(g,{variant:"primary",onClick:w,"data-bs-toggle":"modal","data-bs-target":`#${u.id}`,children:"Submit"})]})]})]})},a={uid:"1",empid:"1210",name:"Vignesh S",month:"Jan/2023",grosspay:"30000",status:"Recived"},$=[a,{...a,uid:"2",month:"Feb/2023"},{...a,uid:"3",month:"Mar/2023"},{...a,uid:"4",month:"Apr/2023"},{...a,uid:"5",month:"May/2023"},{...a,uid:"6",month:"Jun/2023"},{...a,uid:"7",month:"Jul/2023"},{...a,uid:"8",month:"Aug/2023"},{...a,uid:"9",month:"Sep/2023"},{...a,uid:"10",month:"Oct/2023"},{...a,uid:"11",month:"Nov/2023"},{...a,uid:"12",month:"Dec/2023"}],j=()=>{const p=S(),i=x({load:async({states:t})=>{var d,y;try{const n={sortBy:(d=t.sortState)==null?void 0:d.sortBy,sortOrder:(y=t.sortState)==null?void 0:y.sortOrder,limit:t.paginationState.limit,page:t.paginationState.page};console.log({inputParameters:n});const m=await N.payRoll.getMany.mutate(n);return{totalCount:m.totalCount,items:m.items}}catch(n){return v(n,p),{error:Error("Something went wrong")}}}});return l(C,{gap:"3",children:[l(o.Row,{children:[e(o.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"Emp.Code"})}),e(o.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"Emp.Name"})}),l(o.Row,{children:[e(o.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"From"})}),e(o.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"To"})}),e(o.Col,{className:"py-2",cols:["12","md-2"],children:e(g,{variant:"primary",className:"w-100",children:"Search"})})]})]}),e(f,{title:e(f.Title,{}),actions:e(M,{})}),e(D,{children:e(A,{...i,columns:[{id:"2",key:"",label:"Emp Name",renderCell:t=>e(h,{children:t.user.personalInfo?`${t.user.personalInfo.firstName} ${t.user.personalInfo.lastName}`:""})},{id:"3",key:"",label:"Month",renderCell:t=>e(h,{children:new Intl.DateTimeFormat("en-US",{month:"short"}).format(new Date(t.month))})},{id:"4",key:"",label:"gross pay",renderCell:t=>e(h,{children:new Intl.NumberFormat("en-US",{style:"currency",currency:"INR"}).format(Number(t.salary.amount))})},{id:"5",key:"",label:"Status",renderCell:t=>e(F,{transform:"capitalize",children:t.status.name})}]})})]})};export{j as PayRollPage,j as default,a as payRoll,$ as payRolls};
