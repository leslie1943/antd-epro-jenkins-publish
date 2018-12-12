## HappyMT

> 由于现有微服务众多，外加CI/CD策略限制，每一次向dev，staging发布新变更或需求需要大量体力劳动，于是抽象出该功能，一键创建MR，Tag等功能，大大提升工作效率

version：0.0.1



### 域名

https://gitlab.devops.viewchain.net/



### 项目ID

+ epro-mall：106
+ epro-dmcc-svc: 116
+ epro-user-svc: 104
+ epro-certificate-svc: 103
+ epro-gateway: 173
+ epro-job: 166
+ epro-flyway: 207
+ epro-message: 113
+ epro-support: 112   无华西分支
+ utility-epro: 211
+ epro-mall-web: 107




### 注意事项

> **在header中添加k-v：PRIVATE-TOKEN：${private_token}**



### 创建Merge Request

+ POST /projects/:id/merge_requests

+ URL样例：https://gitlab.devops.viewchain.net/api/v4/projects/106/merge_requests

+ 无 merge diff 状态码返回302

+ 请求样例：

  ```json
  {
    "id": 106,
    "title": "这是epro-mall的MR",
    "description": "这是epro-mall的MR Desc",
    "target_branch": "master",
    "source_branch": "develop"
  }​
  ```

+ 返回样例:(关注返回值 iid字段，作为接收Merge Request的URL参数)

  ```json
  {
      "id": 8521,
      "iid": 446,
      "project_id": 106,
      "title": "testmr1",
      "description": "testmr1",
      "state": "opened",
      "created_at": "2018-11-30T06:02:40.910Z",
      "updated_at": "2018-11-30T06:02:40.910Z",
      "target_branch": "master",
      "source_branch": "develop",
      "upvotes": 0,
      "downvotes": 0,
      "author": {
          "name": "yuchao",
          "username": "yuchao",
          "id": 107,
          "state": "active",
          "avatar_url": "https://secure.gravatar.com/avatar/745b38131b41889c81917539ec2a9c03?s=80&d=identicon",
          "web_url": "https://gitlab.devops.viewchain.net/yuchao"
      },
      "assignee": null,
      "source_project_id": 106,
      "target_project_id": 106,
      "labels": [],
      "work_in_progress": false,
      "milestone": null,
      "merge_when_pipeline_succeeds": false,
      "merge_status": "unchecked",
      "sha": "82c0b965185b4710f31a06063016f6197acd56e1",
      "merge_commit_sha": null,
      "user_notes_count": 0,
      "should_remove_source_branch": null,
      "force_remove_source_branch": null,
      "web_url": "https://gitlab.devops.viewchain.net/vhepro/epro-mall/merge_requests/446",
      "subscribed": true
  }
  ```




### 关闭Merge Request
当提交的MR没有diff，需要将生成的MR关掉

+ DELETE /projects/:id/merge_requests/:merge_request_iid
+ URL样例：https://gitlab.devops.viewchain.net/api/v4/projects/:id/merge_requests/:merge_request_iid




### 接受Merge Request

+ PUT /projects/:id/merge_requests/:merge_request_iid/merge


+ URL样例： https://gitlab.devops.viewchain.net/api/v4/projects/106/merge_requests/446/merge



### 

### 查询项目Tag

+ GET /projects/:id/repository/tags
+ URL样例：https://gitlab.devops.viewchain.net/api/v4/projects/:id/repository/tags



### 创建新Tag

+ POST /projects/:id/repository/tags
+ URL样例：https://gitlab.devops.viewchain.net/api/v4/projects/:id/repository/tags


------

Version 0.0.2

