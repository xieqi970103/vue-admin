import axios from 'axios'
import { Message } from 'element-ui'; 
 
// ***************************xieqi************************
// 创建axios，赋给变量xieqi
// API地址 http://www.web-jshtml.cn/productapi
const BASEURLS = process.env.NODE_ENV === 'production' ? '' : '/xieqiApi';
const xieqi  = axios.create({
    baseURL: BASEURLS,
    timeout: 15000,
});

/**
 * 请求接口前，返回数据进行拦截（请求拦截器）
 */
xieqi.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['api-key'] = "udr5FEh8X64gXNaX91aVBd08zsY=";
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
xieqi.interceptors.response.use(function (response) {
    // 对响应数据做点什么
     
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//*******************************xieqi******************** */

 


export default xieqi; 
/**
 * 使用export default时，但不能同时存在多个default
 * 文件 import 不需要{}
 */