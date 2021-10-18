import Mock from "mockjs";
import userApi from "./user";

const mocks = [...userApi];
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: "200-600",
});

console.log(mocks);

mocks.forEach((item) => {
  Mock.mock(new RegExp(item.url), item.type, item.response);
});
