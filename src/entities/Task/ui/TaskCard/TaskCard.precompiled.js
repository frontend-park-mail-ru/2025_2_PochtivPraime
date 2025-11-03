import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "task-card--completed";
},"3":function(container,depth0,helpers,partials,data) {
    return "task-card--editing";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <textarea class=\"task-card__input\" placeholder=\"Введите задачу...\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":79},"end":{"line":5,"column":88}}}) : helper)))
    + "</textarea>\n            <div class=\"task-card__actions\">\n                <span class=\"task-card__save-button-container\">\n                    ✓\n                </span>\n            </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"task-card__checkbox "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isCompleted") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":12,"column":45},"end":{"line":12,"column":132}}})) != null ? stack1 : "")
    + "\"></span>\n            <span class=\"task-card__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":13,"column":43},"end":{"line":13,"column":52}}}) : helper)))
    + "</span>\n            <div class=\"task-card__actions\">\n                <span class=\"task-card__edit-button-container\">\n                    <img src=\"/images/edit-icon.svg\" alt=\"Редактировать\" class=\"menu-icon\">\n                </span>\n                <span class=\"task-card__delete-button-container\">\n                    ✕\n                </span>\n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "task-card__checkbox--filled";
},"10":function(container,depth0,helpers,partials,data) {
    return "task-card__checkbox--empty";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"task-card "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isCompleted") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":68}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEditing") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":69},"end":{"line":1,"column":111}}})) != null ? stack1 : "")
    + "\"\n     data-task-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":19},"end":{"line":2,"column":25}}}) : helper)))
    + "\">\n    <div class=\"task-card__content\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEditing") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":22,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});
