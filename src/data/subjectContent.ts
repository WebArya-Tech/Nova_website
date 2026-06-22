// Comprehensive subject content for CBSE, ICSE, and State Board
export interface SubjectContent {
  title: string;
  board: string;
  grade: string;
  heroImage: string;
  overview: string;
  keyLearningAreas: string[];
  methodology: {
    title: string;
    description: string;
  }[];
  learningModes: {
    title: string;
    description: string;
  }[];
  assessment: string[];
  whyChoose: string[];
  learningOutcomes: string[];
  features: string[];
  skills: string[];
}

export const subjectContentData: Record<string, Record<string, SubjectContent>> = {
  // CBSE Grade 6 Mathematics
  "cbse-grade-6-mathematics": {
    content: {
      title: "Grade 6 Mathematics (CBSE)",
      board: "CBSE",
      grade: "Grade 6",
      heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&h=900&fit=crop",
      overview: "Our Grade 6 Mathematics program is designed to help students develop a deep understanding of mathematical concepts while building confidence, logical reasoning, and problem-solving skills. Through engaging online classes, students learn to apply mathematics to real-life situations and develop a strong foundation for higher grades.",
      keyLearningAreas: [
        "Number Sense and Arithmetic",
        "Fractions and Decimals",
        "Geometry and Measurement",
        "Data Handling and Interpretation",
        "Algebraic Thinking",
        "Logical Reasoning",
        "Problem Solving Skills",
        "Mathematical Patterns and Relationships"
      ],
      methodology: [
        {
          title: "Interactive Live Classes",
          description: "Small batch sizes for better engagement with real-time interaction, personalized attention, and instant doubt resolution"
        },
        {
          title: "Concept-Based Learning",
          description: "Focus on understanding concepts thoroughly with step-by-step explanations, visual and practical examples, and application-oriented learning"
        },
        {
          title: "Activity-Based Learning",
          description: "Interactive exercises, mathematical puzzles and games, worksheets and practice activities, and real-world problem-solving tasks"
        },
        {
          title: "Competency-Based Approach",
          description: "Development of analytical thinking, logical reasoning exercises, higher-order thinking skills, and practical application of concepts"
        }
      ],
      learningModes: [
        {
          title: "One-to-One Online Classes",
          description: "Personalized learning plans with flexible scheduling and individual attention"
        },
        {
          title: "Small Group Online Classes",
          description: "Interactive learning with peer discussions and regular assessments"
        },
        {
          title: "Home Classes in Bangalore",
          description: "Dedicated tutor support at home with comfortable learning environment"
        }
      ],
      assessment: [
        "Weekly Practice Assignments",
        "Topic-wise Tests",
        "Monthly Assessments",
        "Interactive Quizzes",
        "Doubt-Clearing Sessions",
        "Performance Reviews",
        "Parent Feedback Sessions"
      ],
      whyChoose: [
        "Experienced Faculty with expertise in CBSE Mathematics",
        "Personalized Learning with individual attention to each student's needs",
        "Structured Curriculum covering all important concepts systematically",
        "Regular Feedback and communication with parents",
        "Flexible Online Learning from the comfort of home"
      ],
      learningOutcomes: [
        "Develop confidence in Mathematics",
        "Strengthen conceptual understanding",
        "Improve logical reasoning skills",
        "Enhance problem-solving abilities",
        "Perform better in school examinations",
        "Build a strong foundation for higher grades"
      ],
      features: [
        "Comprehensive Class Notes",
        "Practice Worksheets",
        "Assignment Sheets",
        "Revision Materials",
        "Mock Tests",
        "Recorded Session Access"
      ],
      skills: [
        "Logical Reasoning",
        "Analytical Thinking",
        "Problem Solving",
        "Numerical Accuracy",
        "Critical Thinking",
        "Mathematical Communication"
      ]
    }
  },

  // CBSE Grade 6 Science
  "cbse-grade-6-science": {
    content: {
      title: "Grade 6 Science (CBSE)",
      board: "CBSE",
      grade: "Grade 6",
      heroImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&h=900&fit=crop",
      overview: "Our Grade 6 Science program is designed to spark curiosity and develop scientific thinking in students. Through interactive online classes, practical examples, and activity-based learning, students gain a strong understanding of scientific concepts while developing observation, reasoning, and problem-solving skills.",
      keyLearningAreas: [
        "Food and Nutrition",
        "Materials Around Us",
        "Living Organisms and Their Environment",
        "The Human Body and Health",
        "Motion and Measurement",
        "Force and Energy",
        "Light, Shadows, and Reflection",
        "Air, Water, and Environmental Awareness",
        "Natural Resources",
        "Scientific Investigation and Observation"
      ],
      methodology: [
        {
          title: "Interactive Live Classes",
          description: "Engaging online sessions with small batch sizes and real-time interaction with teachers"
        },
        {
          title: "Concept-Based Learning",
          description: "Clear explanation of scientific concepts with visual presentations and demonstrations"
        },
        {
          title: "Activity-Based Learning",
          description: "Science experiments and demonstrations, observation-based activities, and project-based learning"
        },
        {
          title: "Inquiry-Based Learning",
          description: "Encouraging curiosity and questioning with scientific reasoning and investigation"
        }
      ],
      learningModes: [
        {
          title: "One-to-One Online Classes",
          description: "Personalized learning plans with flexible scheduling"
        },
        {
          title: "Small Group Online Classes",
          description: "Interactive learning environment with collaborative problem solving"
        },
        {
          title: "Home Classes in Bangalore",
          description: "Experienced tutors at your doorstep"
        }
      ],
      assessment: [
        "Topic-wise Assignments",
        "Weekly Practice Worksheets",
        "Online Quizzes",
        "Chapter Tests",
        "Monthly Assessments",
        "Project Activities",
        "Performance Reports"
      ],
      whyChoose: [
        "Experienced Science Faculty with expertise in CBSE curriculum",
        "Interactive Learning Environment making science interesting",
        "Personalized Attention based on each student's learning needs",
        "Regular Progress Monitoring with continuous assessment",
        "Strong Foundation Building for higher-grade Science concepts"
      ],
      learningOutcomes: [
        "Develop a strong understanding of basic scientific concepts",
        "Improve observation and analytical skills",
        "Build scientific thinking and reasoning abilities",
        "Gain confidence in applying science to everyday life",
        "Strengthen problem-solving skills",
        "Develop curiosity and interest in scientific learning"
      ],
      features: [
        "Comprehensive Science Notes",
        "Practice Worksheets",
        "Revision Materials",
        "Chapter-wise Assignments",
        "Mock Tests",
        "Additional Learning Resources"
      ],
      skills: [
        "Scientific Thinking",
        "Observation Skills",
        "Analytical Reasoning",
        "Problem Solving",
        "Critical Thinking",
        "Data Interpretation"
      ]
    }
  },

  // CBSE Grade 6 Social Science
  "cbse-grade-6-social-science": {
    content: {
      title: "Grade 6 Social Science (CBSE)",
      board: "CBSE",
      grade: "Grade 6",
      heroImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=900&fit=crop",
      overview: "Our Grade 6 Social Science program helps students explore the world around them through engaging lessons in History, Geography, and Civics. The course is designed to develop awareness, critical thinking, and a deeper understanding of people, places, cultures, and societies.",
      keyLearningAreas: [
        "History and Ancient Civilizations",
        "Indian Heritage and Culture",
        "Geography and the Earth",
        "Maps and Globes",
        "Environment and Natural Resources",
        "Government and Citizenship",
        "Diversity and Communities",
        "Social Responsibility",
        "Human-Environment Interaction",
        "Current Affairs Awareness"
      ],
      methodology: [
        {
          title: "Interactive Live Classes",
          description: "Engaging online sessions with active student participation and instant doubt resolution"
        },
        {
          title: "Concept-Based Learning",
          description: "Clear explanations with real-life examples, visual learning through maps and diagrams"
        },
        {
          title: "Activity-Based Learning",
          description: "Map work activities, research projects, group discussions, and interactive quizzes"
        },
        {
          title: "Inquiry-Based Learning",
          description: "Encouraging questions and discussions, developing critical thinking skills"
        }
      ],
      learningModes: [
        {
          title: "One-to-One Online Classes",
          description: "Personalized learning plans with individual attention"
        },
        {
          title: "Small Group Online Classes",
          description: "Interactive discussions and collaborative learning"
        },
        {
          title: "Home Classes in Bangalore",
          description: "Dedicated tutor support at home"
        }
      ],
      assessment: [
        "Topic-wise Assignments",
        "Weekly Worksheets",
        "Chapter Tests",
        "Online Quizzes",
        "Map Practice Activities",
        "Monthly Assessments",
        "Performance Reviews"
      ],
      whyChoose: [
        "Experienced SST Faculty with expertise in CBSE Social Science",
        "Interactive Learning Experience making subjects engaging",
        "Personalized Attention based on learning pace",
        "Regular Progress Monitoring with continuous assessment",
        "Strong Conceptual Foundation in History, Geography, and Civics"
      ],
      learningOutcomes: [
        "Develop a strong understanding of History, Geography, and Civics",
        "Improve analytical and critical thinking skills",
        "Enhance map-reading and interpretation abilities",
        "Gain awareness of society, culture, and governance",
        "Build confidence in Social Science concepts",
        "Develop a broader understanding of the world"
      ],
      features: [
        "Comprehensive Notes",
        "Chapter-wise Worksheets",
        "Map Practice Resources",
        "Revision Materials",
        "Mock Tests",
        "Additional Learning Resources"
      ],
      skills: [
        "Critical Thinking",
        "Analytical Reasoning",
        "Research Skills",
        "Map Reading",
        "Communication Skills",
        "Social Awareness"
      ]
    }
  },

  // CBSE Grade 6 Languages
  "cbse-grade-6-languages": {
    content: {
      title: "Grade 6 Languages (CBSE)",
      board: "CBSE",
      grade: "Grade 6",
      heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&h=900&fit=crop",
      overview: "Our Grade 6 Language program is designed to help students develop confidence in reading, writing, speaking, and comprehension. We offer support for English, Hindi, Kannada, Sanskrit, and other regional languages based on student curriculum requirements.",
      keyLearningAreas: [
        "Reading Comprehension",
        "Grammar and Language Usage",
        "Vocabulary Development",
        "Creative Writing",
        "Letter and Paragraph Writing",
        "Literature and Poetry",
        "Speaking and Communication Skills",
        "Listening Skills",
        "Pronunciation and Fluency",
        "Writing and Expression"
      ],
      methodology: [
        {
          title: "Interactive Live Classes",
          description: "Engaging online sessions with active student participation and real-time doubt resolution"
        },
        {
          title: "Concept-Based Learning",
          description: "Clear explanation of grammar concepts with literature analysis and context-based vocabulary"
        },
        {
          title: "Reading & Writing Development",
          description: "Guided reading sessions, comprehension practice, and creative expression activities"
        },
        {
          title: "Communication-Focused Approach",
          description: "Speaking practice, pronunciation improvement, and confidence-building activities"
        }
      ],
      learningModes: [
        {
          title: "One-to-One Online Classes",
          description: "Personalized learning plans with individual attention"
        },
        {
          title: "Small Group Online Classes",
          description: "Interactive discussions and collaborative learning"
        },
        {
          title: "Home Classes in Bangalore",
          description: "Dedicated tutor support at home"
        }
      ],
      assessment: [
        "Reading Assessments",
        "Grammar Worksheets",
        "Writing Assignments",
        "Vocabulary Activities",
        "Chapter Tests",
        "Oral Assessments",
        "Monthly Evaluations"
      ],
      whyChoose: [
        "Experienced Language Faculty with expertise in CBSE curriculum",
        "Personalized Learning to improve specific language skills",
        "Comprehensive Skill Development in reading, writing, speaking, and listening",
        "Regular Feedback and Monitoring for consistent improvement",
        "Confidence Building in communication and expression"
      ],
      learningOutcomes: [
        "Develop strong reading and comprehension skills",
        "Improve grammar and vocabulary usage",
        "Enhance writing and creative expression abilities",
        "Build confidence in speaking and communication",
        "Strengthen overall language proficiency",
        "Perform better in school assessments",
        "Develop lifelong communication skills"
      ],
      features: [
        "Comprehensive Notes",
        "Grammar Practice Worksheets",
        "Reading Comprehension Exercises",
        "Vocabulary Building Activities",
        "Writing Practice Resources",
        "Mock Tests"
      ],
      skills: [
        "Reading Fluency",
        "Grammar Accuracy",
        "Vocabulary Enhancement",
        "Writing Skills",
        "Communication Skills",
        "Listening Skills"
      ]
    }
  }
};

