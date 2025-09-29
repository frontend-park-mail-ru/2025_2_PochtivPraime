export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pagination\" data-component=\"pagination\">\n    <div class=\"pagination__btn-container\" id=\"pagination-prev-container\"></div>\n    \n    <span class=\"pagination__info\">\n        Страница <span class=\"pagination__current\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"currentPage") || (depth0 != null ? lookupProperty(depth0,"currentPage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentPage","hash":{},"data":data,"loc":{"start":{"line":5,"column":51},"end":{"line":5,"column":66}}}) : helper)))
    + "</span> из <span class=\"pagination__total\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalPages") || (depth0 != null ? lookupProperty(depth0,"totalPages") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalPages","hash":{},"data":data,"loc":{"start":{"line":5,"column":109},"end":{"line":5,"column":123}}}) : helper)))
    + "</span>\n    </span>\n    \n    <div class=\"pagination__btn-container\" id=\"pagination-next-container\"></div>\n</div>";
},"useData":true});
