# all-done-note-server

フロントのGithubのURL 
https://github.com/Matsuda1129/all-done-note-front

インフラのGithubのURL 
https://github.com/Matsuda1129/all-done-note-infrastructure

ER図　MysqlWorkBench
https://all-done-note-dev-picture-bucket.s3.ap-northeast-1.amazonaws.com/alldone_note+ER+8%3A7.mwb

# Usage
```bash
npm install
docker-compose build
docker-compose up
npm run seed:run:dev   create data, please check .src/database/seeds/datas.seed.ts. adjust 
```
