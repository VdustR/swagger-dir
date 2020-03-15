FROM node:13.10.1
WORKDIR /swagger-dir
COPY package.json package.json
COPY packages/cli/package.json packages/cli/package.json
COPY packages/core/package.json packages/core/package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json
RUN yarn --prod
COPY . .
ENV PATH="/swagger-dir/packages/cli/bin:${PATH}"
WORKDIR /data
EXPOSE 3000
USER node
ENTRYPOINT [ "swagger-dir" ]
