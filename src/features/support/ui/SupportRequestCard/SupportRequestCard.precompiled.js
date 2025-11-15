import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"support-request-card\">\n  <div class=\"support-request-card__content\">\n    <span class=\"support-request-card__id\">Запрос #"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":51},"end":{"line":3,"column":57}}}) : helper)))
    + "</span>\n    <span class=\"support-request-card__status "
    + alias4(((helper = (helper = lookupProperty(helpers,"statusClass") || (depth0 != null ? lookupProperty(depth0,"statusClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusClass","hash":{},"data":data,"loc":{"start":{"line":4,"column":46},"end":{"line":4,"column":61}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"statusLabel") || (depth0 != null ? lookupProperty(depth0,"statusLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusLabel","hash":{},"data":data,"loc":{"start":{"line":4,"column":63},"end":{"line":4,"column":78}}}) : helper)))
    + "</span>\n  </div>\n</div>";
},"useData":true});
