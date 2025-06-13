import { UAParser } from "ua-parser-js";
import { BaseLog } from "../interface";

// 获取设备信息
const { browser, device, os } = UAParser(navigator.userAgent);

export default function getLogBaseData(): BaseLog {
  return {
    title: document.title, // 网页标题
    url: location.href, // 网页地址
    userAgent: navigator.userAgent, // 用户环境完整信息
    browser: `${browser.name} ${browser.version}`, // 浏览器
    device: `${device.model} ${device.vendor}`, // 设备
    os: `${os.name} ${os.version}`, // 操作系统
  };
}
