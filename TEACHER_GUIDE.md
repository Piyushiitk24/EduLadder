# EduLadder Questions Guide for Teachers

## How the Question System Works

### 📁 File Structure
- **questions.json**: Master file containing ALL questions for ALL 8 modules
- **template_questions.csv**: Template file showing the exact format for uploading questions
- **admin.html**: Web interface for uploading CSV files and managing questions

### 🎯 Module System
The game has **8 learning modules**:

1. **tlprocess** - Teaching Learning Process
2. **learningtheories** - Learning Theories  
3. **fourways** - 4 Ways of Learning
4. **andragogy** - Andragogy
5. **sat** - Systematic Approach to Training (SAT)
6. **btm** - Basic Teaching Model
7. **dol** - Domains of Learning
8. **objectives** - Writing Objectives

### 📊 Question Requirements per Module

**Recommended Question Distribution:**
- **Easy Questions**: 15-20 questions per module
- **Hard Questions**: 8-12 questions per module
- **Total per Module**: 23-32 questions

**Overall System:**
- **Total Easy Questions**: 120-160 (across all modules)
- **Total Hard Questions**: 64-96 (across all modules)
- **Grand Total**: 184-256 questions

### 📝 CSV File Format

**Required Columns (in exact order):**
```
module_id,module_name,difficulty,question_text,option_a,option_b,option_c,option_d,correct_option
```

**Column Descriptions:**
- **module_id**: Use exact IDs (tlprocess, learningtheories, fourways, andragogy, sat, btm, dol, objectives)
- **module_name**: Full descriptive name of the module
- **difficulty**: Either "easy" or "hard" (lowercase)
- **question_text**: The actual question (avoid commas inside text)
- **option_a, option_b, option_c, option_d**: The four answer choices
- **correct_option**: A, B, C, or D (uppercase)

### 📋 CSV Creation Guidelines

1. **Use the template_questions.csv file as your starting point**
2. **Replace sample questions with your own content**
3. **Maintain the exact column order and names**
4. **Ensure module_id matches exactly (case-sensitive)**
5. **Difficulty must be either "easy" or "hard"**
6. **Correct_option must be A, B, C, or D**

### 🎮 How Questions Appear in Game

- **Easy Questions**: Shown when players land on question mark spaces (🎯)
- **Hard Questions**: Shown when players get bitten by snakes (🐍)
- **Module Selection**: Players choose a module before starting, only those questions appear

### 🔄 Upload Process

1. Open `admin.html` in your browser
2. Click "Choose File" and select your CSV file
3. Click "Convert to JSON" - this will add your questions to the master questions.json file
4. Your questions will be merged with existing questions
5. Students can immediately use the new questions in the game

### ⚠️ Important Notes

- **CSV files don't replace the entire questions.json** - they ADD to it
- **Multiple teachers can upload different modules**
- **Always test your CSV format using the template first**
- **Avoid special characters and commas within question text**
- **Module IDs are case-sensitive and must match exactly**

### 📁 Example Files Location
- Template: `template_questions.csv`
- Admin Tool: `admin.html`
- Master Questions: `questions/questions.json`
- Game: `index.html`
