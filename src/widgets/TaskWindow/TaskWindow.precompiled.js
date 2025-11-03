import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <textarea class=\"task-window__input\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":12,"column":49},"end":{"line":12,"column":58}}}) : helper)))
    + "</textarea>\n            <div class=\"task-window__actions\">\n                <span class=\"task-window__save-btn\">✓</span>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"task-window__checkbox "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isCompleted") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":17,"column":47},"end":{"line":17,"column":138}}})) != null ? stack1 : "")
    + "\"></span>\n            <span class=\"task-window__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":18,"column":45},"end":{"line":18,"column":54}}}) : helper)))
    + "</span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "task-window__checkbox--filled";
},"6":function(container,depth0,helpers,partials,data) {
    return "task-window__checkbox--empty";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"task-window\">\n    <div class=\"task-window__header\">\n        <button class=\"task-window__menu-btn\" type=\"button\" aria-label=\"Меню\">\n            <img src=\"/images/menu-icon.svg\" alt=\"Меню\">\n        </button>\n        <button class=\"task-window__close-btn\" type=\"button\" aria-label=\"Закрыть\">\n            ✕\n        </button>\n    </div>\n    <div class=\"task-window__body\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isEditing") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":11,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});
