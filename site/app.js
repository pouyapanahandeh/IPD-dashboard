'use strict';
const number = n => new Intl.NumberFormat('en-US').format(n);
const date = iso => new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T00:00:00Z'));
const set = (id,value) => { document.getElementById(id).textContent=value; };
const element = (tag,cls,text) => {const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const stateLabels={unreviewed:'Unreviewed',defer:'Deferred · evidence gaps',retain_provisional:'Provisional · not included',include_new:'Linked to new included entries',match_existing:'Matched to existing entries',exclude_scope:'Outside the event target'};
const colors={unreviewed:'#d7dfd6',defer:'#b95630',retain_provisional:'#c39d59',include_new:'#267b70',match_existing:'#163f47',exclude_scope:'#7b8f94'};
function renderYears(data){
 const chart=document.getElementById('annual-chart');chart.replaceChildren();
 const rows=data.included_entries_by_year.filter(r=>document.getElementById('year-filter').value!=='recent'||r.year>=2020);
 const max=Math.max(1,...data.included_entries_by_year.map(r=>r.entries));
 if(!rows.length){chart.append(element('p','muted','No included entries in this view. Coverage remains unknown.'));return;}
 for(const r of rows){
  const row=element('div','bar-row');row.append(element('span','',r.year));
  const track=element('div','bar-track');track.setAttribute('aria-hidden','true');const fill=element('div','bar-fill');fill.style.width=(r.entries/max*100)+'%';track.append(fill);row.append(track,element('span','bar-value',number(r.entries)));chart.append(row);
 }
}
function renderMarkets(data){
 const table=document.getElementById('market-table');table.replaceChildren();const choice=document.getElementById('market-filter').value;
 for(const r of data.market_coverage){
  if(choice==='acquired'&&!r.observations)continue;if(choice==='issues'&&!r.analysis_excluded)continue;
  const tr=element('tr');const name=element('td');name.append(element('span','series-name',r.name),element('span','series-sub',r.proxy_note));
  if(r.analysis_excluded)name.append(element('span','excluded',r.observations?'EXCLUDED FROM INFERENTIAL FEATURES':'UNAVAILABLE'));
  tr.append(name,element('td','',number(r.observations)),element('td','date-span',r.first_session_date?date(r.first_session_date)+' → '+date(r.last_session_date):'No observations acquired'),element('td','',r.note));table.append(tr);
 }
 if(!table.children.length){const tr=element('tr');const td=element('td','','No series in this view.');td.colSpan=4;tr.append(td);table.append(tr);}
}
function render(data){
 if(data.schema_version!==1||!Array.isArray(data.market_coverage)||!Array.isArray(data.included_entries_by_year))throw Error('Unsupported summary');
 set('review-date',date(data.review_date));set('sample-date',date(data.market_requested_through));
 set('observations',number(data.summary.market_observations));set('series-count',number(data.summary.acquired_series));set('events-count',number(data.summary.included_events));set('episodes-count',number(data.summary.included_episodes));set('reviewed-count',number(data.summary.distinct_dispositioned));
 set('queue-caption','Of '+number(data.summary.queue_total)+' retrieved records · includes deferrals');
 set('queue-total',number(data.summary.queue_total)+' retrieved records; '+number(data.summary.unreviewed)+' still unreviewed.');
 set('pending-note',number(data.summary.unreviewed)+' queue records are still unreviewed.');set('release-note',data.release_note);
 const age=Math.floor((Date.now()-new Date(data.review_date+'T00:00:00Z'))/86400000);
 if(age>8)set('freshness','Review is '+age+' days old. A manual update may be due.');
 const bar=document.getElementById('queue-bar'),legend=document.getElementById('queue-legend');bar.replaceChildren();legend.replaceChildren();
 for(const [state,label] of Object.entries(stateLabels)){
  const count=data.review_state_counts[state]||0;
  if(count){const segment=element('div');segment.style.width=(100*count/data.summary.queue_total)+'%';segment.style.background=colors[state];bar.append(segment);}
  const row=element('div','legend-row'),name=element('span'),swatch=element('i','swatch');swatch.style.background=colors[state];name.append(swatch,document.createTextNode(label));row.append(name,element('b','',number(count)));legend.append(row);
 }
 renderYears(data);renderMarkets(data);
 document.getElementById('year-filter').addEventListener('change',()=>renderYears(data));document.getElementById('market-filter').addEventListener('change',()=>renderMarkets(data));
}
fetch('data.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw Error('Summary unavailable');return response.json();}).then(render).catch(()=>{document.getElementById('load-error').hidden=false;set('review-date','Unavailable');set('sample-date','Unavailable');});
