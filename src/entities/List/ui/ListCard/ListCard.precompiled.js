export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"list-card__title-editing\">\n                <textarea class=\"list-card__title-input\" placeholder=\"Введите название списка...\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":98},"end":{"line":5,"column":107}}}) : helper)))
    + "</textarea>\n                <button class=\"list-card__save-title-btn\" type=\"button\" aria-label=\"Сохранить\">\n                    ✓\n                </button>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <h3 class=\"title list-card__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":11,"column":47},"end":{"line":11,"column":56}}}) : helper)))
    + "</h3>\n            <button class=\"list-card__edit-title-btn\" type=\"button\" aria-label=\"Редактировать название\">\n                <img src=\"/images/edit-icon.svg\" alt=\"Редактировать\" class=\"menu-icon\">\n            </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-card\" data-list-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":43}}}) : helper)))
    + "\">\n    <div class=\"list-card__header\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEditingTitle") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":15,"column":15}}})) != null ? stack1 : "")
    + "        <button class=\"list-card__delete-btn\" type=\"button\" aria-label=\"Удалить список\">\n            ×\n        </button>\n    </div>\n\n    <div class=\"list-card__tasks\" id=\"tasks-container\">\n    </div>\n\n    <div class=\"list-card__footer\">\n        <button class=\"list-card__add-task-btn\" type=\"button\">\n            Добавить карточку +\n        </button>\n    </div>\n</div>";
},"useData":true});