// Helper function to get subject content
export const getSubjectContent = (board: string, grade: string, subject: string): SubjectContent | null => {
  const key = `${board}-${grade}-${subject}`;
  return subjectContentData[key]?.content || null;
};

// CBSE Grade 7-12 comprehensive content will be added here in the next update
// Due to the extensive nature of the content, this will be done in batches

// Grade 7 CBSE Mathematics
subjectContentData["cbse-grade-7-mathematics"] = {
  content: {
    title: "Grade 7 Mathematics (CBSE)",
    board: "CBSE",
    grade: "Grade 7",
    heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=900&fit=crop",
    overview: "Our Grade 7 Mathematics program is designed to strengthen students' mathematical foundations while developing analytical thinking, logical reasoning, and problem-solving abilities. Following the latest CBSE and NCERT curriculum guidelines, we help students move beyond memorization and develop the confidence to solve problems independently.",
    keyLearningAreas: [
      "Number Systems and Operations",
      "Rational Numbers and Integers",
      "Algebraic Thinking and Expressions",
      "Equations and Problem Solving",
      "Geometry and Visual Reasoning",
      "Comparing Quantities",
      "Data Handling and Interpretation",
      "Practical Geometry",
      "Mensuration and Measurement",
      "Symmetry and Patterns",
      "Logical Reasoning and Problem Solving"
    ],
    methodology: [
      {
        title: "Concept-Based Learning",
        description: "Strong focus on understanding mathematical concepts with step-by-step explanations, visual demonstrations, practical examples, and real-life applications of mathematics"
      },
      {
        title: "Problem-Solving Approach",
        description: "Application-based questions, critical thinking exercises, logical reasoning development, and higher-order thinking skills"
      },
      {
        title: "Interactive Learning",
        description: "Live discussions and participation, interactive quizzes and activities, collaborative learning opportunities, continuous engagement throughout sessions"
      },
      {
        title: "Personalized Support",
        description: "Individual performance tracking, customized learning strategies, regular doubt-clearing sessions, and targeted improvement plans"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized attention from expert tutors with customized lesson plans and flexible scheduling"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive and engaging learning environment with peer discussions and collaborative learning"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Experienced tutors at your doorstep with one-to-one personalized teaching"
      }
    ],
    assessment: [
      "Weekly Practice Worksheets",
      "Topic-wise Tests",
      "Monthly Assessments",
      "Interactive Quizzes",
      "Mock Examinations",
      "Performance Analysis Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Expert Mathematics Tutors with strong CBSE curriculum expertise",
      "Personalized Learning Experience customized to individual needs",
      "Flexible Learning Options - online, offline, and home tuition",
      "Continuous Performance Monitoring with regular assessments",
      "Strong Academic Foundation preparing students for future success"
    ],
    learningOutcomes: [
      "Develop confidence in solving mathematical problems",
      "Strengthen logical and analytical thinking skills",
      "Improve conceptual understanding of Mathematics",
      "Enhance calculation accuracy and efficiency",
      "Build strong foundations for higher grades",
      "Perform better in school assessments and examinations",
      "Develop a positive attitude towards Mathematics"
    ],
    features: [
      "Comprehensive Class Notes",
      "Practice Worksheets",
      "Assignment Sheets",
      "Revision Resources",
      "Topic-wise Question Banks",
      "Mock Tests",
      "Recorded Sessions"
    ],
    skills: [
      "Logical Reasoning",
      "Analytical Thinking",
      "Problem Solving",
      "Numerical Accuracy",
      "Critical Thinking",
      "Mathematical Communication"
    ]
  }
};

