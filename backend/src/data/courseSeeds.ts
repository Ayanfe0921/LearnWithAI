export const courseLevels = ['Beginner', 'Intermediate', 'Expert'] as const
export type CourseLevel = typeof courseLevels[number]

type LessonTopic = { title: string; focus: string }
type LevelCurriculum = { level: CourseLevel; lessons: LessonTopic[] }

export type CourseSeed = {
  slug: string
  title: string
  category: string
  level: CourseLevel
  duration: string
  lessons: number
  emoji: string
  accent: string
  image: string
  imageAlt: string
  description: string
  referencePriceNgn: number
  priceNgn: number
  chapters: { title: string; summary: string; content: string; duration: string; level: CourseLevel; practice: string; checkpoint: string; illustration?: string; imageAlt?: string }[]
}

const practicalExamples: Record<string, string> = {
  'ai-foundations': 'A spam filter sees examples of email marked as spam or safe. It learns patterns from the examples, predicts a label for a new email, and must be checked against messages it did not train on.',
  'creative-writing': 'A character wants to get home before a storm, but a missed bus forces a choice. The scene becomes clearer when each paragraph changes what the character knows or decides.',
  'personal-finance': 'If monthly income is ₦250,000 and essential expenses are ₦170,000, the remaining ₦80,000 must cover flexible spending, savings, debt payments, and irregular costs. A budget makes those trade-offs visible.',
  'web-development': 'A small profile page can use semantic HTML for its structure, CSS or Tailwind utilities for layout, and React state for an interactive save button. Test it at phone width and with a keyboard before publishing.',
  'study-smarter': 'After a lesson, close the notes and write what you remember. Check the gaps, make a few questions from them, then revisit those questions tomorrow and again later in the week.',
  'design-thinking': 'For a confusing course sign-up form, observe a few learners completing it. Note where they pause, ask what they expected, sketch a simpler flow, and test that prototype before building it.',
  'cybersecurity-basics': 'A message claims an account will close in ten minutes and asks for a password through a link. Treat the urgency as a warning, open the official site yourself, and report the message instead of replying.',
  'coding-robotics': 'A line-following robot reads two reflectance sensors. If the left sensor sees the dark line, it adjusts left; if the right sensor sees it, it adjusts right. Test on the actual surface because sensor readings vary.',
  'game-development': 'In a simple Pong game, the ball moves each frame, bounces when it reaches a paddle or wall, and resets when it leaves the play area. A score and restart state give the loop a clear goal.',
}

