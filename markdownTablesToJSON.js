// Markdown to JSON Application V1.0
const fs = require('fs');
const filename = "markdown";

fs.readFile(`${filename}.txt`, (err, data) => {
    if (err) throw err;

    data = data.toString().split('\n');
    
    const headers = headerSerializer(data);
    const markdown_data = bodySerializer(headers, data);

    writeFile(markdown_data);
});

const headerSerializer = (data) => {
    return data[0].replace('\t', '').split('|')
        .map(x => x.trim())
        .filter(x => x !== '');
}

const bodySerializer = (headers, data) => {
    return data.map(x => x.replace('\t', '').split('|').filter(x => x !== ''))
        .filter((x, index) => index >= 2)
        .map(line => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = line[index].trim();
            });

            return obj;
        });
}

const writeFile = (markdown_data) => {
    fs.writeFile(`markdown.json`, JSON.stringify(markdown_data), (err) => {
        if (err) throw err;
    });
}
