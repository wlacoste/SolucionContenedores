"use strict";(self.webpackChunkvisualizador=self.webpackChunkvisualizador||[]).push([[946],{1946:function(e,o,n){n.r(o),n.d(o,{ContenedorContext:function(){return O},default:function(){return L}});var r=n(9439),i=n(2791),t=n(7773),a=n(2095),c=n(8029),s=n(2770),l=n(3520),u=n(5892),d=n(7760),m=n(184),p=function(e){return new d.Vector3(e.length/2,e.height/2,e.width/2)};function h(e){var o=e.contenedor,n=(0,i.useMemo)((function(){return{wireFrame:!0,color:{value:"#001f47"},opacity:{value:.5,min:0,max:1,step:.1}}}),[]),t=(0,c.M4)("Contenedor",n),a=(0,i.useState)(!1),s=(0,r.Z)(a,2),l=s[0],u=s[1];return(0,m.jsxs)("mesh",{position:p(o),scale:1,onPointerOut:function(e){return u(!1)},onPointerOver:function(e){return u(!0)},children:[(0,m.jsx)("boxGeometry",{args:[o.length,o.height,o.width]}),(0,m.jsx)("meshStandardMaterial",{color:l?"red":t.color,opacity:t.opacity,transparent:!0,wireframe:t.wireFrame})]})}var v="estilos_divContainer__G9Vpl",f="estilos_GeometryContainer__fmgRW",x=n(1413);var g=function(e){var o=(0,i.useRef)(),n=(0,i.useState)(!1),t=(0,r.Z)(n,2),a=(t[0],t[1]);return(0,i.createElement)("mesh",(0,x.Z)((0,x.Z)({},e),{},{key:e.ikey+"C",ref:o,scale:1,onPointerOut:function(e){return a(!1)},onPointerOver:function(e){return a(!0)}}),(0,m.jsx)("boxGeometry",{args:e.scale}),e.esmaterial?(0,m.jsx)("meshPhysicalMaterial",(0,x.Z)((0,x.Z)({},e),{},{castShadow:!0,receiveShadow:!0,transparent:!0}),e.ikey+e.ikey):(0,m.jsx)("meshNormalMaterial",{opacity:.75,transparent:!0,wireframe:e.wireframe}))},j=function(e){return[(0,c.M4)("Paquetes 1",{color:"#6B9FFF"}),(0,c.M4)("Paquetes 2",{color:"#EF67F5"}),(0,c.M4)("Paquetes 3",{color:"#6DE896"}),(0,c.M4)("Paquetes 4",{color:"#FFF36B"}),(0,c.M4)("Paquetes 5",{color:"#F58D50"})]};function _(e){var o=(0,i.useMemo)((function(){return{material:!1,opacidad:{value:.7,min:0,max:1,step:.1},ior:{value:1.33,min:1,max:2.333,step:.01},transmision:{value:0,min:0,max:1,step:.01},rugosidad:{value:0,min:0,max:1,step:.01},grosor:{value:10,min:0,max:20,step:.5}}}),[]),n=(0,c.M4)("Paquetes",o),r=j(e.map((function(e){return e.id})));return e.map((function(e,o){return(0,m.jsx)(g,{color:r[e.id-1].color,esmaterial:n.material,ior:n.ior,nombre:e.id,opacity:n.opacidad,position:b(e),roughness:n.rugosidad,scale:[e.packDimX-.1,e.packDimY-.1,e.packDimZ-.1],thickness:n.grosor,transmission:n.transmision,wireframe:!1},o)}))}var b=function(e){return[e.coordX+e.packDimX/2,e.coordY+e.packDimY/2,e.coordZ+e.packDimZ/2]};(0,t.e)({TextGeometry:a.M});var q=function(e){var o=e.cajas,n=e.contenedor;console.log("contenedores en geometry container",n);var r=(0,i.useMemo)((function(){return{intensity:{value:0,min:0,max:10,step:.5},x:{value:0,min:-100,max:100,step:5},y:{value:0,min:-100,max:100,step:5},z:{value:100,min:-100,max:100,step:5},ambientLightOn:{value:0,min:0,max:1,step:1},background:!1}}),[]),t=(0,c.M4)("Luz",r);return(0,m.jsxs)("div",{className:v,children:[(0,m.jsx)(c.Zf,{collapsed:!0,theme:{colors:{elevation1:"#d71920",elevation2:"#fcfdff",elevation3:"#e1e3e8",accent1:"#dbdbdb",accent2:"#ff3939",accent3:"#fafafa",highlight1:"#ffffff",highlight2:"#404248",highlight3:"#655656",vivid1:"#ffcc00"}}}),(0,m.jsx)("section",{className:f,children:(0,m.jsxs)(u.Xz,{shadows:!0,camera:{position:[20,50,100],fov:50},children:[(0,m.jsx)(s.qA,{background:t.background,blur:.1,files:"./img/thatch_chapel_1k.hdr"}),(0,m.jsx)("directionalLight",{castShadow:!0,intensity:t.intensity,position:[t.x,t.z,t.y],"shadow-camera-bottom":-10,"shadow-camera-far":50,"shadow-camera-left":-10,"shadow-camera-right":10,"shadow-camera-top":10,"shadow-mapSize-height":1024,"shadow-mapSize-width":1024}),_(o),(0,m.jsx)(h,{contenedor:n}),(0,m.jsx)("gridHelper",{args:[500,50,15597568,15658734]}),(0,m.jsx)("axesHelper",{args:[5]}),(0,m.jsx)(l.z,{}),(0,m.jsx)("primitive",{object:new d.AxesHelper(500)})]})})]})},C=n(6579),w=n(4781),y=n(7246);var Z={solucionContenedor:"estilos_solucionContenedor__iEzm6"};function k(){var e=(0,i.useState)(1),o=(0,r.Z)(e,2),n=o[0],t=o[1],a=(0,C.C)(w.FF),c=a.data,s=Math.ceil(c.length/1),l=1*n,u=l-1,d=c.slice(u,l),p=(0,i.useContext)(O),h=(0,r.Z)(p,2),v=h[0];h[1];if(void 0==a||0==a.data.length)return(0,m.jsx)("div",{children:(0,m.jsx)(q,{cajas:[],contenedor:{id:0,length:0,height:0,width:0,volume:0}})});var f;return(0,m.jsxs)("div",{children:[(0,m.jsx)(y.Z,{count:s,page:n,onChange:function(e,o){t(o)}}),(0,m.jsx)("section",{className:Z.cardContainer,children:(f=d,f.map((function(e,o){var n=e.map((function(e,n){var r=function(e,o){var n=o.filter((function(o){return o.id===e}));return 0===n.length?{id:1,length:10,height:10,width:10,volume:10}:n[0]}(e.containerID,v);return e.algorithmPackingResults.map((function(e,i){return(0,m.jsx)("div",{className:Z.solucionContenedor,children:(0,m.jsx)(q,{cajas:e.packedItems,contenedor:r})},"{".concat(o," + ").concat(n," + ").concat(i))}))}));return n})))})]})}var I=n(4165),N=n(5861),F=n(5567),P=n(3966),R=n(1641),z=n(1134),D=n(8007),M=n(4695),B=n(7108),S=n(9968),V={tarjetaform:"Input_tarjetaform__630sk",iconosBlock:"Input_iconosBlock__UtcIh",formRoot:"Input_formRoot__IorG7",iconosRoot:"Input_iconosRoot__EaC0V",iconoDiv:"Input_iconoDiv__0Mi0A",iconoDi:"Input_iconoDi__7wApo",input:"Input_input__UvoUG",input2:"Input_input2__6kdcm",cantidad:"Input_cantidad__2tjuh",label:"Input_label__7J7XF",bottonForm:"Input_bottonForm__BOSv4",iconButton:"Input_iconButton__O3LC1"},T=(0,D.Ry)().shape({paquete:(0,D.IX)().of((0,D.Ry)().shape({largo:(0,D.Rx)().required("Campo requerido").min(.001),ancho:(0,D.Rx)().required("Campo requerido").min(.001),alto:(0,D.Rx)().required("Campo requerido").min(.001),cantidad:(0,D.Rx)().integer().positive().min(1).required("Campo requerido")})),contenedor:(0,D.IX)().of((0,D.Ry)().shape({largo:(0,D.Rx)().required("Campo requerido").min(.001),ancho:(0,D.Rx)().required("Campo requerido").min(.001),alto:(0,D.Rx)().required("Campo requerido").min(.001)}))}),X=function(e){return{id:e.id,length:e.largo,height:e.alto,width:e.ancho,volume:e.largo*e.alto*e.ancho}};function A(){var e=(0,C.T)(),o=(0,i.useContext)(O),n=(0,r.Z)(o,2),t=(n[0],n[1]),a=(0,z.cI)({defaultValues:{paquete:[{largo:null,ancho:null,alto:null,cantidad:null}],contenedor:[{largo:null,ancho:null,alto:null}]},resolver:(0,M.X)(T)}),c=a.register,s=a.handleSubmit,l=a.formState.errors,u=a.control,d=(0,z.Dq)({control:u,name:"paquete"}),p=d.fields,h=d.prepend,v=d.remove,f=(0,z.Dq)({control:u,name:"contenedor"}),g=f.fields,j=f.prepend,_=f.remove,b=function(){var o=(0,N.Z)((0,I.Z)().mark((function o(n){var r,i,a,c;return(0,I.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(r=n.paquete,i=n.contenedor,r.forEach((function(e,o){e.id=o+1})),i.forEach((function(e,o){e.id=o+1})),0!==i.length){o.next=6;break}return o.abrupt("return");case 6:a=i.map((function(e){return X(e)})),t((function(){return a})),c={paquetes:r,contenedores:a},e((0,S._)(c));case 10:case"end":return o.stop()}}),o)})));return function(e){return o.apply(this,arguments)}}();return(0,m.jsx)("div",{className:V.formRoot,children:(0,m.jsxs)("form",{onSubmit:s((function(e){b(e)})),children:[(0,m.jsxs)("div",{className:V.formulario,children:[(0,m.jsxs)("div",{className:V.bottonForm,children:[(0,m.jsx)(F.z,{color:"primary",disableRipple:!0,text:"Calcular empaquetado",type:"submit",variant:"contained",onFocusVisible:function(){}}),(0,m.jsx)(P.h,{IconProps:{icon:B.r8p},TooltipText:"",className:V.iconButton,color:"primary",size:"small",onClick:function(){h({largo:null,ancho:null,alto:null,cantidad:null})},onFocusVisible:function(){}})]}),p.map((function(e,o){var n,r,i,t;return(0,m.jsxs)("div",{children:[(0,m.jsx)(E,{debeRenderizar:o}),(0,m.jsxs)("section",{className:V.formRoot,children:[(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Largo":"",placeholder:"largo",type:"text"},c("paquete.".concat(o,".largo"),{required:!0})),{},{error:Boolean(void 0!=l.paquete&&(null===(n=l.paquete[o])||void 0===n?void 0:n.largo)),inputProps:{min:0}}))}),(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Ancho":"",placeholder:"ancho",type:"text"},c("paquete.".concat(o,".ancho"),{required:!0})),{},{error:Boolean(l.paquete&&(null===(r=l.paquete[o])||void 0===r?void 0:r.ancho)),inputProps:{min:0}}))}),(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Alto":"",placeholder:"alto",type:"number"},c("paquete.".concat(o,".alto"),{required:!0})),{},{error:Boolean(l.paquete&&(null===(i=l.paquete[o])||void 0===i?void 0:i.alto)),inputProps:{min:0}}))}),(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Cantidad":"",placeholder:"cantidad",type:"number"},c("paquete.".concat(o,".cantidad"),{required:!0})),{},{error:Boolean(l.paquete&&(null===(t=l.paquete[o])||void 0===t?void 0:t.cantidad)),inputProps:{min:1}}))}),(0,m.jsx)(P.h,{IconProps:{icon:B.XAH},TooltipText:"",color:"primary",size:"medium",onClick:function(){v(o)},onFocusVisible:function(){}})]})]},e.id)}))]}),(0,m.jsxs)("div",{className:V.formulario,children:[(0,m.jsx)("div",{className:V.bottonForm,children:(0,m.jsx)(P.h,{IconProps:{icon:B.r8p},TooltipText:"",className:V.iconButton,color:"primary",size:"small",onClick:function(){j({largo:null,ancho:null,alto:null})},onFocusVisible:function(){}})}),g.map((function(e,o){var n,r,i;return(0,m.jsxs)("div",{children:[(0,m.jsx)(E,{debeRenderizar:o}),(0,m.jsxs)("section",{className:V.formRoot,children:[(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Largo":"",placeholder:"largo",type:"text"},c("contenedor.".concat(o,".largo"),{required:!0})),{},{error:Boolean(void 0!=l.contenedor&&(null===(n=l.contenedor[o])||void 0===n?void 0:n.largo)),inputProps:{min:0}}))}),(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Ancho":"",placeholder:"ancho",type:"text"},c("contenedor.".concat(o,".ancho"),{required:!0})),{},{error:Boolean(l.contenedor&&(null===(r=l.contenedor[o])||void 0===r?void 0:r.ancho)),inputProps:{min:0}}))}),(0,m.jsx)("div",{className:V.input,children:(0,m.jsx)(R.I,(0,x.Z)((0,x.Z)({label:0==o?"Alto":"",placeholder:"alto",type:"number"},c("contenedor.".concat(o,".alto"),{required:!0})),{},{error:Boolean(l.contenedor&&(null===(i=l.contenedor[o])||void 0===i?void 0:i.alto)),inputProps:{min:0}}))}),(0,m.jsx)(P.h,{IconProps:{icon:B.XAH},TooltipText:"",color:"primary",size:"medium",onClick:function(){_(o)},onFocusVisible:function(){}})]})]},e.id)}))]})]})})}function E(e){return 0!==e.debeRenderizar?(0,m.jsx)(m.Fragment,{}):(0,m.jsxs)("div",{className:V.formRoot,children:[(0,m.jsx)("div",{className:V.iconoDi,children:(0,m.jsx)("img",{alt:"",src:"https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/profundidad.svg"})}),(0,m.jsx)("div",{className:V.iconoDi,children:(0,m.jsx)("img",{alt:"",src:"https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/ancho.svg"})}),(0,m.jsx)("div",{className:V.iconoDi,children:(0,m.jsx)("img",{alt:"",src:"https://componentesui.blob.core.windows.net/recursos/iconografia-gla/descripcion-de-envio/relleno/svg/altura.svg"})})]})}var G={root:"Visualizador_root__cg6xC",inputForm:"Visualizador_inputForm__PK92z",inputCajas:"Visualizador_inputCajas__Ds9Zz",inputContenedor:"Visualizador_inputContenedor__fdXTT"},O=i.createContext([[],function(){}]);function L(){var e=(0,i.useState)([{id:0,width:10,length:10,height:10,volume:1e3}]),o=(0,r.Z)(e,2),n=o[0],t=o[1];return(0,m.jsx)("div",{className:G.root,children:(0,m.jsxs)(O.Provider,{value:[n,t],children:[(0,m.jsx)("div",{children:(0,m.jsx)("div",{className:G.inputCajas,children:(0,m.jsx)(A,{})})}),(0,m.jsx)(k,{})]})})}}}]);
//# sourceMappingURL=946.a6c8420e.chunk.js.map