// CBSE Grade 7 Science
subjectContentData["cbse-grade-7-science"] = {
  content: {
    title: "Grade 7 Science (CBSE)",
    board: "CBSE",
    grade: "Grade 7",
    heroImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1600&h=900&fit=crop",
    overview: "Science is all about understanding how the world works. Our Grade 7 Science program helps students develop curiosity, observation skills, and scientific reasoning through engaging lessons, interactive discussions, and practical applications. Designed according to the latest CBSE and NCERT curriculum guidelines.",
    keyLearningAreas: [
      "Nutrition and Healthy Living",
      "Plants and Animal Life",
      "Matter and Materials",
      "Physical and Chemical Changes",
      "Heat and Temperature",
      "Motion and Forces",
      "Light and Its Properties",
      "Water and Environmental Conservation",
      "Weather and Climate",
      "Earth and Natural Resources",
      "Scientific Investigation and Observation"
    ],
    methodology: [
      {
        title: "Inquiry-Based Learning",
        description: "Students explore concepts through questioning, observation, and investigation"
      },
      {
        title: "Activity-Oriented Approach",
        description: "Learning enhanced through demonstrations, experiments, case studies, and practical examples"
      },
      {
        title: "Visual Learning Techniques",
        description: "Use of diagrams, animations, models, presentations, and illustrations to improve understanding"
      },
      {
        title: "Real-World Applications",
        description: "Scientific concepts connected to daily life to help students understand their practical importance"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning experience with flexible schedules and individual academic support"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive sessions with collaborative discussions and peer engagement"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Dedicated tutor support at home with comfortable learning environment"
      }
    ],
    assessment: [
      "Topic-wise Assignments",
      "Interactive Quizzes",
      "Chapter Assessments",
      "Practical Application Exercises",
      "Monthly Evaluations",
      "Concept-Based Tests",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced Faculty with strong subject expertise and CBSE curriculum experience",
      "Personalized Learning Plans customized guidance based on individual needs",
      "Interactive Learning Environment making science enjoyable and meaningful",
      "Continuous Academic Support with regular doubt-clearing and progress monitoring",
      "Strong Foundation Building for higher classes and future scientific learning"
    ],
    learningOutcomes: [
      "Develop a deeper understanding of scientific concepts",
      "Improve observation and analytical skills",
      "Strengthen logical reasoning abilities",
      "Connect science with everyday life",
      "Build confidence in applying scientific knowledge",
      "Improve academic performance in Science",
      "Develop curiosity and a lifelong interest in learning"
    ],
    features: [
      "Comprehensive Science Notes",
      "Practice Worksheets",
      "Revision Materials",
      "Topic Summaries",
      "Assessment Papers",
      "Additional Reference Material"
    ],
    skills: [
      "Scientific Thinking",
      "Observation Skills",
      "Critical Analysis",
      "Logical Reasoning",
      "Problem Solving",
      "Data Interpretation"
    ]
  }
};

