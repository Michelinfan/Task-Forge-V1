const KEY="taskforge-v1";
const defaultData={tasks:[],projects:[{id:"inbox",name:"Bandeja de entrada"}]};
let data=JSON.parse(localStorage.getItem(KEY)||"null")||defaultData;
let view="inbox", searchText="";
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(data));}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function today(){return new Date().toISOString().slice(0,10)}
function projectName(id){return data.projects.find(p=>p.id===id)?.name||"Bandeja de entrada"}
function filtered(){
 let arr=data.tasks.filter(t=>!t.deleted);
 if(view==="today") arr=arr.filter(t=>t.date===today());
 else if(view==="upcoming") arr=arr.filter(t=>t.date&&t.date>=today());
 else if(view==="inbox") arr=arr.filter(t=>t.projectId==="inbox");
 else if(view.startsWith("project:")) arr=arr.filter(t=>t.projectId===view.slice(8));
 if(searchText) arr=arr.filter(t=>t.title.toLowerCase().includes(searchText.toLowerCase()));
 return arr.sort((a,b)=>Number(a.completed)-Number(b.completed)||({p1:0,p2:1,p3:2,none:3}[a.priority]-({p1:0,p2:1,p3:2,none:3}[b.priority]))||(a.date||"9999").localeCompare(b.date||"9999"));
}
function render(){
 $("projects").innerHTML=data.projects.filter(p=>p.id!=="inbox").map(p=>`<div class="project ${view==="project:"+p.id?"active":""}" data-project="${p.id}"># ${esc(p.name)}</div>`).join("");
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===view));
 let titles={inbox:["Bandeja de entrada",""],today:["Hoy",new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"})],upcoming:["Próximas","Tareas con fecha a partir de hoy"],all:["Todas",""]};
 let h=view.startsWith("project:")?projectName(view.slice(8)):titles[view][0];
 $("viewTitle").textContent=h; $("viewSubtitle").textContent=view.startsWith("project:")?"Proyecto":(titles[view]?.[1]||"");
 const arr=filtered(); $("empty").classList.toggle("hidden",arr.length>0);
 $("taskList").innerHTML=arr.map(t=>`<div class="task ${t.completed?"done":""}">
 <button class="check ${t.completed?"done":""}" data-check="${t.id}" aria-label="Completar"></button>
 <div class="task-main"><div class="task-title">${esc(t.title)}</div><div class="meta">
 <span class="${t.priority}">${priorityLabel(t.priority)}</span><span>${t.date?formatDate(t.date):""}</span><span>${esc(projectName(t.projectId))}</span></div></div>
 <button class="delete" data-delete="${t.id}" title="Eliminar">×</button></div>`).join("");
 $("inboxCount").textContent=data.tasks.filter(t=>!t.completed&&!t.deleted&&t.projectId==="inbox").length||"";
 $("todayCount").textContent=data.tasks.filter(t=>!t.completed&&!t.deleted&&t.date===today()).length||"";
 $("taskProject").innerHTML=data.projects.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join("");
}
function esc(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function priorityLabel(p){return {p1:"🔴 P1",p2:"🟠 P2",p3:"🔵 P3",none:""}[p]}
function formatDate(d){return new Date(d+"T00:00:00").toLocaleDateString("es-ES",{day:"numeric",month:"short"})}
function openComposer(){ $("taskForm").classList.remove("hidden"); $("taskTitle").focus(); }
$("newTask").onclick=openComposer;
$("cancelTask").onclick=()=>{$("taskForm").reset();$("taskForm").classList.add("hidden")};
$("taskForm").onsubmit=e=>{e.preventDefault();let title=$("taskTitle").value.trim();if(!title)return;
 let pid=view.startsWith("project:")?view.slice(8):$("taskProject").value;
 data.tasks.push({id:uid(),title,priority:$("taskPriority").value,date:$("taskDate").value,projectId:pid||"inbox",completed:false,deleted:false});
 save();$("taskForm").reset();$("taskForm").classList.add("hidden");render();
};
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>{view=n.dataset.view;render()});
$("search").oninput=e=>{searchText=e.target.value;render()};
$("addProject").onclick=()=>{let name=prompt("Nombre del proyecto:");if(name?.trim()){data.projects.push({id:uid(),name:name.trim()});save();render()}};
$("projects").onclick=e=>{let p=e.target.closest("[data-project]");if(p){view="project:"+p.dataset.project;render()}};
$("taskList").onclick=e=>{let c=e.target.closest("[data-check]"),d=e.target.closest("[data-delete]");
 if(c){let t=data.tasks.find(x=>x.id===c.dataset.check);t.completed=!t.completed;save();render()}
 if(d){data.tasks=data.tasks.filter(x=>x.id!==d.dataset.delete);save();render()}
};
render();
