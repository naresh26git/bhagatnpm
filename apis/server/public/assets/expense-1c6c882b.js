import{j as e,F as r,b as t,S as c,G as a,B as n,d,T as m}from"./index-57e051c1.js";import{u as i,D as p}from"./DataGrid-ad7d820c.js";import"./Checkbox-3b8794ba.js";const l=[{uid:"1",empcode:"1210",details:"Trip to Kerala",amount:"$2000",status:"Approved"},{uid:"2",empcode:"1342",details:"Trip to Ooty",amount:"$1200",status:"Declined"},{uid:"3",empcode:"1123",details:"Trip to Maharastra",amount:"$2500",status:"Approved"},{uid:"4",empcode:"1986",details:"Trip to Kanyakumari",amount:"$1700",status:"Pending"}],N=()=>{const s=i({load:async o=>({items:l,totalCount:l.length})});return e(r,{children:t(c,{gap:"3",children:[t(a.Row,{children:[e(a.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"Emp Code"})}),e(a.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"From"})}),e(a.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"DOJ"})}),t(a.Row,{children:[e(a.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"Emp Name"})}),e(a.Col,{className:"py-2",cols:["12","md-2"],children:e("input",{type:"text",className:"form-control form-control-sm",placeholder:"To"})}),e(a.Col,{className:"py-2",cols:["12","md-2"],children:e(n,{variant:"primary",className:"w-100",children:"Search"})})]})]}),e(d,{children:e(p,{...s,columns:[{id:"1",key:"uid",label:"S.No"},{id:"2",key:"empcode",label:"Expence ID"},{id:"3",key:"details",label:"Details"},{id:"4",key:"amount",label:"Amount"},{id:"5",key:"status",label:"Status",renderCell:o=>e(m,{color:o.status==="Approved"?"success":o.status==="Declined"?"danger":"warning",children:o.status})}]})})]})})};export{N as default,l as expence};