// CBSE Grade 10 Mathematics (Board Examination)
subjectContentData["cbse-grade-10-mathematics"] = {
  content: {
    title: "Class 10 Mathematics (CBSE Board)",
    board: "CBSE",
    grade: "Grade 10",
    heroImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1600&h=900&fit=crop",
    overview: "Grade 10 is one of the most important academic milestones. Our Mathematics program is designed to help students build strong conceptual understanding, master problem-solving techniques, and achieve excellent results in CBSE Board Examinations. Aligned with the latest CBSE, NCERT, and NEP guidelines, our approach focuses on conceptual clarity, competency-based learning, application-oriented problem solving, and strategic board exam preparation.",
    keyLearningAreas: [
      "Algebra and Mathematical Applications",
      "Geometry and Coordinate Geometry",
      "Trigonometry and Its Applications",
      "Mensuration and Measurement",
      "Probability and Statistics",
      "Number Systems",
      "Mathematical Modelling",
      "Real-Life Applications of Mathematics",
      "Logical and Analytical Reasoning"
    ],
    methodology: [
      {
        title: "Concept Mastery",
        description: "Students first build strong conceptual foundations before moving to advanced problem solving with complete syllabus coverage"
      },
      {
        title: "Board-Level Question Practice",
        description: "Extensive practice with previous year questions, competency-based questions, application-based questions, case-study questions, and board-level numerical problems"
      },
      {
        title: "Time Management Training",
        description: "Students learn how to allocate time effectively, question selection strategies, accuracy improvement techniques, and efficient problem-solving methods"
      },
      {
        title: "Mock Board Examinations",
        description: "Regular mock tests simulate actual board examination conditions and help build confidence"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized Board preparation with flexible schedules and individual attention"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive learning with peer discussions and collaborative problem solving"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Dedicated tutor support with personalized learning experience"
      }
    ],
    assessment: [
      "Weekly Tests",
      "Topic-wise Assessments",
      "Monthly Evaluations",
      "Competency-Based Worksheets",
      "Mock Board Exams",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced Board-Level Faculty with extensive CBSE Board preparation experience",
      "Personalized Attention with customized learning plans",
      "Strategic Exam Preparation focused specifically for Board success",
      "Regular Progress Monitoring with continuous assessment and feedback",
      "Strong Academic Support with doubt-solving and revision planning"
    ],
    learningOutcomes: [
      "Develop complete conceptual clarity",
      "Master Board-level problem-solving techniques",
      "Improve speed and accuracy",
      "Gain confidence in competency-based questions",
      "Strengthen analytical and logical reasoning",
      "Perform effectively under exam conditions",
      "Maximize Board Examination scores"
    ],
    features: [
      "Comprehensive Study Notes",
      "Formula Sheets",
      "Revision Notes",
      "Board-Oriented Question Banks",
      "Previous Year Questions",
      "Practice Worksheets",
      "Mock Test Papers"
    ],
    skills: [
      "Logical Reasoning",
      "Analytical Thinking",
      "Problem Solving",
      "Time Management",
      "Exam Strategy",
      "Mathematical Communication"
    ]
  }
};

