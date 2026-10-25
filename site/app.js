'use strict';
let language='fa', dashboard=null;
try{if(localStorage.getItem('ipd-language')==='en')language='en';}catch{}
const number=n=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en-US').format(n);
const year=n=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en-US',{useGrouping:false}).format(n);
const date=iso=>new Intl.DateTimeFormat(language==='fa'?'fa-IR-u-ca-gregory':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T00:00:00Z'));
const set=(id,value)=>{document.getElementById(id).textContent=value;};
const element=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const isFa=()=>language==='fa';
const choose=(fa,en)=>isFa()?fa:en;
const COPY={
 'Loading…':'در حال بارگذاری…','Skip to results':'رفتن به نتایج','Evidence':'شواهد','Market coverage':'پوشش بازارها','Method & updates':'روش و به‌روزرسانی',
 'DESCRIPTIVE RESEARCH':'پژوهش توصیفی','AN OPEN VIEW OF THE RESEARCH':'نگاهی شفاف به پژوهش',
 'A transparent record of Iran-linked conflict research and financial-market data coverage. Explore the collected evidence, the gaps, and the work still ahead.':'نمایی شفاف از پژوهش درباره درگیری‌های مرتبط با ایران و پوشش داده‌های بازارهای مالی. شواهد گردآوری‌شده، خلأهای داده و کارهای باقی‌مانده را ببینید.',
 'Explore the results':'دیدن نتایج','How to read this page →':'راهنمای خواندن این صفحه ←','CURRENT RESEARCH SNAPSHOT':'وضعیت فعلی پژوهش',
 'Review updated':'تاریخ بازبینی','Market sample requested through':'آخرین روز بازه درخواستی بازار','Update approach':'روش به‌روزرسانی','Manual · weekly review':'دستی · بازبینی هفتگی',
 'A page update does not mean the underlying market data have been refreshed. Individual series end on different dates.':'به‌روزرسانی صفحه به معنی دریافت داده‌های تازه بازار نیست. آخرین تاریخ مشاهده در هر مجموعه متفاوت است.',
 'Evidence in progress.':'بررسی شواهد ادامه دارد.',
 'This is a partial, curated research register. It does not measure all conflict activity or provide a forecast. Missing entries never mean “no conflict.”':'این فهرست پژوهشی گزینش‌شده و ناقص است؛ همه درگیری‌ها را پوشش نمی‌دهد و پیش‌بینی ارائه نمی‌کند. نبود یک رویداد در فهرست هرگز به معنی «نبود درگیری» نیست.',
 'The data could not be loaded. Please reload this page. No results are shown rather than substituting sample values.':'داده‌ها بارگذاری نشدند. صفحه را دوباره بارگذاری کنید. برای جلوگیری از نمایش مقادیر ساختگی، نتایج نمایش داده نمی‌شوند.',
 'Market observations':'مشاهدات بازار','Collected across':'گردآوری‌شده از','series':'مجموعه داده','Included event entries':'رویدادهای پذیرفته‌شده','Within a partial curated register':'در یک فهرست پژوهشی با پوشش ناقص',
 'Grouped episodes':'دوره‌های درگیری گروه‌بندی‌شده','Manual grouping; not independent trials':'گروه‌بندی دستی؛ نه نمونه‌های مستقل','Queue records reviewed':'رکوردهای دارای تصمیم بررسی','Review decisions include deferrals':'شامل تصمیم‌های نیازمند بررسی بیشتر',
 '01 / THE EVIDENCE':'۰۱ / شواهد',
 'Included entries describe direct Iran-linked state-military events under the project’s definition. Some are intercepted or nonfatal operations. A date or source disagreement stays visible in the research archive.':'رویدادهای پذیرفته‌شده بر اساس تعریف پروژه به اقدام مستقیم نیروهای نظامی دولتی مرتبط با ایران مربوط‌اند. برخی عملیات رهگیری‌شده یا بدون تلفات‌اند. اختلاف درباره تاریخ یا منبع در بایگانی پژوهش ثبت می‌شود.',
 'Only years with included entries are listed.':'فقط سال‌های دارای رویداد پذیرفته‌شده نمایش داده می‌شوند.','View':'نمایش','All listed years':'همه سال‌های ثبت‌شده','2020 onward':'از ۲۰۲۰ به بعد',
 'Counts reflect selective curation, not annual conflict frequency. A missing year is unknown, not a verified zero.':'تعدادها حاصل گزینش پژوهشی‌اند، نه فراوانی سالانه درگیری. وضعیت سال‌های غایب نامشخص است؛ صفر تأییدشده نیست.',
 'PARTIAL':'پوشش ناقص',
 'A record with a decision is not necessarily resolved. Deferred and provisional cases remain pending. Queue records and event entries are different units.':'داشتن تصمیم به معنی حل نهایی پرونده نیست. موارد تعویقی و موقت همچنان نیازمند بررسی‌اند. واحد شمارش رکوردهای صف با رویدادهای پذیرفته‌شده متفاوت است.',
 '02 / THE MARKET DATA':'۰۲ / داده‌های بازار',
 'This public view shows coverage metadata. Price histories and derived features stay in the private research archive.':'این نمای عمومی فقط اطلاعات پوشش داده را نشان می‌دهد. تاریخچه قیمت‌ها و ویژگی‌های محاسبه‌شده در بایگانی خصوصی پژوهش می‌مانند.',
 'Sample requested:':'بازه درخواستی:','Show':'نمایش مجموعه‌ها','All requested series':'همه مجموعه‌های درخواستی','Acquired series':'مجموعه‌های دریافت‌شده','Series with analysis exclusions':'مجموعه‌های کنارگذاشته‌شده از تحلیل',
 'Market-series coverage, local session dates and current limitations':'پوشش مجموعه‌های بازار، تاریخ محلی جلسات معاملاتی و محدودیت‌ها','Series':'مجموعه داده','Observations':'مشاهدات','Observed date span':'بازه زمانی مشاهدات','Research note':'یادداشت پژوهشی',
 'First and last dates are local source session dates. A date span does not imply complete daily coverage, synchronized closes, or historical publication availability. Proxies differ from the assets or indices they represent.':'تاریخ آغاز و پایان بر اساس تاریخ محلی جلسات معاملاتی منبع است. بازه زمانی به معنی پوشش کامل روزانه، هم‌زمانی قیمت‌های پایانی یا اطلاع از زمان انتشار تاریخی نیست. شاخص‌های جایگزین با دارایی یا شاخص اصلی متفاوت‌اند.',
 'RESEARCH READINESS':'آمادگی پژوهش','03 / HOW TO READ THIS':'۰۳ / راهنمای خواندن',
 'The aim is to make the evidence inspectable before drawing conclusions about risk. The current sample does not support a calibrated conflict probability.':'هدف این است که پیش از نتیجه‌گیری درباره ریسک، شواهد قابل بررسی باشند. نمونه فعلی از محاسبه احتمال کالیبره‌شده درگیری پشتیبانی نمی‌کند.',
 'Download the public summary ↓':'دریافت خلاصه عمومی ↓',
 'Project aggregate counts, review-state summaries, and market-series coverage metadata. The event target covers Iranian state armed forces acting abroad, or foreign state armed forces attacking Iran or Iranian state military assets/personnel abroad.':'شمارش‌های تجمیعی پروژه، خلاصه وضعیت بررسی و اطلاعات پوشش بازار منتشر می‌شوند. تعریف رویداد شامل اقدام نیروهای نظامی دولتی ایران در خارج از کشور، یا حمله نیروهای دولتی خارجی به ایران یا دارایی‌ها و نیروهای نظامی دولتی ایران در خارج از کشور است.',
 'Historical event coverage, defensible negative windows, precise information availability and some source rights remain unresolved.':'پوشش تاریخی رویدادها، بازه‌های منفی قابل دفاع، زمان دقیق دسترسی به اطلاعات و بخشی از حقوق استفاده از منابع هنوز روشن نیست.',
 'No probabilities or trading signals are published.':'احتمال درگیری یا سیگنال معاملاتی منتشر نمی‌شود.',
 'A maintainer reviews the evidence and refreshes the approved summary, then manually publishes the page. There is no automatic weekly refresh. The review date and market sample date are shown separately.':'مسئول نگهداری، شواهد را بازبینی و خلاصه مجاز را به‌روز می‌کند؛ سپس صفحه را به‌صورت دستی منتشر می‌کند. به‌روزرسانی هفتگی خودکار نیست. تاریخ بازبینی و تاریخ نمونه بازار جداگانه نمایش داده می‌شوند.',
 'Market metadata comes from saved FRED, Yahoo Finance and attempted TSETMC acquisitions. Review-queue summaries derive from':'اطلاعات پوشش بازار از دریافت‌های ذخیره‌شده FRED و Yahoo Finance و تلاش برای دریافت داده از TSETMC به دست آمده است. خلاصه صف بررسی برگرفته از',
 'UCDP GED 26.1 and Candidate 2026 Q3':'UCDP GED 26.1 و Candidate سه‌ماهه سوم ۲۰۲۶',
 '(Uppsala Conflict Data Program, CC BY 4.0). Inclusion counts come from project curation, not an official UCDP conflict statistic.':'است (برنامه داده‌های درگیری اوپسالا، مجوز CC BY 4.0). شمارش رویدادهای پذیرفته‌شده حاصل بررسی پروژه است، نه آمار رسمی درگیری UCDP.',
 'Underlying price data and full source documents are not redistributed here. This page does not establish rights to train on or republish those histories.':'داده‌های اصلی قیمت و متن کامل اسناد منابع در اینجا بازنشر نمی‌شوند. این صفحه مجوزی برای آموزش مدل یا بازنشر آن تاریخچه‌ها ایجاد نمی‌کند.',
 'Descriptive evidence. No forecast. Manually maintained.':'شواهد توصیفی. بدون پیش‌بینی. نگهداری دستی.','Back to top ↑':'بازگشت به بالا ↑',
 'Enable JavaScript to view this dashboard’s summary charts. The':'برای دیدن نمودارها جاوااسکریپت را فعال کنید.','public summary JSON':'خلاصه عمومی JSON','is available without JavaScript.':'بدون جاوااسکریپت هم در دسترس است.'
};
const EXTRA={
 'observation-caption':['تعداد واقعی مشاهدات دریافت‌شده؛ مقدارها روی نمودار نوشته شده‌اند.','Actual acquired observations, labelled directly on each bar.'],
 'observation-note':['طول میله‌ها تعداد مشاهدات را نشان می‌دهد، نه بازده یا کیفیت بازار. تفاوت تقویم معاملاتی و تاریخ شروع بر این تعداد اثر دارد.','Bar length shows observation counts, not returns or market quality. Trading calendars and start dates affect these counts.'],
 'span-caption':['سال آغاز و پایان مشاهده برای هر مجموعه','First and last observed years for each series'],
 'span-note':['این نوارها فقط فاصله نخستین تا آخرین مشاهده را نشان می‌دهند؛ روزهای گمشده و تعطیلی‌ها درون نوار ترسیم نشده‌اند.','Bands show only the first-to-last observation span. Missing days and market closures within a band are not plotted.'],
 'gregorian':['تمام تاریخ‌ها و سال‌های نمودارها میلادی‌اند.','All dates and chart years use the Gregorian calendar.'],
 'readiness-caption':['این نما وضعیت آمادگی پژوهش را نشان می‌دهد؛ امتیاز ریسک یا احتمال درگیری نیست.','This view shows research readiness, not a risk score or conflict probability.']
};
const SERIES={
 sp500:['S&P 500','شاخص قیمت','پوشش منبع محدود به بازه چرخشی است؛ سه اختلاف بین توزیع‌کنندگان از تحلیل کنار گذاشته شده‌اند.'],
 nasdaq:['نزدک کامپوزیت','شاخص قیمت','تاریخ محلی جلسات معاملاتی؛ خلأها و پرچم‌های کیفیت در داده پژوهشی باقی‌اند.'],
 vix:['VIX','شاخص نوسان','سطح این شاخص بیانگر نوسان مورد انتظار است، نه احتمال درگیری.'],
 brent:['نفت برنت','قیمت مرجع نقدی EIA','نمای عمومی فقط پوشش داده را نشان می‌دهد؛ شرایط استفاده از خدمات منبع همچنان نیازمند بررسی است.'],
 wti:['نفت WTI','قیمت مرجع نقدی EIA','مشاهده تاریخی قیمت منفی در پژوهش حفظ شده است؛ هیچ قیمتی در خروجی عمومی نیست.'],
 gold:['آتی طلا','قرارداد آتی نزدیک به سررسید','این مجموعه جایگزین قیمت نقدی طلاست؛ حقوق انتشار منبع و بورس روشن نشده‌اند.'],
 global_equity:['سهام جهانی','قیمت پایانی صندوق ACWI','قیمت پایانی یک صندوق بورسی است، نه شاخص بازده کل جهانی.'],
 ta35:['شاخص اسرائیل TA-35 / TA-25','شامل شاخص پیشین TA-25','خلأ تاریخی منظم در یکشنبه‌ها؛ از ویژگی‌های استنباطی کنار گذاشته شده است.'],
 tedpix:['شاخص کل بورس تهران','شاخص قیمت و بازده نقدی','دریافت داده ممکن نشد؛ هیچ مشاهده‌ای ساخته یا جایگزین نشده است.']
};
const STATE={unreviewed:['بررسی‌نشده','Unreviewed'],defer:['تعویق · خلأ شواهد','Deferred · evidence gaps'],retain_provisional:['موقت · پذیرفته‌نشده','Provisional · not included'],include_new:['پیوند به رویداد پذیرفته‌شده جدید','Linked to new included entries'],match_existing:['تطبیق با رویداد موجود','Matched to existing entries'],exclude_scope:['خارج از تعریف رویداد','Outside the event target']};
const colors={unreviewed:'#d7dfd6',defer:'#b95630',retain_provisional:'#c39d59',include_new:'#267b70',match_existing:'#163f47',exclude_scope:'#7b8f94'};
const originalText=new WeakMap();
function translateStatic(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode,parent=node.parentElement;
  if(!parent||parent.closest('h1,h2,h3,.brand,.footer-brand,script,style,#language-select,[data-dynamic]'))continue;
  if(!originalText.has(node))originalText.set(node,node.textContent);
  const original=originalText.get(node),key=original.trim();
  if(COPY[key])node.textContent=isFa()?original.replace(key,COPY[key]):original;
 }
 for(const node of document.querySelectorAll('[data-copy]')){const values=EXTRA[node.dataset.copy];node.textContent=values[isFa()?0:1];}
 document.documentElement.lang=language;document.documentElement.dir=isFa()?'rtl':'ltr';
 document.getElementById('language-select').value=language;
 for(const h of document.querySelectorAll('h1,h2,h3,.brand,.footer-brand')){h.lang='en';h.dir='ltr';}
 document.querySelector('.stats').setAttribute('aria-label',choose('نتایج پروژه','Project results'));
 document.getElementById('annual-chart').setAttribute('aria-label',choose('تعداد رویدادهای پذیرفته‌شده به تفکیک سال','Included entries by year'));
 document.querySelector('nav').setAttribute('aria-label',choose('پیمایش اصلی','Main navigation'));
}
function seriesText(r,index){return isFa()?SERIES[r.series_id][index]:[r.name,r.proxy_note,r.note][index];}
function labeledBar(label,count,max,color){
 const row=element('div','bar-row');row.append(element('span','bar-label',label));
 const track=element('div','bar-track'),fill=element('div','bar-fill');
 if(count){fill.style.width=(count/max*100)+'%';fill.style.background=color||'#267b70';const inside=element('span','inside-value',number(count));inside.setAttribute('aria-hidden','true');fill.append(inside);track.append(fill);}
 else track.append(element('span','zero-label',choose('دریافت نشده','Not acquired')));
 row.append(track,element('span','bar-value',number(count)));return row;
}
function renderYears(data){
 const chart=document.getElementById('annual-chart');chart.replaceChildren();
 const rows=data.included_entries_by_year.filter(r=>document.getElementById('year-filter').value!=='recent'||r.year>=2020);
 const max=Math.max(1,...data.included_entries_by_year.map(r=>r.entries));
 for(const r of rows)chart.append(labeledBar(year(r.year),r.entries,max,r.year===Math.max(...data.included_entries_by_year.map(item=>item.year))?'#b95630':null));
 if(!rows.length)chart.append(element('p','muted',choose('رویداد پذیرفته‌شده‌ای در این نما نیست؛ پوشش همچنان نامشخص است.','No included entries in this view. Coverage remains unknown.')));
}
function renderMarketVisuals(data){
 const counts=document.getElementById('market-count-chart'),spans=document.getElementById('span-chart');counts.replaceChildren();spans.replaceChildren();
 const max=Math.max(1,...data.market_coverage.map(r=>r.observations));
 const start=Date.parse(data.market_requested_from),end=Date.parse(data.market_requested_through),range=Math.max(1,end-start);
 const axis=element('div','span-axis'),firstYear=+data.market_requested_from.slice(0,4),lastYear=+data.market_requested_through.slice(0,4);
 const ticks=[firstYear,...Array.from({length:Math.max(0,lastYear-firstYear-1)},(_,i)=>firstYear+i+1).filter(y=>y%10===0),lastYear];
 for(const y of ticks){const tick=element('span','',year(y));tick.style.insetInlineStart=(y===firstYear?0:y===lastYear?100:(Date.parse(y+'-01-01')-start)/range*100)+'%';axis.append(tick);}spans.append(axis);
 for(const r of data.market_coverage){
  counts.append(labeledBar(seriesText(r,0),r.observations,max,r.analysis_excluded?'#b95630':null));
  const row=element('div','span-row');row.append(element('span','span-name',seriesText(r,0)));const track=element('div','span-track');
  if(r.observations){const band=element('div','span-band');const left=(Date.parse(r.first_session_date)-start)/range*100,width=(Date.parse(r.last_session_date)-Date.parse(r.first_session_date))/range*100;band.style.insetInlineStart=left+'%';band.style.width=width+'%';band.textContent=year(+r.first_session_date.slice(0,4))+'–'+year(+r.last_session_date.slice(0,4));track.append(band);}
  else track.append(element('span','zero-label',choose('داده در دسترس نیست','Data unavailable')));
  row.append(track);spans.append(row);
 }
}
function renderMarkets(data){
 const table=document.getElementById('market-table');table.replaceChildren();const choice=document.getElementById('market-filter').value;
 for(const r of data.market_coverage){
  if(choice==='acquired'&&!r.observations)continue;if(choice==='issues'&&!r.analysis_excluded)continue;
  const tr=element('tr'),name=element('td');name.append(element('span','series-name',seriesText(r,0)),element('span','series-sub',seriesText(r,1)));
  if(r.analysis_excluded)name.append(element('span','excluded',r.observations?choose('کنارگذاشته‌شده از ویژگی‌های استنباطی','EXCLUDED FROM INFERENTIAL FEATURES'):choose('دریافت نشده','UNAVAILABLE')));
  tr.append(name,element('td','',number(r.observations)),element('td','date-span',r.first_session_date?date(r.first_session_date)+choose(' ← ',' → ')+date(r.last_session_date):choose('هیچ مشاهده‌ای دریافت نشد','No observations acquired')),element('td','',seriesText(r,2)));table.append(tr);
 }
}
function renderReadiness(){
 const grid=document.getElementById('readiness-grid');grid.replaceChildren();
 const rows=[['پوشش رویدادها','Event coverage','ناقص','Incomplete'],['بازه‌های منفی تأییدشده','Verified negative windows','در دسترس نیست','Unavailable'],['زمان دسترسی تاریخی','Historical availability','تأیید نشده','Not established'],['حقوق استفاده برای مدل','Model-use rights','روشن نشده','Unresolved'],['داوری مستقل رویدادها','Independent review','انجام نشده','Not completed'],['احتمال درگیری','Conflict probability','منتشر نمی‌شود','Not published']];
 for(const row of rows){const card=element('div','readiness-card');card.append(element('span','',row[isFa()?0:1]),element('strong','',row[isFa()?2:3]));grid.append(card);}
}
function render(data){
 if(data.schema_version!==1||!Array.isArray(data.market_coverage)||!Array.isArray(data.included_entries_by_year))throw Error('Unsupported summary');
 set('review-date',date(data.review_date));set('sample-date',date(data.market_requested_through));
 set('sample-years',year(+data.market_requested_from.slice(0,4))+'–'+year(+data.market_requested_through.slice(0,4)));
 const unavailable=data.market_coverage.filter(r=>!r.observations).map(r=>seriesText(r,0));
 set('market-coverage-note',choose(number(data.summary.acquired_series)+' مجموعه دریافت شده است.'+(unavailable.length?' موارد ناموجود: '+unavailable.join('، ')+'.':''),number(data.summary.acquired_series)+' series were obtained.'+(unavailable.length?' Unavailable: '+unavailable.join(', ')+'.':'')));
 for(const [id,key] of [['observations','market_observations'],['series-count','acquired_series'],['events-count','included_events'],['episodes-count','included_episodes'],['reviewed-count','distinct_dispositioned']])set(id,number(data.summary[key]));
 set('queue-caption',choose('از '+number(data.summary.queue_total)+' رکورد؛ شامل موارد تعویقی','Of '+number(data.summary.queue_total)+' retrieved records · includes deferrals'));
 set('queue-total',choose(number(data.summary.queue_total)+' رکورد؛ '+number(data.summary.unreviewed)+' مورد هنوز بررسی نشده است.',number(data.summary.queue_total)+' retrieved records; '+number(data.summary.unreviewed)+' still unreviewed.'));
 set('pending-note',choose(number(data.summary.unreviewed)+' رکورد هنوز بررسی نشده است.',number(data.summary.unreviewed)+' queue records are still unreviewed.'));
 set('release-note',isFa()?data.release_note_fa:data.release_note);
 const age=Math.floor((Date.now()-new Date(data.review_date+'T00:00:00Z'))/86400000);
 set('freshness',age>8?choose('از بازبینی '+number(age)+' روز گذشته است؛ ممکن است به‌روزرسانی دستی لازم باشد.','Review is '+age+' days old. A manual update may be due.'):'');
 const percent=data.summary.distinct_dispositioned/data.summary.queue_total*100;
 const ring=document.getElementById('review-ring');ring.style.background='conic-gradient(#267b70 0 '+percent+'%,#e2e7df '+percent+'% 100%)';
 set('review-percent',new Intl.NumberFormat(isFa()?'fa-IR':'en-US',{maximumFractionDigits:1}).format(percent)+choose('٪','%'));
 set('review-ring-label',choose('دارای تصمیم بررسی','with a review decision'));
 set('review-ratio',choose(number(data.summary.distinct_dispositioned)+' از '+number(data.summary.queue_total)+' رکورد دارای تصمیم است؛ این تعداد شامل تعویق هم می‌شود.',number(data.summary.distinct_dispositioned)+' of '+number(data.summary.queue_total)+' records have a decision, including deferrals.'));
 const bar=document.getElementById('queue-bar'),legend=document.getElementById('queue-legend');bar.replaceChildren();legend.replaceChildren();
 for(const [state,labels] of Object.entries(STATE)){
  const count=data.review_state_counts[state]||0;
  if(count){const segment=element('div');segment.style.width=(100*count/data.summary.queue_total)+'%';segment.style.background=colors[state];if(count/data.summary.queue_total>.2)segment.textContent=labels[isFa()?0:1]+' · '+number(count);bar.append(segment);}
  const row=element('div','legend-row'),name=element('span'),swatch=element('i','swatch');swatch.style.background=colors[state];name.append(swatch,document.createTextNode(labels[isFa()?0:1]));row.append(name,element('b','',number(count)));legend.append(row);
 }
 renderYears(data);renderMarkets(data);renderMarketVisuals(data);renderReadiness();
}
// Dynamic regions are regenerated on language change; do not cache their translated text nodes.
for(const id of ['annual-chart','market-table','market-count-chart','span-chart','queue-bar','queue-legend','review-ring','review-ratio','readiness-grid','review-date','sample-date','sample-years','market-coverage-note','observations','series-count','events-count','episodes-count','reviewed-count','queue-caption','queue-total','pending-note','release-note','freshness'])document.getElementById(id).dataset.dynamic='true';
function changeLanguage(value){language=value;try{localStorage.setItem('ipd-language',value);}catch{}translateStatic();if(dashboard)render(dashboard);}
translateStatic();
document.getElementById('language-select').addEventListener('change',e=>changeLanguage(e.target.value));
document.getElementById('year-filter').addEventListener('change',()=>{if(dashboard)renderYears(dashboard);});
document.getElementById('market-filter').addEventListener('change',()=>{if(dashboard)renderMarkets(dashboard);});
fetch('data.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Summary unavailable');return r.json();}).then(data=>{dashboard=data;render(data);}).catch(()=>{document.getElementById('load-error').hidden=false;set('review-date',choose('در دسترس نیست','Unavailable'));set('sample-date',choose('در دسترس نیست','Unavailable'));});
