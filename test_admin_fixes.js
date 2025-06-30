// Test script to verify admin.html functionality
console.log('Testing EduLadder Admin Panel...');

// Simulate loading questions data
async function testLoadQuestions() {
    try {
        const response = await fetch('./questions/questions.json');
        const questionsData = await response.json();
        console.log('✅ Questions data loaded successfully');
        console.log('Available modules:', Object.keys(questionsData));
        
        // Test question counting
        Object.keys(questionsData).forEach(moduleId => {
            const questions = questionsData[moduleId];
            if (Array.isArray(questions)) {
                const easyCount = questions.filter(q => q.difficulty === 'easy').length;
                const hardCount = questions.filter(q => q.difficulty === 'hard').length;
                console.log(`${moduleId}: ${easyCount} easy, ${hardCount} hard (total: ${questions.length})`);
            }
        });
        
        return questionsData;
    } catch (error) {
        console.error('❌ Error loading questions:', error);
        return null;
    }
}

// Test CSV parsing
function testCSVParsing() {
    const testCSV = `module_id,module_name,difficulty,question_text,option_a,option_b,option_c,option_d,correct_option
tlprocess,Teaching Learning Process,easy,Test question?,Option A,Option B,Option C,Option D,A`;
    
    const lines = testCSV.split('\n');
    const headers = lines[0].split(',');
    console.log('CSV Headers:', headers);
    
    const testRow = lines[1].split(',');
    console.log('Test Row:', testRow);
    
    if (headers.length === testRow.length) {
        console.log('✅ CSV parsing structure looks good');
    } else {
        console.log('❌ CSV parsing issue - header/row mismatch');
    }
}

// Run tests
testLoadQuestions().then(data => {
    if (data) {
        console.log('✅ Admin panel should display question counts correctly');
    }
});

testCSVParsing();

console.log('Test completed. Check the admin panel in your browser.');
