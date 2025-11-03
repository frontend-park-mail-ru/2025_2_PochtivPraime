export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"board-header\" data-board-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":41},"end":{"line":1,"column":47}}}) : helper)))
    + "\">\n    <h2 class=\"title board-header__title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":51}}}) : helper)))
    + "</h2>\n    <button class=\"board-header__menu-btn\" type=\"button\" aria-label=\"Меню доски\">\n        <span class=\"menu-icon\">\n            <img src=\"/images/menu-icon.svg\" alt=\"Меню\" class=\"menu-icon\">\n        </span>\n    </button>\n</div>";
},"useData":true});
