const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl  = 'mongodb+srv://admin:oW9wKz5xWkBHxoGp@lobo0.nlyunv4.mongodb.net'
const dbName = 'OceanJornadaBackendFev2024'

async function main() {
  const client = new MongoClient(dbUrl)

  console.log('Conectando ao BD')
  await client.connect()
  console.log('BD Conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello, World')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá Mundo')
  })

  //Lista de personagens
  const lista      = ['Rick Sanchez', 'Morty Smith', 'Summer smith']
  const db         = client.db(dbName)
  const collection = db.collection('items')

  app.get('/item', async function (req, res) {
    const items = await collection.find().toArray()
    res.send(items)
  })

  app.get('/item/:id', async function (req, res) {
    const id   = req.params.id
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    res.send(item)
  })

  app.use(express.json())

  app.post('/item', async function (req, res) {
    const item = req.body
    
    await collection.insertOne(item)

    res.send(item)
  })

  app.put('/item/:id', async function (req, res) {
    const id       = req.params.id
    const novoItem = req.body

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: novoItem }
    )
    res.send('Item atualizado com sucesso!')
  })

  app.delete('/item/:id', async function (req, res) {
    const id   = req.params.id
    await collection.deleteOne({
      _id: new ObjectId(id)
    })

    res.send('Item removido com sucesso!')
  })

  app.listen(3000)
}

main()