angular.module("grid.table",[]).run(["$templateCache",function(n){n.put("grid/table/templates/emptyResult.html",'<div class="row" ng-style="outStyle">\n    <div class="col-md-4 col-md-offset-4" ng-style="innerStyle">\n        <div class="media">\n            <div class="media-left">\n                <i style="font-size:42px;" ng-class="config.icon"></i>\n            </div>\n            <div class="media-body">\n                <h4 class="media-heading">{{ config.title }}</h4>\n                {{ config.intro }}\n            </div>\n        </div>\n    </div>\n</div>'),n.put("grid/table/templates/gridTable.html",'<div class="grid-table">\n    <div class="box-tool clearfix" ng-if="config.tool && config.query">\n        <div class="btn-group" ng-if="config.tool">\n            <a ng-repeat="item in config.tool.items" ng-click="item.click(config.selectedList)" ng-class="item.cssClass" class="btn">\n                <i ng-class="item.icon"></i> {{item.name}}\n            </a>\n        </div>\n        <div class="pull-right" ng-if="config.query && config.query.items.length > 0">\n            <form class="form-inline">\n                <div class="input-group">\n                    <div class="pull-left" ng-repeat="item in config.query.items">\n                        <div ng-if="item.type==\'select\'" class="input-group-btn">\n                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                                 {{ item.display }} \n                                 <span class="caret"></span>\n                            </button>\n                            <ul class="dropdown-menu">\n                                <li ng-repeat="option in item.options" ng-click="fnSelectQuery(option,item)">\n                                    <a>{{option.name}}</a>\n                                </li>\n                            </ul>\n                        </div>\n                        <input ng-if="item.type==\'input\'" type="text" ng-model="item.value" class="form-control" placeholder="{{item.placeholder}}" />\n                        <input ng-if="item.type==\'hideen\'" type="hidden" ng-model="item.value" />\n                    </div>\n                    <span class="input-group-btn pull-left">\n                        <button type="submit" ng-click="fnQuery()" class="btn btn-primary">\n                            <i class="glyphicon glyphicon-search"></i>\n                            {{config.query.action.title || \'搜索\'}}\n                        </button>\n                    </span>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class="table-responsive">\n        <table class="table table-bordered table-hover">\n            <thead>\n                <tr>\n                    <th ng-if="config.pkid" class="check">\n                        <input type="checkbox" ng-checked="checkAll" ng-click="fnCheckAll()" />\n                    </th>\n                    <th ng-repeat="column in config.columns" ng-style="{width:column.width?column.width:\'auto\'}" ng-click="!column.isSort||onSort(column, config.lastSort)" ng-class="{sort_both:(column.sort==\'both\'||!column.sort)&&column.isSort, sort_asc:column.sort==\'asc\'&&column.isSort, sort_desc:column.sort==\'desc\'&&column.isSort}">{{column.name}}</th>\n                </tr>\n            </thead>\n            <tbody ng-style="contentStyle" ng-if="!config.loading && gridSource.length > 0">\n                <tr ng-repeat="item in gridSource" ng-click="fnCheckItem(item)">\n                    <td class="check" ng-if="config.pkid">\n                        <input type="checkbox" ng-checked="fnItemChecked(item)" />\n                    </td>\n                    <td ng-repeat="column in config.columns" ng-style="{width:column.width?column.width:\'auto\'}">\n                        <enuo-grid-cell column="column" item="item"></enuo-grid-cell>\n                    </td>\n                </tr>\n            </tbody>\n            <tbody ng-style="contentStyle" ng-if="!config.loading && gridSource.length <= 0">\n                <tr>\n                    <td colspan="{{columnsCount }}">\n                        <empty-result></empty-result>\n                    </td>\n                </tr>\n            </tbody>\n            <tbody ng-style="contentStyle" ng-if="config.loading">\n                <tr>\n                    <td colspan="{{columnsCount }}">\n                        <empty-result em-style="loading"></empty-result>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n    <div class="box-footer" ng-if="config.page">\n        <paging page="config.page.pageIndex" class="pull-right paging" page-size="config.page.pageSize" total="config.page.total" paging-action="config.page.callback(page)" show-prev-next="true" show-first-last="true">\n        </paging>\n    </div>\n</div>')}]);
angular.module("grid.table").directive("paging",function(){var d=/\{page\}/g;return{restrict:"EA",link:function(a,t,s){a.$watchCollection("[page,pageSize,total,disabled]",function(t,e){!function(t,e){(!t.pageSize||t.pageSize<=0)&&(t.pageSize=1);var a,s,i=Math.ceil(t.total/t.pageSize);l=t,r=e,l.List=[],l.Hide=!1,l.page=parseInt(l.page)||1,l.total=parseInt(l.total)||0,l.adjacent=parseInt(l.adjacent)||2,l.pgHref=l.pgHref||"",l.dots=l.dots||"...",l.ulClass=l.ulClass||"pagination",l.activeClass=l.activeClass||"active",l.disabledClass=l.disabledClass||"disabled",l.textFirst=l.textFirst||"<<",l.textLast=l.textLast||">>",l.textNext=l.textNext||">",l.textPrev=l.textPrev||"<",l.textFirstClass=l.textFirstClass||"",l.textLastClass=l.textLastClass||"",l.textNextClass=l.textNextClass||"",l.textPrevClass=l.textPrevClass||"",l.textTitlePage=l.textTitlePage||"Page {page}",l.textTitleFirst=l.textTitleFirst||"First Page",l.textTitleLast=l.textTitleLast||"Last Page",l.textTitleNext=l.textTitleNext||"Next Page",l.textTitlePrev=l.textTitlePrev||"Previous Page",l.hideIfEmpty=n(l,r.hideIfEmpty),l.showPrevNext=n(l,r.showPrevNext),l.showFirstLast=n(l,r.showFirstLast),l.scrollTop=n(l,r.scrollTop),l.isDisabled=n(l,r.disabled),function(t,e){t.page>e&&(t.page=e);t.page<=0&&(t.page=1);t.adjacent<=0&&(t.adjacent=2);e<=1&&(t.Hide=t.hideIfEmpty)}(t,i);var l,r;var g=2*t.adjacent+2;p(t,i,"prev"),i<=g+2?x(a=1,i,t):t.page-t.adjacent<=2?(x(a=1,s=1+g,t),v(i,t,s)):t.page<i-(t.adjacent+2)?(a=t.page-t.adjacent,s=t.page+t.adjacent,c(t,a),x(a,s,t),v(i,t,s)):(c(t,a=(s=i)-g),x(a,s,t));p(t,i,"next")}(a,s)},!0)},template:function(t,e){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(e.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'},scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}};function n(t,e){return!!angular.isDefined(e)&&!!t.$parent.$eval(e)}function o(t,e){t.page!=e&&(t.isDisabled||(t.page=e,t.pagingAction({page:t.page,pageSize:t.pageSize,total:t.total}),t.scrollTop&&scrollTo(0,0)))}function p(a,t,e){if(!(!a.showPrevNext&&!a.showFirstLast||t<1)){var s,i,l;if("prev"===e){s=a.page-1<=0;var r=a.page-1<=0?1:a.page-1;a.showFirstLast&&(i={value:a.textFirst,title:a.textTitleFirst,aClass:a.textFirstClass,page:1}),a.showPrevNext&&(l={value:a.textPrev,title:a.textTitlePrev,aClass:a.textPrevClass,page:r})}else{s=a.page+1>t;var g=a.page+1>=t?t:a.page+1;a.showPrevNext&&(i={value:a.textNext,title:a.textTitleNext,aClass:a.textNextClass,page:g}),a.showFirstLast&&(l={value:a.textLast,title:a.textTitleLast,aClass:a.textLastClass,page:t})}var n=function(t,e){return{title:t.title,aClass:t.aClass,value:t.aClass?"":t.value,liClass:e?a.disabledClass:"",pgHref:e?"":a.pgHref.replace(d,t.page),action:function(){e||o(a,t.page)}}};if(a.isDisabled&&(s=!0),i){var p=n(i,s);a.List.push(p)}if(l){var x=n(l,s);a.List.push(x)}}}function x(t,e,a){var s=0;for(s=t;s<=e;s++){var i=a.pgHref.replace(d,s),l=a.page==s?a.activeClass:"";a.isDisabled&&(i="",l=a.disabledClass),a.List.push({value:s,title:a.textTitlePage.replace(d,s),liClass:l,pgHref:i,action:function(){o(a,this.value)}})}}function s(t){t.List.push({value:t.dots,liClass:t.disabledClass})}function c(t,e){x(1,2,t),3!=e&&s(t)}function v(t,e,a){a!=t-2&&s(e),x(t-1,t,e)}});
angular.module("grid.table").directive("emptyResult",function(){return{restrict:"EA",scope:{height:"@",emTitle:"@",emIntro:"@",emIcon:"@",emStyle:"@"},replace:!0,templateUrl:"grid/table/templates/emptyResult.html",controller:["$scope","$element","$attrs",function(n,e,t){n.$watchGroup(["height","emTitle","emIntro","emIcon","emStyle"],function(e,t){n.fnUpdate()},!0),n.fnUpdate=function(){n.config={title:n.emTitle||"没有匹配的数据",icon:n.emIcon||"glyphicon glyphicon-info-sign text-yellow",intro:n.emIntro||"请尝试修改查询条件后再试一次。"},"loading"==n.emStyle&&(n.config.title="loading",n.config.intro="正在加载,请稍后...",n.config.icon="fa fa-refresh fa-spin text-muted");var e=n.height||200,t=(e-60)/2;n.outStyle={"min-height":e+"px"},n.innerStyle={"margin-top":t+"px"}}}]}});
angular.module("grid.table").directive("gridTableCell",function(){return{restrict:"EA",replace:!0,transclude:!0,scope:{column:"=",item:"="},template:'<span ng-click="click($event)"></span>',compile:function(){return{pre:function($scope,$elm,$attrs){function getFunc(func){return angular.isFunction(func)?func:eval("("+func+")")}var value=$scope.item[$scope.column.key];$scope.column.format?value=getFunc($scope.column.format)(value,$scope.item):void 0===value?value=$scope.column.name:null===value&&(value=""),"add"==$scope.column.template?$elm.append("<a class='text-success text-link'><i class='glyphicon glyphicon-plus'></i> "+value+"</a>"):"edit"==$scope.column.template?$elm.append("<a class='text-primary text-link'><i class='glyphicon glyphicon-pencil'></i> "+value+"</a>"):"delete"==$scope.column.template?$elm.append("<a class='text-danger text-link'><i class='glyphicon glyphicon-remove'></i> "+value+"</a>"):$scope.column.template?$elm.append(getFunc($scope.column.template)(value,$scope.item)):$elm.append(value+"")},post:function($scope,$elm,$attrs){$scope.click=function($event){var invoke;$scope.column.click&&(invoke=angular.isFunction($scope.column.click)?$scope.column.click:eval("("+$scope.column.click+")"),invoke($scope.item[$scope.column.name],$scope.item,$event));$event.stopPropagation()}}}}}});
angular.module("grid.table").directive("gridTable",function(){return{restrict:"E",replace:!0,scope:{config:"=",gridSource:"="},templateUrl:"grid/table/templates/gridTable.html",controller:["$scope","$element","$attrs",function(o,e,n){o.config.selectedList=o.config.selectedList||[],o.checkAll=!1,o.columnsCount=o.config.pkid?o.config.columns.length+1:o.config.columns.length,o.contentStyle=o.config.style?o.config.style.contentStyle:{},o.fnItemChecked=function(e){var n=e[o.config.pkid];return 0<o.config.selectedList.filter(function(e){return e[o.config.pkid]==n}).length},o.fnCheckIsAll=function(){if(!o.gridSource)return!1;var e=o.gridSource.filter(function(e){return o.fnItemChecked(e)}).length;o.checkAll=e==o.gridSource.length},o.fnCheckItem=function(e){var n=e[o.config.pkid],c=o.config.selectedList.filter(function(e){return e[o.config.pkid]==n}),t=0<c.length?c[0]:null;if(t){var i=o.config.selectedList.indexOf(t);o.config.selectedList.splice(i,1)}else o.config.selectedList.push(e);o.fnCheckIsAll()},o.fnCheckAll=function(){return o.checkAll=!o.checkAll,angular.forEach(o.gridSource,function(e,n,c){var t=e[o.config.pkid],i=o.config.selectedList.filter(function(e){return e[o.config.pkid]==t}),l=0<i.length?i[0]:null;if(o.checkAll&&!l&&o.config.selectedList.push(e),!o.checkAll&&l){n=o.config.selectedList.indexOf(l);o.config.selectedList.splice(n,1)}}),!1},o.$watch("gridSource",function(e,n){o.fnCheckIsAll()},!0),o.fnSelectQuery=function(e,n){n.value=e.value,n.display=e.display||e.name},o.fnQuery=function(){var t={};angular.forEach(o.config.query.items,function(e,n,c){t[e.key]=e.value}),o.config.query.action.callback(t)},o.onSort=function(e,n){n&&e.key!=n.key&&(n.sort=""),(o.config.lastSort=e).sort=e.sort&&"asc"!=e.sort?"asc":"desc",o.config.onSort(e.key+" "+e.sort,e)}}]}});