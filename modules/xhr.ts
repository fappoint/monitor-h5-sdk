// @ts-nocheck
import type { ErrorLog } from "../interface";
import { parseQueryString } from "../utils";
import tracker from "../utils/tracker";

// 不需要监控的接口白名单
const whiteList = [
  "http://localhost:8080/send/monitor", // 日志服务接口
];

// 增强 XHR：通过重写 XHR 的主要方法，实现拦截和增强 XHR
export default function injectXHR() {
  const XMLHttpRequest = window.XMLHttpRequest;

  // 1. 重写 setRequestHeader 方法增强功能 - 记录 request headers 数据
  const oldSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
    if (!this.requestHeaders) this.requestHeaders = {};
    this.requestHeaders[key] = value;
    return oldSetRequestHeader.apply(this, arguments);
  };

  // 2. 重写 open 方法增强功能 - 记录请求方法和请求路径
  const oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, async) {
    // 跳过 白名单接口 防止出现死循环
    if (whiteList.includes(url) === -1) {
      this.logData = { method: method.toUpperCase(), url }; // 存储数据
    }
    return oldOpen.apply(this, arguments);
  };

  // 3. 重写 send 方法增强功能 - 监听上报数据
  const oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      // 在 send 发送之前，记录请求开始事件
      const startTime = Date.now();
      const handler = (type: "load" | "error") => {
        return () => {
          const duration = Date.now() - startTime; // 持续的时间
          const status = this.status; // 请求状态码
          const statusText = this.statusText; // OK | Server Error
          const { url, method } = this.logData;
          const params =
            ["GET", "DELETE"].indexOf(method) > -1
              ? parseQueryString(url)
              : body;

          // 当请求发送错误时，上报数据（忽略无网络的错误，处理像 跨域错误、404、500 等错误）
          if (
            (type === "error" && window.navigator.onLine) ||
            (type === "load" && status >= 400)
          ) {
            const log: ErrorLog = {
              type: "error",
              errorType: "xhrError", // 错误类型是 xhr
              message: statusText, // 错误信息
              xhrData: {
                eventType: type, // load | error
                url, // api 路径
                method, // 请求方式
                header: this.requestHeaders, // 请求头
                params, // 请求参数
                duration, // 请求时长
                status,
                response: this.response ? JSON.stringify(this.response) : "", // 请求结果
              },
            };
            console.log("xhr log: ", log);
            tracker.send(log);
          }
        };
      };

      // 服务端返回 status 为 500 也会进入 load，需要进一步判断 status
      this.addEventListener("load", handler("load"), false);
      this.addEventListener("error", handler("error"), false);
    }
    return oldOpen.apply(this, arguments);
  };
}
