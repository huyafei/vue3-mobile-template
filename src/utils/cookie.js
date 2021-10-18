/**
 * @name: cookie
 * @author: yfhu
 * @date: 2021/10/18 15:04
 * @description：cookie
 * @update: 2021/10/18 15:04
 */
import Cookies from "js-cookie";
import { version } from "../../package.json";
const prefix = `__${version}__`;

const cookies = {
  get(name) {
    return Cookies.get(prefix + name);
  },
  set(name, value, options) {
    Cookies.set(prefix + name, value, options);
  },
  remove(name, options) {
    Cookies.remove(prefix + name, options);
  },
};
export default cookies;
