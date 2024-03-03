env files /src/common

npm install

npm run start:dev

Seeder
GET: http://localhost:3003/users/seed

create task
POST: http://localhost:3003/tasks
{
"title": "task1",
"description": "this is description",
"user_id": 1
}

Create user
POST: http://localhost:3003/auth/signup
{
"name": "Tasmia Noor",
"email": "noortasmia34@gmail.com",
"password": "12341234"
}
