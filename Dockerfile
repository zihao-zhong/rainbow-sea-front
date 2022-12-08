# ------- 多阶段构建 -------


# 构建阶段
FROM node:14.14.0 as builder

# 定义环境变量
ENV NODE_ENV=production

ARG registry=https://registry.npm.taobao.org

# 定义容器内部的工作目录位置
WORKDIR /app

# 先把项目依赖文件复制到容器工作目录
COPY package.json .

# 先下载依赖
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install

# 把当前项目下所有文件都复制到容器内部的 /app 目录下
COPY . .

# 打包构建项目
RUN npm run build


# 部署阶段
FROM nginx:alpine

LABEL key="zihao-zhong"

COPY --from=builder /app/dist /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/client.nginx.conf

EXPOSE 80 80

CMD ["nginx", "-g", "daemon off;"]
