import Handlebars from 'handlebars/runtime.js';
    export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <option value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":13,"column":23},"end":{"line":13,"column":32}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":13,"column":34},"end":{"line":13,"column":43}}}) : helper)))
    + "</option>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"support-widget\">\n  <h2 class=\"support-widget__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":36},"end":{"line":2,"column":45}}}) : helper)))
    + "</h2>\n\n  <div class=\"support-widget__field\">\n    <label class=\"support-widget__label\">Ваш логин</label>\n    <div class=\"support-widget__username-input\"></div>\n  </div>\n\n  <div class=\"support-widget__field\">\n    <label class=\"support-widget__label\">С чем связано обращение?</label>\n    <select class=\"support-widget__select\" name=\"category\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":6},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "    </select>\n  </div>\n\n  <div class=\"support-widget__field\">\n    <label class=\"support-widget__label\">Опишите проблему</label>\n    <textarea \n      class=\"support-widget__textarea\" \n      name=\"description\" \n      placeholder=\"Напишите здесь детали проблемы…\"\n      rows=\"4\"\n    ></textarea>\n  </div>\n\n  <div class=\"support-widget__field\">\n    <label class=\"support-widget__label\">Почта для связи</label>\n    <div class=\"support-widget__email-input\"></div>\n  </div>\n\n  <div class=\"support-widget__error\" hidden></div>\n  <div class=\"support-widget__success\" hidden></div>\n  \n  <div class=\"support-widget__submit-button-wrapper\"></div>\n</div>";
},"useData":true});
