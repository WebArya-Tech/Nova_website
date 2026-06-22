// Auto-generate all CBSE grade subject pages
// This script will be used to create all necessary page files

const fs = require('fs');
const path = require('path');

const grades = {
  '6': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '7': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '8': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '9': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '10': ['Mathematics', 'Science', 'SocialScience', 'Languages'],
  '11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Economics'],
  '12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Economics']
};

const createSubjectPage = (grade, subject) => {
  const subjectKebab = subject.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  return `import SubjectPageTemplate from '../../../../components/SubjectPageTemplate';
import { getSubjectContent } from '../../../../data/subjectContent';

export default function Grade${grade}${subject}() {
  const content = getSubjectContent('cbse', 'grade-${grade}', '${subjectKebab}');
  
  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Content Coming Soon</h1>
        <p>This page is under development.</p>
      </div>
    </div>;
  }

  return <SubjectPageTemplate content={content} />;
}
`;
};

// Generate all files
Object.entries(grades).forEach(([grade, subjects]) => {
  const gradeDir = path.join(__dirname, `src/pages/boards/cbse/grade-${grade}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(gradeDir)) {
    fs.mkdirSync(gradeDir, { recursive: true });
  }
  
  subjects.forEach(subject => {
    const filePath = path.join(gradeDir, `${subject}.tsx`);
    const content = createSubjectPage(grade, subject);
    
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  });
});

console.log('All CBSE grade subject pages created successfully!');
