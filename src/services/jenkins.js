import request from '@/utils/request';
import { getStore } from '@/utils/localStore';
import { validateResult, toBase64 } from '@/utils/utils';
// get crumb
const crumb = getStore('epro_jenkins_auth') ? getStore('epro_jenkins_auth')['crumb'] : '';

// --------------------------- 获取用户的Jenkins认证 ---------------------------
export async function auth() {
  // Call
  const res = await request('/crumbIssuer/api/json', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + toBase64(),
      'Access-Control-Allow-Origin': '*'
    }
  })
  return validateResult(res);
}

// --------------------------- 获取Mall项目的API JSON ---------------------------
export async function mall_api_json() {
  // call
  const res = await request('/job/epro-mall/api/json', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + toBase64(),
      'Jenkins-Crumb': crumb,
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
  return validateResult(res);
}

// --------------------------- 构建 Mall项目 with 参数 ---------------------------
// https://ci.devops.viewchain.net/job/vhepro2.0
export async function build_mall_params() {
  // call
  const res = await request('/job/epro-mall/buildWithParameters', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + toBase64(),
      'Jenkins-Crumb': crumb,
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
}

// --------------------------- Fetch epro-mall 项目 config.xml ---------------------------
export async function fetch_mall_config() {
  // call
  const res = await request('/job/epro-mall/config.xml', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + toBase64(),
      'Jenkins-Crumb': crumb,
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
}