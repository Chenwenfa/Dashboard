this.workbox=this.workbox||{},this.workbox.cacheableResponse=function(s){"use strict";try{self["workbox:cacheable-response:6.1.5"]&&_()}catch(s){}class t{constructor(s={}){this.j=s.statuses,this.O=s.headers}isResponseCacheable(s){let t=!0;return this.j&&(t=this.j.includes(s.status)),this.O&&t&&(t=Object.keys(this.O).some((t=>s.headers.get(t)===this.O[t]))),t}}return s.CacheableResponse=t,s.CacheableResponsePlugin=class{constructor(s){this.cacheWillUpdate=async({response:s})=>this.B.isResponseCacheable(s)?s:null,this.B=new t(s)}},s}({});
