import request from '@/utils/request';

// fbixW_k1of1GqTxQta8M YUCHAO
// K4Qoz7woxAYZ4v6NKyZ9 SUZHEN
// ts5aSmzM7r2eUzobzFb6 PEIJIANG
const token = "fbixW_k1of1GqTxQta8M";

export async function sendMR(params) {
  // Call service
  return request('/api/v4/projects/' + params.id + '/merge_requests', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
}

export async function close(params) {
  // Call service
  return request('/api/v4/projects/' + params.id + '/merge_requests/' + params.iid, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
}

export async function searchMR(params) {
  // Call service
  return request('/api/v4/projects/' + params.id + '/merge_requests?state=opened', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
}

export async function acceptMR(params) {
  // Call service
  return request('/api/v4/projects/'+ params.id + '/merge_requests/'+ params.iid + '/merge', {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
}