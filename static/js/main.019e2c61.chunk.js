(this["webpackJsonpimage-rotator"]=this["webpackJsonpimage-rotator"]||[]).push([[0],[,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(4),i=n.n(s),r=(n(9),n(10),n(11),n(0));var o=function(){return Object(r.jsx)("div",{className:"navbar",children:Object(r.jsx)("h3",{children:"Image Rotator"})})},d=n(2);n(13);var j=function(){return Object(r.jsxs)("div",{className:"sidebar h-100",children:[Object(r.jsx)("div",{className:"sideBarSectionTop",children:Object(r.jsx)("input",{id:"uploadImageButton",className:"button button-blue",type:"button",value:"Upload Image"})}),Object(r.jsx)("div",{className:"horizontalBreak"}),Object(r.jsxs)("div",{className:"sideBarSectionMiddle",children:[Object(r.jsx)("span",{children:Object(r.jsx)("strong",{children:"File:"})}),Object(r.jsx)("span",{children:"kitten.jpg"})]})]})},u=(n(14),{Instance:null,Init:function(e){u.Instance=e,u.Clear()},ReDraw:function(e){if(u.Clear(),e){var t=u.Instance.getContext("2d");t.drawImage(e,0,0,u.Instance.width,u.Instance.height);for(var n=t.getImageData(0,0,u.Instance.width,u.Instance.height),a=n.data,c=0;c<a.length;c+=4)a[c]=255-a[c],a[c+1]=255-a[c+1],a[c+2]=255-a[c+2];t.putImageData(n,0,0),console.log(t.getImageData(0,0,u.Instance.width,u.Instance.height))}},Clear:function(){u.Instance.getContext("2d").clearRect(0,0,u.Instance.width,u.Instance.height)},Rotate:function(){}});var l=function(e){var t=Object(a.useState)(!0),n=Object(d.a)(t,2),c=n[0],s=n[1],i=Object(a.useRef)(null);return Object(a.useEffect)((function(){s(e.Outlined)}),[e.Outlined]),Object(a.useEffect)((function(){u.Init(i.current)}),[]),Object(a.useEffect)((function(){u.ReDraw(e.LoadedImage)}),[e.LoadedImage]),Object(r.jsxs)("div",{className:"imageContainer",children:[Object(r.jsx)("canvas",{id:"myCanvas",ref:i,style:{border:c?"2px solid red":"none"}}),Object(r.jsx)("div",{id:"renderTime",children:"Render Time: HH:MM:SS"})]})};n(15);var b=function(){var e=Object(a.useState)(!0),t=Object(d.a)(e,2),n=t[0],c=(t[1],Object(a.useState)(null)),s=Object(d.a)(c,2),i=s[0],o=s[1];return Object(a.useEffect)((function(){var e=new Image;e.onload=function(){o(e)},e.src="/image-rotator/default.png"}),[]),Object(r.jsxs)("div",{className:"content",children:[Object(r.jsx)(j,{LoadImage:o}),Object(r.jsx)(l,{LoadedImage:i,Outlined:n})]})};var O=function(){return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(o,{}),Object(r.jsx)(b,{})]})};i.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(O,{})}),document.getElementById("root"))}],[[16,1,2]]]);
//# sourceMappingURL=main.019e2c61.chunk.js.map