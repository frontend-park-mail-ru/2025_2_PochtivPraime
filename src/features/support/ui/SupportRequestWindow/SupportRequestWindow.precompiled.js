import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"support-request-window\">\n  <div class=\"support-request-window__header\">\n    <h2 class=\"support-request-window__title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":46},"end":{"line":3,"column":55}}}) : helper)))
    + "</h2>\n    <button class=\"support-request-window__close\" type=\"button\">&times;</button>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Логин</label>\n    <div class=\"support-request-window__username-input\"></div>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Email</label>\n    <div class=\"support-request-window__email-input\"></div>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Категория</label>\n    <div class=\"support-request-window__category-input\"></div>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Описание</label>\n    <div class=\"support-request-window__text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":24,"column":46},"end":{"line":24,"column":61}}}) : helper)))
    + "</div>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Создано</label>\n    <div class=\"support-request-window__text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"createdAt") || (depth0 != null ? lookupProperty(depth0,"createdAt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createdAt","hash":{},"data":data,"loc":{"start":{"line":29,"column":46},"end":{"line":29,"column":59}}}) : helper)))
    + "</div>\n  </div>\n\n  <div class=\"support-request-window__field\">\n    <label class=\"support-request-window__label\">Статус</label>\n    <div class=\"support-request-window__status "
    + alias4(((helper = (helper = lookupProperty(helpers,"statusClass") || (depth0 != null ? lookupProperty(depth0,"statusClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusClass","hash":{},"data":data,"loc":{"start":{"line":34,"column":47},"end":{"line":34,"column":62}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"statusLabel") || (depth0 != null ? lookupProperty(depth0,"statusLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusLabel","hash":{},"data":data,"loc":{"start":{"line":34,"column":64},"end":{"line":34,"column":79}}}) : helper)))
    + "</div>\n  </div>\n\n  <div class=\"support-request-window__delete-button-wrapper\"></div>\n</div>";
},"useData":true});
