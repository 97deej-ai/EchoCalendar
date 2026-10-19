/** Parent-only calendar utilities. No changes to Olivia's World. */
export const localDay = (d:Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const shiftDay = (day:string, offset:number) => { const d=new Date(`${day}T12:00:00`); d.setDate(d.getDate()+offset); return localDay(d); };
export const startOfWeek = (day:string, firstDay:0|1=0) => shiftDay(day,-((new Date(`${day}T12:00:00`).getDay()-firstDay+7)%7));
export const calendarMonthDays = (day:string, firstDay:0|1=0) => { const first=startOfWeek(day.slice(0,7)+'-01',firstDay); const end=new Date(Number(day.slice(0,4)),Number(day.slice(5,7)),0); const last=localDay(end); const total=Math.ceil((Math.round((+new Date(last+'T12:00:00')-+new Date(first+'T12:00:00'))/86400000)+1)/7)*7; return Array.from({length:total},(_,i)=>shiftDay(first,i)); };
export type RecurringEvent={event_date:string;repeat:string};
export function occursOn(e:RecurringEvent,day:string,exceptions:ReadonlySet<string>=new Set()):boolean{
 if(day<e.event_date||exceptions.has(day))return false;
 if(e.repeat==='none'||!e.repeat)return day===e.event_date;
 const a=new Date(e.event_date+'T12:00:00'),b=new Date(day+'T12:00:00');
 const diff=Math.round((+b-+a)/86400000);
 if(e.repeat==='daily')return true;
 if(e.repeat==='weekly')return diff%7===0;
 if(e.repeat==='monthly')return a.getDate()===b.getDate();
 if(e.repeat==='yearly')return a.getDate()===b.getDate()&&a.getMonth()===b.getMonth();
 return day===e.event_date;
}
/** Cache is deliberately session-only: browser closes/sign-out clears private calendar data. */
export function saveSessionSnapshot(key:string,data:unknown){try{sessionStorage.setItem(key,JSON.stringify({at:Date.now(),data}));}catch{/* quota/private mode */}}
export function readSessionSnapshot<T>(key:string):{at:number;data:T}|null{try{const v=JSON.parse(sessionStorage.getItem(key)||'null');return v&&typeof v.at==='number'&&v.data? v:null;}catch{return null}}
export function clearSessionSnapshot(key:string){try{sessionStorage.removeItem(key)}catch{/* blocked storage */}}
