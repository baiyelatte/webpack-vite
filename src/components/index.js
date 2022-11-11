import Layout from "@/components/route-transition/layout";

const install = function (Vue) {
  Vue.component(Layout.name, Layout);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
