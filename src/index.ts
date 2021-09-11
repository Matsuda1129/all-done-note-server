import "reflect-metadata";
import {createConnection,  getRepository, Repository} from "typeorm";
import {User} from "./entity/User";
import express from "express"
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("Start on port 3000.")
})

type User2 = {
    id: number
    name: string
    email: string
};

const users2: User2[] = [
    { id: 1, name: "User1", email: "user1@test.local" },
    { id: 2, name: "User2", email: "user2@test.local" },
    { id: 3, name: "User3", email: "user3@test.local" }
]

//一覧取得
app.get('/users', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(users2))
})

// const createUser = async (userRepository: Repository<User>) => {
//   console.log("### Create ###")

//   await userRepository.insert({
//     firstName: "Taro",
//     lastName: "Yamada",
//     age: 25
//   })

//   await userRepository.save({
//     firstName: "Saki",
//     lastName: "Suzuki",
//     age: 40
//   })
// }

const readUser = async (userRepository: Repository<User>) => {
  console.log("### Read ###")

  const users = await userRepository.find()
  console.log(`All Users: ${JSON.stringify(users)}`)


//   const user = await userRepository.findOne({firstName: "Taro"})
//   console.log(`Select User: ${JSON.stringify(user)}`)
}

// const updateUser = async (userRepository: Repository<User>) => {
//   console.log("### Update ###")

//   await userRepository.update({lastName: "Suzuki"}, {age: 23})

//   const userTaro = await userRepository.findOne({firstName: "Taro"})
//   userTaro.age = 30
//   await userRepository.save(userTaro)

//   const users = await userRepository.find()
//   console.log(`All Users: ${JSON.stringify(users)}`)
// }

// const deleteUser = async (userRepository: Repository<User>) => {
//   console.log("### Delete ###")

//   const userTaro = await userRepository.findOne({firstName: "Taro"})
//   await userRepository.remove(userTaro)

//   const users = await userRepository.find()
//   console.log(`All Users: ${JSON.stringify(users)}`)
// }

(async () => {
  const connection = await createConnection()

  const userRepository = getRepository(User)
//   await createUser(userRepository)
  await readUser(userRepository)
//   await updateUser(userRepository)
//   await deleteUser(userRepository)

  await connection.close()
})()