const lessonExamples: Record<string, string[]> = {
  'ai-foundations': [
    'A timer follows fixed rules; a spam classifier learns patterns from labeled emails and predicts whether an unseen message is unwanted.',
    'A house-price model uses past sales, area, and location; missing neighborhoods from its examples can make predictions unfair.',
    'Keep some labeled photos out of training and use them once at the end to check whether the model handles new examples.',
    'Replace “write about AI” with “explain supervised learning to a beginner in 150 words and include one limitation.”',
    'Labelled emails teach a classifier; unlabeled purchase records can be grouped; a text model generates new sentences.',
    'Test a help bot with common questions, misspellings, and requests it should decline, then score accuracy and safety.',
    'A study helper searches trusted teacher notes first, cites the matching passage, and admits when the answer is absent.',
    'Remove names and account numbers from customer data and verify company rules before putting any records into an AI tool.',
    'For a clinic appointment helper, define the patient, fewer missed appointments as a measure, and medical decisions as out of scope.',
    'Compare model answers with an answer key and edge cases; record unsupported claims as well as correct responses.',
    'Review sampled answers weekly, tag errors, and pause the feature if a serious privacy or safety issue appears.',
    'Present a student-notes prototype, evaluation results, failure examples, and a human review plan.',
  ],
  'creative-writing': [
    '“The bus arrived late” reports an event; adding rain on the shelter and Ada rehearsing an apology gives a point of view.',
    'A paragraph about a missed train states the main point, adds the platform detail that matters, then shows the changed plan.',
    'A character wants to return a lost wallet before its owner leaves town, but a closed shop forces a decision.',
    'Draft a scene for ten minutes without deleting sentences; bracket uncertain parts and keep going until the scene ends.',
    'Start with a goal, raise the cost after a failed attempt, and end with a choice that changes the situation.',
    'A child narrator notices a cracked mug but misunderstands the adults’ silence; that limited knowledge creates tension.',
    'Replace “the room was nice” with the warm lamp, chair facing the window, and smell of cinnamon the character notices.',
    'Read a page aloud, cut repeated information, and add the missing decision when a scene jumps too quickly.',
    'Short sentences can speed up a chase; longer reflective sentences can slow the moment after it.',
    'Check the requested word count, format, title, punctuation, and privacy requirements before submitting a manuscript.',
    'When a reader says they got lost, ask what they expected before deciding how to revise the scene.',
    'Present the revised story, one major revision decision, and a question for workshop readers.',
  ],
  'personal-finance': [
    'Record ₦250,000 income and ₦170,000 essentials; the remaining ₦80,000 still needs a plan for savings and flexible costs.',
    'Average variable transport costs across four weeks instead of budgeting from one unusually cheap week.',
    'A ₦120,000 emergency target over six months means ₦20,000 monthly; change the timeline if that contribution is unrealistic.',
    'A ₦15,000 course purchase uses money that could serve another goal; compare it with current priorities first.',
    'A ₦100,000 loan at 5% monthly grows faster than at 5% annually; always check the rate period.',
    'Compare loan rate, fees, repayment dates, late charges, and the total amount paid—not only the advertised installment.',
    'Money needed next month should not be invested in a volatile asset; longer timelines allow risk but do not remove it.',
    'Budget irregular income from a conservative baseline and assign extra earnings to buffers before taking on fixed costs.',
    'Build a small emergency buffer, then pay extra toward one debt and redirect its payment when it is cleared.',
    'Reduce income by 15% in a budget and identify what can change and how long the buffer lasts.',
    'Never share a one-time bank code with a caller; verify the request using the bank’s official app or number.',
    'Present a 12-month plan with monthly categories, debt actions, savings targets, and assumptions to review.',
  ],
  'study-smarter': [
    'Turn “learn biology” into “label the four heart chambers and explain blood flow without notes.”',
    'Choose one task, silence notifications, prepare materials, and decide what a finished 25-minute session means.',
    'Close the book and draw photosynthesis from memory before reopening notes to find missing steps.',
    'Write a question beside a summary, such as “What changes when a plant gets less light?”',
    'Review vocabulary today, tomorrow, and later in the week; retrieve the meaning before checking it.',
    'Mix fraction, percentage, and ratio questions so you practice choosing a method as well as applying it.',
    'For two confusing terms, make a comparison card with one distinguishing feature and example for each.',
    'Break a presentation into research, outline, draft, rehearsal, and revision milestones across the month.',
    'Explain a concept to a younger learner without notes and mark any phrase you cannot explain.',
    'Use a weekly list of recall questions and remove each item once you can reliably answer it.',
    'Practice history with timelines and coding with programs; different skills need different kinds of retrieval.',
    'Run four weekly sessions, record recall results, then keep or change methods based on evidence.',
  ],
  'design-thinking': [
    'Watch a learner search a catalog and note where they pause before deciding what the design problem is.',
    '“Help a first-time learner choose a suitable course in two minutes” describes a need without prescribing a screen.',
    'Compare a search box, guided quiz, and starter path against clarity, accessibility, and implementation time.',
    'Sketch a three-screen sign-up flow and ask a learner where they would continue and what information they expect.',
    'Ask “Tell me about the last time you searched for a course” rather than “Would you like a better filter?”',
    'Map discovery, comparison, registration, and first lesson; mark questions and drop-offs at the exact step.',
    'Give a participant an unassisted task, observe completion, and record their words rather than your interpretation.',
    'Check color contrast, keyboard focus, labels, and zoom before calling a design accessible.',
    'Group repeated interview observations and write an insight supported by multiple users.',
    'Measure task completion and time, then ask how confident the learner feels about the choice.',
    'Show evidence and trade-offs in a review and ask teammates what might fail before the next test.',
    'Present the user need, tested prototype, observations, changes, and one remaining uncertainty.',
  ],
  'cybersecurity-basics': [
    'A password reused on a shopping site can expose email if the shopping site is breached.',
    'Use a password manager for unique credentials and enable a passkey or second factor on the email account.',
    'Check a delivery text through the courier’s official tracking site instead of opening its shortened link.',
    'Enable updates, back up files, and review which apps can reach the microphone and location.',
    'Confirm a cafe Wi-Fi network with staff and avoid sensitive activity on an untrusted connection.',
    'Encrypted storage and a strong device passcode make lost laptop files harder to read.',
    'Delete a download that asks you to disable security settings and obtain the file from its official source.',
    'After account compromise, secure email first, revoke unknown sessions, change reused passwords, and contact the provider.',
    'For a course app, list learner records as assets and the login form as an entry point to assess.',
    'A server must verify permission to read a progress record; a valid login alone is insufficient.',
    'Preserve timestamps and review a burst of unfamiliar failed logins before removing logs or changing systems.',
    'Rank sample-app risks by likelihood and impact, recommend controls, and say how each fix will be checked.',
  ],
  'coding-robotics': [
    '“Move forward three steps, turn, stop” is a sequence of precise instructions with a testable result.',
    'Store motor speed in a variable, use a condition for a sensor reading, and repeat checks in a loop.',
    'A distance sensor is an input; a motor is an actuator. Compare the reading to a threshold before moving.',
    'Make a robot stop on button press and test presses both before and during motion.',
    'Collect several sensor readings and choose a safe threshold instead of trusting one noisy sample.',
    'Run both wheels on a marked track, measure drift, adjust one motor, and repeat the same test.',
    'Separate sensing, decision-making, and motor control into functions that can be tested individually.',
    'If a pause appears after a long run, check power and cable movement as well as the program.',
    'Represent a line follower with Searching, Following, ObstacleDetected, and Stopped states and defined transitions.',
    'If line sensors request forward but a distance sensor sees an obstacle, stop takes priority.',
    'Disconnect a sensor deliberately and verify that the robot stops instead of using a stale reading.',
    'Demonstrate an autonomous task with sensor readings, state changes, one failure, and its recovery.',
  ],
  'game-development': [
    '“Reach the exit before time runs out” defines a goal, a limit, and a condition for success.',
    'Place a player, platform, and camera in a scene and give each object a clear name.',
    'Map keys to movement and check wall collisions before applying the next position.',
    'When a coin is collected, update the score and play a small sound or animation as feedback.',
    'Multiply movement speed by frame delta so movement stays similar across refresh rates.',
    'Pause stops world updates but keeps the menu active; restart resets score and player position.',
    'A hit flash and sound can clarify damage, but should not hide important warnings.',
    'Observe a new player missing the first jump and adjust the gap before adding more instructions.',
    'Separate movement, scoring, level loading, and sound into small systems with clear jobs.',
    'Profile a crowded scene and identify expensive effects before reducing visual quality everywhere.',
    'Let players remap controls, mute audio, and save checkpoints; test settings after a restart.',
    'Publish a build, test keyboard and controller input, and explain the choices behind the final level.',
  ],
}

const lessonExample = (slug: string, title: string, index: number) => {
  if (slug !== 'web-development') return lessonExamples[slug]?.[index] ?? practicalExamples[slug]
  if (title.includes('React components')) return 'Create a ProfileCard component that receives a name and avatar URL as props. Render two cards from an array so each person uses the same reusable component.'
  if (title.includes('Props, lists')) return 'Map a lessons array to LessonCard components and use each lesson ID as its stable React key. Avoid using the array position if the list can be reordered.'
  if (title.includes('State, events')) return 'A bookmark button can call setSaved(current => !current). The button label and aria-pressed value should both reflect the saved state.'
  if (title.includes('Hooks and effects')) return 'Load a lesson list in useEffect when the page opens, show a loading state while the request is pending, and ignore or cancel stale work when the component unmounts.'
  if (title.includes('Tailwind')) return 'Use a layout such as `grid grid-cols-1 gap-4 md:grid-cols-2` to show one card column on a phone and two from the medium breakpoint upward.'
  if (title.includes('Lucide')) return 'Import `BookOpen` from `lucide-react` and place it inside a button with visible text or an `aria-label`. Decorative icons should use `aria-hidden="true"`.'
  if (title.includes('HTML')) return 'A course page can use `<main>`, a descriptive `<h1>`, `<section>` headings, and `<article>` elements for independent lesson cards instead of styling generic `<div>` elements.'
  if (title.includes('CSS')) return 'Set `box-sizing: border-box`, then use CSS Grid for a card gallery and a media query to reduce the columns on a narrow screen.'
  if (title.includes('JavaScript')) return 'A function can validate that a form title is not empty before adding the new task to an array. Return a clear error message when validation fails.'
  if (title.includes('API')) return 'Fetch a course from `/api/courses`, check `response.ok`, and render loading, success, empty, and error states rather than assuming every request succeeds.'
  if (title.includes('Authentication')) return 'The browser sends a short-lived session token with a protected request; the server verifies it and checks that this learner is allowed to access the requested record.'
  if (title.includes('TypeScript')) return 'Give a lesson component a typed `title` prop and validate API data before treating an external response as a `Course` object.'
  if (title.includes('Performance')) return 'Keep an input’s state inside the search component when the rest of the page does not need it. This limits unrelated components updating on each keystroke.'
  if (title.includes('Test')) return 'Test a sign-up form with an empty email, an invalid email, and a valid email, then inspect the production build and browser network panel.'
  if (title.includes('Security')) return 'Check that a signed-in learner cannot fetch another learner’s progress by changing an ID in the browser request.'
  if (title.includes('capstone')) return 'Build a responsive course tracker in React. Style it with Tailwind, use Lucide React for labeled controls, persist progress through an API, then test and deploy it.'
  return practicalExamples[slug]
}