// CBSE Grade 11 Physics
subjectContentData["cbse-grade-11-physics"] = {
  content: {
    title: "Grade 11 Physics (CBSE)",
    board: "CBSE",
    grade: "Grade 11",
    heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=900&fit=crop",
    overview: "Grade 11 Physics forms the foundation for advanced studies in Science and is essential for students aspiring to pursue Engineering, Medicine, Research, Technology, and other STEM-related careers. Our program is designed to help students develop strong conceptual understanding, analytical thinking, numerical problem-solving abilities, and scientific reasoning while preparing them for CBSE examinations and future academic challenges.",
    keyLearningAreas: [
      "Physical World and Scientific Methods",
      "Mechanics - Motion and Laws of Motion",
      "Work, Energy, and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Properties of Matter - Solids and Fluids",
      "Thermal Properties of Matter",
      "Thermodynamics",
      "Kinetic Theory of Gases",
      "Oscillations and Waves",
      "Sound Waves and Applications"
    ],
    methodology: [
      {
        title: "Concept-Based Learning",
        description: "Every topic is taught from first principles to ensure deep conceptual understanding before moving to numerical problem-solving"
      },
      {
        title: "Numerical Problem-Solving Approach",
        description: "Students learn structured techniques for solving Physics problems with accuracy and confidence"
      },
      {
        title: "Visual and Practical Learning",
        description: "Use of diagrams, simulations, demonstrations, and real-world examples to strengthen understanding"
      },
      {
        title: "Application-Oriented Learning",
        description: "Students learn how Physics concepts apply to technology, engineering, daily life, and scientific innovation"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning plans with flexible scheduling and individual attention"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive learning environment with peer discussions and collaborative problem solving"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Dedicated tutor support at home with comfortable learning environment"
      }
    ],
    assessment: [
      "Weekly Assignments",
      "Numerical Practice Tests",
      "Topic-Wise Assessments",
      "Conceptual Quizzes",
      "Monthly Evaluations",
      "Mock Examinations",
      "Performance Reports"
    ],
    whyChoose: [
      "Expert Physics Faculty with strong subject knowledge and CBSE curriculum experience",
      "Personalized Learning Experience customized to each student's needs",
      "Strong Conceptual Foundation before advancing to complex applications",
      "Continuous Academic Support with regular assessments and feedback",
      "Future-Ready Learning for CBSE examinations and competitive exams"
    ],
    learningOutcomes: [
      "Develop strong conceptual understanding of Physics",
      "Improve numerical problem-solving skills",
      "Strengthen analytical and logical reasoning abilities",
      "Apply scientific concepts to real-world situations",
      "Build confidence in theoretical and practical Physics",
      "Prepare effectively for Grade 12 and competitive examinations",
      "Develop a strong foundation for future STEM careers"
    ],
    features: [
      "Comprehensive Study Notes",
      "NCERT Support Material",
      "Numerical Practice Worksheets",
      "Revision Notes",
      "Formula Sheets",
      "Competency-Based Question Banks",
      "Mock Test Papers"
    ],
    skills: [
      "Scientific Reasoning",
      "Numerical Accuracy",
      "Analytical Thinking",
      "Problem Solving",
      "Logical Analysis",
      "Experimental Skills"
    ]
  }
};

