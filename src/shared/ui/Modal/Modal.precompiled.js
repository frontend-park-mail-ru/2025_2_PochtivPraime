export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal-overlay\">\n    <div class=\"modal\">\n        <div class=\"modal-header\">\n            <h3 class=\"title modal-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":42},"end":{"line":4,"column":51}}}) : helper)))
    + "</h3>\n            <button class=\"modal-close\" type=\"button\">&times;</button>\n        </div>\n        <div class=\"modal-body\">\n            <p class=\"modal-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":8,"column":34},"end":{"line":8,"column":42}}}) : helper)))
    + "</p>\n        </div>\n        <div class=\"modal-footer\" id=\"modal-buttons-container\">\n        </div>\n    </div>\n</div>";
},"useData":true});
