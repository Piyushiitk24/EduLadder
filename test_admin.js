// Test script to validate admin panel functionality
const fs = require('fs');

// Simulate CSV parsing
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    while (i < line.length) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i += 2;
                continue;
            }
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
        i++;
    }
    
    result.push(current.trim());
    return result;
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = parseCSVLine(lines[0]);
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            data.push(row);
        }
    }
    
    return data;
}

// Test with sample CSV content
const testCSV = `module_id,module_name,difficulty,question_text,option_a,option_b,option_c,option_d,correct_option
tlprocess,Teaching Learning Process,easy,"What is defined as a ""psychological process"" that prepares a person?","Training","Education","Learning","Teaching",B`;

console.log('Testing CSV parsing:');
const parsed = parseCSV(testCSV);
console.log('Parsed data:', JSON.stringify(parsed, null, 2));

// Test merging into questions structure
function mergeQuestionsIntoData(csvData, existingData = {}) {
    const result = { ...existingData };
    
    csvData.forEach(row => {
        const moduleId = row.module_id;
        if (!result[moduleId]) {
            result[moduleId] = [];
        }
        
        const questionObj = {
            question: row.question_text,
            options: [row.option_a, row.option_b, row.option_c, row.option_d],
            correct: row.correct_option.charCodeAt(0) - 65, // A=0, B=1, etc.
            difficulty: row.difficulty,
            module: row.module_name
        };
        
        result[moduleId].push(questionObj);
    });
    
    return result;
}

console.log('\nTesting merge function:');
const merged = mergeQuestionsIntoData(parsed, {});
console.log('Merged data:', JSON.stringify(merged, null, 2));
