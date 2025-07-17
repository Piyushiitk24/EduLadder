# EduLadder Data Persistence Guide

## 🔄 How Data Persistence Works

The EduLadder admin panel now features robust data persistence that ensures your changes are saved across browser sessions.

### 📊 Data Storage Mechanism

1. **Local Storage**: All changes are automatically saved to browser's localStorage
2. **Session Persistence**: Questions remain available even after closing/reopening browser
3. **Backup System**: Download updated JSON files for permanent storage

### 💾 When Data is Saved

Your question data is automatically saved to localStorage in these scenarios:

- ✅ **CSV Upload**: After successful upload and merge
- ✅ **Add Question**: When adding new questions manually
- ✅ **Edit Question**: When modifying existing questions
- ✅ **Delete Question**: When removing questions

### 🎯 Data Loading Priority

The system loads data in this order:
1. **First**: Check localStorage for saved changes
2. **Fallback**: Load original questions.json if no local data exists
3. **Default**: Start with empty database if neither is available

## 🛠️ Admin Panel Features

### Default View: EduLadder Admin Panel
- Shows module cards with question counts
- Upload CSV functionality
- Reset to original button
- Black text for better readability

### Module Management: Questions Manager
- Opens when clicking on any module card
- View all questions in tabular format
- Edit, delete, and add questions
- Filter by difficulty level
- Real-time statistics

## 📋 Step-by-Step Usage

### 1. Upload Questions via CSV
```
1. Click "Download CSV Template"
2. Edit the template with your questions
3. Click "Upload & Merge Questions"
4. Select your CSV file
5. Questions are validated and saved automatically
```

### 2. Manage Individual Questions
```
1. Click on any module card
2. Modal opens showing all questions
3. Use Edit/Delete buttons for existing questions
4. Click "Add New Question" for new ones
5. Changes are saved immediately
```

### 3. Make Changes Permanent
```
1. After making changes, click "Download Updated JSON"
2. Save the downloaded file
3. Replace questions/questions.json in your project
4. Changes are now permanent across all sessions
```

### 4. Reset to Original State
```
1. Click "Reset to Original" button
2. Confirm the action
3. All local changes are cleared
4. Original questions.json is reloaded
```

## 🔧 Technical Details

### localStorage Key
- **Key**: `eduladder_questions`
- **Format**: JSON string of complete question database
- **Size**: Automatically managed by browser

### Data Structure
```javascript
{
  "mod1": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct": 1,
      "difficulty": "easy",
      "module": "Module Name"
    }
  ]
}
```

### Validation Rules
- ✅ Module ID cannot be empty
- ✅ Question text required
- ✅ All 4 options must be provided
- ✅ Difficulty must be: easy, medium, hard
- ✅ Correct answer must be: A, B, C, D

## 🚨 Important Notes

### Data Persistence
- **Local Storage**: Changes persist across browser sessions
- **Browser Specific**: Data is tied to specific browser/device
- **Manual Backup**: Use download feature for permanent storage

### Browser Compatibility
- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ localStorage supported in all modern browsers
- ⚠️ Incognito/Private mode may not persist data

### File Management
- **Development**: Use localStorage for testing
- **Production**: Download and replace questions.json
- **Backup**: Regular downloads recommended

## 🎉 Benefits

1. **Immediate Persistence**: No data loss between sessions
2. **Smart Loading**: Automatically uses most recent data
3. **Easy Reset**: Quick return to original state
4. **Flexible Workflow**: Work across multiple sessions
5. **Safe Testing**: Local changes don't affect original files

## 🔍 Troubleshooting

### Questions Not Persisting
- Check if localStorage is enabled in browser
- Verify you're not in incognito/private mode
- Try refreshing the page

### Data Conflicts
- Use "Reset to Original" to clear corrupted data
- Reload original questions.json
- Check browser console for errors

### Performance Issues
- localStorage has ~5-10MB limit per domain
- Large question databases may need server-side storage
- Consider pagination for very large datasets

The EduLadder admin panel now provides enterprise-level data persistence while maintaining simplicity for educational use!
