import request from '@/utils/request';

// fbixW_k1of1GqTxQta8M YUCHAO
// K4Qoz7woxAYZ4v6NKyZ9 SUZHEN
// ts5aSmzM7r2eUzobzFb6 PEIJIANG
const token = "fbixW_k1of1GqTxQta8M";

export async function sendMR(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  /*********************************************************
   * In order to check all content of http request, 
   * change the code at line 133 in '/util/request.js'
   * Original : return response.json()
   * Current: return response
   *********************************************************/
  return validateResult(res);
}

export async function acceptMR(params) {
  console.info(params);
  // Call service
  const res = await request('/api/v4/projects/'+ params.id + '/merge_requests/'+ params.iid + '/merge', {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}


export async function searchTags(params) {
  // Call service
  const res = await request('/api/v4/projects/'+ params.id + '/repository/tags?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}


// POST /projects/:id/repository/tags
export async function createTag(params) {
  let data = {
    tag_name: params.tag_name,
    ref: params.ref,
  }
  // Call service
  const res = await request('/api/v4/projects/'+ params.id + '/repository/tags', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

// Get Merge request
export async function searchMR(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.project_id + '/merge_requests?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

// validate result.
function validateResult(res){
  console.info('validate result from api');
  console.info(res);
  return res ? res.json() : {status: -1, message: 'error', result: null }
}

// export async function close(params) {
//   // Call service
//   return request('/api/v4/projects/' + params.id + '/merge_requests/' + params.iid, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type':'application/json;charset=UTF-8',
//       "PRIVATE-TOKEN": token,
//     },
//   });
// }
