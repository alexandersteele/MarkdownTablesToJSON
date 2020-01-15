// Markdown to JSON Application V1.1
const fs = require('fs');
const readline = require('readline-sync');

let filename = readline.question("Markdown filename: ");

fs.readFile(filename, (err, data) => {
    if (err) throw err;

    data = data.toString().split('\n');
    
    const headers = headerSerializer(data);
    const markdown_data = bodySerializer(headers, data);

    writeFile(markdown_data, filename);
});

const headerSerializer = (data) => {
    return data[0].replace('\t', '').split('|')
        .map(x => x.trim())
        .filter(x => x !== '');
}

const bodySerializer = (headers, data) => {
    return data.map(x => x.replace('\t', '').split('|').filter(x => x !== ''))
        .filter((x, index) => index >= 2)
        .map(line =>  headers.reduce((obj, header, index) => {
                // Reduce (header: line) key-value pairs into object
                
                
                obj[header] = line[index].trim();
                return obj;
                
            }, {})
        );
}

const writeFile = (markdown_data, filename) => {
    filename = filename.split('.')[0]; // Remove filename extension
    fs.writeFile(`${filename}.json`, JSON.stringify(markdown_data), (err) => {
        if (err) throw err;
        console.log("SUCCESS");
    });
}
