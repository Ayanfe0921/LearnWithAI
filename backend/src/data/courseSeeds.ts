type CourseSeed = {
  slug: string
  title: string
  category: string
  level: string
  duration: string
  lessons: number
  emoji: string
  accent: string
  description: string
  chapters: { title: string; summary: string; duration: string }[]
}

const makeChapters = (course: string, topics: [string, string, string]) => topics.map((title, index) => ({
  title,
  summary: `Learn the ${title.toLowerCase()} behind ${course}, with clear examples and a short practice activity.`,
  duration: `${12 + index * 3} min`,
}))

export const courseSeeds: CourseSeed[] = [
  { slug: 'ai-foundations', title: 'AI from the ground up', category: 'AI-Foundations', level: 'Beginner', duration: '4 hours', lessons: 12, emoji: '🤖', accent: 'course-blue', description: 'Understand the ideas behind artificial intelligence, machine learning, and the tools shaping everyday life.', chapters: makeChapters('artificial intelligence', ['What AI can do', 'How machine learning learns', 'Using AI thoughtfully']) },
  { slug: 'creative-writing', title: 'Write with confidence', category: 'Creative-Writing', level: 'All levels', duration: '3 hours', lessons: 9, emoji: '📝', accent: 'course-peach', description: 'Find your voice, build a writing habit, and turn a blank page into something worth sharing.', chapters: makeChapters('creative writing', ['Finding your voice', 'Building a strong story', 'Revising with confidence']) },
  { slug: 'personal-finance', title: 'Money basics that matter', category: 'Personal-Finance', level: 'Beginner', duration: '2.5 hours', lessons: 8, emoji: '💰', accent: 'course-green', description: 'Make sense of budgets, saving, and the small decisions that shape your financial future.', chapters: makeChapters('personal finance', ['Understanding your money', 'Creating a simple budget', 'Saving for your goals']) },
  { slug: 'web-development', title: 'Build your first website', category: 'Web-Development', level: 'Beginner', duration: '6 hours', lessons: 16, emoji: '💻', accent: 'course-purple', description: 'Learn how the web works and create a first page with HTML, CSS, and JavaScript.', chapters: makeChapters('web development', ['How websites work', 'Building pages with HTML and CSS', 'Adding interactions with JavaScript']) },
  { slug: 'study-smarter', title: 'Study smarter, not longer', category: 'Study-Smarter', level: 'All levels', duration: '90 min', lessons: 6, emoji: '📚', accent: 'course-yellow', description: 'Use practical memory and focus techniques to make study sessions count.', chapters: makeChapters('effective study', ['Setting up to focus', 'Remembering what you learn', 'Planning a study routine']) },
  { slug: 'design-thinking', title: 'Think like a designer', category: 'Design-Thinking', level: 'Beginner', duration: '3.5 hours', lessons: 10, emoji: '🎨', accent: 'course-coral', description: 'Turn observations into ideas and use a simple process to solve everyday problems.', chapters: makeChapters('design thinking', ['Understanding the problem', 'Generating useful ideas', 'Testing a solution']) },
  { slug: 'cybersecurity-basics', title: 'Cybersecurity foundations', category: 'CyberSecurity', level: 'Beginner', duration: '5 hours', lessons: 14, emoji: '🔒', accent: 'course-cyber', description: 'Learn how to protect accounts, spot common scams, and build safer digital habits.', chapters: makeChapters('cybersecurity', ['Protecting your accounts', 'Spotting online scams', 'Safer devices and networks']) },
  { slug: 'coding-robotics', title: 'Coding & robotics', category: 'Coding & Robotics', level: 'Beginner', duration: '6 hours', lessons: 16, emoji: '🤖', accent: 'course-robot', description: 'Bring code to life by learning programming basics, sensors, and how robots respond to the world.', chapters: makeChapters('coding and robotics', ['Programming the basics', 'Sensors and inputs', 'Making a robot respond']) },
  { slug: 'game-development', title: 'Game development basics', category: 'Game-Development', level: 'Beginner', duration: '5 hours', lessons: 13, emoji: '🎮', accent: 'course-game', description: 'Plan a simple game, create its mechanics, and learn the building blocks behind interactive worlds.', chapters: makeChapters('game development', ['Planning a playable idea', 'Building game mechanics', 'Polish and share your game']) },
]