// CBSE Grade 12 Physics (Board Examination)
subjectContentData["cbse-grade-12-physics"] = {
  content: {
    title: "Grade 12 Physics (CBSE Board)",
    board: "CBSE",
    grade: "Grade 12",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    overview: "Grade 12 Physics is one of the most important subjects for students pursuing Science. It plays a crucial role in Board Examinations and forms the foundation for higher studies in Engineering, Technology, Research, and various STEM careers. Our program provides complete support for syllabus coverage, revision, practical preparation, Board exam strategy, and performance improvement.",
    keyLearningAreas: [
      "Electrostatics - Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity and Circuits",
      "Magnetic Effects of Current and Magnetism",
      "Electromagnetic Induction and Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Matter and Radiation",
      "Atoms and Nuclei",
      "Semiconductor Electronics",
      "Practical Physics"
    ],
    methodology: [
      {
        title: "Concept-Based Learning",
        description: "Every topic is taught from fundamental principles to ensure complete conceptual clarity before moving to advanced applications"
      },
      {
        title: "Numerical Problem-Solving Approach",
        description: "Students learn systematic techniques for solving Physics numericals accurately and efficiently"
      },
      {
        title: "Application-Oriented Learning",
        description: "Concepts are connected to real-life situations, technological advancements, and practical applications"
      },
      {
        title: "Visual Learning Techniques",
        description: "Complex concepts are simplified using diagrams, simulations, animations, graphical analysis, and digital tools"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized Board preparation with flexible schedules and individual attention"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive discussions with collaborative problem solving and regular assessments"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Experienced tutor support at home with comfortable learning environment"
      }
    ],
    assessment: [
      "Weekly Assignments",
      "Numerical Practice Tests",
      "Topic-Wise Assessments",
      "Monthly Evaluations",
      "Competency-Based Worksheets",
      "Mock Board Examinations",
      "Practical Assessments",
      "Performance Reports"
    ],
    whyChoose: [
      "Experienced Board-Level Faculty with extensive CBSE Board preparation experience",
      "Personalized Learning Experience customized to individual needs",
      "Strategic Board Preparation focused specifically for Board Examination success",
      "Continuous Academic Support with regular assessments and feedback",
      "Future-Ready Learning for Board Examinations, CUET, and Engineering entrance"
    ],
    learningOutcomes: [
      "Develop complete conceptual clarity in Physics",
      "Master numerical problem-solving techniques",
      "Improve analytical and scientific reasoning skills",
      "Build confidence in Board-level questions",
      "Strengthen practical and experimental skills",
      "Improve examination performance and accuracy",
      "Prepare effectively for Board Examinations and higher education"
    ],
    features: [
      "Comprehensive Study Notes",
      "NCERT Support Material",
      "Formula Booklets",
      "Numerical Practice Worksheets",
      "Revision Notes",
      "Competency-Based Question Banks",
      "Previous Year Questions",
      "Mock Test Papers",
      "Practical Support Material"
    ],
    skills: [
      "Scientific Reasoning",
      "Numerical Problem Solving",
      "Analytical Thinking",
      "Experimental Skills",
      "Logical Analysis",
      "Time Management"
    ]
  }
};

// ==================== ICSE / ISC BOARD CONTENT ====================

// ICSE Grade 6 Mathematics
subjectContentData["icse-grade-6-mathematics"] = {
  content: {
    title: "Grade 6 Mathematics (ICSE)",
    board: "ICSE",
    grade: "Grade 6",
    heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&h=900&fit=crop",
    overview: "Mathematics develops logical thinking, problem-solving abilities, analytical skills, and confidence in handling real-life situations. Our Grade 6 Mathematics program helps students transition smoothly from primary to middle school mathematics while building a strong foundation for future academic success. Aligned with the latest ICSE curriculum and learner-centered educational practices.",
    keyLearningAreas: [
      "Numbers and Operations",
      "Whole Numbers and Number Patterns",
      "Factors and Multiples",
      "Fractions and Decimals",
      "Integers and Basic Operations",
      "Algebraic Thinking and Expressions",
      "Simple Algebraic Expressions and Variables",
      "Geometry - Basic Geometrical Concepts",
      "Angles, Lines and Line Segments",
      "Triangles, Quadrilaterals and Circles",
      "Symmetry",
      "Mensuration - Perimeter, Area and Volume",
      "Data Handling and Representation"
    ],
    methodology: [
      {
        title: "Concept-Based Learning",
        description: "Students understand the reasoning behind mathematical concepts rather than simply memorizing procedures"
      },
      {
        title: "Activity-Based Learning",
        description: "Interactive activities and practical examples make learning enjoyable and meaningful"
      },
      {
        title: "Visual Learning Techniques",
        description: "Use of diagrams, illustrations, models, and visual representations to strengthen understanding"
      },
      {
        title: "Application-Oriented Learning",
        description: "Mathematics is connected to real-life situations to help students understand its practical relevance"
      },
      {
        title: "Problem-Solving Approach",
        description: "Students learn systematic methods to solve mathematical problems confidently and accurately"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning plans with individual attention and flexible scheduling"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive learning with collaborative activities and peer engagement"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Dedicated tutor support at home with comfortable learning environment"
      }
    ],
    assessment: [
      "Weekly Practice Assignments",
      "Topic-Wise Assessments",
      "Conceptual Quizzes",
      "Problem-Solving Activities",
      "Monthly Evaluations",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced Mathematics Faculty with expertise in ICSE Mathematics",
      "Personalized Learning Experience with customized teaching methods",
      "Strong Foundation Building focused on conceptual understanding",
      "Continuous Academic Support with regular assessments and progress monitoring",
      "Engaging Learning Environment designed to build confidence and interest"
    ],
    learningOutcomes: [
      "Develop strong mathematical foundations",
      "Improve numerical and problem-solving skills",
      "Strengthen logical and analytical thinking",
      "Build confidence in handling mathematical concepts",
      "Apply mathematical knowledge to real-life situations",
      "Improve academic performance in Mathematics",
      "Prepare effectively for higher grades in ICSE curriculum"
    ],
    features: [
      "Comprehensive Study Notes",
      "Practice Worksheets",
      "Topic-Wise Exercises",
      "Revision Materials",
      "Interactive Learning Resources",
      "Assessment Papers"
    ],
    skills: [
      "Logical Reasoning",
      "Analytical Thinking",
      "Problem Solving",
      "Numerical Accuracy",
      "Critical Thinking",
      "Mathematical Communication"
    ]
  }
};

