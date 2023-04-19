# 这是一个基于 [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 模板搭的静态 blog

## 项目地址

[Vermouth | 一个瓦笔前端](http://www.shaoyiqiao.online)

## 关于部署

- 国外用 vercel
- 国内用七牛云

## 项目数据

- 所有数据的来源是在**data**目录下
- **data/siteMetadata.js** 是网站的基本信息
- 文章在**data/blog**文件夹下的 md 文件

  1. md 文件的前置信息格式如下

  ```js
     ---
         title: 标题
         date: 时间 e.g. 2023/4/18 18:20:16
         tags: [字符串， 字符串， ...]
         draft: false
         summary: 文章列表的描述展示
         type: Blog
         images: [图片地址]
         authors: ['default']
         layout: PostLayout
     ---
  ```

## TODO

- 计划加一个日常学习页
- 计划加一个生活记录页
