FROM node:16

WORKDIR /opt/app

RUN adduser --disabled-password --gecos '' app

COPY . .

RUN npm ci

RUN chown -R app /opt/app

USER app

EXPOSE 8080

ENV PORT=8080
ENV DB_FILE=/opt/app/assets/livros.db

CMD ["npm", "start"]
