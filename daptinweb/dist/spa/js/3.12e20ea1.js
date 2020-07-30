(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{aa0a:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"q-pa-md q-gutter-sm"},[o("q-breadcrumbs",{scopedSlots:e._u([{key:"separator",fn:function(){return[o("q-icon",{attrs:{size:"1.2em",name:"arrow_forward",color:"black"}})]},proxy:!0}])},[o("q-breadcrumbs-el",{attrs:{label:"Storage",icon:"fas fa-amazon"}}),o("q-breadcrumbs-el",{attrs:{label:"Cloud stores",icon:"fas fa-list"}})],1)],1),o("q-separator"),o("div",{staticClass:"row q-pa-md q-gutter-sm"},e._l(e.cloudStores,(function(t){return o("div",{staticClass:"col-4 col-xl-2 col-lg-3 col-xs-12 col-sm-6 q-pa-md"},[o("q-card",[o("q-card-section",[o("span",{staticClass:"text-h6"},[e._v(e._s(t.name))])]),o("q-card-section",[o("span",[e._v("Provider")]),o("span",{staticClass:"text-bold float-right"},[e._v(e._s(t.store_provider))])]),o("q-card-section",[o("span",[e._v("Root path")]),o("span",{staticClass:"text-bold float-right"},[e._v(e._s(t.root_path))])]),o("q-card-section",[o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[o("q-btn",{staticClass:"float-right",attrs:{size:"sm",label:"Edit store"},on:{click:function(o){return e.showEditStore(t)}}})],1)])])],1)],1)})),0),o("q-page-sticky",{staticStyle:{"z-index":"3000"},attrs:{position:"bottom-right",offset:[20,20]}},[o("q-btn",{attrs:{fab:"",icon:"add",color:"primary"},on:{click:function(t){e.showCreateCloudStoreDrawer=!0}}})],1),o("q-drawer",{attrs:{overlay:"","content-class":"bg-grey-3",width:400,side:"right"},model:{value:e.showCreateCloudStoreDrawer,callback:function(t){e.showCreateCloudStoreDrawer=t},expression:"showCreateCloudStoreDrawer"}},[o("q-scroll-area",{staticClass:"fit row"},[o("div",{staticClass:"q-pa-md"},[o("span",{staticClass:"text-h6"},[e._v("Create store")]),o("q-form",{staticClass:"q-gutter-md"},[o("q-input",{attrs:{label:"Name"},model:{value:e.newStore.name,callback:function(t){e.$set(e.newStore,"name",t)},expression:"newStore.name"}}),o("q-input",{attrs:{label:"Root path"},model:{value:e.newStore.root_path,callback:function(t){e.$set(e.newStore,"root_path",t)},expression:"newStore.root_path"}}),o("q-btn",{attrs:{color:"primary"},on:{click:function(t){return e.createStore()}}},[e._v("Create")]),o("q-btn",{on:{click:function(t){e.showCreateCloudStoreDrawer=!1}}},[e._v("Cancel")])],1)],1)])],1),o("q-drawer",{attrs:{overlay:"","content-class":"bg-grey-3",width:400,side:"right"},model:{value:e.showEditCloudStoreDrawer,callback:function(t){e.showEditCloudStoreDrawer=t},expression:"showEditCloudStoreDrawer"}},[o("q-scroll-area",{staticClass:"fit row"},[o("div",{staticClass:"q-pa-md"},[o("span",{staticClass:"text-h6"},[e._v("Edit store")]),o("q-form",{staticClass:"q-gutter-md"},[o("q-input",{attrs:{label:"Name"},model:{value:e.newStore.name,callback:function(t){e.$set(e.newStore,"name",t)},expression:"newStore.name"}}),o("q-input",{attrs:{label:"Root path"},model:{value:e.newStore.root_path,callback:function(t){e.$set(e.newStore,"root_path",t)},expression:"newStore.root_path"}}),o("q-btn",{attrs:{color:"negative"},on:{click:function(t){return e.deleteStore()}}},[e._v("Delete")]),o("q-btn",{staticClass:"float-right",attrs:{color:"primary"},on:{click:function(t){return e.editStore()}}},[e._v("Save")]),o("q-btn",{staticClass:"float-right",on:{click:function(t){e.showEditCloudStoreDrawer=!1}}},[e._v("Cancel")])],1)],1)])],1)],1)},r=[],s=(o("8e6e"),o("8a81"),o("ac6a"),o("cadf"),o("06db"),o("456d"),o("7f7f"),o("c47a")),n=o.n(s),l=o("2f62");function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){n()(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var d={name:"TablePage",methods:i(i({showEditStore:function(e){this.selectedStore=e,this.showEditCloudStoreDrawer=!0,this.newStore.name=e.name,this.newStore.root_path=e.root_path},deleteStore:function(){var e=this;console.log("Delete store",this.selectedStore),this.deleteRow({tableName:"cloud_store",reference_id:this.selectedStore.id}).then((function(t){e.showEditCloudStoreDrawer=!1,e.selectedStore={},e.$q.notify({title:"Success",message:"Store deleted"}),e.refresh()})).catch((function(t){e.$q.notify({title:"Failed",message:JSON.stringify(t)})}))},editStore:function(){var e=this;console.log("Delete store",this.selectedStore),this.newStore.tableName="cloud_store",this.newStore.id=this.selectedStore.id,this.updateRow(this.newStore).then((function(t){e.showEditCloudStoreDrawer=!1,e.selectedStore={},e.$q.notify({title:"Success",message:"Store updated"}),e.refresh()})).catch((function(t){e.$q.notify({title:"Failed",message:JSON.stringify(t)})}))},createStore:function(){var e=this;console.log("new cloud",this.newStore),this.newStore.tableName="cloud_store",e.createRow(e.newStore).then((function(t){e.user={},e.$q.notify({message:"cloud store created"}),e.refresh(),e.showCreateCloudStoreDrawer=!1})).catch((function(t){t instanceof Array?e.$q.notify({message:t[0].title}):e.$q.notify({message:"Failed to create cloud"})}))}},Object(l["b"])(["loadData","getTableSchema","createRow","deleteRow","updateRow","executeAction"])),{},{refresh:function(){var e="cloud_store",t=this;this.loadData({tableName:e}).then((function(e){console.log("Loaded data",e),t.cloudStores=e.data}))}}),data:function(){return i({text:"",selectedStore:{},storeProviderOptions:[{icon:"fas fa-aws",label:"Amazon Drive",description:"OAuth token based"},{icon:"fas fa-aws",label:"Amazon S3",description:"OAuth token based"},{icon:"fas fa-aws",label:"Backblaze B2",description:"OAuth token based"},{icon:"fas fa-aws",label:"Dropbox",description:"OAuth token based"},{icon:"fas fa-aws",label:"FTP",description:"OAuth token based"},{icon:"fas fa-aws",label:"Google Drive",description:"OAuth token based"},{icon:"fas fa-aws",label:"local",description:"The local filesystem"}],showHelp:!1,newStore:{name:null,store_provider:"local",store_type:"local",root_path:null,store_parameters:"{}"},showCreateCloudStoreDrawer:!1,showEditCloudStoreDrawer:!1,filter:null,cloudStores:[],columns:[{name:"name",field:"name",label:"cloud name",align:"left",sortable:!0}]},Object(l["d"])([]))},mounted:function(){this.refresh()},computed:i(i({},Object(l["c"])(["selectedTable"])),Object(l["d"])([])),watch:{}},u=d,f=o("2877"),h=o("ead5"),w=o("0016"),b=o("079e"),p=o("eb85"),m=o("f09f"),S=o("a370"),C=o("9c40"),v=o("de5e"),g=o("9404"),q=o("4983"),_=o("0378"),y=o("27f9"),O=o("ddd8"),D=o("66e5"),k=o("4074"),x=o("0170"),E=o("d66b"),Q=o("eebe"),j=o.n(Q),P=Object(f["a"])(u,a,r,!1,null,null,null);t["default"]=P.exports;j()(P,"components",{QBreadcrumbs:h["a"],QIcon:w["a"],QBreadcrumbsEl:b["a"],QSeparator:p["a"],QCard:m["a"],QCardSection:S["a"],QBtn:C["a"],QPageSticky:v["a"],QDrawer:g["a"],QScrollArea:q["a"],QForm:_["a"],QInput:y["a"],QSelect:O["a"],QItem:D["a"],QItemSection:k["a"],QItemLabel:x["a"],QEditor:E["a"]})}}]);