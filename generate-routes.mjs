import fs from 'fs';

const grades = {
  '6': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '7': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '8': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '9': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '10': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Economics'],
  '12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Economics']
};

// Generate imports
let imports = '';
let routes = '';

Object.entries(grades).forEach(([grade, subjects]) => {
  subjects.forEach(subject => {
    const componentName = `CBSEGrade${grade}${subject}`;
    imports += `import ${componentName} from "./pages/boards/cbse/grade-${grade}/${subject}";\n`;
    
    const subjectKebab = subject.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
    routes += `            <Route path="/boards/cbse/grade-${grade}/${subjectKebab}" element={<${componentName} />} />\n`;
  });
});

console.log('=== IMPORTS ===');
console.log(imports);
console.log('\n=== ROUTES ===');
console.log(routes);

// Write to files for easy copying
fs.writeFileSync('cbse-imports.txt', imports);
fs.writeFileSync('cbse-routes.txt', routes);
console.log('\n✅ Generated imports and routes saved to cbse-imports.txt and cbse-routes.txt');
