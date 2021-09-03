const fs = require("fs")
const filepath = "./dist/bilafgift3"
const files = fs.readdirSync(filepath)
const regex = /([a-z-]*).([0-9a-f]{20}).([a-z0-1]*)/
files
  .filter((file) => file.match(regex))
  .forEach((file) => {
    const match = regex.exec(file)
    fs.renameSync(filepath + "/" + file, filepath + `/${match[1]}.${match[3]}`)
  })
