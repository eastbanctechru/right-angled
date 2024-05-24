!function(b,m){"use strict";var w,r=b.document;w=function(){var u,A,d,f,o,s={},c={},C=!1,v=[];return c={buttons:{holder:'<nav class="alertify-buttons">{{buttons}}</nav>',submit:'<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok" />{{ok}}</button>',ok:'<a href="#" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</a>',cancel:'<a href="#" class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</a>'},input:'<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',message:'<p class="alertify-message">{{message}}</p>',log:'<article class="alertify-log{{class}}">{{message}}</article>'},u=function(t){return r.getElementById(t)},{alert:function(t,e,n){return s.dialog(t,"alert",e,"",n),this},confirm:function(t,e,n){return s.dialog(t,"confirm",e,"",n),this},extend:(s={labels:{ok:"OK",cancel:"Cancel"},delay:5e3,addListeners:function(t){var p,E,N,x,L,e=u("alertify-resetFocus"),n=u("alertify-ok")||m,i=u("alertify-cancel")||m,l=u("alertify-text")||m,h=u("alertify-form")||m,D=typeof n<"u",g=typeof i<"u",k=typeof l<"u",F="",y=this;p=function(a){typeof a.preventDefault<"u"&&a.preventDefault(),N(a),typeof l<"u"&&(F=l.value),"function"==typeof t&&t(!0,F)},E=function(a){typeof a.preventDefault<"u"&&a.preventDefault(),N(a),"function"==typeof t&&t(!1)},N=function(a){y.hide(),y.unbind(r.body,"keyup",x),y.unbind(e,"focus",L),k&&y.unbind(h,"submit",p),D&&y.unbind(n,"click",p),g&&y.unbind(i,"click",E)},x=function(a){var S=a.keyCode;32===S&&!k&&p(a),27===S&&g&&E(a)},this.bind(e,"focus",L=function(a){k?l.focus():g?i.focus():n.focus()}),D&&this.bind(n,"click",p),g&&this.bind(i,"click",E),this.bind(r.body,"keyup",x),k&&this.bind(h,"submit",p),b.setTimeout(function(){l?(l.focus(),l.select()):n.focus()},50)},bind:function(t,e,n){"function"==typeof t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n)},build:function(t){var e="",n=t.type,l=t.cssClass||"";switch(e+='<div class="alertify-dialog">',"prompt"===n&&(e+='<form id="alertify-form">'),e+='<article class="alertify-inner">',e+=c.message.replace("{{message}}",t.message),"prompt"===n&&(e+=c.input),e+=c.buttons.holder,e+="</article>","prompt"===n&&(e+="</form>"),e+='<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>',e+="</div>",n){case"confirm":e=(e=e.replace("{{buttons}}",c.buttons.cancel+c.buttons.ok)).replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"prompt":e=(e=e.replace("{{buttons}}",c.buttons.cancel+c.buttons.submit)).replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"alert":e=(e=e.replace("{{buttons}}",c.buttons.ok)).replace("{{ok}}",this.labels.ok)}return f.className="alertify alertify-show alertify-"+n+" "+l,d.className="alertify-cover",e},close:function(t,e){var n=e&&!isNaN(e)?+e:this.delay;this.bind(t,"click",function(){o.removeChild(t)}),setTimeout(function(){typeof t<"u"&&t.parentNode===o&&o.removeChild(t)},n)},dialog:function(t,e,n,i,l){A=r.activeElement;var h=function(){f&&null!==f.scrollTop||h()};if("string"!=typeof t)throw new Error("message must be a string");if("string"!=typeof e)throw new Error("type must be a string");if(typeof n<"u"&&"function"!=typeof n)throw new Error("fn must be a function");return"function"==typeof this.init&&(this.init(),h()),v.push({type:e,message:t,callback:n,placeholder:i,cssClass:l}),C||this.setup(),this},extend:function(t){if("string"!=typeof t)throw new Error("extend method must have exactly one paramter");return function(e,n){return this.log(e,t,n),this}},hide:function(){v.splice(0,1),v.length>0?this.setup():(C=!1,f.className="alertify alertify-hide alertify-hidden",d.className="alertify-cover alertify-hidden",A.focus())},init:function(){r.createElement("nav"),r.createElement("article"),r.createElement("section"),(d=r.createElement("div")).setAttribute("id","alertify-cover"),d.className="alertify-cover alertify-hidden",r.body.appendChild(d),(f=r.createElement("section")).setAttribute("id","alertify"),f.className="alertify alertify-hidden",r.body.appendChild(f),(o=r.createElement("section")).setAttribute("id","alertify-logs"),o.className="alertify-logs",r.body.appendChild(o),r.body.setAttribute("tabindex","0"),delete this.init},log:function(t,e,n){var i=function(){o&&null!==o.scrollTop||i()};return"function"==typeof this.init&&(this.init(),i()),this.notify(t,e,n),this},notify:function(t,e,n){var i=r.createElement("article");i.className="alertify-log"+("string"==typeof e&&""!==e?" alertify-log-"+e:""),i.innerHTML=t,o.insertBefore(i,o.firstChild),setTimeout(function(){i.className=i.className+" alertify-log-show"},50),this.close(i,n)},set:function(t){var e;if("object"!=typeof t&&t instanceof Array)throw new Error("args must be an object");for(e in t)t.hasOwnProperty(e)&&(this[e]=t[e])},setup:function(){var t=v[0];C=!0,f.innerHTML=this.build(t),"string"==typeof t.placeholder&&""!==t.placeholder&&(u("alertify-text").value=t.placeholder),this.addListeners(t.callback)},unbind:function(t,e,n){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent&&t.detachEvent("on"+e,n)}}).extend,init:s.init,log:function(t,e,n){return s.log(t,e,n),this},prompt:function(t,e,n,i){return s.dialog(t,"prompt",e,n,i),this},success:function(t,e){return s.log(t,"success",e),this},error:function(t,e){return s.log(t,"error",e),this},set:function(t){s.set(t)},labels:s.labels}},"function"==typeof define?define([],function(){return new w}):typeof b.alertify>"u"&&(b.alertify=new w)}(this);