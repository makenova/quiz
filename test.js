import test from 'ava'
import readAndMerge from './'
import yaml from 'read-yaml-promise'

let expected = {
   "url" : "https://nodecraft.com",
   "debug" : true,
   "server" : {
      "id" : 0,
      "enabled" : true,
      "args" : [
         "java",
         "-Xms1024M",
         "-Xmx2048M",
         "-jar",
         "minecraft_server.jar",
         "nogui"
      ],
      "owner_id" : "2442d8f7-0bba-4f9c-ae6d-83287ad96383",
      "port" : 25565,
      "host" : "127.0.0.1"
   }
}

test('Objects merged', async t => {
  let merged = await readAndMerge()

  t.deepEqual(expected, merged)
})

test('check yaml', async t => {
  t.plan(1)
  t.notThrows(yaml('example.yml'))
})

