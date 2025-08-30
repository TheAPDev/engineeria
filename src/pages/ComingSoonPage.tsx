import React from 'react';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  NewspaperIcon, 
  LanguageIcon, 
  BellIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const ComingSoonPage: React.FC = () => {
  // Group features into 4 slides, rest in a 5th slide
  const slides = [
    [
      {
        icon: UsersIcon,
        title: 'Team Formation within the App',
        description: 'Connect with like-minded developers and form teams directly through our platform. Find your perfect hackathon partners based on skills and interests.',
        status: 'Coming Soon',
        priority: 'high'
      },
      {
        icon: NewspaperIcon,
        title: 'Latest News on Hackathons & Internships',
        description: 'Stay updated with real-time news, industry insights, and trending opportunities in the tech world.',
        status: 'In Development',
        priority: 'high'
      }
    ],
    [
      {
        icon: LanguageIcon,
        title: 'Multi-language Support',
        description: 'Access the platform in multiple languages including Hindi, Tamil, Bengali, and more regional languages.',
        status: 'Coming Soon',
        priority: 'medium'
      },
      {
        icon: BellIcon,
        title: 'Smart Notifications',
        description: 'Get personalized notifications about new opportunities that match your skills and preferences.',
        status: 'Coming Soon',
        priority: 'medium'
      }
    ],
    [
      {
        icon: RocketLaunchIcon,
        title: 'Startup Showcase',
        description: 'Discover and connect with exciting startups looking for fresh talent and innovative ideas.',
        status: 'Coming Soon',
        priority: 'low'
      },
      {
        icon: ChatBubbleLeftRightIcon,
        title: 'Mentorship Program',
        description: 'Connect with industry experts and experienced professionals for guidance and career advice.',
        status: 'Planning Phase',
        priority: 'medium'
      }
    ],
    [
      {
        icon: AcademicCapIcon,
        title: 'Skill Assessment Platform',
        description: 'Test your coding skills with curated challenges and get recommendations for improvement.',
        status: 'Coming Soon',
        priority: 'high'
      },
      {
        icon: TrophyIcon,
        title: 'Achievement System',
        description: 'Earn badges and achievements as you participate in hackathons and complete internships.',
        status: 'Coming Soon',
        priority: 'low'
      }
    ],
    [] // Last slide for "Many more to come"
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = slides.length;
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const handleNext = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-4 px-2 sm:px-6 sm:py-8">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-['Montserrat'] mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Exciting Features Coming Soon
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We're constantly working to enhance your experience. Here's a preview of the amazing features 
            we're building to revolutionize how you discover opportunities.
          </p>
        </motion.div>

        {/* Features Slides */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrev} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white" aria-label="Previous Slide">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="text-gray-400 text-sm">{currentSlide + 1} / {totalSlides}</span>
            <button onClick={handleNext} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white" aria-label="Next Slide">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slides[currentSlide].length > 0 ? (
              slides[currentSlide].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gray-900 border rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 ${getPriorityColor(feature.priority)}`}
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="bg-red-600/20 p-3 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold font-['Montserrat'] text-white mb-2">
                          {feature.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityTextColor(feature.priority)}`}>
                            {feature.status}
                          </span>
                          <span className={`text-xs ${getPriorityTextColor(feature.priority)}`}>
                            {feature.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 bg-gray-900 border border-blue-500/40 rounded-xl p-10 flex flex-col items-center justify-center min-h-[220px]"
              >
                <span className="text-3xl mb-4">✨</span>
                <h3 className="text-2xl font-bold font-['Montserrat'] text-white mb-2 text-center">Many more features to come!</h3>
                <p className="text-gray-300 text-base text-center">Stay tuned for more exciting updates and improvements. We're just getting started!</p>
              </motion.div>
            )}
          </div>
        </div>




      </div>
    </div>
  );
};

export default ComingSoonPage;