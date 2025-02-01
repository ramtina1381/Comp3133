const fs = require('fs')
const csv = require('csv-parser')
input = fs.readFile('input_countries.csv', (err, data)=>{
  if(err){
    console.log(err)
  }

})

const deleteFiles = () => {
  ['canada.txt', 'usa.txt'].forEach((file)=>{
    if (fs.existsSync(file)){
      fs.unlinkSync(file);
      console.log(`${file} deleted.`)
    }
  })
}

const writeFilteredData = (inputFile, country, outputFile) => {
  const writeStream = fs.createWriteStream(outputFile, {flags: 'a'});
  writeStream.write('country,year,population\n')

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row)=>{
      if(row.country===country){
        const data = `${row.country},${row.year},${row.population}\n`;
        writeStream.write(data)
      }
    })
    .on('end', ()=>{
      console.log(`${outputFile} written successfully. `)
      writeStream.end()
    })
    .on('error', (err)=>{
      console.error(`Error processing ${outputFile}`, err)
    })
}

const main = () =>{
  const inputFile = 'input_countries.csv';

  deleteFiles()
  writeFilteredData(inputFile, 'Canada', 'canada.txt')
  writeFilteredData(inputFile, 'United States', 'usa.txt');
}
main()