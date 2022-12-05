# ------- 多阶段构建 -------


# 构建阶段
FROM node:14.14.0 as builder

WORKDIR '/app'

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run build


# 部署阶段
FROM nginx:alpine

LABEL key="zihzhong"

COPY --from=builder /app/build /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/client.nginx.conf

EXPOSE 80 80

CMD ["nginx", "-g", "daemon off;"]