// ICSE Grade 10 Mathematics (Board Examination)
subjectContentData["icse-grade-10-mathematics"] = {
  content: {
    title: "Grade 10 Mathematics (ICSE Board)",
    board: "ICSE",
    grade: "Grade 10",
    heroImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1600&h=900&fit=crop",
    overview: "Grade 10 is one of the most important academic years. Mathematics plays a crucial role in determining future academic pathways. Our Grade 10 ICSE Mathematics program is designed to help students build conceptual clarity, strengthen problem-solving techniques, master examination strategies, and achieve outstanding performance in the ICSE Board Examination.",
    keyLearningAreas: [
      "Commercial Mathematics - GST, Banking, Shares and Dividends",
      "Algebra - Linear Inequations, Quadratic Equations, Factorization",
      "Ratio and Proportion, Matrices, Arithmetic and Geometric Progression",
      "Coordinate Geometry",
      "Geometry - Similarity, Loci, Circle Theorems, Cyclic Properties",
      "Tangent Properties, Geometrical Constructions",
      "Mensuration - Surface Area, Volume, Combined Solids",
      "Trigonometry - Ratios, Identities, Heights and Distances",
      "Statistics - Mean, Median, Mode, Histograms, Ogives",
      "Probability - Random Experiments, Sample Space, Probability Calculations"
    ],
    methodology: [
      {
        title: "Concept Mastery",
        description: "Students first build strong conceptual foundations before moving to advanced problem solving"
      },
      {
        title: "Board-Level Question Practice",
        description: "Extensive practice with previous year questions, competency-based questions, application-based questions"
      },
      {
        title: "Time Management Training",
        description: "Students learn how to allocate time effectively, question selection strategies, and efficient problem-solving methods"
      },
      {
        title: "Mock Board Examinations",
        description: "Regular mock tests simulate actual board examination conditions and help build confidence"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning plans with flexible scheduling and dedicated doubt-clearing sessions"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive learning with peer discussions and regular assessments"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Dedicated tutor support with comfortable learning environment"
      }
    ],
    assessment: [
      "Weekly Assignments",
      "Topic-Wise Tests",
      "Chapter Assessments",
      "Board Pattern Tests",
      "Mock Examinations",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced ICSE Mathematics Faculty with expertise in Board preparation",
      "Personalized Learning Experience customized guidance based on individual strengths",
      "Strong Board Preparation Framework for achieving excellent results",
      "Continuous Academic Support with regular assessments and progress monitoring",
      "Future-Focused Learning preparing students for higher secondary studies"
    ],
    learningOutcomes: [
      "Develop mastery of Grade 10 Mathematics concepts",
      "Improve logical and analytical thinking",
      "Strengthen problem-solving abilities",
      "Build confidence in Board-level questions",
      "Improve speed and accuracy",
      "Develop effective examination strategies",
      "Perform confidently in ICSE Board Examination"
    ],
    features: [
      "Comprehensive Study Notes",
      "Formula Sheets",
      "Revision Notes",
      "Board-Oriented Question Banks",
      "Previous Year Questions",
      "Practice Worksheets",
      "Mock Test Papers"
    ],
    skills: [
      "Logical Reasoning",
      "Analytical Thinking",
      "Problem Solving",
      "Time Management",
      "Exam Strategy",
      "Mathematical Communication"
    ]
  }
};

// ICSE Grade 10 Physics (Board Examination)
subjectContentData["icse-grade-10-physics"] = {
  content: {
    title: "Grade 10 Physics (ICSE Board)",
    board: "ICSE",
    grade: "Grade 10",
    heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=900&fit=crop",
    overview: "Physics helps students understand the fundamental laws that govern the universe. Grade 10 Physics is a crucial subject in the ICSE Board Examination and serves as the foundation for higher studies in Science, Engineering, Technology, Research, and various STEM-related fields. Our program focuses on conceptual understanding, numerical problem-solving, practical applications, scientific reasoning, and Board examination preparation.",
    keyLearningAreas: [
      "Force, Work, Power and Energy",
      "Machines and Efficiency",
      "Electricity and Magnetism",
      "Electric Current, Potential Difference, Resistance",
      "Electrical Power and Household Circuits",
      "Electromagnetism",
      "Heat - Temperature, Heat Transfer, Specific Heat Capacity",
      "Latent Heat and Thermal Expansion",
      "Light - Reflection, Refraction, Lenses and Mirrors",
      "Optical Instruments and Human Eye",
      "Sound - Sound Waves, Properties of Sound, Reflection",
      "Modern Physics - Radioactivity, Atomic Structure, Nuclear Energy"
    ],
    methodology: [
      {
        title: "Concept Mastery",
        description: "Strong emphasis on understanding principles before solving numerical problems"
      },
      {
        title: "Numerical Problem Solving",
        description: "Extensive practice in formula-based questions, application problems, unit conversions, and multi-step calculations"
      },
      {
        title: "Previous Year Question Practice",
        description: "Practice with board questions, important numerical problems, application-based questions"
      },
      {
        title: "Mock Board Examinations",
        description: "Regular full-length board-style tests under timed conditions"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning plans with individual attention and flexible scheduling"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive discussions with collaborative learning and regular assessments"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Experienced tutor support at home with customized lesson plans"
      }
    ],
    assessment: [
      "Weekly Assignments",
      "Topic-Wise Tests",
      "Numerical Practice Papers",
      "Practical Assessments",
      "Mock Board Examinations",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced ICSE Physics Faculty with expertise in Board examination preparation",
      "Personalized Learning Experience with customized support",
      "Strong Board Preparation Framework for achieving excellent results",
      "Continuous Academic Support with regular assessments and progress monitoring",
      "Future-Focused Learning for higher secondary Science and STEM careers"
    ],
    learningOutcomes: [
      "Develop strong conceptual understanding of Physics",
      "Improve scientific reasoning and analytical thinking",
      "Master board-level numerical problem solving",
      "Build confidence in practical and theoretical concepts",
      "Strengthen examination performance",
      "Develop effective time-management and answer-writing skills",
      "Prepare successfully for ICSE Board Examination"
    ],
    features: [
      "Comprehensive Study Notes",
      "Formula Sheets",
      "Numerical Practice Worksheets",
      "Revision Notes",
      "Board-Oriented Question Banks",
      "Previous Year Questions",
      "Mock Test Papers"
    ],
    skills: [
      "Scientific Reasoning",
      "Numerical Problem Solving",
      "Analytical Thinking",
      "Experimental Skills",
      "Logical Analysis",
      "Time Management"
    ]
  }
};

