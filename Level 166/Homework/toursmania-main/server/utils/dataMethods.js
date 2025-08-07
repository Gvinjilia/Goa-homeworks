const fs = require('fs');

const readFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
}

const writeFile = (filePath, data) => {
    const writeFile = fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');

    return writeFile;
}

module.exports = {
    readFile,
    writeFile
}