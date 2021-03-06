import request from '@/utils/request';
import { getStore } from '@/utils/localStore';
import { validateResult, toBase64 } from '@/utils/utils';

// --------------------------- 获取用户的Jenkins认证 ---------------------------
export async function auth() {
  // Call
  const res = await request('/crumbIssuer/api/json', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${toBase64()}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
  return validateResult(res);
}

// --------------------------- 构建 Mall项目 with 参数 ---------------------------
// https://ci.devops.viewchain.net/job/vhepro2.0
export async function buildDeploy() {
  // call
  const res = await request('/job/epro-mall/buildWithParameters', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${toBase64()}`,
      'Jenkins-Crumb': getStore('epro_jenkins_auth') ? getStore('epro_jenkins_auth').crumb : '',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
}

// --------------------------- Pipeline ---------------------------
export async function buildPipeline(params) {
  const data = {
    gitTagName: params.gitTagName,
    gitBranch: params.gitBranch,
    gradleProperties: params.gradleProperties,
  }
  // /job/epro-dmcc-svc/build?delay=0sec
  // const res = await request('/job/' + params.gitProject + '/build?delay=0sec', {
  const res = await request(`/job/${params.gitProject}/build?delay=0sec`, {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': `Basic ${toBase64()}`,
      'Jenkins-Crumb': getStore('epro_jenkins_auth') ? getStore('epro_jenkins_auth').crumb : '',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
}

export async function getProjectJson(params) {
  // call
  const res = await request(`/job/${params.project}/api/json?pretty=true`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${toBase64()}`,
      'Jenkins-Crumb': getStore('epro_jenkins_auth') ? getStore('epro_jenkins_auth').crumb : '',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type':'application/json;charset=UTF-8',
    }
  })
  return validateResult(res);
}

export async function getBuildDetail(params) {
  // call
  const res = await request(`/job/${params.project}/${params.buildId}/`, {
    method: 'get',
    headers: {
      'Authorization': `Basic ${toBase64()}`,
      'Jenkins-Crumb': getStore('epro_jenkins_auth') ? getStore('epro_jenkins_auth').crumb : '',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
  return res.status >= 200 && res.status < 300 ? res.text() : { status: -1, message: 'error', result: null };

}