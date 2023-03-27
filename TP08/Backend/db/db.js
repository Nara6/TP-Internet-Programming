const fs = require('fs');

const addNewUser = async (newUser) => {
  const jsonData = await readData();
  if (!jsonData) writeData([newUser]);
  else writeData([...jsonData, newUser]);
}

const getAllUsers = async () => {
  const jsonData = await readData();
  return jsonData;
}

const writeData = (data) => {
  // convert the data to a JSON string
  const jsonData = JSON.stringify(data);

  // write the JSON data to a file named "data.json"
  fs.writeFile('../db/data.json', jsonData, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data.json', (err, data) => {
      if (err) return reject(err);

      // parse the JSON data into an object
      const jsonData = JSON.parse(data);

      resolve(jsonData);
    });
  });

}

module.exports = {
  addNewUser,
  getAllUsers
}



