FROM node:13.10.1-alpine as build
WORKDIR /swagger-dir
COPY package.json package.json
COPY packages/cli/package.json packages/cli/package.json
COPY packages/core/package.json packages/core/package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json
RUN yarn --network-timeout 100000
COPY . .
# build js
WORKDIR /swagger-dir/packages/core
RUN yarn build

FROM node:13.10.1-alpine
WORKDIR /swagger-dir
COPY package.json package.json
COPY packages/cli/package.json packages/cli/package.json
COPY packages/core/package.json packages/core/package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json
RUN yarn --prod --network-timeout 100000
COPY . .
COPY --from=build /swagger-dir/packages/core/jsDist /swagger-dir/packages/core/jsDist
ENV PATH="/swagger-dir/packages/cli/bin:${PATH}"
WORKDIR /data
EXPOSE 3000
USER node
ENTRYPOINT [ "swagger-dir" ]
