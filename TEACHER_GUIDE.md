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

### 🔄 Step-by-Step Upload Process

**Method 1: Using Admin Web Interface**
1. Open `admin.html` in your web browser
2. Download the CSV template by clicking "📋 Download CSV Template"
3. Open the downloaded template file in Excel or any spreadsheet software
4. Replace the sample data with your own questions (keep the header row)
5. Save the file as CSV format
6. Go back to admin.html and select your module from the dropdown
7. Click "Choose File" and select your CSV file
8. Click "📤 Upload & Merge Questions"
9. Wait for success confirmation message
10. Your questions are now live in the game!

**Method 2: Using Template File**
1. Copy the `template_questions.csv` file from the project folder
2. Rename it (e.g., `my_module_questions.csv`)
3. Edit with your questions following the exact same format
4. Upload via admin.html as described above

**Verification:**
- After upload, you can test by starting the game
- Select your module to see if your questions appear
- Check both easy (question marks) and hard (snake bites) questions

### ⚠️ Important Notes

- **CSV files don't replace the entire questions.json** - they ADD to it
- **Multiple teachers can upload different modules**
- **Always test your CSV format using the template first**
- **Avoid special characters and commas within question text**
- **Module IDs are case-sensitive and must match exactly**
- **Each CSV upload can contain questions for multiple modules**
- **Questions are immediately available after successful upload**
- **The system validates your CSV format before processing**

### 🔧 Troubleshooting Common Issues

**CSV Format Errors:**
- Ensure exactly 9 columns in correct order
- Check that difficulty is "easy" or "hard" (lowercase)
- Verify correct_option is A, B, C, or D (uppercase)
- Remove extra commas from question text

**Upload Issues:**
- File must have .csv extension
- Check internet connection for web interface
- Ensure module_id matches one of the 8 valid modules
- Try downloading and using the template again

**Question Not Appearing:**
- Verify the module was selected correctly during upload
- Check that questions were added to the right difficulty level
- Test by playing the game and selecting the specific module

### 📁 Example Files Location
- Template: `template_questions.csv`
- Admin Tool: `admin.html`
- Master Questions: `questions/questions.json`
- Game: `index.html`
