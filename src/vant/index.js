import Vue from "vue";
import {
  CountDown,
  Button,
  Form,
  PasswordInput,
  NumberKeyboard,
  Skeleton,
  Notify,
  Stepper,
  Step,
  Steps,
  ImagePreview,
  List,
  Sidebar,
  Rate,
  Uploader,
  ActionSheet,
  Loading,
  Tag,
  Picker,
  Empty,
  DatetimePicker,
  ContactCard,
  Area,
  AddressList,
  AddressEdit,
  ContactList,
  ContactEdit,
  Sku,
  Grid,
  Search,
  GridItem,
  Image as VanImage,
  Divider,
  SubmitBar,
  Card,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  SidebarItem,
  Lazyload,
  PullRefresh,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  NavBar,
  Toast,
  Dialog,
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Popup,
  Icon,
  Overlay,
  Sticky
} from "vant";

Vue.use(CountDown);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(Form);
Vue.use(CheckboxGroup);
Vue.use(Cell);
Vue.use(Popup);
Vue.use(CellGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Stepper);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(Step);
Vue.use(Steps);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(PullRefresh);
Vue.use(Skeleton);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sku);
Vue.use(Picker);
Vue.use(DatetimePicker);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Search);
Vue.use(Empty);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(Loading);
Vue.use(Rate);
Vue.use(Uploader);
Vue.use(Tag);
Vue.use(ActionSheet);
Vue.use(Notify);
Vue.use(ImagePreview);
Vue.use(List);
Vue.use(Overlay);
Vue.use(Sticky);

Vue.prototype.$toast = Toast;
Vue.prototype.$alert = Dialog.alert;
Vue.prototype.$confirm = Dialog.confirm;
Vue.prototype.$notify = Notify;
Vue.prototype.$imagepreview = ImagePreview;