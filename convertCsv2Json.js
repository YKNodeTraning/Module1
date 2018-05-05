const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')

const csvFile = path.join(__dirname, 'csv', 'customer-data.csv')
const jsonFile = path.join(__dirname, 'json', 'customer-data.json')

let recordCnt = 0

try {
   if (fs.existsSync(jsonFile)) {
      fs.unlink(jsonFile, (error)=> {
         if (error) {
            throw error;
         }
         console.log('Deleted ' + jsonFile)
      })
   }

   if (fs.existsSync(csvFile)) {
      console.log(`File exist : ${csvFile}`)
      csv()
      .fromFile(csvFile)
      .on('json', (jsonObj)=>{
         recordCnt += 1
         console.log(`#${recordCnt}`) 
//         console.log(jsonObj)
         fs.appendFileSync(jsonFile, JSON.stringify(jsonObj))
         fs.appendFileSync(jsonFile, '\n')

      })
      .on('done', (error)=>{
         console.log('End')
      })
   } else {
      console.log(`File not found : ${csvFile}`)
   }
}
catch (e) {
   console.log(`Error is ${e}`)
}

