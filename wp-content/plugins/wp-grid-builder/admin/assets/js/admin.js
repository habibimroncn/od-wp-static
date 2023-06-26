/*!
* WP Grid Builder Plugin
*
* @package   WP Grid Builder
* @author    Loïc Blascos
* @link      https://www.wpgridbuilder.com
* @copyright 2019-2023 Loïc Blascos
*
*/
!function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(e.prototype=window.Event.prototype,window.CustomEvent=e)}(),function(ce){ce(function(){"use strict";function e(i,o,a){var r;return function(){var e=this,t=arguments,n=a&&!r;clearTimeout(r),r=setTimeout(function(){r=null,a||i.apply(e,t)},o),n&&i.apply(e,t)}}function t(e){var t=document.createElement("input");t.style.position="absolute",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}var n,i=window.navigator.userAgent,o=i.indexOf("MSIE");0<((o=o<0?i.indexOf("Trident/"):o)<0?i.indexOf("Edge/"):o)&&ce("html").addClass("is-ie");ce(document).on("click",".wpgb-copy-to-clipboard",function(){var e=ce(this);clearTimeout(n),t(e.text().trim()),WPGB_Popup_Message("shortcode","success"),ce(".wpgb-shortcode-copied").removeClass("wpgb-shortcode-copied"),e.addClass("wpgb-shortcode-copied"),n=setTimeout(function(){e.removeClass("wpgb-shortcode-copied")},1800)});function a(e){var t=new Date;t.setTime(t.getTime()-1),document.cookie=e+"=; expires="+t.toGMTString()}function r(e){for(var t,n=decodeURIComponent(window.location.search.substring(1)).split("&"),i=0;i<n.length;i++)if((t=n[i].split("="))[0]===e)return"undefined"===t[1]||t[1]}ce('input[name="wpgb[shortcode]"][disabled]').parent().on("click",function(e){e.target&&"INPUT"===e.target.tagName&&parseInt(ce('[name="wpgb_id"]').val(),10)&&(clearTimeout(n),t(e.target.value.trim()),WPGB_Popup_Message("shortcode","success"))}),ce(document).on("submit","#wpgb form",function(){return!1});function D(e){var t,n,i;e&&(t=new FormData,n=encodeURIComponent(r("username")),i=encodeURIComponent(r("password")),t.append("import",e),t.append("action","wpgb_import"),t.append("nonce",ce("#wpgb_upload_field").val()),t.append("method","read_file"),t.append("object","upload"),t.append("wpgb","read_file"),t.append("auth",window.btoa(n+":"+i)),m.text(wpgb_popup_L10n.read_file),ce(".wpgb-import-list").remove(),ce.ajax({url:ajaxurl,type:"POST",contentType:!1,processData:!1,dataType:"json",data:t,context:ce(this),success:function(e){e.content?(w.prepend(e.content.list),h=e.content.data,m.text(f),v.attr("tabindex","-1"),_.removeAttr("tabindex")):(m.text(e.message),setTimeout(function(){m.text(f)},2e3))},error:function(e,t){"abort"!==t&&(m.text(wpgb_popup_L10n.unknown),setTimeout(function(){m.text(f)},2e3),console.error(e))}}))}function s(e,t){window.clearInterval(c),a("wpgb_items_exported");var e={action:"wpgb_export",page:r("page"),type:e,nonce:wpgb_L10n.export,ids:t},n=((t=document.createElement("a")).href="admin-post.php?"+ce.param(e),document.body.appendChild(t),t.click(),document.body.removeChild(t),(new Date).getTime());c=window.setInterval(function(){var e=(new Date).getTime()-n,t=function(e){e=("; "+document.cookie).split("; "+e+"=");if(2==e.length)return e.pop().split(";").shift()}("wpgb_items_exported");(t||3e3<=e)&&(e=void 0!==t&&"false"!==t?decodeURIComponent(t).replace(/\+/g," "):"",WPGB_Popup_Message(null,"success",e),window.clearInterval(c),a("wpgb_items_exported"))},50)}function I(e){var t;e.content&&(t=y&&y[0]&&document.activeElement===y[0],ce(".wpgb-admin-panel").replaceWith(e.content),t)&&ce(".wpgb-admin-panel").find('[data-slug="'+y.data("slug")+'"]').focus()}function z(){P.addClass("wpgb-loading"),b({nonce:ce('[data-action="clear_index"]').data("nonce"),action:"wpgb_global",method:"index_stats",object:"settings",symbol:"clear_index"},null,{success:function(e){P.removeClass("wpgb-loading"),P.html(e.content)},error:null})}function A(e){u&&4!==u.readyState||b({nonce:wpgb_L10n.index,action:"wpgb_index",method:"get_progress",object:"facets",symbol:""},{id:e},{success:function(e){var t;clearTimeout(U),e.content.message?(t=e.content.progress,e=e.content.message,t=parseFloat(t).toFixed(1),x.addClass("wpgb-indexing"),x.html(e),k.html(e),x.css("background-size",t+"% 100%")):(X!==x.html()&&(x.removeClass("wpgb-indexing"),x.css("background-size",""),x.html(wpgb_popup_L10n.indexing_complete),k.html(wpgb_popup_L10n.indexing_complete)),U=setTimeout(function(){x.html(X),k.html(Y)},2500),clearInterval(p))},error:function(e){}})}function N(){M(JSON.stringify({paged:1,order:"DESC",orderby:"modified_date",limit:100,type:"cards",s:ce("#wpgb-search-card").val(),is_selector:1}),"overview"),ce(".wpgb-grid-preview-header ul").hide(),ce(".wpgb-grid-preview-header .wpgb-grid-preview-update").hide(),ce(".wpgb-grid-preview-header .wpgb-search-field").show(),ce(".wpgb-grid-preview-header .wpgb-search-field input").focus()}function F(){var e;ce(".wpgb-grid-preview-holder").length||(e=ce('iframe[name="wpgb_preview"]')).height(e.contents().find("html").outerHeight(!0))}ce(document).on("change",".wpgb-select-item",function(){var e,t=ce(this),n=ce(".wpgb-select-item:not(#wpgb-bulk-select)");t.is("#wpgb-bulk-select")?(e=t.prop("checked"),n.prop("checked",e)):(t=n.length,e=n.serializeArray().length,ce("#wpgb-bulk-select").prop("checked",t===e))}),ce("#wpgb_form").submit(function(e){e.preventDefault()});var J,c,U,p,d,Q,l,g,u=null,b=function(t,e,n){e=ce.extend({},t,e),u&&JSON.stringify(t)===JSON.stringify(J)&&u.abort(),J=t,u=ce.ajax({url:ajaxurl,type:"POST",data:e,dataType:"json",beforeSend:function(e){n&&n.hasOwnProperty("before")&&n.before&&n.before(e),WPGB_Popup_Message(t.method,"loading")},error:function(e,t){"abort"!==t&&(n&&n.hasOwnProperty("error")&&n.error&&(e.success=!1,n.error(e)),WPGB_Popup_Message("unknown","error"),console.error(e))},success:function(e){n&&n.hasOwnProperty("success")&&n.success&&n.success(e),WPGB_Popup_Message(t.method,e.success?"success":"error",e.message)}})},w=(ce(document).on("keyup",".wpgb-import-list-search input",function(){var t=0,e=ce(".wpgb-list-item:not([hidden])"),n=ce(".wpgb-import-list-number"),i=ce(this).val();e.each(function(){var e=ce(this);0<=e.find("span").text().toLowerCase().indexOf(i)?(t++,e.show()):e.hide()}),ce(".wpgb-list-no-result")[0===t?"show":"hide"](),n.text(t+" "+n.data(1<t?"plural":"singular"))}),ce(".wpgb-uploader")),m=ce(".wpgb-uploader-message"),_=ce(".wpgb-uploader-remove"),f=ce(".wpgb-uploader-message").text(),v=(_.on("click",function(){ce(".wpgb-import-list").remove(),_.attr("tabindex","-1"),v.removeAttr("tabindex")}),w.on("drag dragstart dragend dragover dragenter dragleave drop",function(e){e.preventDefault(),e.stopPropagation()}),w.on("dragover dragenter",function(){w.addClass("wpgb-is-dragover")}),w.on("dragleave dragend drop",function(){w.removeClass("wpgb-is-dragover")}),w.on("drop",function(e){e=e.originalEvent.dataTransfer.files;e[0]&&(ce(".wpgb-import-list").remove(),D(e[0]))}),ce(".wpgb-file-input")),h=(v.change(function(){var e=v[0].files[0];e&&(D(e),ce(this).val(""))}),ce(document).on("click",".wpgb-import-items",function(){var e,t=ce(".wpgb-import-list input").WPGB_SerializeForm();Object.keys(t).length?(t=JSON.stringify(t),e=ce(".wpgb-dashboard-page").length,t={data:h,demo:ce(this).data("demo"),types:t},te(),b({nonce:ce(this).data("nonce"),action:"wpgb_import",method:"import",object:"content",symbol:""},t,{before:"",success:e?"":j,error:e?"":j})):WPGB_Popup_Message("no_selection","error")}),""),R=(ce(".wpgb-browse-demo").on("click",function(){var e=ce(this);ce(".wpgb-import-list").remove(),m.text(wpgb_popup_L10n.read_file),b({nonce:ce("#wpgb_upload_field").val(),action:"wpgb_import",method:"browse_demo",object:"upload",symbol:""},{demo:e.data("demo")},{success:function(e){e.content?(h=e.content.data,w.prepend(e.content.list),m.text(f),v.attr("tabindex","-1"),_.removeAttr("tabindex")):(m.text(e.message),setTimeout(function(){m.text(f)},2e3))},error:function(e,t){"abort"!==t&&(m.text(wpgb_popup_L10n.unknown),setTimeout(function(){m.text(f)},2e3),console.error(e))}})}),ce(document).on("click",".wpgb-bulk-export button",function(){var e=ce(this).prev().find("select").val();e?(WPGB_Popup_Message("processing","loading"),setTimeout(function(){s(e,-1)},10)):WPGB_Popup_Message("no_content","error")}),""),q=(ce(document).on("submit",".wpgb-dashboard-page form",function(e){e.preventDefault(),ce('[data-method="activate_plugin"]').click()}),ce(document).on("click",".wpgb-input-submit-wrapper",function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),ce(this).closest("form").submit()}),ce(document).on("click",'[data-method="activate_plugin"], [data-method="deactivate_plugin"], [data-method="refresh_status"]',function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();var e=ce(this).data("method"),t=e.replace("_plugin","").replace("_status",""),n=ce("#wpgb_plugin_"+t+"_field").val()||ce(this).data("nonce"),i={page:window.location.href,license_email:ce('input[name="license_email"]').val(),license_key:ce('input[name="license_key"]').val()};R=ce(this).closest(".wpgb-admin-panel"),b({nonce:n,action:"wpgb_plugin",method:e,object:t,symbol:""},i,{success:q,error:""})}),function(e){!e.success&&ce("#wpgb-license-email").length||e.content&&R.html(e.content)}),y="",$=(ce(document).on("click",".wpgb-add-ons-card button",function(e){e.preventDefault();var e=y=ce(this),t=e.data("method")+"_addon",n=t,i=e.data("name").replace(/^\s+|\s+$/g,"").toLowerCase().replace(".","-").replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/\//g,""),o=e.data("nonce"),a={slug:e.data("slug"),name:e.data("name")};e.text(wpgb_popup_L10n["install"===e.data("method")?"installing":"activating"]),e.addClass("wpgb-loading"),b({nonce:o,action:"wpgb_plugin",method:t,object:n,symbol:i},a,{success:I,error:I})}),ce(document).on("click",".wpgb_global_settings_form .wpgb-settings-header button",function(e){e.preventDefault();var t=ce(this).data("action");WPGB_Dialog(wpgb_dialog_L10n[t],function(){var e;"export"===t?(WPGB_Popup_Message("processing","loading"),setTimeout(function(){s("settings",-1)},10)):("save"===t?WPGB_Popup_Message("save_changes","loading"):WPGB_Popup_Message("reset_settings","loading"),e=ce("form#wpgb_form").WPGB_SerializeForm().wpgb,b({nonce:ce("#wpgb_fields_nonce").val(),action:"wpgb_global",method:t,object:"settings",symbol:""},{type:"settings",settings:JSON.stringify(e)},{success:$,error:null}))})}),function(e){var t;e.content&&(t=ce('[aria-selected="true"]').index(),ce("form#wpgb_form").replaceWith(e.content),ce(".wpgb-settings-tabs ul li").eq(t).trigger("click"),ce.WPGB_Conditional_Logic(),WPGB_Tooltip_Init(),WPGB_Select_Init(),WPGB_Gradient_Init())}),P=ce(".wpgb-index-stats"),H=P.html(),i=(P.length&&z(),ce(document).on("click",'[data-action="clear_cache"], [data-action="delete_stylesheets"], [data-action="stop_indexer"], [data-action="clear_index"]',function(e){e.preventDefault();var t=ce(this).data("action");b({nonce:ce(this).data("nonce"),action:"wpgb_global",method:t,object:"settings",symbol:t},null,{success:function(){"clear_index"===t&&(P.html(H),z())},error:null})}),ce(document).on("click",'.wpgb_grid_settings_form [data-action="save"]',function(e){e.preventDefault(),WPGB_Popup_Message("save_changes","loading");var t,n=ce("form#wpgb_form").WPGB_SerializeForm().wpgb;for(t in n.grid_layout){var i,o=n.grid_layout[t].style,a=n.grid_layout[t].facets;for(i in o)""===o[i]&&delete o[i];Object.keys(o).length||a||delete n.grid_layout[t]}n={name:n.name,type:n.type,source:n.source,settings:n},b({nonce:ce("#wpgb_fields_nonce").val(),action:"wpgb_grid",method:"save",object:"settings",symbol:""},{type:"grids",id:ce('[name="wpgb_id"]').val(),settings:JSON.stringify(n)},{success:function(e){var t;e.success||e.message?(WPGB_Popup_Message("save_changes",e.success?"success":"error",e.message),window.history&&window.history.pushState&&e.content&&(t=WPGB_Query_String.set({create:"",id:e.content}),window.history.replaceState({},"",t),ce('[name="wpgb_id"]').val(e.content),ce('[name="wpgb[id]"]').val("wpgb-grid-"+e.content),ce('[name="wpgb[shortcode]"]').val('[wpgb_grid id="'+e.content+'"]'))):WPGB_Popup_Message("unknown","error")},error:null})}),ce('[name="wpgb[slug]"]')),K=!(!i||!i[0]||""!==i[0].value),V=(ce(document).on("input",'[name="wpgb[name]"]',function(e){var t=ce('[name="wpgb[slug]"]')[0],n=this.value;K&&(t.value=V(n))}),ce(document).on("change",'[name="wpgb[slug]"]',function(e){var t=this.value.trim();K=!t||(this.value=V(t),!1)}),function(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.normalize("NFD").replace(/[\u0300-\u036f]/g,"")).replace(/(<([^>]+)>)/gi,"")).replace(/</g,"")).replace(/>/g,"")).replace(/%/g,"")).toLowerCase()).replace(/&.+?;/g,"",e)).replace(".","_",e)).replace(/[^%a-z0-9 _-]/g,"",e)).replace(/\s+/g,"_",e)).replace(/-\s*$/,"")).replace("-","_")}),x=(ce(document).on("click",'.wpgb_facet_settings_form [data-action="save"]',function(e){e.preventDefault(),ce('[name="wpgb[name]"]').trigger("input"),WPGB_Popup_Message("save_changes","loading");var n={slug:(n=ce("form#wpgb_form").WPGB_SerializeForm().wpgb).slug,name:n.name,type:n.type,source:n.source,settings:n};b({nonce:ce("#wpgb_fields_nonce").val(),action:"wpgb_facet",method:"save",object:"settings",symbol:""},{type:"facets",id:ce('[name="wpgb_id"]').val(),settings:JSON.stringify(n)},{success:function(e){var t;e&&(e.success||e.message)?(WPGB_Popup_Message("save_changes",e.success?"success":"error",e.message),window.history&&window.history.pushState&&e.content&&(t=WPGB_Query_String.set({create:"",id:e.content.id}),window.history.replaceState({},"",t),ce('[name="wpgb_id"]').val(e.content.id),ce('[name="wpgb[id]"]').val("wpgb-facet-"+e.content.id),ce('[name="wpgb[shortcode]"]').val('[wpgb_facet id="'+e.content.id+'" grid="0"]'),"string"==typeof e.content.index?Z(e.content.index,n.slug):e.content.index&&G(e.content.id))):WPGB_Popup_Message("unknown","error")},error:null})}),ce('button[data-action="index"], button[data-action="index_all"]')),k=ce("title"),X=x.html(),Y=k.html(),Z=(ce('button[data-action="index"]').on("click",function(){var e=ce('[name="wpgb_id"]').val();e&&G(e)}),ce('button[data-action="index_all"]').on("click",function(){G(-1)}),function(e,t){b({nonce:wpgb_L10n.index,action:"wpgb_index",method:"update_slug",object:"facets",symbol:""},{old_slug:e,new_slug:t},{success:function(e){},error:function(e){}})}),W=0,G=function(t){0<W&&Date.now()-W<750||(W=Date.now(),x.addClass("wpgb-indexing"),x.css("background-size",""),x.html(-1===t?wpgb_popup_L10n.indexing_start:wpgb_popup_L10n.check_index),b({nonce:wpgb_L10n.index,action:"wpgb_index",method:"index",object:"facets",symbol:""},{id:t},{success:function(e){e.content||-1===t?(x.html(wpgb_popup_L10n.indexing_start),k.html(wpgb_popup_L10n.indexing_start)):(x.html(wpgb_popup_L10n.pending_index),k.html(wpgb_popup_L10n.pending_index)),clearInterval(p),ee(t)},error:function(e){}}))},ee=function(e){A(e),p=setInterval(function(){A(e)},2e3)},B=(ce('button[data-action="index_all"]').length&&ee(-1),{}),te=function(e,t){B={paged:1,s:ce(".wpgb-list-table-search input").val()||"",order:ce(".wpgb-sorting-active").data("order")||"DESC",orderby:ce(".wpgb-sorting-active").data("orderby")||"modified_date",limit:ce(".wpgb-list-table-per-page").val()||10,type:ce(".wpgb-list-table-header").data("type")}},C=(te(),ce(document).on("click",".wpgb-list-table-indicators [data-orderby]:not(.wpgb-sorting-active)",function(){B.paged=1,B.order=ce(this).data("order"),B.orderby=ce(this).data("orderby"),T()}),ce(document).on("click",".wpgb-list-table-page[data-page]:not(.wpgb-list-table-current-page)",function(){ce(this).data("page")&&(B.paged=ce(this).data("page"),T())}),ce(document).on("change",".wpgb-list-table-per-page",function(){var e=ce(this).val();e!==B.limit&&(B.paged=1,B.limit=e,T())}),ce(document).on("keyup",".wpgb-list-table-search input",e(function(){var e=B.s.trim();B.paged=1,B.s=ce(this).val().trim(),e!==B.s&&T()},200)),ce(document).on("click",".wpgb-list-table-wrapper [data-action]",function(){C(ce(this).data("nonce"),ce(this).data("action"),ce(this).closest("[data-id]").data("id"))}),ce(document).on("click",".wpgb-list-table-bulk-actions button",function(){var e=ce("input.wpgb-select-item:checked:not(#wpgb-bulk-select)").map(function(){return ce(this).val()}).get();C(ce("#wpgb_actions_nonce").val(),ce(this).prev().find("select").val(),Q||e)}),function(e,t,n){t?"preview"===t?M(g=n,"grid"):!n||n.length<1?WPGB_Popup_Message("no_selection","error"):(B.ids=n,B.paged=1,WPGB_Dialog(wpgb_dialog_L10n[t],function(){WPGB_Popup_Message("processing","loading"),"export"===t?setTimeout(function(){s(B.type,n)},10):ce.ajax({url:ajaxurl+"?"+ce.param(B),type:"POST",data:{nonce:e,action:"wpgb_actions",method:t,object:ce(".wpgb-list-table-header").data("type"),symbol:Array.isArray(n)?"bulk":t+"_"+n,type:B.type,ids:n},dataType:"json",beforeSend:function(e){ne(t,n),WPGB_Popup_Message(t,"loading")},error:function(e,t){"abort"!==t&&(j(e),WPGB_Popup_Message("unknown","error"),console.error(e))},success:function(e){j(e),WPGB_Popup_Message(t,e.success?"success":"error",e.message)}})})):WPGB_Popup_Message("no_action","error")}),ne=function(e,t){if(t){Array.isArray(t)||(t=String(t).split());var n="",i=ce(".wpgb-list-table-rows");switch(e){case"delete":n="wpgb-delete-item";break;case"duplicate":n="wpgb-duplicate-item";break;case"favorite":n="wpgb-favorite-item"}ce('iframe[name="wpgb_preview"]').length&&(i=ce('iframe[name="wpgb_preview"]').contents()),t.forEach(function(e){i.find('[data-id="'+e+'"]').addClass(n)})}},S="",j=function(e){var t,n,i;ce(".wpgb-list-table-rows").removeClass("wpgb-loading"),ce(".wpgb-list-table-rows li").removeClass("wpgb-delete-item wpgb-duplicate-item wpgb-favorite-item"),e.success&&(t=ce("#wpgb-admin-content"),n=ce(".wpgb-list-table-wrapper"),i=ce(e.content).find(".wpgb-list-table-wrapper").html(),!e.content||S===e.content&&!L||i&&n.length?i&&(S!==i||L)&&(n.html(i),S=i):(t.html(e.content),S=e.content),B.type=ce(".wpgb-list-table-header").data("type"),WPGB_Tooltip_Init(),WPGB_Select_Init(),ae())},T=function(e){ce(".wpgb-list-table-rows").addClass("wpgb-loading");var t={nonce:ce('input[name="wpgb_actions_nonce"]').val(),action:"wpgb_actions",method:"query",object:ce(".wpgb-list-table-header").data("type"),symbol:"bulk",type:B.type};d&&d.abort(),d=ce.ajax({url:ajaxurl+"?"+ce.param(B),type:"POST",data:t,dataType:"json",beforeSend:function(e){ne(t.action),WPGB_Popup_Message(t.method,"loading")},error:function(e,t){"abort"!==t&&(j(e),WPGB_Popup_Message("unknown","error"),console.error(e))},success:function(e){j(e),WPGB_Popup_Message(t.method,e.success?"success":"error",e.message)}})},ie=null,oe=(ce("button.wpgb-select-card").on("click",function(){ie=ce(this),N()}),ce(document).on("keyup","#wpgb-search-card",e(function(){ce(".wpgb-grid-preview-inner iframe").remove(),N()},200)),window.addEventListener("wpgb_preview_select_card.wpgb",function(e){var t,n=ie.prev().find("select");n.find('option[value="'+e.detail.id+'"]').length||((t=document.createElement("option")).value=e.detail.id,t.text=e.detail.name,n[0].add(t,null)),ce(".wpgb-grid-preview-close").click(),n.val(e.detail.id).trigger("change")}),ce(document).on("change",'[name="wpgb[type]"], select[name*="wpgb[cards]"]',function(){oe()}),function(){var e=ce('[name="wpgb[type]"]:checked').val(),t=ce('select[name*="wpgb[cards]"]').map(function(){return this.value}).get().filter(function(e,t,n){return""!==e&&t===n.indexOf(e)});b({nonce:ce("#wpgb_fields_nonce").val(),action:"wpgb_grid",method:"check_type",object:"settings",symbol:""},{type:e,cards:t.length?t:[0]},{before:function(){},success:function(e){ce(".wpgb-nota-grid-type.wpgb-warning").remove(),e.content&&(ce("#wpgb-cards-tab > .wpgb-admin-section:nth-child(1)").append(e.content),ce('[name="wpgb[type]"').closest(".wpgb-admin-section").append(e.content))}})}),L=(ce('select[name*="wpgb[cards]"]').length&&oe(),ce(".wpgb-cards-page").length),M=function(e,t){var n,i={action:"wpgb_preview",method:"preview",nonce:wpgb_L10n.preview,type:t,settings:e},t=document.createElement("iframe"),o=(t.name="wpgb_preview",ce(".wpgb-grid-preview-inner").append(t),document.createElement("form"));for(n in o.method="post",o.target="wpgb_preview",o.action=wpgb_L10n.preview_action,i){var a=document.createElement("input");a.setAttribute("name",n),a.setAttribute("value",i[n]),o.appendChild(a)}document.body.appendChild(o),o.submit(),document.body.removeChild(o),o=null,ce('iframe[name="wpgb_preview"]').css("opacity",0),ce(".wpgb-grid-preview-header").removeClass("wpgb-grid-preview-small"),ce(".wpgb-grid-preview-holder").show(),ce(".wpgb-list-table-cards").show(),ce(".wpgb-preloader").show(),ce(".wpgb-grid-preview-header ul").removeAttr("style"),ce(".wpgb-grid-preview-header .wpgb-grid-preview-update").removeAttr("style"),ce(".wpgb-grid-preview-header .wpgb-search-field").hide()},ae=function(){L&&ce(".wpgb-list-table-cards .wpgb-grid-preview-inner").length&&(ce(".wpgb-list-table-noresult").length?(ce(".wpgb-grid-preview-inner iframe").remove(),ce(".wpgb-list-table-cards").hide()):M(JSON.stringify(B),"overview"))},E=(ae(),ce(document).on("click",'.wpgb_grid_settings_form [data-action="preview"]',function(e){e.preventDefault();var e=ce('[name="wpgb_id"]').val(),t=ce("form#wpgb_form").WPGB_SerializeForm().wpgb;t.id=0<e?e:"preview",g=JSON.stringify(t),ce('iframe[name="wpgb_preview"]').remove(),M(g,"grid")}),ce(document).on("click",".wpgb-grid-preview-close, .wpgb-grid-preview-overlay",function(){O(),ce(".wpgb-grid-preview-holder").hide(),ce('iframe[name="wpgb_preview"]').css("opacity",0),ce(".wpgb-grid-preview-header li").removeClass("wpgb-active"),ce(".wpgb-grid-preview-header li:first-child").addClass("wpgb-active"),ce(".wpgb-grid-preview-inner").css("maxWidth","1920px"),ce('iframe[name="wpgb_preview"]').remove()}),ce(document).on("click",".wpgb-grid-preview-update",function(){O(),ce('iframe[name="wpgb_preview"]').remove(),M(g,"grid")}),ce(document).on("click",".wpgb-grid-preview-header li",function(e){var t=ce(this).index(),n=l?Object.keys(l):[1920,1200,980,768,480,320],n=(n.sort(function(e,t){return t-e}),Math.min(1920,n[t]));ce(".wpgb-grid-preview-inner iframe")[0].style.transition="none",ce(".wpgb-grid-preview-inner iframe")[0].style.opacity=0,ce(".wpgb-grid-preview-header li").removeClass("wpgb-active"),ce(".wpgb-grid-preview-header")[n<380?"addClass":"removeClass"]("wpgb-grid-preview-small"),ce(".wpgb-grid-preview-inner").css("maxWidth",n+"px"),ce(this).addClass("wpgb-active"),setTimeout(function(){requestAnimationFrame(function(){ce(".wpgb-grid-preview-inner iframe")[0].style.transition="",ce(".wpgb-grid-preview-inner iframe")[0].style.opacity=1})},150)}),ce(document).on("change","#wpgb-bulk-select",function(){var e=new CustomEvent("wpgb_preview_select_all.wpgb",{detail:ce(this).prop("checked")||""});window.dispatchEvent(e)}),window.addEventListener("wpgb_preview_loaded.wpgb",function(e){l=e.detail?e.detail.cardSizes:null,ce(".wpgb-preloader").hide(),ce('iframe[name="wpgb_preview"]').css("opacity",1),ce('iframe[name="wpgb_preview"]').on("load",function(){F(),ce(this).contents().on("click",function(){ce('iframe[name="wpgb_preview"]')[0].contentWindow.focus()})})}),window.addEventListener("wpgb_preview_resized.wpgb",function(e){F()}),window.addEventListener("wpgb_preview_select_item.wpgb",function(e){Q=e.detail.ids,ce("#wpgb-bulk-select").prop("checked",e.detail.total===e.detail.selected)}),window.addEventListener("wpgb_preview_edit_item.wpgb",function(e){"_blank"===e.detail.target?window.open(e.detail.url,"_blank").focus():window.location.href=e.detail.url}),window.addEventListener("wpgb_preview_action.wpgb",function(e){e.detail.action&&(ce(window).focus(),"edit"===e.detail.action?se(e.detail.nonce,e.detail.type,e.detail.id):C(e.detail.nonce,e.detail.action,e.detail.id))}),null),re=null,O=function(){ce(".wpgb-grid-preview-holder").removeAttr("data-disabled"),ce(".wpgb-card-settings-holder").remove()},se=function(e,t,n){n&&t&&(E=n,re=t,WPGB_Popup_Message("processing","loading"),b({nonce:e,action:"wpgb_fields",method:"render_fields",object:"edit",symbol:n},{id:n,type:t},{before:function(){O()},success:function(e){e.content?((e=ce(e.content)).find("#wpgb_fields_nonce").remove(),ce(".wpgb-grid-preview-holder").attr("data-disabled",""),ce(".wpgb-grid-preview-holder").append(e),WPGB_Select_Init(),WPGB_Tooltip_Init(),WPGB_Gradient_Init(),jQuery.WPGB_Conditional_Logic(),(e=e.find(".wpgb-gallery")).length&&e.sortable({items:"> li:not(:first-child)",placeholder:"wpgb-image",revert:0}).disableSelection()):WPGB_Popup_Message("unknown","error")}}))};ce(document).on("click",".wpgb-card-settings-holder",function(e){e.target&&e.target.classList.contains("wpgb-card-settings-close")&&O(),e.target&&e.target.classList.contains("wpgb-card-settings-holder")&&O()}),ce(document).on("click",".wpgb-card-settings-holder button:first-of-type",function(e){var t;E&&(t=ce('.wpgb-card-settings *:not([name="wpgb_fields_nonce"])').WPGB_SerializeForm().wpgb,WPGB_Popup_Message("processing","loading"),b({nonce:ce(this).data("nonce"),action:"wpgb_fields",method:"save_fields",object:"save",symbol:E},{id:E,type:re,meta:JSON.stringify(t)},{before:function(){},success:function(e){e.content||WPGB_Popup_Message("unknown","error")}}))}),ce(document).on("click",'.wpgb-nota-bene a[href*="&tab=card-styles"]',function(e){e.preventDefault(),ce(".wpgb-card-styles-tab").click()})})}(jQuery);