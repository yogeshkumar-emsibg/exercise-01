function htmlToJson(element) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(element,'text/html')
    const output = [];
    const summary = {numberOfCapitals: 0};
    
    const processNode = (node) => {
        console.log(node.nodeType)
        if(node.nodeType === 3 && node.nodeValue.trim() !== ""){
            const content = node.nodeValue.trim();
            const parentClass = node.parentNode.getAttribute('class');

           
                if(parentClass === 'capital')
                   {
                    output.push({capital: content})
                     summary.numberOfCapitals++;
                    }
                else if(parentClass === 'state' && output.length > 0){
                    output[output.length - 1].state = content
                }
                
        }
    
    if(node.childNodes && node.childNodes.length > 0 ){
        for(const childNode of node.childNodes){
            processNode(childNode);
        }
    }
   
}
processNode(doc.documentElement);


return {output, summary}
}

function convertHtmlToJson() {
   
const htmlString = document.getElementById("htmlString").value;

const temp = htmlToJson(htmlString)
const structuredTemp = JSON.stringify(temp.output,null,2)
const summary = JSON.stringify(temp.summary,null,2)
const capitalConcat = '"capitals": '.concat(structuredTemp)
const summaryConcat = ', "Summary": '.concat(summary)


const result = capitalConcat.concat(summaryConcat)
const finalResult = "{".concat(result).concat("}")
const file = new Blob([finalResult], {type: 'application/json'});
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(file)
downloadLink.download = 'output.json';
document.body.appendChild(downloadLink);
downloadLink.click();document.body.removeChild(downloadLink);


document.getElementById('output').value = result || null;


}

