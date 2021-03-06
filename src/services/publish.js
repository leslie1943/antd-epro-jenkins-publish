import request from '@/utils/request';
import { validateResult } from '@/utils/utils';
import tokens from '../../private/tokens'

const token = tokens['liupeijiang'];

export async function sendMR(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
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
  // console.info(params);
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests/' + params.iid + '/merge', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}


export async function searchTags(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/repository/tags?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}


// POST /projects/:id/repository/tags
export async function createTag(params) {
  let data = {
    tag_name: params.tag_name,
    message: params.message,
    ref: params.ref,
    // write area.
    // release_description: 'this is the release description for write area.',
  }
  // console.info(data);
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/repository/tags', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

// Get Merge request
export async function searchMR(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}
// Get Merge request
export async function searchOpenMR(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests?state=opened', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

export async function close(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/merge_requests/' + params.iid, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": tokens['liupeijiang'], //RenZhiSen's Token
    },
  });
  // 删除操作 直接返回结果
  return res;
}

// DELETE /projects/:id/repository/tags/:tag_name
export async function deleteTag(params) {
  return request('/api/v4/projects/' + params.id + '/' + 'repository/tags/' + params.name, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": tokens['liupeijiang'], //RenZhiSen's Token
    },
  })
}

// DELETE /projects/:id/repository/branches/:branch
export async function deleteBranch(params) {
  return request('/api/v4/projects/' + params.id + '/' + 'repository/branches/' + params.name, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": tokens['liupeijiang'], //RenZhiSen's Token
    },
  })
}

export async function searchBranches(params) {
  // Call service
  const res = await request('/api/v4/projects/' + params.id + '/repository/branches?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

export async function listEproProjects() {
  // Call service
  // const res = await request('/api/v4/projects', {
  // const res = await request('/api/v4/groups', { 所有分组: ["eprosharp","vhepro","vhsc","vhscframework"]
  const res = await request('/api/v4/groups/98/projects?per_page=200', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  });
  return validateResult(res);
}

export async function listContributors(params) {
  // Call service
  const res = await request(`/api/v4/projects/${params.id}/repository/contributors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token,
    },
  })
  return validateResult(res);
}

export async function listCommits(params) {
  // Call service
  const res = await request(`/api/v4/projects/${params.id}/repository/commits?per_page=2000`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "PRIVATE-TOKEN": token
    }
  })
  return validateResult(res);
}