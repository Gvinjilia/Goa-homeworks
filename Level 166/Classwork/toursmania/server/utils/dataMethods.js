const fs = require('fs');

const readFile = (filePath) => {
    const readFile = fs.readFileSync(filePath, 'utf-8');

    return readFile;
};

module.exports = {
    readFile
}