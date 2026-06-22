import SubjectPageTemplate from '../../../../components/SubjectPageTemplate';
import { getSubjectContent } from '../../../../data/subjectContent';

export default function Grade12Mathematics() {
  const content = getSubjectContent('cbse', 'grade-12', 'mathematics');
  
  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Content Coming Soon</h1>
        <p className="text-gray-600">This page is under development.</p>
      </div>
    </div>;
  }

  return <SubjectPageTemplate content={content} />;
}
