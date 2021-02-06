(this["webpackJsonpimage-rotator"]=this["webpackJsonpimage-rotator"]||[]).push([[0],[,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),i=a(4),s=a.n(i),r=(a(9),a(10),a(11),a(0));var l=function(){return Object(r.jsx)("div",{className:"navbar",children:Object(r.jsx)("h3",{children:"Image Rotator"})})},d=a(2);a(13);var o=function(e){var t=Object(n.useState)(e.defaultFile.name),a=Object(d.a)(t,2),c=a[0],i=a[1],s=Object(n.useState)(e.defaultFile.width),l=Object(d.a)(s,2),o=l[0],j=l[1],u=Object(n.useState)(e.defaultFile.height),b=Object(d.a)(u,2),h=b[0],O=b[1],g=Object(n.useState)(0),f=Object(d.a)(g,2),x=f[0],m=f[1],v=Object(n.useRef)(null),p=Object(n.useState)(null),C=Object(d.a)(p,2),w=C[0],R=C[1],D=Object(n.useState)(!1),I=Object(d.a)(D,2),y=I[0],S=I[1];Object(n.useEffect)((function(){R(v.current)}),[]);var k=function(t){if(t){var a=new Image;a.src=t,a.onload=function(){w.width=a.width,w.height=a.height,w.getContext("2d").drawImage(a,0,0);var t=w.getContext("2d").getImageData(0,0,w.width,w.height);e.loadImageData(t),j(a.width),O(a.height)}}};return!y&&w&&(k("/image-rotator/default.png"),S(!0)),Object(r.jsxs)("div",{className:"sidebar h-100",children:[Object(r.jsxs)("div",{className:"sideBarSectionTop",children:[Object(r.jsx)("input",{id:"uploadImageButton",className:"btn btn-blue btn-large",type:"button",value:"Upload Image",onClick:function(){document.getElementById("imageLoader").click()}}),Object(r.jsx)("input",{id:"imageLoader",type:"file",accept:"image/*",onChange:function(e){if(e&&0!==e.target.files.length){var t=e.target.files[0];if(t.type.match("image.*")){var a=new FileReader;a.readAsDataURL(t),a.onload=function(e){e.target.readyState===FileReader.DONE&&(k(e.target.result),i(t.name))}}}},hidden:!0}),Object(r.jsx)("canvas",{ref:v,style:{display:"none"}})]}),Object(r.jsx)("div",{className:"horizontalBreak"}),Object(r.jsxs)("div",{className:"sideBarSectionMiddle",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:Object(r.jsx)("b",{children:"File: "})}),Object(r.jsx)("span",{children:c})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:Object(r.jsx)("b",{children:"Width:"})}),Object(r.jsx)("span",{children:o})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:Object(r.jsx)("b",{children:"Height:"})}),Object(r.jsx)("span",{children:h})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("span",{children:Object(r.jsx)("b",{children:"Rotate:"})}),Object(r.jsxs)("span",{children:[Object(r.jsx)("input",{id:"inputAngle",type:"text",maxLength:"3",size:"3",onChange:function(e){return m(e.target.value)}}),Object(r.jsx)("input",{type:"button",className:"btn btn-blue btn-small",value:"Apply",onClick:function(){e.tryRotate(x)}})]})]}),Object(r.jsxs)("div",{className:"hoverPointer",children:[Object(r.jsx)("label",{for:"outlineCheckbox",children:"Outlined"}),Object(r.jsx)("input",{type:"checkbox",id:"outlineCheckbox",onChange:function(t){return e.setOutlined(t.target.checked)}})]})]})]})};a(14);var j={Canvas:null,BackupData:null,Init:function(e){j.Canvas=e,j.Clear()},ReDraw:function(e){(j.BackupData=e,j.Clear(),e)&&(j.Canvas.width=e.width,j.Canvas.height=e.height,j.Canvas.getContext("2d").putImageData(e,0,0))},Rotate:function(e,t){j.Reset(),console.log("rotate angle");j.Canvas.getContext("2d").getImageData(0,0,j.Canvas.width,j.Canvas.height);var a=performance.now();console.log(function(e,t){var a=new Uint8ClampedArray(4e4);return new ImageData(a,100,100)}()),t(performance.now()-a)},Clear:function(){j.Canvas.getContext("2d").clearRect(0,0,j.Canvas.width,j.Canvas.height)},Reset:function(){j.BackupData&&j.ReDraw(j.BackupData)}};var u=function(e){var t=Object(n.useState)(!0),a=Object(d.a)(t,2),c=a[0],i=a[1],s=Object(n.useState)(0),l=Object(d.a)(s,2),o=l[0],u=l[1],b=Object(n.useRef)(null);return Object(n.useEffect)((function(){j.Init(b.current)}),[]),Object(n.useEffect)((function(){i(e.outlined)}),[e.outlined]),Object(n.useEffect)((function(){j.ReDraw(e.loadedImageData)}),[e.loadedImageData]),Object(n.useEffect)((function(){e.rotated||(j.Rotate(e.rotateAngle,u),e.setRotated(!0))}),[e]),Object(r.jsxs)("div",{className:"imageContainer",children:[Object(r.jsx)("canvas",{id:"myCanvas",ref:b,style:{border:c?"2px solid red":"none"}}),Object(r.jsxs)("div",{id:"renderTime",children:["Render Time: ",o," miliseconds"]})]})},b=(a(15),{name:"default.png",width:440,height:250});var h=function(){var e=Object(n.useState)(!0),t=Object(d.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(null),s=Object(d.a)(i,2),l=s[0],j=s[1],h=Object(n.useState)(null),O=Object(d.a)(h,2),g=O[0],f=O[1],x=Object(n.useState)(!0),m=Object(d.a)(x,2),v=m[0],p=m[1];return Object(r.jsxs)("div",{className:"content",children:[Object(r.jsx)(o,{loadImageData:j,defaultFile:b,tryRotate:function(e){f(e),p(!1)},setOutlined:c}),Object(r.jsx)(u,{loadedImageData:l,outlined:a,rotateAngle:g,rotated:v,setRotated:p})]})};var O=function(){return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(l,{}),Object(r.jsx)(h,{})]})};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(O,{})}),document.getElementById("root"))}],[[16,1,2]]]);
//# sourceMappingURL=main.86dc1f12.chunk.js.map