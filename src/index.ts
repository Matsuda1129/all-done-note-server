import "reflect-metadata";
import {createConnection, getRepository, Repository} from "typeorm";
import express from "express"
const app: express.Express = express()
createConnection();

import userRoutes from './routes/userRoutes'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const manager = getConnectionManager().get('your_orm_name');
// const repository = manager.getRepository<AModel>(Model);

app.use(userRoutes);

app.listen(3000, () => {
    console.log("Start on port 3000.")
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

// const readUser = async (userRepository: Repository<User>) => {
//   console.log("### Read ###")

//   const users = await userRepository.find()
//   console.log(`All Users: ${JSON.stringify(users)}`)


//   const user = await userRepository.findOne({firstName: "Taro"})
//   console.log(`Select User: ${JSON.stringify(user)}`)
// }

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

// (async () => {
//   const connection = await createConnection()

//   const userRepository = getRepository(User)
//   await createUser(userRepository)
  // await readUser(userRepository)
//   await updateUser(userRepository)
//   await deleteUser(userRepository)

  // await connection.close()
// })()