const lessonDiagram = (title: string, focus: string) => {
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  const heading = escapeXml(title.length > 48 ? `${title.slice(0, 45)}…` : title)
  const detail = escapeXml(focus.length > 102 ? `${focus.slice(0, 99)}…` : focus)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="330" viewBox="0 0 800 330"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#eef8ff"/><stop offset="1" stop-color="#f3efff"/></linearGradient><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L7 3 z" fill="#6584a5"/></marker></defs><rect width="800" height="330" rx="28" fill="url(#bg)"/><text x="44" y="58" font-family="Arial,sans-serif" font-size="15" font-weight="700" letter-spacing="2" fill="#55718c">LESSON VISUAL GUIDE</text><text x="44" y="105" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="#183858">${heading}</text><rect x="44" y="134" width="712" height="86" rx="16" fill="#fff" stroke="#d7e4f0"/><text x="68" y="169" font-family="Arial,sans-serif" font-size="17" fill="#38526c">${detail}</text><rect x="44" y="252" width="196" height="48" rx="14" fill="#dff5ed"/><rect x="302" y="252" width="196" height="48" rx="14" fill="#e4edff"/><rect x="560" y="252" width="196" height="48" rx="14" fill="#fff0dd"/><text x="142" y="282" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#275947">Understand</text><text x="400" y="282" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#344f7c">Apply</text><text x="658" y="282" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" fill="#80572a">Check</text><path d="M248 276h43M506 276h43" stroke="#6584a5" stroke-width="3" marker-end="url(#arrow)"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const makeLessons = (slug: string, courseTitle: string, curriculum: LevelCurriculum[]) => {
  let lessonIndex = 0
  return curriculum.flatMap(({ level, lessons }) => lessons.map(({ title, focus }, index) => {
  const example = lessonExample(slug, title, lessonIndex++)
  const subtopics = focus.split(/,|;| then | and /i).map((part) => part.trim()).filter((part) => part.length > 12).slice(0, 4)
  const subtopicNotes = subtopics.map((part, subtopicIndex) => `${part}\n${subtopicIndex === 0
    ? `Start by making this idea concrete. Identify what information or materials you need, what decision you are trying to make, and what a successful result would look like. This prevents you from jumping into steps before you understand the task.`
    : subtopicIndex === 1
      ? `Next, apply the idea deliberately. Write down the choice you made and why it fits the situation. A useful method should be repeatable: another learner with the same information should be able to follow your reasoning and reach a comparable result.`
      : `Finally, inspect the result instead of assuming the method worked. Compare it with your success criteria, note any assumptions, and look for a case where the approach may fail. If something is wrong, change one factor at a time so you can identify the cause.`}`).join('\n\n')
  const exercise = `Exercise: apply the worked example to your ${courseTitle} project. Change one important detail, predict what will happen, try it, then explain any difference between your prediction and result.`
  const checkpoint = `Checkpoint: explain the main idea in your own words. What evidence would tell you that your approach worked, and what would you change if it failed?`
  const introduction = `In this lesson, you will learn how to ${focus.charAt(0).toLowerCase()}${focus.slice(1)}. The goal is not to memorize a definition: it is to understand when this idea is useful, how to apply it, and how to judge the result. Keep one real task from your ${courseTitle} work in mind as you read.`
  const application = `A reliable workflow has three parts. First, describe the situation and the outcome you need. Then choose a method that fits the available information and constraints. After applying it, review the result against your original goal. This last step matters because a result can look convincing while still being incomplete, inaccurate, or unsuitable for its audience.`
  const commonMistake = `A common mistake is to treat the first answer or attempt as proof that the task is finished. Ask what evidence supports the result, which assumptions it depends on, and who could be affected if it is wrong. When the evidence is weak, make the uncertainty visible and gather better information before making a stronger claim.`
  return {
    title,
    level,
    summary: `${level} lesson: ${focus}`,
    content: `What you will learn\n${introduction}\n\nCore idea\n${focus} This means connecting the concept to a specific goal rather than applying it as a rule without context. Consider what you already know, what is still uncertain, and what decision this lesson should help you make.\n\nBreak it into subtopics\n${subtopicNotes || `${title}\nBegin by naming the task and the result you need. Work through one step at a time, explain why each step is appropriate, then check whether the outcome meets the goal.`}\n\nWorked example\n${example} Notice how the example makes a decision, gives a reason for that decision, and leaves room to check the result. Try to explain each step in your own words; that is a stronger signal of understanding than recognizing the example when you see it again.\n\nCommon mistake and how to avoid it\n${commonMistake}\n\nPut the idea into practice\n${application} Use the practice task below to make your own version. Start with a small, observable outcome, record what you tried, and compare the result with your prediction.\n\nKey takeaways\nYou should now be able to describe ${title.toLowerCase()}, apply it to a practical situation, and explain how you would check your work. If you cannot yet explain why a step is needed, return to that subtopic and work through the example slowly.`,
    duration: `${10 + (index % 3) * 2} min`,
    practice: exercise,
    checkpoint,
    illustration: lessonDiagram(title, focus),
    imageAlt: `${title}: visual summary of the lesson idea and learning steps`,
  }
  }))
}

const coursePriceNgnBySlug: Record<string, number> = {
  'ai-foundations': 50000,
  'creative-writing': 30000,
  'personal-finance': 35000,
  'web-development': 50000,
  'study-smarter': 30000,
  'design-thinking': 55000,
  'cybersecurity-basics': 70000,
  'coding-robotics': 50000,
  'game-development': 55000,
  'data-analysis': 45000,
  trading: 70000,
  'web-design': 30000,
}

