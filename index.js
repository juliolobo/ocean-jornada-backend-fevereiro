const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:oW9wKz5xWkBHxoGp@lobo0.nlyunv4.mongodb.net'
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
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer smith']
  const db = client.db(dbName)
  const collection = db.collection('items')

  app.get('/item', async function (req, res) {
    const items = await collection.find().toArray()
    res.send(items)
  })

  app.get('/item/:id', function (req, res) {
    const id = req.params.id
    const item = lista[id]

    res.send(item)
  })

  app.use(express.json())

  app.post('/item', function (req, res) {
    const body = req.body
    const item = body.nome
    lista.push(item)

    res.send('Item adicionado com sucesso')
  })

  app.listen(3000)
}

main()