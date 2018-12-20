import request from '@/utils/request';
import { validateResult } from '@/utils/utils';


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