const course = (details: Omit<CourseSeed, 'lessons' | 'chapters' | 'priceNgn'>, curriculum: LevelCurriculum[]): CourseSeed => {
  const levelExtras: Record<CourseLevel, LessonTopic[]> = {
    Beginner: [
      { title: 'Build a subject vocabulary', focus: 'Define the key terms in this field and connect each term to a practical example.' },
      { title: 'Choose and use the right tools', focus: 'Identify the basic tools for a beginner task, set them up safely, and explain what each one does.' },
      { title: 'Follow a repeatable workflow', focus: 'Break a small task into ordered steps, record decisions, and make the result easy to repeat.' },
      { title: 'Read examples and spot patterns', focus: 'Compare two worked examples, identify what they share, and notice where context changes the approach.' },
      { title: 'Avoid common beginner mistakes', focus: 'Recognize frequent errors, explain why they happen, and use a short checklist to prevent them.' },
      { title: 'Explain your first small project', focus: 'Show a finished beginner project, describe the choices you made, and identify one next improvement.' },
    ],
    Intermediate: [
      { title: 'Combine methods to solve a larger task', focus: 'Combine foundational methods in a multi-step task and explain why the order matters.' },
      { title: 'Work with imperfect information', focus: 'Check missing, inconsistent, or uncertain information before relying on a result.' },
      { title: 'Compare approaches with evidence', focus: 'Use clear criteria and evidence to compare two valid approaches to the same problem.' },
      { title: 'Document decisions and assumptions', focus: 'Record assumptions, constraints, and decisions so another person can understand your work.' },
      { title: 'Review quality and correct errors', focus: 'Inspect an intermediate result, trace an error to its cause, and verify a correction.' },
      { title: 'Communicate a useful recommendation', focus: 'Summarize findings for a specific audience and connect each recommendation to supporting evidence.' },
    ],
    Expert: [
      { title: 'Plan a complete end-to-end solution', focus: 'Translate a real need into requirements, milestones, success measures, and a workable delivery plan.' },
      { title: 'Assess risk, ethics, and responsible practice', focus: 'Identify who could be affected, assess likely harms, and choose safeguards appropriate to the task.' },
      { title: 'Improve reliability through testing', focus: 'Design repeatable checks for normal cases, edge cases, and failures, then use the results to improve quality.' },
      { title: 'Measure outcomes and refine the work', focus: 'Choose meaningful outcome measures, compare them with a baseline, and prioritize the next improvement.' },
      { title: 'Present work to a professional audience', focus: 'Communicate the problem, method, evidence, limitations, and next steps with appropriate detail.' },
      { title: 'Portfolio capstone: demonstrate mastery', focus: 'Deliver a complete project, defend key decisions with evidence, and reflect on limitations and future work.' },
    ],
  }
  const cybersecurityExtras: Record<CourseLevel, LessonTopic[]> = {
    Beginner: [
      { title: 'Confidentiality, integrity, and availability', focus: 'Use the CIA triad to explain what a security control protects and how a real incident can affect each goal.' },
      { title: 'Personal data and account privacy', focus: 'Recognize sensitive personal information, share only what is needed, and review privacy settings and app permissions.' },
      { title: 'Malware types and warning signs', focus: 'Distinguish common malware behaviors and respond safely to unexpected downloads, pop-ups, and device changes.' },
      { title: 'Home router and Wi-Fi safety', focus: 'Change default router credentials, use current encryption, update firmware, and identify the correct network before connecting.' },
      { title: 'Physical security and lost devices', focus: 'Reduce risk from unattended or lost devices with screen locks, device encryption, tracking, and a reporting plan.' },
      { title: 'Create a personal security checklist', focus: 'Turn account, device, network, and backup practices into a short checklist and prioritize the highest impact improvements.' },
    ],
    Intermediate: [
      { title: 'IP addresses, DNS, and common ports', focus: 'Explain how a browser uses name resolution and network connections, and identify why exposed services should be limited.' },
      { title: 'Network boundaries and segmentation', focus: 'Use simple network diagrams to show trusted and untrusted zones and limit unnecessary paths between them.' },
      { title: 'Encryption in transit and at rest', focus: 'Compare protection for stored data and network traffic and identify what encryption does not protect by itself.' },
      { title: 'Least privilege and access reviews', focus: 'Give each account only the access needed for its task and review permissions when roles or devices change.' },
      { title: 'Patch and vulnerability management', focus: 'Inventory software, prioritize known weaknesses by exposure and impact, and verify updates without disrupting essential work.' },
      { title: 'Preserve evidence during an incident', focus: 'Record a timeline, retain relevant logs, and avoid actions that destroy evidence while containing an account or device compromise.' },
    ],
    Expert: [
      { title: 'Threat modeling with trust boundaries', focus: 'Map assets, actors, entry points, data flows, and trust boundaries, then prioritize plausible abuse cases.' },
      { title: 'Web application security risks', focus: 'Review input validation, access control, injection, session handling, and secure error behavior in an authorized test application.' },
      { title: 'Vulnerability assessment and remediation', focus: 'Scope an authorized assessment, rank findings by likelihood and impact, and provide reproducible evidence and fixes.' },
      { title: 'Centralized logs and alert triage', focus: 'Correlate authentication and system events, distinguish useful alerts from noise, and document escalation decisions.' },
      { title: 'Incident response and recovery planning', focus: 'Prepare roles and communication steps for detection, containment, eradication, recovery, and lessons learned.' },
      { title: 'Security capstone: assess a sample system', focus: 'Deliver an authorized risk assessment with a threat model, prioritized findings, practical controls, and a plan to verify remediation.' },
    ],
  }
  const extras = details.slug === 'cybersecurity-basics' ? cybersecurityExtras : levelExtras
  const expandedCurriculum = curriculum.map(({ level, lessons }) => ({ level, lessons: [...lessons, ...extras[level]] }))
  const chapters = makeLessons(details.slug, details.title.toLowerCase(), expandedCurriculum)
  return { ...details, priceNgn: coursePriceNgnBySlug[details.slug], lessons: chapters.length, chapters }
}

