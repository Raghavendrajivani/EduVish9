/* EduVish9 layout enhancements. This script only adds navigation and footer structure. */
(() => {
  const shortcutItems = [
    {label:'Calculator', detail:'Check SGPA and CGPA', href:'/calculator', icon:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>'},
    {label:'PYQs', detail:'Previous year papers', href:'/pyq', icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>'},
    {label:'Labs', detail:'Manuals and code resources', href:'/labs', icon:'<path d="M9 3h6M10 3v7.2L4.8 19a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 10.2V3"/><path d="M8 16h8"/>'},
    {label:'Upload', detail:'Share study materials', href:'/upload', icon:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>'}
  ];
  const footerGroups = [
    {title:'About', links:[['About EduVish9','/about'],['Editorial Team','/authors'],['Contact Support','/contact']]},
    {title:'Study Resources', links:[['2025 Scheme · First Year','/branch/firstyear25'],['Syllabus Blueprints','/syllabus'],]},
    {title:'Tools', links:[['SGPA / CGPA Calculator','/calculator'],['Previous Year Papers','/pyq'],['Model Question Papers','/model-papers'],['Lab Manuals','/labs'],['Contribute Materials','/upload'],['Install EduVish9','/download'],['SGPA / CGPA Guide','/resources/how-to-calculate-sgpa-cgpa'],['Revaluation Guide','/resources/vtu-revaluation-guide']]},
    {title:'Contact & Legal', links:[['Contact Us','/contact'],['Privacy Policy','/privacy'],['Terms of Service','/terms'],['Legal Disclaimer','/disclaimer'],['Copyright Policy','/copyright'],['Report Copyright','/report-copyright'],['Email Support','mailto:eduvish9@gmail.com']]}
  ];
  const svg = body => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  function classify(path) {
    if (path === '/') return 'home';
    if (path.startsWith('/branch/') || ['/syllabus','/pyq','/labs','/model-papers','/textbooks'].includes(path)) return 'catalog';
    if (path.startsWith('/subject/')) return 'subject';
    if (['/calculator','/upload','/contact'].includes(path)) return 'interactive';
    if (['/privacy','/terms','/disclaimer','/copyright','/report-copyright'].includes(path)) return 'legal';
    return 'guide';
  }
  function renderFooter() {
    const footer=document.querySelector('footer');
    if (!footer || (footer.dataset.eduvishRedesign === 'true' && footer.querySelector('.eduvish-footer-columns'))) return;
    footer.dataset.eduvishRedesign='true';
    footer.classList.add('eduvish-footer');
    const columns=footerGroups.map(group=>`<section class="eduvish-footer-group"><h2>${group.title}</h2><ul>${group.links.map(([label,href])=>`<li><a href="${href}">${label}</a></li>`).join('')}</ul></section>`).join('');
    footer.innerHTML=`<div class="eduvish-footer-inner"><div class="eduvish-footer-top"><div class="eduvish-footer-brand"><a class="eduvish-brand" href="/" aria-label="EduVish9 home"><img src="/icon.png" alt=""/><span><strong>EduVish9</strong><small>Academic Portal</small></span></a><p>Karnataka’s open-access academic library for VTU engineering students, with study notes, previous year papers, lab manuals, and grade calculators.</p><div class="eduvish-social"><a href="https://github.com/Raghavendrajivani" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/Raghavjivani99" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/er_raghav99/" target="_blank" rel="noopener noreferrer">Instagram</a></div></div><div class="eduvish-footer-columns">${columns}</div></div><div class="eduvish-footer-bottom"><p>Independent educational publisher. Not affiliated with or endorsed by Visvesvaraya Technological University (VTU), Belagavi.</p><span>© 2026 EduVish9. All rights reserved.</span></div></div>`;
  }
  function renderHomeTools(main) {
    const existing=main.querySelector('#eduvish-quick-tools');
    const browse=main.querySelector('#browse');
    if (existing || !browse) return;
    const section=document.createElement('section');
    section.id='eduvish-quick-tools';
    section.className='eduvish-quick-tools';
    section.setAttribute('aria-label','Quick access');
    section.innerHTML=`<div class="eduvish-tools-heading"><div><span class="eduvish-kicker">STUDY TOOLS</span><h2>Pick up where you need to</h2></div><span class="eduvish-tools-note">Your most used resources, one tap away</span></div><div class="eduvish-tools-grid">${shortcutItems.map((item,index)=>`<a class="eduvish-tool-card eduvish-tool-${index+1}" href="${item.href}"><span class="eduvish-tool-icon">${svg(item.icon)}</span><span class="eduvish-tool-copy"><strong>${item.label}</strong><small>${item.detail}</small></span><span class="eduvish-tool-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
    browse.parentNode.insertBefore(section,browse);
  }

  function renderHomeDashboard(main){
    const card=main.querySelector('section.space-y-6 > div.grid.grid-cols-1 > div.glass-card');
    if(!card||card.dataset.eduvishDashboard==='true')return;
    const liveCounter=card.querySelector('.animate-ping')?.parentElement?.parentElement;
    const heading=card.querySelector('h1');
    const description=heading?.nextElementSibling;
    const actions=card.querySelector('button')?.parentElement;
    if(!heading||!description||!actions)return;
    card.dataset.eduvishDashboard='true';
    card.classList.add('eduvish-dashboard-card');
    if(liveCounter)liveCounter.classList.add('eduvish-live-counter');
    const badge=[...card.querySelectorAll('span')].find(el=>/VTU 2025/i.test(el.textContent||''));
    if(badge){badge.textContent='BUILT FOR VTU STUDENTS';badge.classList.add('eduvish-dashboard-badge');}
    heading.innerHTML='EduVish9 <span class="eduvish-dashboard-gradient">Features</span>';
    description.textContent='Everything you need to prepare for VTU exams, find trusted study material, explore lab resources, and track your grades in one place.';
    description.classList.add('eduvish-dashboard-intro');
    const featureGrid=document.createElement('div');
    featureGrid.className='eduvish-feature-grid';
    featureGrid.setAttribute('aria-label','EduVish9 features');
    featureGrid.innerHTML=`
      <a class="eduvish-feature-item" href="/pyq"><span class="eduvish-feature-icon">${svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"')}</span><span><strong>Exam Papers</strong><small>Find VTU PYQs and model papers</small></span><span class="eduvish-feature-arrow" aria-hidden="true">↗</span></a>
      <a class="eduvish-feature-item" href="/branch/firstyear25"><span class="eduvish-feature-icon">${svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"')}</span><span><strong>Study Resources</strong><small>Explore notes and syllabus guides</small></span><span class="eduvish-feature-arrow" aria-hidden="true">↗</span></a>
      <a class="eduvish-feature-item" href="/calculator"><span class="eduvish-feature-icon">${svg('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"')}</span><span><strong>Grade Calculator</strong><small>Calculate SGPA and CGPA</small></span><span class="eduvish-feature-arrow" aria-hidden="true">↗</span></a>
      <a class="eduvish-feature-item" href="/labs"><span class="eduvish-feature-icon">${svg('<path d="M9 3h6M10 3v7.2L4.8 19a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 10.2V3"/><path d="M8 16h8"')}</span><span><strong>Lab Resources</strong><small>Open manuals and lab materials</small></span><span class="eduvish-feature-arrow" aria-hidden="true">↗</span></a>`;
    description.insertAdjacentElement('afterend',featureGrid);
    const searchButton=actions.querySelector('button');
    if(searchButton)searchButton.setAttribute('aria-label','Search study notes');
    const papersLink=document.createElement('a');
    papersLink.className='eduvish-dashboard-cta';papersLink.href='/model-papers';
    papersLink.innerHTML=`${svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>')}<span>Model Papers</span>`;
    actions.appendChild(papersLink);
  }

  function updateFeatured2025(main){
    const feature=main.querySelector('a[href^="/subject/"]');
    if(!feature)return;
    feature.href='/branch/firstyear25';
    feature.innerHTML=`<div class="eduvish-feature-top"><span class="eduvish-kicker">FEATURED 2025 RESOURCE</span><span class="eduvish-feature-tag">FIRST YEAR</span></div><div class="eduvish-feature-copy"><h3>First Year 2025</h3><p>Study materials for the current first-year curriculum.</p></div><div class="eduvish-feature-link">Explore first-year materials <span aria-hidden="true">→</span></div>`;
  }
  function prune2022(){
    if((location.pathname.replace(/\/$/,'')||'/')==='/authors'){['author-card-laxmi','author-card-harshita','author-card-mounesh-e-belavadi'].forEach(id=>document.querySelectorAll('[data-ai-id=\"'+id+'\"]').forEach(card=>card.remove()));}
    const path=location.pathname.replace(/\/$/,'')||'/';
    const main=document.querySelector('main');
    if(path==='/pyq'&&main){
      main.querySelectorAll('details').forEach(group=>{const label=group.querySelector('summary')?.textContent||'';if(!/First Year 2025/i.test(label))group.remove();});
      main.querySelectorAll('p').forEach(p=>{if(/Access over\s*154\s*\+? verified previous year question papers/i.test(p.textContent||''))p.textContent='Browse verified previous year question papers for the VTU 2025 Scheme first-year curriculum.';});
    }
    if(path==='/'&&main){
      updateFeatured2025(main);
      renderHomeDashboard(main);
      const browse=main.querySelector('#browse');
      if(browse){
        browse.querySelectorAll('a[href^="/branch/"]').forEach(a=>{if(a.getAttribute('href')!=='/branch/firstyear25')a.remove();});
        const h=browse.querySelector('h2');if(h)h.textContent='Explore 2025 First Year';
        const p=browse.querySelector('p');if(p)p.textContent='Find syllabus-aligned materials for the 2025 first-year curriculum.';
      }
    }
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href')||'';
      const pathOnly=href.split(/[?#]/)[0];
      if(pathOnly.startsWith('/branch/')&&pathOnly!='/branch/firstyear25')a.remove();
      else if(pathOnly==='/subject/BEC304'||pathOnly==='/model-papers/2022-scheme')a.remove();
      else if(/2022/i.test(href)&&(/\/pdf\//i.test(href)||/scheme|2022/i.test(href))){
        const card=a.closest('.glass-card-interactive');if(card)card.remove();else a.remove();
      }
    });
    document.querySelectorAll('.glass-card-interactive').forEach(card=>{if(/2022\s*Scheme/i.test(card.textContent||''))card.remove();});
    const replacements=[
      [/VTU 2025\s*&\s*2022 SCHEMES/gi,'VTU 2025 SCHEME'],
      [/2025\s*&\s*2022 Scheme Highlights/gi,'2025 Scheme Highlights'],
      [/2025\s*&\s*2022 Schemes/gi,'2025 Scheme'],
      [/2025\s*&\s*2022 Scheme/gi,'2025 Scheme'],
      [/2025\/2022 Schemes Supported/gi,'2025 Scheme Supported'],
      [/2025\/2022/gi,'2025'],
      [/2021,\s*2022,\s*and\s*2025 regulations/gi,'2021 and 2025 regulations'],
      [/2025,\s*2022\s*&\s*2021 Schemes/gi,'2025 and 2021 Schemes'],
      [/2025 Scheme,\s*Scheme,\s*and\s*2021 Scheme/gi,'2025 and 2021 Schemes'],
      [/2022\s+and\s+2025 schemes/gi,'2025 Scheme'],
      [/2022\s+and\s+2025/gi,'2025'],
      [/2\. Are the rules different for the 2018, 2021, and 2022 schemes\?/gi,'2. Are the rules different for the 2018 and 2021 schemes?'],
      [/2025 & 2022/gi,'2025']
    ];
    const faq=document.querySelector('main');
    if(path==='/faq'&&faq){
      faq.querySelectorAll('p').forEach(p=>{
        const t=p.textContent||'';
        if(/under the 2022 and 2025 schemes/i.test(t))p.textContent='EduVish9 currently provides study resources for VTU students, including materials for the 2025 Scheme first-year curriculum and academic calculators.';
        else if(/We currently provide resources for the VTU 2022 Scheme/i.test(t))p.textContent='We currently provide resources for the VTU 2025 Scheme first-year curriculum. The calculators also include 2021 Scheme calculations.';
        else if(/Select your scheme \(2022 or 2025\)/i.test(t))p.textContent='Visit EduVish.com/calculator, choose an available scheme, branch, and semester, then enter your grades to calculate your result.';
      });
    }
    if(path==='/syllabus'&&main){
      main.querySelectorAll('p').forEach(p=>{if(/VTU introduced updated regulation frameworks \(2022 and 2025\)/i.test(p.textContent||''))p.textContent=(p.textContent||'').replace(/VTU introduced updated regulation frameworks \(2022 and 2025\)/i,'VTU introduced the 2025 regulation framework');});
      main.querySelectorAll('p').forEach(p=>{if(/Always cross-verify your subject course code/i.test(p.textContent||''))p.textContent=(p.textContent||'').replace(/,?\s*22CSxx,?/gi,'').replace(/\s{2,}/g,' ');});
    }
    if(path==='/calculator'&&main){
      main.querySelectorAll('p').forEach(p=>{if(/Supports the latest 2025 Scheme/i.test(p.textContent||''))p.textContent=(p.textContent||'').replace(/Supports the latest 2025 Scheme,?\s*Scheme,?\s*and\s*2021 Scheme/i,'Supports the 2025 and 2021 Schemes');});
    }
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{let value=node.nodeValue||'';for(const [re,to] of replacements)value=value.replace(re,to);if(/\b2022\b/i.test(value))value=value.replace(/\b2022\b/gi,'').replace(/\s{2,}/g,' ').replace(/\s+([,.])/g,'$1').replace(/\(\s+/g,'(').replace(/\s+\)/g,')').trim();if(value!==node.nodeValue)node.nodeValue=value;});
    document.title=document.title.replace(/2022\s*,?\s*/gi,'').replace(/2025\s*&\s*Schemes/gi,'2025 Scheme').replace(/2025\s*&\s*\)/g,'2025)').replace(/\s*&\s*\)/g,')').replace(/\(\s*,/g,'(');
    document.querySelectorAll('meta[content]').forEach(m=>{const v=m.getAttribute('content')||'';if(/2022/i.test(v))m.setAttribute('content',v.replace(/2022/gi,'').replace(/2025\s*&\s*Schemes/gi,'2025 Scheme').replace(/2025\s*&\s*\)/g,'2025)').replace(/\s{2,}/g,' ').replace(/\s+([,.])/g,'$1').trim());});
  }

  let scheduled=false;
  function contactStatus(form,state,message){
    let status=form.querySelector('.eduvish-contact-status');
    if(!status){status=document.createElement('p');status.className='eduvish-contact-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.appendChild(status);}
    status.dataset.state=state;status.textContent=message;
  }
  function handleContactSubmit(event){
    const form=event.target;
    if(!(form instanceof HTMLFormElement)||!location.pathname.startsWith('/contact'))return;
    const endpoint=String(window.EDUVISH_CONTACT_WEB_APP_URL||'').trim();
    event.preventDefault();event.stopImmediatePropagation();
    if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:\?.*)?$/.test(endpoint)){contactStatus(form,'error','Google Sheets is not connected yet. The form will not open your email app. Please try again after setup.');return;}
    const field=name=>form.elements.namedItem(name);
    const nameField=field('name'),emailField=field('email'),messageField=field('message');
    if(!nameField||!emailField||!messageField)return;
    const name=String(nameField.value||'').trim();
    const email=String(emailField.value||'').trim();
    const message=String(messageField.value||'').trim();
    if(name.length<2||name.length>100){contactStatus(form,'error','Enter your name (2–100 characters).');nameField.focus();return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254){contactStatus(form,'error','Enter a valid email address.');emailField.focus();return;}
    if(message.length<10||message.length>5000){contactStatus(form,'error','Your message must be between 10 and 5,000 characters.');messageField.focus();return;}
    let honeypot=field('website');
    if(!honeypot){honeypot=document.createElement('input');honeypot.type='text';honeypot.name='website';honeypot.tabIndex=-1;honeypot.autocomplete='off';honeypot.setAttribute('aria-hidden','true');honeypot.className='eduvish-honeypot';form.appendChild(honeypot);}
    if(String(honeypot.value||'').trim())return;
    const button=form.querySelector('button[type="submit"]');
    const originalLabel=button?button.textContent.trim():'Send Message';
    if(button){button.disabled=true;button.innerHTML='<span class="eduvish-contact-spinner" aria-hidden="true"></span>Sending…';}
    contactStatus(form,'loading','Sending your message…');
    fetch(endpoint,{method:'POST',mode:'no-cors',redirect:'follow',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({name,email,message,website:''})})
      .then(()=>{contactStatus(form,'success','Thank you! Your message has been submitted. We’ll get back to you shortly.');form.reset();})
      .catch(()=>{contactStatus(form,'error','We could not submit your message. Please email eduvish9@gmail.com instead.');})
      .finally(()=>{if(button){button.disabled=false;button.textContent=originalLabel||'Send Message';}});
  }
  function normalizePortfolioShortcut(){
    const link=document.querySelector('a[aria-label="WhatsApp Channel"],a[aria-label="Raghavendra Jivani portfolio"]');
    if(!link)return;
    link.href="https://Raghavendrajivani.github.io/portpolio/";link.target="_blank";link.rel="noopener noreferrer";
    link.setAttribute('aria-label','Raghavendra Jivani portfolio');
    link.classList.remove('bg-[#25D366]','text-white','rounded-2xl');
    link.classList.add('overflow-hidden','rounded-full','bg-transparent');
    if(link.dataset.eduvishPortfolioIcon!=='true'){
      link.innerHTML='<img src="/portfolio-globe.jpg" alt="" class="w-full h-full object-cover rounded-full" />';
      link.dataset.eduvishPortfolioIcon='true';
    }
  }
  function normalizeEmailLinks(){
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href=a.href.replace(/^mailto:[^?]*/i,'mailto:eduvish9@gmail.com');});
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const emailPattern=/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
    while(walker.nextNode()){const node=walker.currentNode;if(emailPattern.test(node.nodeValue||'')){emailPattern.lastIndex=0;node.nodeValue=node.nodeValue.replace(emailPattern,'eduvish9@gmail.com');}}
  }
  function normalizeSocialLinks(){
    const updates=[
      [/^https:\/\/github\.com\/(?:Sameraaryaa|harshithayk20|laxmibiradar2005|mouneshbelavadi|Raghavendrajivani)\/?$/i,'https://github.com/Raghavendrajivani'],
      [/^https:\/\/www\.linkedin\.com\/in\/(?:sameraaryaadb|harshitha-yk-00b375359|mounesh-e-belavadi-73238035a|sneha-biradar-7b45b635a|Raghavjivani99)(?:\?.*)?$/i,'https://www.linkedin.com/in/Raghavjivani99'],
      [/^https:\/\/www\.instagram\.com\/(?:EduVish9(?:\?.*)?|er_raghav99\/?)$/i,'https://www.instagram.com/er_raghav99/']
    ];
    document.querySelectorAll('a[href]').forEach(anchor=>{
      const href=anchor.href;
      for(const [pattern,target] of updates){
        if(!pattern.test(href))continue;
        if(href!==target)anchor.href=target;
        if(anchor.dataset.eduvishNativeSocial!=='true'){
          const nativeLink=anchor.cloneNode(true);
          nativeLink.href=target;nativeLink.dataset.eduvishNativeSocial='true';
          anchor.replaceWith(nativeLink);
        }
        break;
      }
    });
  }
  function refresh() {
    scheduled=false;
    const path=location.pathname.replace(/\/$/,'') || '/';
    normalizeSocialLinks();
    normalizeEmailLinks();
    normalizePortfolioShortcut();
    document.body.dataset.eduvishType=classify(path);
    const main=document.querySelector('main');
    if(main){main.classList.add('eduvish-main');main.classList.toggle('eduvish-calculator',path==='/calculator');if(classify(path)==='home')renderHomeTools(main);else main.querySelector('#eduvish-quick-tools')?.remove();}
    const mobileNav=document.querySelector('div[class*="sm:hidden"][class*="fixed"][class*="bottom-4"][class*="left-4"][class*="right-4"][class*="h-16"]');
    mobileNav?.classList.add('eduvish-mobile-nav');
    const menuBrowse=document.querySelector('div.h-full.w-full > div > nav > a.flex.items-center:first-of-type');
    if(menuBrowse){
      const labelWalker=document.createTreeWalker(menuBrowse,NodeFilter.SHOW_TEXT);
      while(labelWalker.nextNode()){const labelNode=labelWalker.currentNode;if((labelNode.nodeValue||'').trim()==='Browse'){labelNode.nodeValue=labelNode.nodeValue.replace('Browse','Home');break;}}
    }
    const homeItem=mobileNav?.querySelector(':scope > div > a:first-child');
    if(homeItem&&homeItem.dataset.eduvishNativeHome!=='true'){
      const nativeHome=homeItem.cloneNode(true);
      nativeHome.href='/';nativeHome.dataset.eduvishNativeHome='true';nativeHome.setAttribute('aria-label','Home');
      nativeHome.innerHTML=svg('<path d="m3 10 9-7 9 7"/><path d="M9 21v-8h6v8"/>')+'<span class="text-[10px] font-medium">Home</span>';
      homeItem.replaceWith(nativeHome);
    }
    const quickActions=document.querySelector('div[class*="sm:hidden"][class*="fixed"][class*="bottom-4"][class*="left-1/2"][class*="-translate-x-1/2"][class*="w-16"][class*="h-16"]');
    quickActions?.classList.add('eduvish-mobile-actions');
    const quickButton=quickActions?.querySelector('button[aria-label="Open Quick Actions"]');
    if(quickButton&&quickButton.dataset.eduvishIcon!=='plus'){
      quickButton.dataset.eduvishIcon='plus';
      quickButton.innerHTML=svg('<path d="M12 5v14"/><path d="M5 12h14"/>');
    }
    prune2022();
    renderFooter();
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(refresh);}
  function start(){refresh();if(!window.__eduvishContactSubmitBound){document.addEventListener('submit',handleContactSubmit,true);window.__eduvishContactSubmitBound=true;}const observer=new MutationObserver(schedule);observer.observe(document.body,{childList:true,subtree:true,characterData:true});window.addEventListener('popstate',schedule);document.addEventListener('click',()=>setTimeout(schedule,80),true);window.addEventListener('load',()=>{setTimeout(schedule,700);setTimeout(schedule,1500);},{once:true});}
  if(document.readyState==='complete')setTimeout(start,180);else window.addEventListener('load',()=>setTimeout(start,180),{once:true});
})();
