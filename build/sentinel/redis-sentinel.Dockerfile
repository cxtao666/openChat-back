# 建立Dockerfile指定基础镜像，同时拷贝配置文件到镜像内部
FROM  redis:7
ADD  sentinel.conf /etc/redis/sentinel.conf
RUN  chown redis:redis /etc/redis/sentinel.conf
COPY sentinel-entrypoint.sh /usr/local/bin/
RUN  chmod +x /usr/local/bin/sentinel-entrypoint.sh
CMD  sh /usr/local/bin/sentinel-entrypoint.sh
EXPOSE 26379