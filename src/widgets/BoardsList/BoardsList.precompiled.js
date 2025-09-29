export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "boards-list--archived";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isExpanded") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":55},"end":{"line":8,"column":116}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "boards-list__content--hidden";
},"6":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"boards-list__pagination\" id=\"pagination-container\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"boards-list "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isArchived") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":70}}})) != null ? stack1 : "")
    + "\">\n    <div class=\"boards-list__header\">\n        <h2 class=\"title boards-list__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":45},"end":{"line":3,"column":54}}}) : helper)))
    + "</h2>\n        <div class=\"boards-list__header-actions\" id=\"header-actions-container\">\n        </div>\n    </div>\n    \n    <div class=\"boards-list__content "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isArchived") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":37},"end":{"line":8,"column":123}}})) != null ? stack1 : "")
    + "\">\n        <div class=\"boards-list__grid\" id=\"boards-grid-container\">\n        </div>\n        \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showPagination") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":8},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});
