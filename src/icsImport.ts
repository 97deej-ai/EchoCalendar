/** Read-only ICS parsing for the parent interface. No imported event is written to Olivia's tables. */
export type ImportedEvent={id:string;title:string;event_date:string;event_time:string|null;member_id:null;notes:string;repeat:string;icon:string;source:string;end_date?:string;all_day?:boolean;uid?:string};
const unescape=(s:string)=>s.replace(/\\n/gi,'\n').replace(/\\,/g,',').replace(/\\;/g,';').replace(/\\\\/g,'\\');
const datePart=(s:string)=>{const m=s.match(/^(\d{4})(\d{2})(\d{2})/);return m?`${m[1]}-${m[2]}-${m[3]}`:null};
const timePart=(s:string)=>{const m=s.match(/^\d{8}T(\d{2})(\d{2})/);return m?`${m[1]}:${m[2]}`:null};
const next=(day:string,days:number)=>{const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const parseRules=(s:string)=>Object.fromEntries(s.split(';').map(x=>x.split('=').map(v=>v.trim())));
const weekday=['SU','MO','TU','WE','TH','FR','SA'];
function expand(fields:Record<string,string>,source:string):ImportedEvent[]{
 const first=datePart(fields.DTSTART||'');if(!first||!fields.SUMMARY||fields.STATUS==='CANCELLED')return [];
 const uid=fields.UID||`${first}-${fields.SUMMARY}`;
 const title=unescape(fields.SUMMARY),notes=unescape(fields.DESCRIPTION||'');
 const time=timePart(fields.DTSTART||'');const all_day=!time;
 const end=datePart(fields.DTEND||'');const rules=fields.RRULE?parseRules(fields.RRULE):null;
 const except=new Set((fields.EXDATE||'').split(',').map(datePart).filter((v):v is string=>!!v));
 const limit=next(first,730);const until=rules?.UNTIL?datePart(rules.UNTIL)||limit:limit;
 const count=rules?.COUNT?Math.min(Math.max(Number(rules.COUNT)||1,1),1000):1000;
 const interval=Math.min(Math.max(Number(rules?.INTERVAL)||1,1),365);
 const occurrences:string[]=[];
 if(!rules)occurrences.push(first);
 else {
  const start=new Date(first+'T12:00:00');
  for(let day=first,steps=0;day<=limit&&day<=until&&steps<732&&occurrences.length<count;day=next(day,1),steps++){
   const current=new Date(day+'T12:00:00');const delta=Math.round((+current-+start)/86400000);
   const months=(current.getFullYear()-start.getFullYear())*12+current.getMonth()-start.getMonth();
   const byday=rules.BYDAY?.split(',').map(x=>x.replace(/^[+-]?\d+/,'')).filter(Boolean);
   const matchesDay=!byday||byday.includes(weekday[current.getDay()]);
   const matchesMonth=!rules.BYMONTH||rules.BYMONTH.split(',').includes(String(current.getMonth()+1));
   const matchesDate=!rules.BYMONTHDAY||rules.BYMONTHDAY.split(',').includes(String(current.getDate()));
   const freq=rules.FREQ;
   const valid=freq==='DAILY'?delta%interval===0:freq==='WEEKLY'?Math.floor(delta/7)%interval===0&&(byday?matchesDay:current.getDay()===start.getDay()):freq==='MONTHLY'?months%interval===0&&(rules.BYMONTHDAY?matchesDate:current.getDate()===start.getDate()):freq==='YEARLY'?(current.getFullYear()-start.getFullYear())%interval===0&&current.getMonth()===start.getMonth()&&current.getDate()===start.getDate():day===first;
   if(valid&&matchesDay&&matchesMonth&&matchesDate)occurrences.push(day);
  }
 }
 return occurrences.filter(day=>!except.has(day)).map(day=>({id:`ics:${source}:${uid}:${day}`,uid,title,event_date:day,event_time:time,member_id:null,notes,repeat:'none',icon:'📅',source,end_date:end,all_day}));
}
export function parseICS(raw:string,source:string):ImportedEvent[]{
 if(raw.length>3_000_000)throw Error('Calendar file exceeds 3 MB.');
 if(!raw.includes('BEGIN:VCALENDAR'))throw Error('This is not a valid iCalendar file.');
 const lines=raw.replace(/\r\n?/g,'\n').split('\n'),unfolded:string[]=[];
 for(const line of lines){if(/^[ \t]/.test(line)&&unfolded.length)unfolded[unfolded.length-1]+=line.slice(1);else unfolded.push(line)}
 const events:ImportedEvent[]=[];const overrides:Record<string,string>[]=[];let fields:Record<string,string>|null=null;
 for(const line of unfolded){if(line==='BEGIN:VEVENT'){fields={};continue}
  if(line==='END:VEVENT'&&fields){if(fields['RECURRENCE-ID'])overrides.push(fields);else events.push(...expand(fields,source));fields=null;continue}
  if(fields){const i=line.indexOf(':');if(i<0)continue;const name=line.slice(0,i).split(';')[0].toUpperCase();if(name==='EXDATE'&&fields[name])fields[name]+=','+line.slice(i+1);else if(!(name in fields))fields[name]=line.slice(i+1)}
 }
 // Overrides and cancelled instances must replace the original occurrence, not duplicate it.
 // The occurrence identity is the UID + original RECURRENCE-ID date, even when moved.
 for(const override of overrides){
  const originalDay=datePart(override['RECURRENCE-ID']||'');
  const uid=override.UID;
  if(!originalDay||!uid)continue;
  const match=events.findIndex(e=>e.uid===uid&&e.event_date===originalDay);
  const original=match>=0?events[match]:events.find(e=>e.uid===uid);
  if(match>=0)events.splice(match,1);
  if(override.STATUS==='CANCELLED')continue;
  const movedDay=datePart(override.DTSTART||'')||originalDay;
  const updated:ImportedEvent={
   id:`ics:${source}:${uid}:${originalDay}`,uid,source,
   title:unescape(override.SUMMARY||original?.title||'Untitled event'),
   event_date:movedDay,
   event_time:override.DTSTART?timePart(override.DTSTART):original?.event_time||null,
   member_id:null,notes:unescape(override.DESCRIPTION||original?.notes||''),
   repeat:'none',icon:'📅',all_day:override.DTSTART?!timePart(override.DTSTART):original?.all_day
  };
  events.push(updated);
 }
 // Reject duplicate event identifiers, preserving the last valid override.
 return [...new Map(events.map(e=>[e.id,e])).values()].slice(0,10000);
}
