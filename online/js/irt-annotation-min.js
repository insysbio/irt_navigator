/*
This file is a part of IRT navigator 1.0
Author: Evgeny Metelkin

This work is licensed under a Creative Commons Attribution-NoDerivatives 4.0 International 

License http://creativecommons.org/licenses/by-nd/4.0/

© Institute for Systems Biology, Moscow, 2016-2017
http://insysbio.ru
*/
function hideSp(a){null!=document.getElementById(a).getAttribute("hidden")?document.getElementById(a).removeAttribute("hidden"):document.getElementById(a).setAttribute("hidden","true")}function setAnnotation(a){document.getElementById("speciesInfo").setAttribute("hidden","true"),document.getElementById("reactionInfo").setAttribute("hidden","true"),document.getElementById("compartmentInfo").setAttribute("hidden","true");var b=window.opener.modelDoc.getElementById(a);"species"==b.tagName&&(setSpeciesAnnotation(a),document.getElementById("speciesInfo").removeAttribute("hidden")),"compartment"==b.tagName&&(setCompartmentAnnotation(a),document.getElementById("compartmentInfo").removeAttribute("hidden")),"reaction"==b.tagName&&(setReactionAnnotation(a),document.getElementById("reactionInfo").removeAttribute("hidden")),MathJax.Hub.Queue(["Typeset",MathJax.Hub])}function setSpeciesAnnotation(a){var b="true"==window.opener.modelDoc.getElementById(a).getAttribute("included");b?(document.getElementById("spanSpeciesId").classList.remove("irt-included-not"),document.getElementById("spanSpeciesId").classList.add("irt-included")):(document.getElementById("spanSpeciesId").classList.remove("irt-included"),document.getElementById("spanSpeciesId").classList.add("irt-included-not"));var c=window.opener.modelDoc.getElementById(a);if(document.getElementById("spanSpeciesId").innerHTML=a,document.getElementById("spanSpeciesId2").innerHTML=a,document.getElementById("spanSpeciesName").innerHTML=c.getAttribute("name"),document.getElementById("spanSpeciesNote").replaceChild(c.getElementsByTagName("notes")[0].cloneNode(!0),document.getElementById("spanSpeciesNote").firstChild),"true"==c.getAttribute("boundaryCondition"))document.getElementById("spanSpeciesMode").innerHTML="explicit",document.getElementById("spanSpeciesEquations").replaceChild(getEquations(c),document.getElementById("spanSpeciesEquations").firstChild),document.getElementById("spanSpeciesInitials").innerHTML="-";else{document.getElementById("spanSpeciesMode").innerHTML="dynamic",document.getElementById("spanSpeciesEquations").innerHTML=" ";var d=searchParameterDependences(c),e=window.opener.modelDoc.getElementById(c.getAttribute("substanceUnits")).getAttribute("name");document.getElementById("spanSpeciesInitials").innerHTML=a+"(0) = "+c.getAttribute("initialConcentration")+" <i>\\({"+e+"}/{l}\\)</i><sup>&#160;("+d.cIdent[0]+")</sup>",document.getElementById("spanSpeciesIdentifications").replaceChild(getIdentifications(d.cIdent),document.getElementById("spanSpeciesIdentifications").firstChild)}var f=c.getAttribute("speciesType"),g=window.opener.modelDoc.getElementById(f);document.getElementById("spanSpeciesTypeId").innerHTML=f,document.getElementById("spanSpeciesTypeName").innerHTML=g.getAttribute("name"),document.getElementById("spanSpeciesTypeNote").innerHTML=g.getElementsByTagName("notes")[0].innerHTML,document.getElementById("spanSpeciesTypeReferences").innerHTML=getLink(g.getElementsByTagName("ref")),document.getElementById("spanSpeciesTypeSchemes").innerHTML=getSchemesList(a,"species").innerHTML;var h=c.getAttribute("compartment"),g=window.opener.modelDoc.getElementById(h);document.getElementById("spanSpeciesCompartmentId").innerHTML=h,document.getElementById("spanSpeciesCompartmentName").innerHTML=g.getAttribute("name")}function setCompartmentAnnotation(a){var b=window.opener.modelDoc.getElementById(a);document.getElementById("spanCompartmentId").innerHTML=a,document.getElementById("spanCompartmentId2").innerHTML=a,document.getElementById("spanCompartmentName").innerHTML=b.getAttribute("name"),b.getElementsByTagName("notes").length>0?document.getElementById("spanCompartmentNote").innerHTML=b.getElementsByTagName("notes")[0].innerHTML:document.getElementById("spanCompartmentNote").innerHTML="???",document.getElementById("spanCompartmentReferences").innerHTML=getLink(b.getElementsByTagName("ref"));var c=searchParameterDependences(b),d=window.opener.modelDoc.getElementById(b.getAttribute("units")).getAttribute("name");document.getElementById("spanCompartmentValue").innerHTML=a+" = "+b.getAttribute("size")+" <i>\\("+d+"\\)</i><sup>&#160;("+c.cIdent[0]+")</sup>",document.getElementById("spanCompartmentIdentifications").replaceChild(getIdentifications(c.cIdent),document.getElementById("spanCompartmentIdentifications").firstChild)}function setReactionAnnotation(a){var b="true"==window.opener.modelDoc.getElementById(a).getAttribute("included");b?(document.getElementById("spanReactionId").classList.remove("irt-included-not"),document.getElementById("spanReactionId").classList.add("irt-included")):(document.getElementById("spanReactionId").classList.remove("irt-included"),document.getElementById("spanReactionId").classList.add("irt-included-not"));var c=window.opener.modelDoc.getElementById(a);document.getElementById("spanReactionId").innerHTML=a,document.getElementById("spanReactionId2").innerHTML=a,document.getElementById("spanReactionName").innerHTML=c.getAttribute("name");var d=c.getElementsByTagName("notes");d.length>0?document.getElementById("spanReactionNote").replaceChild(d[0].cloneNode(!0),document.getElementById("spanReactionNote").firstChild):document.getElementById("spanReactionNote").innerHTML="???";var d=c.getElementsByTagName("annotation");d.length>0?document.getElementById("spanReactionReferences").innerHTML=getLink(c.getElementsByTagName("ref")):document.getElementById("spanReactionReferences").innerHTML="???",document.getElementById("spanReactionSchemes").innerHTML=getSchemesList(a,"reaction").innerHTML,document.getElementById("spanReactionFormula").replaceChild(getReactionFormula(c).cloneNode(!0),document.getElementById("spanReactionFormula").firstChild),document.getElementById("spanReactionEquations").replaceChild(getEquations(c),document.getElementById("spanReactionEquations").firstChild)}function getReactionFormula(a){var b=document.createElement("span"),c=a.getElementsByTagName("listOfReactants").item(0);if(c)var d=c.children;else var d=[];var e=a.getElementsByTagName("listOfProducts").item(0);if(e)var f=e.children;else var f=[];var g=a.getElementsByTagName("listOfModifiers").item(0);if(g)var h=g.children;else var h=[];for(var i="",j=0;j<d.length;j++)i+=d[j].getAttribute("species"),j<d.length-1&&(i+=" + ");d.length<1&&(i+="&#8709;"),i+=" &#8658; ";for(var j=0;j<f.length;j++)i+=f[j].getAttribute("species"),j<f.length-1&&(i+=" + ");f.length<1&&(i+="&#8709;"),h.length>0&&(i+="  ~ ");for(var j=0;j<h.length;j++)i+=h[j].getAttribute("species"),j<h.length-1&&(i+=", ");return b.innerHTML=i,b}function searchIdentificationId(a){var b=a.getElementsByTagName("ident");if(b.length>0)var c=b[0].getAttribute("refId");else var c="o:blank";return c}function searchParameterDependences(a){var b={c:[],f:[],cIdent:[],fIdent:[]};if("reaction"==a.tagName){b.f.push(a.id),b.fIdent.push(searchIdentificationId(a));var c=a.getElementsByTagName("ci")}if("assignmentRule"==a.tagName)var c=a.getElementsByTagName("ci");if("species"==a.tagName)if("true"!=a.getAttribute("boundaryCondition")){b.c.push(a.id),b.cIdent.push(searchIdentificationId(a));var c=[]}else{b.f.push(a.id),b.fIdent.push(searchIdentificationId(a));var d=window.opener.modelDoc.evaluate("//sbml:assignmentRule[@variable='"+a.id+"']",window.opener.modelDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0),c=d.getElementsByTagName("ci")}if("compartment"==a.tagName){b.c.push(a.id),b.cIdent.push(searchIdentificationId(a));var c=[]}for(var e=0;e<c.length;e++){var f=c[e].textContent.replace(/(^\s+|\s+$)/g,""),g=window.opener.modelDoc.getElementById(f);if("parameter"==g.tagName){var h=g.getElementsByTagName("ident");if(h.length>0)var i=h[0].getAttribute("refId");else var i="o:blank";if("true"==g.getAttribute("constant"))b.c.push(f),b.cIdent.push(i);else{b.f.push(f),b.fIdent.push(i);var d=window.opener.modelDoc.evaluate("//sbml:assignmentRule[@variable='"+f+"']",window.opener.modelDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0),j=searchParameterDependences(d);b.c=b.c.concat(j.c),b.f=b.f.concat(j.f),b.cIdent=b.cIdent.concat(j.cIdent),b.fIdent=b.fIdent.concat(j.fIdent)}}}return b}function uniqueArray(a){for(var b=[],c=0;c<a.length;c++)b.indexOf(a[c])==-1&&b.push(a[c]);return b}function getEquations(a){var b=document.createElement("table");b.setAttribute("class","equationTable");var c=document.createElement("tr");b.appendChild(c);var d=document.createElement("td");d.innerHTML=a.id,d.setAttribute("class","first"),c.appendChild(d);var d=document.createElement("td");d.innerHTML="=",d.setAttribute("class","second"),c.appendChild(d);var e=window.opener.modelDoc.evaluate("//sbml:assignmentRule[@variable='"+a.id+"']/mml:math | //sbml:reaction[@id='"+a.id+"']//mml:math ",window.opener.modelDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0),d=document.createElement("td");d.appendChild(e.cloneNode(!0)),d.setAttribute("class","third"),c.appendChild(d);var f=document.createElement("sup");f.innerHTML="&#160;("+searchIdentificationId(a)+")",d.appendChild(f);for(var g=searchParameterDependences(a),h=1;h<g.f.length;h++){var i=window.opener.modelDoc.getElementById(g.f[h]).getElementsByTagName("notes")[0].textContent,c=document.createElement("tr");c.setAttribute("title",i),b.appendChild(c);var d=document.createElement("td");d.innerHTML=g.f[h],d.setAttribute("class","first"),c.appendChild(d);var d=document.createElement("td");d.innerHTML="=",d.setAttribute("class","second"),c.appendChild(d);var e=window.opener.modelDoc.evaluate("//sbml:assignmentRule[@variable='"+g.f[h]+"']/mml:math | //sbml:reaction[@id='"+g.f[h]+"']//mml:math ",window.opener.modelDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0),d=document.createElement("td");d.appendChild(e.cloneNode(!0)),d.setAttribute("class","third"),c.appendChild(d);var f=document.createElement("sup");f.innerHTML="&#160;("+g.fIdent[h]+")",d.appendChild(f)}for(var h=0;h<g.c.length;h++){var i=window.opener.modelDoc.getElementById(g.c[h]).getElementsByTagName("notes")[0].textContent,c=document.createElement("tr");c.setAttribute("title",i),b.appendChild(c);var d=document.createElement("td");d.innerHTML=g.c[h],d.setAttribute("class","first"),c.appendChild(d);var d=document.createElement("td");d.innerHTML="=",d.setAttribute("class","second"),c.appendChild(d);var j=window.opener.modelDoc.getElementById(g.c[h]).getAttribute("value"),k=window.opener.modelDoc.getElementById(window.opener.modelDoc.getElementById(g.c[h]).getAttribute("units")).getAttribute("name"),d=document.createElement("td");d.innerHTML=j+" <i>\\("+k+"\\)</i><sup>&#160;("+g.cIdent[h]+")</sup>",d.setAttribute("class","third"),c.appendChild(d)}if("reaction"==a.tagName){var l=uniqueArray(g.fIdent.concat(g.cIdent));document.getElementById("spanReactionIdentifications").replaceChild(getIdentifications(l),document.getElementById("spanReactionIdentifications").firstChild)}if("species"==a.tagName){var l=uniqueArray(g.fIdent.concat(g.cIdent));document.getElementById("spanSpeciesIdentifications").replaceChild(getIdentifications(l),document.getElementById("spanSpeciesIdentifications").firstChild)}return b}function getIdentifications(a){var b=document.createElement("table");b.setAttribute("class","equationTable");for(var c=0;c<a.length;c++){var d=document.createElement("tr");b.appendChild(d);var e=document.createElement("td");e.innerHTML="("+a[c]+")",e.setAttribute("class","first"),d.appendChild(e);var e=document.createElement("td");e.innerHTML=":",e.setAttribute("class","second"),d.appendChild(e);var e=document.createElement("td");e.setAttribute("class","third"),d.appendChild(e);var f=window.opener.iddbDoc.evaluate("//irt:identification[@id='"+a[c]+"']",window.opener.iddbDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0),g="";if(null!=f){null!=f.getAttribute("name")?nm="<b>"+f.getAttribute("name")+". </b>":nm="",g+=nm+"<i>"+f.getAttribute("type")+"</i>. ",f.getElementsByTagName("notes").length>0&&(g+=f.getElementsByTagName("notes")[0].textContent),f.getElementsByTagName("attachedFile").length>0&&(g+=" Attached files:");for(var h=0;h<f.getElementsByTagName("attachedFile").length;h++){var i=f.getElementsByTagName("attachedFile")[h].getAttribute("path");g=g+" <a href='"+window.opener.DBVersion+"/iddb/"+i+"' target='_blank'>"+i+"</a>;"}f.getElementsByTagName("ref").length>0&&(g=g+" References: "+getLink(f.getElementsByTagName("ref")))}e.innerHTML=g}return b}function getSchemesList(a,b){for(var c=document.createElement("p"),d='//irt:scheme[irt:term[@type="'+b+'"]/@ref="'+a+'"]',e=window.opener.indexesDoc.evaluate(d,window.opener.indexesDoc,window.opener.irtns,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),f="",g=0;g<e.snapshotLength;g++)f+="<span class='schemeLink' onmousedown=\"{window.opener.openSvgScheme('"+e.snapshotItem(g).getAttribute("id")+"'); window.opener.openSection('schemes');}\">"+e.snapshotItem(g).getAttribute("name")+"</span>; ";return c.innerHTML=f,c}function showFixedValue(a){var b=document.createElement("span");return"compartment"==a.tagName&&(b.innerHTML=a.getAttribute("size")+" {"+modelDoc.getElementById(a.getAttribute("units")).getAttribute("name")+"}"),"parameter"==a.tagName&&(b.innerHTML=a.getAttribute("value")+" {"+modelDoc.getElementById(a.getAttribute("units")).getAttribute("name")+"}"),"species"==a.tagName&&(b.innerHTML=a.getAttribute("initialConcentration")+" {"+modelDoc.getElementById(a.getAttribute("substanceUnits")).getAttribute("name")+"/"+modelDoc.getElementById(modelDoc.getElementById(a.getAttribute("compartment")).getAttribute("units")).getAttribute("name")+"}"),b}function getLink(a){for(var b="",c=0;c<a.length;c++){var d=a[c].getAttribute("db"),e=window.opener.indexesDoc.getElementById(d).getAttribute("suffix"),f=a[c].getAttribute("ref");b=b+'<a href="'+e+f+'" class="extLink" target="_blank">'+f+"</a><sup>&#160;"+d+"</sup>; "}return b}var input=null;window.MathJax={MathML:{extensions:["mml3.js","content-mathml.js"]}},window.onload=function(){input=window.location.search.replace("?",""),setAnnotation(input),document.getElementById("spanReactionId").addEventListener("mousedown",function(){var a=document.getElementById("spanReactionId").classList.contains("irt-included");window.opener.modelDoc.getElementById(input).setAttribute("included",!a)},!1),document.getElementById("spanSpeciesId").addEventListener("mousedown",function(){var a=document.getElementById("spanSpeciesId").classList.contains("irt-included");window.opener.modelDoc.getElementById(input).setAttribute("included",!a)},!1)},window.onunload=function(){};