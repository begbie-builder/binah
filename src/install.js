let installPrompt=null;
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
window.addEventListener('appinstalled',()=>{installPrompt=null;updateInstallStatus();});
function updateInstallStatus(){
 document.querySelectorAll('[data-install-status]').forEach(el=>el.textContent=standalone()?'You’re using the Home Screen app.':'Your Home Screen icon uses the same Binah design as the favicon.');
 document.querySelectorAll('[data-install]').forEach(el=>{el.textContent=standalone()?'Home Screen app ready':installPrompt?'Add Binah to this device':'How to add Binah';el.disabled=standalone();});
}
function showInstructions(){
 let dialog=document.querySelector('#install-dialog');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='install-dialog';dialog.className='install-dialog';dialog.setAttribute('aria-labelledby','install-title');dialog.innerHTML=`<form method="dialog"><button class="icon-button install-close" aria-label="Close installation help">✕</button><img src="/apple-touch-icon.png" width="72" height="72" alt="Binah app icon"><h2 id="install-title">A little closer to your Hebrew.</h2><p>Add Binah to your Home Screen for a dedicated app window.</p><ol><li>Open this site in <strong>Safari</strong> on your iPhone or iPad.</li><li>Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</li><li>Keep <strong>Open as Web App</strong> on if offered, then tap <strong>Add</strong>.</li></ol><p class="field-help">On other devices, look for Install app or Add to Home Screen in the browser menu. Guest progress can be separate between Safari and the installed app; Google sign-in or an exported backup lets you carry it across.</p><button class="button primary full">Got it</button></form>`;document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
 dialog.showModal();
}
export function bindInstallUI(){
 updateInstallStatus();document.querySelectorAll('[data-install]').forEach(button=>button.onclick=async()=>{
  if(installPrompt){const prompt=installPrompt;installPrompt=null;try{await prompt.prompt();await prompt.userChoice;}catch{showInstructions();}updateInstallStatus();}
  else showInstructions();
 });
}
// The visual viewport shrinks when a software keyboard opens. Keep lesson actions reachable.
function viewportSize(){
 const viewport=window.visualViewport;document.documentElement.style.setProperty('--app-height',(viewport?.height||window.innerHeight)+'px');
}
viewportSize();window.addEventListener('resize',viewportSize,{passive:true});window.visualViewport?.addEventListener('resize',viewportSize,{passive:true});
