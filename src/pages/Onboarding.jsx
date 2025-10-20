import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateUserPreferences } = useAuth();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    // Step 1: Learning Preferences
    learningGoal: '',
    preferredDifficulty: '',
    learningStyle: '',
    dailyTimeCommitment: '',
    
    // Step 2: Interests
    selectedCategories: [],
    
    // Step 3: Current Status
    currentLevel: '',
    completedCourses: 0,
    currentlyLearning: [],
  });

  const learningGoals = [
    { id: 'career-advancement', label: '🚀 Career Advancement', desc: 'Grow within your current engineering field' },
    { id: 'domain-shift', label: '� Domain Shift', desc: 'Transition to a new tech domain (e.g., AI, Cloud)' },
    { id: 'skill-specialization', label: '⚙️ Skill Specialization', desc: 'Deepen expertise in a specific technology' },
    { id: 'certification', label: '🏆 Certification Prep', desc: 'Prepare for industry-recognized certifications' },
  ];

  const difficulties = [
    { id: 'beginner', label: '🌱 Beginner', desc: 'Little to no prior coding experience' },
    { id: 'intermediate', label: '⚡ Intermediate', desc: 'Comfortable with core programming and projects' },
    { id: 'advanced', label: '🚀 Advanced', desc: 'Strong technical foundation with applied experience' },
  ];

  const learningStyles = [
    { id: 'visual', label: '👁️ Visual Learner', desc: 'Prefers videos, diagrams, and visualizations' },
    { id: 'practical', label: '🛠️ Practical Learner', desc: 'Learns best through hands-on coding and projects' },
    { id: 'theoretical', label: '📚 Theoretical Learner', desc: 'Focuses on reading documentation and research papers' },
    { id: 'hybrid', label: '🔄 Hybrid Learner', desc: 'Combines theory, visuals, and project-based learning' },
  ];

  const timeCommitments = [
    { id: '30min', label: '⏱️ 30 min/day', value: '30 minutes' },
    { id: '1hour', label: '⏱️ 1 hour/day', value: '1 hour' },
    { id: '2hours', label: '⏱️ 2 hours/day', value: '2 hours' },
    { id: '3hours', label: '⏱️ 3+ hours/day', value: '3+ hours' },
  ];

  const categories = [
    { id: 'web-dev', label: '🌐 Web Development', icon: '💻' },
    { id: 'mobile-dev', label: '📱 Mobile App Development', icon: '📱' },
    { id: 'data-science', label: '📊 Data Science & Analytics', icon: '📈' },
    { id: 'ai-ml', label: '🤖 Artificial Intelligence & Machine Learning', icon: '🧠' },
    { id: 'devops', label: '⚙️ DevOps & Automation', icon: '🔧' },
    { id: 'cybersecurity', label: '🔒 Cybersecurity & Ethical Hacking', icon: '🛡️' },
    { id: 'cloud', label: '☁️ Cloud Infrastructure & Deployment', icon: '☁️' },
    { id: 'blockchain', label: '⛓️ Blockchain & Web3 Development', icon: '🔗' },
  ];

  const currentlyLearningOptions = [
    'React', 'Next.js', 'Node.js', 'Express.js',
    'Java', 'Python', 'C++', 'TypeScript',
    'Spring Boot', 'MongoDB', 'PostgreSQL',
    'Docker', 'Kubernetes', 'AWS', 'TensorFlow',
    'Machine Learning', 'Data Structures', 'Algorithms',
  ];

  const handleSelection = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const toggleCategory = (categoryId) => {
    const selected = preferences.selectedCategories.includes(categoryId);
    if (selected) {
      setPreferences({
        ...preferences,
        selectedCategories: preferences.selectedCategories.filter(id => id !== categoryId)
      });
    } else {
      setPreferences({
        ...preferences,
        selectedCategories: [...preferences.selectedCategories, categoryId]
      });
    }
  };

  const toggleLearning = (tech) => {
    const selected = preferences.currentlyLearning.includes(tech);
    if (selected) {
      setPreferences({
        ...preferences,
        currentlyLearning: preferences.currentlyLearning.filter(t => t !== tech)
      });
    } else {
      setPreferences({
        ...preferences,
        currentlyLearning: [...preferences.currentlyLearning, tech]
      });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!preferences.learningGoal || !preferences.preferredDifficulty || 
          !preferences.learningStyle || !preferences.dailyTimeCommitment) {
        toast.error('Please complete all fields before continuing');
        return;
      }
    } else if (step === 2) {
      if (preferences.selectedCategories.length === 0) {
        toast.error('Please select at least one category');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleComplete = () => {
    if (!preferences.currentLevel) {
      toast.error('Please select your current level');
      return;
    }

    // Update user preferences in context
    if (updateUserPreferences) {
      updateUserPreferences(preferences);
    }

    toast.success('Profile setup complete! 🎉');
    navigate('/dashboard');
  };

  const skipOnboarding = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center px-4 py-12">
      <div className="card max-w-4xl w-full p-8 fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-gray-600">Let's personalize your learning experience</p>
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full ${
                  s === step ? 'bg-primary' : s < step ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Step {step} of 3</p>
        </div>

        {/* Step 1: Learning Preferences */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's your learning goal?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleSelection('learningGoal', goal.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      preferences.learningGoal === goal.id
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">{goal.label}</div>
                    <div className="text-sm text-gray-600">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's your current level?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficulties.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleSelection('preferredDifficulty', level.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      preferences.preferredDifficulty === level.id
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How do you learn best?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleSelection('learningStyle', style.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      preferences.learningStyle === style.id
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">{style.label}</div>
                    <div className="text-sm text-gray-600">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily time commitment?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeCommitments.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => handleSelection('dailyTimeCommitment', time.value)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      preferences.dailyTimeCommitment === time.value
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold">{time.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What topics interest you? (Select all that apply)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      preferences.selectedCategories.includes(category.id)
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-semibold">{category.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Selected: {preferences.selectedCategories.length} categories
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Current Status */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What's your current programming level?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Just Starting', 'Some Experience', 'Professional'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleSelection('currentLevel', level)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      preferences.currentLevel === level
                        ? 'border-primary bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold">{level}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How many courses have you completed?
              </h2>
              <input
                type="number"
                min="0"
                value={preferences.completedCourses}
                onChange={(e) => handleSelection('completedCourses', parseInt(e.target.value) || 0)}
                className="input-field max-w-xs"
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What are you currently learning? (Optional)
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentlyLearningOptions.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleLearning(tech)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      preferences.currentlyLearning.includes(tech)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={skipOnboarding}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Skip for now
          </button>

          <div className="flex gap-3">
            {step > 1 && (
              <button onClick={prevStep} className="btn-secondary">
                ← Back
              </button>
            )}
            
            {step < 3 ? (
              <button onClick={nextStep} className="btn-primary">
                Continue →
              </button>
            ) : (
              <button onClick={handleComplete} className="btn-primary">
                Complete Setup 🎉
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