// ICSE Grade 10 Chemistry (Board Examination)
subjectContentData["icse-grade-10-chemistry"] = {
  content: {
    title: "Grade 10 Chemistry (ICSE Board)",
    board: "ICSE",
    grade: "Grade 10",
    heroImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&h=900&fit=crop",
    overview: "Chemistry is the science of matter and its transformations. Grade 10 Chemistry is a crucial component of the ICSE Board Examination and forms the foundation for higher studies in Science, Medicine, Pharmacy, Biotechnology, Environmental Science, Engineering, and Research. Our program focuses on conceptual understanding, practical applications, scientific reasoning, laboratory skills, and Board examination preparation.",
    keyLearningAreas: [
      "Periodic Table - Periodic Classification, Modern Periodic Table",
      "Trends in Properties, Metals and Non-Metals",
      "Chemical Bonding - Ionic Bonding, Covalent Bonding",
      "Molecular Structures and Properties",
      "Acids, Bases, and Salts",
      "Neutralization Reactions and Preparation of Salts",
      "Analytical Chemistry - Laboratory Tests, Identification of Substances",
      "Mole Concept and Stoichiometry - Chemical Calculations",
      "Organic Chemistry - Hydrocarbons, Functional Groups",
      "Electrolysis - Electrolytic Cells, Industrial Applications",
      "Environmental Chemistry - Air and Water Pollution"
    ],
    methodology: [
      {
        title: "Concept Mastery",
        description: "Students develop strong understanding of chemical concepts before moving to advanced applications"
      },
      {
        title: "Numerical Problem Solving",
        description: "Practice with mole calculations, stoichiometry problems, chemical equations, and application-based questions"
      },
      {
        title: "Board-Level Question Practice",
        description: "Extensive practice with previous year questions, structured questions, application-based questions"
      },
      {
        title: "Mock Board Examinations",
        description: "Regular board-style tests help students improve confidence, speed, and accuracy"
      }
    ],
    learningModes: [
      {
        title: "One-to-One Online Classes",
        description: "Personalized learning plans with individual attention and dedicated doubt-clearing sessions"
      },
      {
        title: "Small Group Online Classes",
        description: "Interactive discussions with collaborative learning and peer engagement"
      },
      {
        title: "Home Classes in Bangalore",
        description: "Experienced tutor support at home with customized lesson plans"
      }
    ],
    assessment: [
      "Weekly Assignments",
      "Topic-Wise Tests",
      "Practical Assessments",
      "Numerical Practice Worksheets",
      "Mock Board Examinations",
      "Performance Reports",
      "Parent Feedback Sessions"
    ],
    whyChoose: [
      "Experienced ICSE Chemistry Faculty with expertise in Board examination preparation",
      "Personalized Learning Experience with customized support",
      "Strong Board Preparation Framework for excellent results",
      "Continuous Academic Support with regular assessments and progress monitoring",
      "Future-Focused Learning for higher secondary Science and professional careers"
    ],
    learningOutcomes: [
      "Develop strong conceptual understanding of Chemistry",
      "Improve scientific reasoning and analytical thinking",
      "Master chemical calculations and problem solving",
      "Build confidence in practical and theoretical concepts",
      "Strengthen examination performance",
      "Develop effective answer-writing and laboratory skills",
      "Prepare successfully for ICSE Board Examination"
    ],
    features: [
      "Comprehensive Study Notes",
      "Practical Record Support",
      "Revision Notes",
      "Board-Oriented Question Banks",
      "Previous Year Questions",
      "Practice Worksheets",
      "Mock Test Papers"
    ],
    skills: [
      "Scientific Reasoning",
      "Analytical Thinking",
      "Observation Skills",
      "Experimental Techniques",
      "Problem Solving",
      "Laboratory Skills"
    ]
  }
};
