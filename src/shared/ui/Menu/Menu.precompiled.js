import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"menu\">\n  <div class=\"menu__header\">\n    <h3 class=\"menu__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":37}}}) : helper)))
    + "</h3>\n    <button class=\"menu__close\" type=\"button\">&times;</button>\n  </div>\n  <div class=\"menu__actions\"></div>\n</div>";
},"useData":true});
