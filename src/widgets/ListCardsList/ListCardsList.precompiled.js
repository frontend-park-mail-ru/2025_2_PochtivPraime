export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-cards-list\" data-board-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":44},"end":{"line":1,"column":50}}}) : helper)))
    + "\" style=\"background-image: url('"
    + alias4(((helper = (helper = lookupProperty(helpers,"backgroundImage") || (depth0 != null ? lookupProperty(depth0,"backgroundImage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundImage","hash":{},"data":data,"loc":{"start":{"line":1,"column":82},"end":{"line":1,"column":101}}}) : helper)))
    + "');\">\n    <div class=\"list-cards-list__container\" id=\"lists-container\">\n        <div class=\"list-cards-list__add-column\">\n            <button class=\"list-cards-list__add-btn\" type=\"button\">\n                Добавить список +\n            </button>\n        </div>\n    </div>\n</div>";
},"useData":true});
