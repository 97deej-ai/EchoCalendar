// Public ICS feed proxy. No credentials, internal hosts or arbitrary HTTP destinations.
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
const MAX_BYTES=3_000_000;
function allowedAddress(ip){
 if(isIP(ip)===4){const a=ip.split('.').map(Number);return !(a[0]===0||a[0]===10||a[0]===127||a[0]>=224||(a[0]===169&&a[1]===254)||(a[0]===172&&a[1]>=16&&a[1]<=31)||(a[0]===192&&a[1]===168)||(a[0]===100&&a[1]>=64&&a[1]<=127)||(a[0]===192&&a[1]===0)||(a[0]===198&&a[1]>=18&&a[1]<=19));}
 if(isIP(ip)===6){const v=ip.toLowerCase();return !(v==='::1'||v==='::'||v.startsWith('fc')||v.startsWith('fd')||v.startsWith('fe8')||v.startsWith('fe9')||v.startsWith('fea')||v.startsWith('feb')||v.startsWith('::ffff:'));}
 return false;
}
async function validate(url){
 const u=new URL(url);
 if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||!u.hostname.includes('.')||isIP(u.hostname))throw Error('Use a public HTTPS calendar URL.');
 const ips=await lookup(u.hostname,{all:true,verbatim:true});if(!ips.length||ips.some(x=>!allowedAddress(x.address)))throw Error('Calendar host is not public.');
 return u;
}
async function requireAdult(request){
 const bearer=request.headers.get('authorization')||'';
 if(!/^Bearer [A-Za-z0-9._~-]+$/.test(bearer))throw Error('Sign in as an authorized adult.');
 const base=process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL;
 const key=process.env.SUPABASE_ANON_KEY||process.env.VITE_SUPABASE_ANON_KEY;
 if(!base||!key)throw Error('Calendar service not configured.');
 const headers={'apikey':key,'authorization':bearer};
 const user=await fetch(new URL('/auth/v1/user',base),{headers,signal:AbortSignal.timeout(7000)});
 if(!user.ok)throw Error('Session expired or invalid.');
 const adult=await fetch(new URL('/rest/v1/rpc/echo_is_parent_adult',base),{
  method:'POST',headers:{...headers,'content-type':'application/json'},body:'{}',signal:AbortSignal.timeout(7000)
 });
 if(!adult.ok||await adult.json()!==true)throw Error('Adult calendar access required.');
}
export default async (request)=>{
 if(request.method!=='POST')return new Response('Method not allowed',{status:405});
 try{
  await requireAdult(request);
  const {url}=await request.json();if(typeof url!=='string'||url.length>2048)throw Error('Invalid calendar URL');
  let current=(await validate(url.replace(/^webcal:\/\//i,'https://'))).toString();
  for(let i=0;i<4;i++){
   await validate(current);
   const response=await fetch(current,{redirect:'manual',signal:AbortSignal.timeout(12000),headers:{Accept:'text/calendar'}});
   if([301,302,303,307,308].includes(response.status)){const location=response.headers.get('location');if(!location)throw Error('Invalid calendar redirect');current=new URL(location,current).toString();continue;}
   if(!response.ok)throw Error('Calendar server returned '+response.status);
   if(Number(response.headers.get('content-length')||0)>MAX_BYTES)throw Error('Calendar is too large');
   const reader=response.body?.getReader();if(!reader)throw Error('Empty response');const chunks=[];let bytes=0;
   while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>MAX_BYTES){await reader.cancel();throw Error('Calendar is too large')}chunks.push(value)}
   const raw=new TextDecoder().decode(Buffer.concat(chunks.map(x=>Buffer.from(x))));
   if(!raw.includes('BEGIN:VCALENDAR'))throw Error('URL did not return an ICS calendar');
   return new Response(raw,{status:200,headers:{'content-type':'text/calendar; charset=utf-8','cache-control':'no-store'}});
  }
  throw Error('Too many redirects');
 }catch(err){return Response.json({error:err instanceof Error?err.message:'Unable to fetch calendar'},{status:400,headers:{'cache-control':'no-store'}})}
};
export const config={path:'/api/ics-feed'};
