import request from '@/utils/request';

export async function send(params) {
  // Debug
  console.info('[Debug-Log: params in sevice start]')
  console.info(params)
  console.info('[Debug-Log: params in sevice finish]')

  // Call service
  return request('/api/v4/projects/' + params.id + '/merge_requests', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": 'K4Qoz7woxAYZ4v6NKyZ9',
    },
  });
}
