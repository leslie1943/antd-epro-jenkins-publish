import request from '@/utils/request';

export async function send(params) {
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

export async function close(params) {
  // Call service
  return request('/api/v4/projects/' + params.id + '/merge_requests/' + params.iid, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": 'K4Qoz7woxAYZ4v6NKyZ9',
    },
  });
}

export async function searchMR(params) {
  // Call service
  return request('/api/v4/projects/'+params.id+'/merge_requests', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": 'K4Qoz7woxAYZ4v6NKyZ9',
    },
  });
}