export const courseSeeds: CourseSeed[] = [
  course({ slug: 'ai-foundations', title: 'AI from the ground up', category: 'AI-Foundations', level: 'Beginner', duration: '8 hours', emoji: '\u{1F916}', accent: 'course-blue', image: '/course-art/ai.svg', imageAlt: 'Artificial intelligence neural network illustration', referencePriceNgn: 35000, description: 'Build a practical understanding of artificial intelligence, machine learning, generative AI, evaluation, and responsible use.' }, [
    { level: 'Beginner', lessons: [{ title: 'AI, automation, and everyday examples', focus: 'Recognize what AI can and cannot do, and distinguish prediction from ordinary automation.' }, { title: 'Data, patterns, and machine learning', focus: 'See how examples become patterns in a model and why the quality of the data matters.' }, { title: 'Training, testing, and model mistakes', focus: 'Understand training data, test data, overfitting, and why a confident answer can still be wrong.' }, { title: 'Write useful prompts and check answers', focus: 'Give an AI tool a clear goal, relevant context, constraints, and a way to verify its output.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Supervised, unsupervised, and generative AI', focus: 'Compare common learning approaches and choose examples that fit each one.' }, { title: 'Evaluate quality, bias, and reliability', focus: 'Use simple test cases, representative data, and error analysis to assess model behavior.' }, { title: 'Build a grounded AI workflow', focus: 'Combine prompts with trusted reference material and verify claims against their sources.' }, { title: 'Privacy and safe AI use', focus: 'Recognize sensitive data, copyright concerns, and appropriate human review.' }] },
    { level: 'Expert', lessons: [{ title: 'Design an AI solution for a real problem', focus: 'Define users, success measures, constraints, and where AI adds value.' }, { title: 'Create an evaluation set and guardrails', focus: 'Test edge cases and define how the product handles uncertainty and unsafe outputs.' }, { title: 'Plan deployment, monitoring, and iteration', focus: 'Track quality after launch and decide when to improve, roll back, or request human input.' }, { title: 'AI capstone: prototype and defend your choices', focus: 'Present a working concept, evaluation results, limitations, and a responsible-use plan.' }] },
  ]),
  course({ slug: 'creative-writing', title: 'Write with confidence', category: 'Creative-Writing', level: 'Beginner', duration: '7 hours', emoji: '\u{1F4DD}', accent: 'course-peach', image: '/course-art/writing.svg', imageAlt: 'Open writing journal and pencil illustration', referencePriceNgn: 20000, description: 'Develop a writing practice, shape compelling stories, revise with intention, and prepare work for readers.' }, [
    { level: 'Beginner', lessons: [{ title: 'Find a voice and a clear point', focus: 'Choose a reader, purpose, and tone before drafting.' }, { title: 'Build a strong paragraph', focus: 'Use a central idea, specific details, and transitions to guide a reader.' }, { title: 'Create characters, setting, and conflict', focus: 'Give a story a character with a goal, a vivid place, and a meaningful obstacle.' }, { title: 'Draft without getting stuck', focus: 'Turn an outline or prompt into a complete first draft without editing every sentence.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Structure a story with rising tension', focus: 'Arrange scenes so choices and consequences move the story forward.' }, { title: 'Use dialogue and point of view', focus: 'Make character voices distinct and control what the reader knows.' }, { title: 'Use imagery, rhythm, and precise language', focus: 'Replace vague wording with concrete details that fit the mood.' }, { title: 'Revise for clarity and pacing', focus: 'Edit structure first, then sentences, and use feedback to find confusing sections.' }] },
    { level: 'Expert', lessons: [{ title: 'Develop a distinctive narrative voice', focus: 'Make deliberate choices about tone, perspective, and style across a longer piece.' }, { title: 'Edit for audience and publication', focus: 'Prepare a polished manuscript with a consistent structure and clean copy.' }, { title: 'Give and apply workshop feedback', focus: 'Separate a reader’s experience from a proposed fix and decide what strengthens the work.' }, { title: 'Writing capstone: complete and present a portfolio piece', focus: 'Share a revised work and explain the choices that shaped its final form.' }] },
  ]),
  course({ slug: 'personal-finance', title: 'Money basics that matter', category: 'Personal-Finance', level: 'Beginner', duration: '6 hours', emoji: '\u{1F4B0}', accent: 'course-green', image: '/course-art/finance.svg', imageAlt: 'Budget chart and coin illustration', referencePriceNgn: 10000, description: 'Create a realistic budget, build savings habits, understand credit and risk, and plan toward financial goals.' }, [
    { level: 'Beginner', lessons: [{ title: 'Map income, expenses, and cash flow', focus: 'Track what comes in and goes out using clear spending categories.' }, { title: 'Build a flexible monthly budget', focus: 'Set spending limits that reflect real needs and leave room for unexpected costs.' }, { title: 'Set a savings goal and emergency fund', focus: 'Choose a target, timeline, and repeatable contribution.' }, { title: 'Compare needs, wants, and trade-offs', focus: 'Make spending choices by considering opportunity cost and personal priorities.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Understand interest, debt, and repayment', focus: 'Compare borrowing costs and make a practical repayment plan.' }, { title: 'Read credit and loan terms', focus: 'Identify rates, fees, minimum payments, and risks before accepting an offer.' }, { title: 'Explore saving and investing basics', focus: 'Compare risk, return, time horizon, and diversification at a beginner level.' }, { title: 'Plan for irregular income and expenses', focus: 'Build a cash buffer and plan for annual bills or changing income.' }] },
    { level: 'Expert', lessons: [{ title: 'Build a multi-goal financial plan', focus: 'Prioritize emergency savings, debt, and longer-term goals with a realistic timeline.' }, { title: 'Stress-test a budget and financial decisions', focus: 'Model income changes and unexpected expenses before they happen.' }, { title: 'Spot financial scams and protect accounts', focus: 'Verify requests, protect credentials, and understand common fraud tactics.' }, { title: 'Finance capstone: present a one-year money plan', focus: 'Create a clear plan with assumptions, monthly actions, and measures to review.' }] },
  ]),
  course({ slug: 'web-development', title: 'Build your first website', category: 'Web-Development', level: 'Beginner', duration: '18 hours', emoji: '\u{1F4BB}', accent: 'course-purple', image: '/course-art/web.svg', imageAlt: 'Web development code editor illustration', referencePriceNgn: 30000, description: 'Progress from web fundamentals through React, Tailwind CSS, Lucide React, APIs, testing, accessibility, and deployment.' }, [
    { level: 'Beginner', lessons: [
      { title: 'How browsers, URLs, DNS, and servers work', focus: 'Trace a page request from entering a URL through the browser rendering a response.' },
      { title: 'HTML structure and semantic elements', focus: 'Build accessible page structure with headings, links, forms, lists, and landmarks.' },
      { title: 'CSS selectors, box model, and layout', focus: 'Style elements and use flexbox and grid to create reliable page layouts.' },
      { title: 'Responsive design for phones and desktops', focus: 'Use fluid sizing and breakpoints, then test a page at different viewport widths.' },
      { title: 'JavaScript values, conditions, functions, and arrays', focus: 'Write small programs that transform data and respond to user choices.' },
      { title: 'DOM events, forms, and browser debugging', focus: 'Handle a form event, validate user input, and debug errors in developer tools.' },
    ] },
    { level: 'Intermediate', lessons: [
      { title: 'React components and JSX', focus: 'Split a page into reusable components and understand how JSX maps to UI.' },
      { title: 'Props, lists, keys, and component composition', focus: 'Pass data into components, render collections with stable keys, and compose layouts.' },
      { title: 'State, events, and controlled forms', focus: 'Use React state to make interactive interfaces and keep form values predictable.' },
      { title: 'Hooks and effects for real interfaces', focus: 'Use useState and useEffect appropriately, including cleanup and dependency rules.' },
      { title: 'Tailwind CSS utilities and responsive variants', focus: 'Style React components with utility classes, breakpoints, hover, and focus states.' },
      { title: 'Tailwind themes, reusable patterns, and accessibility', focus: 'Create consistent design tokens and ensure contrast, focus visibility, and readable layouts.' },
      { title: 'Lucide React icons and accessible controls', focus: 'Install and use lucide-react icons with labels, sizing, and accessible button behavior.' },
      { title: 'Routing and multi-page app structure', focus: 'Organize screens, navigation, and route-level loading or not-found states.' },
    ] },
    { level: 'Expert', lessons: [
      { title: 'Connect React apps to REST APIs', focus: 'Fetch and submit data with loading, empty, success, and error states.' },
      { title: 'Authentication, protected pages, and environment config', focus: 'Keep secrets on the server and protect routes and API requests.' },
      { title: 'TypeScript types for components and API data', focus: 'Model props and responses, narrow unknown input, and catch invalid states early.' },
      { title: 'Performance, state boundaries, and maintainability', focus: 'Keep state close to where it is used and avoid unnecessary expensive rendering.' },
      { title: 'Test behavior and troubleshoot production builds', focus: 'Verify user flows, read build errors, and diagnose browser and network failures.' },
      { title: 'Security, accessibility, and production readiness', focus: 'Review forms, links, keyboard access, dependency updates, and deployment configuration.' },
      { title: 'Web development capstone: build and deploy a product', focus: 'Plan, implement, test, and deploy a responsive React application with Tailwind and Lucide icons.' },
    ] },
  ]),
  course({ slug: 'study-smarter', title: 'Study smarter, not longer', category: 'Study-Smarter', level: 'Beginner', duration: '5 hours', emoji: '\u{1F4DA}', accent: 'course-yellow', image: '/course-art/study.svg', imageAlt: 'Open book and study notes illustration', referencePriceNgn: 20000, description: 'Build a sustainable learning routine using focus, retrieval practice, spaced review, and reflection.' }, [
    { level: 'Beginner', lessons: [{ title: 'Set a specific learning goal', focus: 'Turn a broad subject into a measurable skill and a short study plan.' }, { title: 'Design a focused study session', focus: 'Reduce distractions and use a clear start, work, and break routine.' }, { title: 'Use active recall instead of rereading', focus: 'Retrieve ideas from memory and check them against reliable notes.' }, { title: 'Capture notes that help you think', focus: 'Summarize, question, and connect ideas instead of copying every sentence.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Space review over time', focus: 'Schedule repeated recall before information is forgotten.' }, { title: 'Interleave practice and choose examples', focus: 'Mix problem types to improve choosing the right approach.' }, { title: 'Use feedback to find knowledge gaps', focus: 'Turn incorrect answers into targeted review prompts.' }, { title: 'Plan projects with milestones', focus: 'Break a large learning goal into checkpoints and weekly actions.' }] },
    { level: 'Expert', lessons: [{ title: 'Teach a concept and reveal gaps', focus: 'Explain a complex idea simply, then identify where your explanation breaks down.' }, { title: 'Build a personal review system', focus: 'Combine recall, spaced review, and progress tracking without overloading your schedule.' }, { title: 'Adapt your method to different subjects', focus: 'Choose suitable practice for facts, concepts, procedures, and creative work.' }, { title: 'Learning capstone: run a four-week study cycle', focus: 'Set a goal, collect evidence of progress, reflect, and adjust the next cycle.' }] },
  ]),
  course({ slug: 'design-thinking', title: 'Think like a designer', category: 'Design-Thinking', level: 'Beginner', duration: '7 hours', emoji: '\u{1F3A8}', accent: 'course-coral', image: '/course-art/design.svg', imageAlt: 'Design thinking light bulb illustration', referencePriceNgn: 179900, description: 'Research real needs, generate ideas, prototype solutions, and validate your design with users.' }, [
    { level: 'Beginner', lessons: [{ title: 'Observe a real user problem', focus: 'Notice user goals and friction without jumping to a solution.' }, { title: 'Write a clear problem statement', focus: 'Frame a specific need that leaves room for more than one solution.' }, { title: 'Generate and compare ideas', focus: 'Create varied options before selecting ideas against clear criteria.' }, { title: 'Sketch a low-fidelity prototype', focus: 'Make an inexpensive model that helps someone react to the idea.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Plan useful user interviews', focus: 'Ask open questions and avoid leading people toward the answer you expect.' }, { title: 'Map a user journey and find friction', focus: 'Show the steps, feelings, and pain points in an end-to-end task.' }, { title: 'Test a prototype and capture evidence', focus: 'Give users a task, observe what happens, and separate evidence from assumptions.' }, { title: 'Iterate using accessibility and inclusion', focus: 'Include varied needs and test keyboard, readability, and interaction choices.' }] },
    { level: 'Expert', lessons: [{ title: 'Prioritize research insights', focus: 'Synthesize multiple observations into patterns and design opportunities.' }, { title: 'Measure usability and product outcomes', focus: 'Choose measures that reflect task success, effort, and user confidence.' }, { title: 'Facilitate a cross-functional design review', focus: 'Present evidence, surface trade-offs, and agree on the next experiment.' }, { title: 'Design capstone: prototype and validate a solution', focus: 'Show the research, decisions, tested prototype, and next iteration plan.' }] },
  ]),
  course({ slug: 'cybersecurity-basics', title: 'Cybersecurity foundations', category: 'CyberSecurity', level: 'Beginner', duration: '8 hours', emoji: '\u{1F512}', accent: 'course-cyber', image: '/course-art/cyber.svg', imageAlt: 'Cybersecurity shield and lock illustration', referencePriceNgn: 200000, description: 'Protect accounts and devices, recognize attacks, understand networks, and build a practical security plan.' }, [
    { level: 'Beginner', lessons: [{ title: 'Threats, vulnerabilities, and risk', focus: 'Understand how a threat can exploit a weakness and affect something valuable.' }, { title: 'Passwords, passkeys, and multi-factor authentication', focus: 'Protect accounts with unique credentials and a second verification factor.' }, { title: 'Phishing, scams, and social engineering', focus: 'Check sender details, links, urgency, and unexpected requests before responding.' }, { title: 'Device updates, backups, and privacy settings', focus: 'Reduce common device risks and recover from loss or accidental deletion.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Networks, Wi-Fi, and secure connections', focus: 'Understand routers, public Wi-Fi risks, HTTPS, and safer connection choices.' }, { title: 'Permissions, encryption, and data protection', focus: 'Limit access to information and understand encryption in everyday use.' }, { title: 'Malware, downloads, and safe browsing', focus: 'Recognize risky files, extensions, and browser warnings.' }, { title: 'Incident response for a compromised account', focus: 'Contain access, reset credentials safely, and preserve useful evidence.' }] },
    { level: 'Expert', lessons: [{ title: 'Model threats for a small web application', focus: 'Identify assets, entry points, trust boundaries, and likely abuse cases.' }, { title: 'Secure authentication and API access', focus: 'Apply least privilege, server-side secret storage, and robust authorization checks.' }, { title: 'Read logs and build a response checklist', focus: 'Spot suspicious patterns and prioritize containment, communication, and recovery.' }, { title: 'Security capstone: assess and improve a system', focus: 'Document risks, recommend controls, and explain how you would verify the fixes.' }] },
  ]),
  course({ slug: 'coding-robotics', title: 'Coding & robotics', category: 'Coding & Robotics', level: 'Beginner', duration: '12 hours', emoji: '\u{1F916}', accent: 'course-robot', image: '/course-art/robotics.svg', imageAlt: 'Educational robot illustration', referencePriceNgn: 100000, description: 'Program devices, use sensors and motors, debug behavior, and build a robot that responds to its environment.' }, [
    { level: 'Beginner', lessons: [{ title: 'Instructions, sequences, and simple programs', focus: 'Break a task into precise steps a computer or robot can follow.' }, { title: 'Variables, conditions, and loops', focus: 'Store values, make decisions, and repeat actions without duplicating instructions.' }, { title: 'Inputs, outputs, sensors, and actuators', focus: 'Connect sensor readings to actions such as lights, movement, or sound.' }, { title: 'Build and test a first robot routine', focus: 'Write a short behavior and test it against a repeatable scenario.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Read noisy sensor data', focus: 'Sample, compare, and smooth readings before choosing a response.' }, { title: 'Control motors and coordinate movement', focus: 'Use direction, speed, timing, and calibration to make movement predictable.' }, { title: 'Use functions and modular robot behaviors', focus: 'Separate sensing, decision-making, and movement into reusable code.' }, { title: 'Debug timing and hardware problems', focus: 'Use logs and small tests to distinguish code faults from wiring or power issues.' }] },
    { level: 'Expert', lessons: [{ title: 'Design a robot state machine', focus: 'Model operating states and transitions to handle complex behavior clearly.' }, { title: 'Combine sensors for safer navigation', focus: 'Use multiple inputs and fallback rules when readings conflict.' }, { title: 'Test reliability and handle failures', focus: 'Create repeatable test cases and define safe behavior when hardware fails.' }, { title: 'Robotics capstone: build an autonomous task', focus: 'Plan, program, test, and demonstrate a robot that completes a real-world task.' }] },
  ]),
  course({ slug: 'game-development', title: 'Game development basics', category: 'Game-Development', level: 'Beginner', duration: '10 hours', emoji: '\u{1F3AE}', accent: 'course-game', image: '/course-art/game.svg', imageAlt: 'Game controller illustration', referencePriceNgn: 149000, description: 'Design playable mechanics, build a game loop, add feedback and levels, then test and publish a small game.' }, [
    { level: 'Beginner', lessons: [{ title: 'Game ideas, rules, and player goals', focus: 'Describe what a player does, why they do it, and how success is measured.' }, { title: 'Coordinates, sprites, and scenes', focus: 'Place and organize game objects in a 2D world.' }, { title: 'Input, movement, and collision', focus: 'Connect player controls to movement and detect contact with other objects.' }, { title: 'Score, feedback, and a playable loop', focus: 'Give clear feedback and repeat the core action that makes a game engaging.' }] },
    { level: 'Intermediate', lessons: [{ title: 'Game loops, timing, and physics', focus: 'Update movement consistently and use simple physics without frame-rate surprises.' }, { title: 'States, menus, and level transitions', focus: 'Manage title, play, pause, and game-over states cleanly.' }, { title: 'Sound, animation, and visual feedback', focus: 'Use feedback to make player actions clear and satisfying.' }, { title: 'Balance difficulty through playtesting', focus: 'Observe players and adjust challenge based on evidence.' }] },
    { level: 'Expert', lessons: [{ title: 'Structure a larger game project', focus: 'Separate systems and content so a project stays maintainable as it grows.' }, { title: 'Optimize assets and runtime performance', focus: 'Find expensive work and reduce loading or rendering costs.' }, { title: 'Accessibility, input options, and save data', focus: 'Support readable settings, flexible controls, and reliable player progress.' }, { title: 'Game capstone: publish and present a complete game', focus: 'Package a polished game, test it on target devices, and explain the design choices.' }] },
  ]),
  course({ slug: 'data-analysis', title: 'Data analysis essentials', category: 'Data-Analysis', level: 'Beginner', duration: '18 hours', emoji: '\u{1F4CA}', accent: 'course-blue', image: '/course-art/finance.svg', imageAlt: 'Data chart and analysis illustration', referencePriceNgn: 99500, description: 'Turn practical questions into trustworthy insights with spreadsheets, SQL, data cleaning, analysis, and clear visual reports.' }, [
    { level: 'Beginner', lessons: [
      { title: 'Ask useful questions of data', focus: 'Turn a broad business question into a specific question, identify who needs the answer, and define what evidence could answer it.' },
      { title: 'Data types, tables, and measures', focus: 'Distinguish categories, dates, text, and numeric measures, then read rows and columns without confusing identifiers with quantities.' },
      { title: 'Collect and inspect a dataset', focus: 'Load a small spreadsheet, inspect its size and columns, and check that the data covers the question you plan to answer.' },
      { title: 'Spreadsheet formulas and summaries', focus: 'Use formulas, sorting, filters, and pivot tables to calculate and summarize information without changing the source data.' },
    ] },
    { level: 'Intermediate', lessons: [
      { title: 'Clean missing and inconsistent values', focus: 'Profile missing values, duplicates, inconsistent labels, and incorrect types, then document justified corrections.' },
      { title: 'Use SQL to select and join data', focus: 'Filter, group, aggregate, and join related tables while checking that joins do not unexpectedly multiply records.' },
      { title: 'Explore distributions and outliers', focus: 'Use counts, ranges, medians, and visual summaries to find patterns and investigate unusual observations.' },
      { title: 'Choose charts that answer the question', focus: 'Select comparisons, trends, or distributions that fit the data and label charts so readers can interpret them accurately.' },
    ] },
    { level: 'Expert', lessons: [
      { title: 'Design a reliable analysis workflow', focus: 'Plan reproducible steps from source data through cleaning, calculations, validation, and reporting.' },
      { title: 'Model data for clear reporting', focus: 'Relate fact and dimension tables, define measures, and prevent ambiguous relationships from distorting results.' },
      { title: 'Test assumptions and explain uncertainty', focus: 'Check definitions, sample limits, confounders, and uncertainty before making a claim from an observed pattern.' },
      { title: 'Data analysis capstone: build a decision report', focus: 'Answer a real question with a cleaned dataset, transparent method, useful visualizations, limitations, and an actionable recommendation.' },
    ] },
  ]),
  course({ slug: 'trading', title: 'Trading and market literacy', category: 'Trading', level: 'Beginner', duration: '16 hours', emoji: '\u{1F4C8}', accent: 'course-green', image: '/course-art/finance.svg', imageAlt: 'Market chart and risk illustration', referencePriceNgn: 200000, description: 'Learn how markets and orders work, read charts critically, manage risk, and practice with a documented simulation before considering real money.' }, [
    { level: 'Beginner', lessons: [
      { title: 'Markets, assets, and trading horizons', focus: 'Compare common asset classes, market participants, and trading horizons, and distinguish trading from long-term investing.' },
      { title: 'Price, liquidity, and market sessions', focus: 'Understand how buyers and sellers form prices, what liquidity means, and why spreads and trading hours matter.' },
      { title: 'Market, limit, and stop orders', focus: 'Compare common order types, execution trade-offs, and the possibility of slippage or an order not filling.' },
      { title: 'Candlesticks, trends, and chart scales', focus: 'Read open, high, low, and close on a candlestick and avoid treating a chart pattern as a guaranteed forecast.' },
    ] },
    { level: 'Intermediate', lessons: [
      { title: 'Position sizing and risk per trade', focus: 'Set a hypothetical maximum loss before entering a position and calculate size from the stop distance.' },
      { title: 'Stops, gaps, and risk to reward', focus: 'Plan exits while recognizing that stop orders can fill at worse prices during gaps or fast markets.' },
      { title: 'Build and test a written strategy', focus: 'Define entry, exit, and risk rules, then test them on historical data while avoiding look-ahead bias.' },
      { title: 'Trading journal and performance measures', focus: 'Record each simulated trade, fees, rule adherence, and outcomes to evaluate process rather than a lucky result.' },
    ] },
    { level: 'Expert', lessons: [
      { title: 'Backtest with realistic assumptions', focus: 'Include fees, spreads, slippage, survivorship concerns, and out-of-sample evaluation in a strategy test.' },
      { title: 'Portfolio exposure and correlated risk', focus: 'Assess how positions can move together and limit total exposure to a single risk factor.' },
      { title: 'Behavior, drawdowns, and trading rules', focus: 'Set objective limits for losses and breaks, identify emotional decision patterns, and follow a written review process.' },
      { title: 'Trading capstone: paper trade and review', focus: 'Run a time-limited simulation with a written plan, risk limits, journal, and evidence-based review; do not treat simulated returns as a promise of real results.' },
    ] },
  ]),
  course({ slug: 'web-design', title: 'Web design foundations', category: 'Web-Design', level: 'Beginner', duration: '16 hours', emoji: '\u{1F3A8}', accent: 'course-coral', image: '/course-art/design.svg', imageAlt: 'Web design and layout illustration', referencePriceNgn: 25000, description: 'Plan accessible, responsive web experiences through visual hierarchy, layout, typography, color, prototyping, and usability testing.' }, [
    { level: 'Beginner', lessons: [
      { title: 'Understand users and design goals', focus: 'Identify the audience, their task, and the content a page must make easy to find.' },
      { title: 'Visual hierarchy and page structure', focus: 'Use size, spacing, contrast, and grouping to show what matters first and how sections relate.' },
      { title: 'Typography and readable content', focus: 'Choose type scale, line length, and spacing that support comfortable reading on common screens.' },
      { title: 'Color, contrast, and interface meaning', focus: 'Use a purposeful palette, maintain readable contrast, and never rely on color alone to communicate status.' },
    ] },
    { level: 'Intermediate', lessons: [
      { title: 'Grid, spacing, and responsive layouts', focus: 'Create a consistent spacing system and adapt columns and content order for narrow and wide viewports.' },
      { title: 'Navigation, forms, and clear feedback', focus: 'Design predictable navigation and forms with visible labels, helpful errors, and confirmation states.' },
      { title: 'Accessibility for keyboard and screen readers', focus: 'Plan semantic structure, visible focus, descriptive controls, and alternatives for non-text content.' },
      { title: 'Create and test a clickable prototype', focus: 'Prototype the main user flow and observe people using it before polishing visual details.' },
    ] },
    { level: 'Expert', lessons: [
      { title: 'Create a reusable visual design system', focus: 'Define tokens, components, states, and usage rules so related pages stay consistent and maintainable.' },
      { title: 'Design for responsive and inclusive use', focus: 'Check layouts across viewports, zoom, input methods, language length, and varied access needs.' },
      { title: 'Evaluate usability and iterate', focus: 'Set task-based success criteria, observe tests, prioritize evidence, and verify design changes.' },
      { title: 'Web design capstone: prototype a complete site', focus: 'Present a tested multi-page design with responsive states, accessible interactions, design rationale, and a prioritized improvement plan.' },
    ] },
  ]),
]
