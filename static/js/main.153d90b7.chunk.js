(this["webpackJsonpimage-rotator"]=this["webpackJsonpimage-rotator"]||[]).push([[0],[,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),i=a(4),r=a.n(i),s=(a(9),a(10),a(11),a(0));var d=function(){return Object(s.jsx)("div",{className:"navbar",children:Object(s.jsx)("h3",{children:"Image Rotator"})})},l=a(2);a(13);var o=function(e){var t=Object(n.useState)(e.defaultFile.name),a=Object(l.a)(t,2),c=a[0],i=a[1],r=Object(n.useState)(e.defaultFile.width),d=Object(l.a)(r,2),o=d[0],u=d[1],j=Object(n.useState)(e.defaultFile.height),b=Object(l.a)(j,2),h=b[0],O=b[1],g=Object(n.useState)(0),f=Object(l.a)(g,2),m=f[0],v=f[1],x=Object(n.useRef)(null),p=Object(n.useState)(null),C=Object(l.a)(p,2),w=C[0],I=C[1],R=Object(n.useState)(!1),D=Object(l.a)(R,2),y=D[0],S=D[1];Object(n.useEffect)((function(){I(x.current)}),[]);var k=function(t){if(t){var a=new Image;a.src=t,a.onload=function(){w.width=a.width,w.height=a.height,w.getContext("2d").drawImage(a,0,0);var t=w.getContext("2d").getImageData(0,0,w.width,w.height);e.loadImageData(t),u(a.width),O(a.height)}}};return!y&&w&&(k("/image-rotator/default.png"),S(!0)),Object(s.jsxs)("div",{className:"sidebar",children:[Object(s.jsxs)("div",{className:"sideBarSectionTop",children:[Object(s.jsx)("input",{id:"uploadImageButton",className:"btn btn-blue btn-large",type:"button",value:"Upload Image",onClick:function(){document.getElementById("imageLoader").value=null,document.getElementById("imageLoader").click()}}),Object(s.jsx)("input",{id:"imageLoader",type:"file",accept:"image/*",onChange:function(e){if(e&&0!==e.target.files.length){var t=e.target.files[0];if(t.type.match("image.*")){var a=new FileReader;a.readAsDataURL(t),a.onload=function(e){e.target.readyState===FileReader.DONE&&(k(e.target.result),i(t.name))}}}},hidden:!0}),Object(s.jsx)("canvas",{ref:x,style:{display:"none"}})]}),Object(s.jsx)("div",{className:"horizontalBreak"}),Object(s.jsxs)("div",{className:"sideBarSectionMiddle",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:Object(s.jsx)("b",{children:"File: "})}),Object(s.jsx)("span",{children:c})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:Object(s.jsx)("b",{children:"Width:"})}),Object(s.jsx)("span",{children:o})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:Object(s.jsx)("b",{children:"Height:"})}),Object(s.jsx)("span",{children:h})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("span",{children:Object(s.jsx)("b",{children:"Rotate:"})}),Object(s.jsxs)("span",{children:[Object(s.jsx)("input",{id:"inputAngle",type:"text",maxLength:"4",size:"2",onChange:function(e){return v(e.target.value)}}),Object(s.jsx)("input",{type:"button",className:"btn btn-blue btn-small",value:"Apply",onClick:function(){e.tryRotate(m)}})]})]}),Object(s.jsxs)("div",{className:"hoverPointer",children:[Object(s.jsx)("label",{htmlFor:"outlineCheckbox",children:"Outlined"}),Object(s.jsx)("input",{type:"checkbox",id:"outlineCheckbox",checked:e.outlined,onChange:function(t){return e.setOutlined(t.target.checked)}})]})]})]})};a(14);function u(e,t){if(Math.abs(t)%(2*Math.PI)===0)return e;if(e.data.length/4!==e.width*e.height)return null;var a=function(e,t){for(var a=new Uint8ClampedArray(t),n=0;n<t;n+=4)a[n+0]=255-e[n+0],a[n+1]+=255-e[n+1],a[n+2]+=255-e[n+2],a[n+3]=255;return a}(e.data,e.data.length);return new ImageData(a,e.width,e.height)}var j={Canvas:null,BackupData:null,Init:function(e){j.Canvas=e,j.Clear()},ReDraw:function(e){(j.BackupData=e,j.Clear(),e)&&(j.Canvas.width=e.width,j.Canvas.height=e.height,j.Canvas.getContext("2d").putImageData(e,0,0))},Rotate:function(e,t){j.Recall();var a=j.Canvas.getContext("2d"),n=a.getImageData(0,0,j.Canvas.width,j.Canvas.height),c=performance.now(),i=u(n,e);a.putImageData(i,0,0),t(performance.now()-c)},Clear:function(){j.Canvas.getContext("2d").clearRect(0,0,j.Canvas.width,j.Canvas.height)},Recall:function(){j.BackupData&&j.ReDraw(j.BackupData)}};var b=function(e){var t=Object(n.useState)(!0),a=Object(l.a)(t,2),c=a[0],i=a[1],r=Object(n.useState)(0),d=Object(l.a)(r,2),o=d[0],u=d[1],b=Object(n.useRef)(null);return Object(n.useEffect)((function(){j.Init(b.current)}),[]),Object(n.useEffect)((function(){i(e.outlined)}),[e.outlined]),Object(n.useEffect)((function(){j.ReDraw(e.loadedImageData)}),[e.loadedImageData]),Object(n.useEffect)((function(){e.rotated||(j.Rotate(e.rotateAngle,u),e.setRotated(!0))}),[e]),Object(s.jsxs)("div",{className:"imageContainer",children:[Object(s.jsx)("canvas",{id:"myCanvas",ref:b,style:{border:c?"2px solid red":"none"}}),Object(s.jsxs)("div",{id:"renderTime",children:["Rendered in: ",o," miliseconds"]}),Object(s.jsxs)("div",{id:"roateDegree",children:["Rotated: ",e.rotateAngle," degree"]})]})},h=(a(15),{name:"default.png",width:440,height:250});var O=function(){var e=Object(n.useState)(!0),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(null),r=Object(l.a)(i,2),d=r[0],u=r[1],j=Object(n.useState)(null),O=Object(l.a)(j,2),g=O[0],f=O[1],m=Object(n.useState)(!0),v=Object(l.a)(m,2),x=v[0],p=v[1];return Object(s.jsxs)("div",{className:"content",children:[Object(s.jsx)(o,{loadImageData:u,defaultFile:h,tryRotate:function(e){var t=parseInt(e);!isNaN(t)&&Number.isInteger(t)?(f(t),p(!1)):alert("Given angle is not a valid number!")},setOutlined:c,outlined:a}),Object(s.jsx)(b,{loadedImageData:d,outlined:a,rotateAngle:g,rotated:x,setRotated:p})]})};var g=function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(d,{}),Object(s.jsx)(O,{})]})};r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}],[[16,1,2]]]);
//# sourceMappingURL=main.153d90b7.chunk.js.map