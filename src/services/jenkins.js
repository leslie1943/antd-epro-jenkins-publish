import request from '@/utils/request';
import { validateResult,toBase64 } from '@/utils/utils';

// --------------------------- 获取用户的Jenkins认证 ---------------------------
export async function auth() {
  // Call service
  const res = await request('/crumbIssuer/api/json', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + toBase64(),
      'Access-Control-Allow-Origin': '*'
    }
  })
  return validateResult(res);
}

export async function epro_mall_web_config(params) {
  // Call service
  const res = await request('/job/epro-mall-web/config.xml', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      // "PRIVATE-TOKEN": token,
    }
  })
}