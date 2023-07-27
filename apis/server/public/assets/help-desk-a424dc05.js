import{u as C,R as p,b as l,F as k,j as e,G as r,S as f,B as v,c as D,h as N,d as b,T as y}from"./index-57e051c1.js";import{u as w,D as x}from"./DataGrid-ad7d820c.js";import{D as c,P as g}from"./PageHeader-205e30bf.js";import"./Checkbox-3b8794ba.js";const T=()=>{const u=C(),[d,t]=p.useState(""),[n,m]=p.useState(),[s,i]=p.useState(""),S=async()=>{try{if(console.log({categoryId:n}),n===void 0)return;await D.helpDesk.set.mutate({tittle:d,categoryId:n,description:s})}catch(o){N(o,u),console.log(o)}},h={id:"create-helpdesk",labelId:"create-helpdesk-label"};return l(k,{children:[e(c.Trigger,{...h,variant:"primary",children:"Create"}),l(c,{...h,children:[e(c.Header,{color:"primary",title:"HELP DESK"}),e(c.Body,{children:e(r,{children:e(f,{gap:"5",children:l(r.Row,{gutters:"5",children:[l(r.Col,{cols:["12","lg-6"],children:[e("label",{htmlFor:"name",children:"Tittle"}),e("input",{type:"text",className:"form-control",id:"tittle",value:d,onChange:o=>t(o.target.value)})]}),l(r.Col,{cols:["12","lg-6"],children:[e("label",{htmlFor:"username",children:"Category"}),e("div",{children:l("select",{className:"form-control",value:n,onChange:o=>m(parseInt(o.target.value)),children:[e("option",{value:1,children:"Network"}),e("option",{value:2,children:"Health"}),e("option",{value:3,children:"Work"}),e("option",{value:4,children:"Payment"})]})})]}),l(r.Col,{cols:["12","xl-12"],children:[e("label",{htmlFor:"description",children:"Description"}),e("div",{className:"form-floating",children:e("input",{type:"text",className:"form-control",id:"description",value:s,onChange:o=>i(o.target.value)})})]})]})})})}),e(c.Footer,{children:e("div",{style:{width:"100%",display:"flex",justifyContent:"space-evenly",alignItems:"center"},children:e(v,{variant:"primary",className:"center",onClick:S,"data-bs-toggle":"modal","data-bs-target":`#${h.id}`,children:"Confirm"})})})]})]})},a={uid:"1",id:"1210",date:"18/04/2023",tittle:"Work",category:"Salary Issue",description:"My last month Salary Was not Credit My Account",remarks:"pls Clear my Issue Quickly",status:"Pending"},H=[a,{...a,uid:"2"},{...a,uid:"3"},{...a,uid:"4"},{...a,uid:"5"},{...a,uid:"6"},{...a,uid:"7"},{...a,uid:"8"},{...a,uid:"9"},{...a,uid:"10"},{...a,uid:"11"},{...a,uid:"12"},{...a,uid:"13"}],B=()=>{const u=C(),d=w({load:async({states:t})=>{var n,m;try{const s={sortBy:(n=t.sortState)==null?void 0:n.sortBy,sortOrder:(m=t.sortState)==null?void 0:m.sortOrder,limit:t.paginationState.limit,page:t.paginationState.page};console.log({inputParameters:s});const i=await D.helpDesk.getMany.mutate(s);return console.log({result:i}),{totalCount:i.totalCount,items:i.items}}catch(s){return N(s,u),{error:Error("Something went wrong")}}}});return l(f,{gap:"3",children:[e(g,{title:e(g.Title,{}),actions:e(T,{})}),l(r.Row,{children:[e(r.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"ID"})}),e(r.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"Tittle"})}),l(r.Row,{children:[e(r.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"From"})}),e(r.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"To"})}),e(r.Col,{className:"py-2",cols:["12","md-2"],children:e(v,{variant:"primary",className:"w-100",children:"Search"})})]})]}),e(b,{children:e(x,{...d,columns:[{id:"2",key:"id",label:"ID"},{id:"3",key:"",label:"Date",renderCell:t=>e(k,{children:t.date?new Intl.DateTimeFormat("en-US",{year:"numeric",month:"numeric",day:"numeric"}).format(new Date(t.date)):""})},{id:"4",key:"tittle",label:"Tittle"},{id:"5",key:"category",label:"Category",renderCell:t=>e(y,{children:t.category.name})},{id:"6",key:"description",label:"Description"},{id:"7",key:"remarks",label:"Remarks"},{id:"8",key:"status",label:"Status",renderCell:t=>e(y,{transform:"capitalize",color:t.status.name==="resolved"?"success":t.status.name==="cancelled"?"danger":"warning",children:t.status.name})}]})})]})};export{B as HelpDeskPage,B as default,a as helpDesk,H as helpDesks};
