export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"header\">\n    <div class=\"header-content\">\n        <div class=\"header-left\">\n            <div class=\"logo\">\n                <img src=\"images/logo.svg\" alt=\"Логотип\" class=\"logo-img\">\n            </div>\n        </div>\n        \n        <div class=\"header-right\">\n            <div class=\"user-info\">\n                <span class=\"username\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":11,"column":39},"end":{"line":11,"column":51}}}) : helper)))
    + "</span>\n                <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"avatar") || (depth0 != null ? lookupProperty(depth0,"avatar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatar","hash":{},"data":data,"loc":{"start":{"line":12,"column":26},"end":{"line":12,"column":36}}}) : helper)))
    + "\" alt=\"Avatar\" class=\"avatar\">\n            </div>\n            <div class=\"header-actions\" id=\"logout-button-container\">\n            </div>\n        </div>\n    </div>\n</header>";
},"useData":true});
