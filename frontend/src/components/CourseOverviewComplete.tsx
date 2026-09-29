import type { CourseCardData } from './CourseCard'

export type OverviewSection = {
  heading: string
  paragraphs: string[]
  icon: string
  imageAlt: string
  bullets?: { heading: string; text: string; icon: string }[]
}

const onlineActivities = [
  { heading: 'Search', text: 'Use a search engine or a trusted directory to find pages, explanations, products, and local services. Compare sources and check dates before relying on a result.', icon: '🔎' },
  { heading: 'Email', text: 'Send messages and files to individuals or groups. Check recipients and attachments before sending, and treat unexpected requests for passwords or payment with care.', icon: '✉️' },
  { heading: 'Social networking', text: 'Share updates, join communities, and keep in touch. Review privacy settings and think about who can see a post before publishing it.', icon: '👥' },
  { heading: 'Online learning', text: 'Follow lessons, watch demonstrations, practise a skill, and ask questions from almost anywhere. A reliable course combines explanation with hands-on practice and feedback.', icon: '📚' },
  { heading: 'Entertainment', text: 'Stream music and video, play games, read, and follow live events. Choose reputable services and manage screen time and account settings.', icon: '🎬' },
  { heading: 'E-commerce', text: 'Browse shops, compare products, and place orders online. Check the seller, total price, delivery details, and payment security before completing a purchase.', icon: '🛍️' },
]

const isInternetCourse = (title: string) => /internet|world wide web|web fundamentals/i.test(title)

export function generateCourseOverviewContent(courseTitle: string, course?: Pick<CourseCardData, 'description' | 'chapters'>): OverviewSection[] {
  const title = courseTitle.trim() || ' this subject'
  if (isInternetCourse(title)) return [
    { heading: 'The Internet', icon: '🌐', imageAlt: 'Globe representing the connected Internet', paragraphs: ['The Internet is a worldwide network of connected computers, phones, servers, and other devices. These devices communicate using shared rules called protocols. The Internet is the underlying infrastructure: it carries information between devices, wherever they are.', 'When you connect to Wi-Fi or mobile data, your device joins a network that can pass data onward to other networks. The Internet does not belong to one company; it is made of many independently operated networks that agree to exchange traffic.'] },
    { heading: 'The Web (World Wide Web)', icon: '🕸️', imageAlt: 'Linked web pages representing the World Wide Web', paragraphs: ['The World Wide Web is one service that uses the Internet. It consists of linked resources such as web pages, images, and videos, which a browser can request from a web server. The web is not the same thing as the Internet: email, online games, and file transfers can use the Internet without being web pages.', 'A URL tells the browser where a resource is and how to request it. HTML describes page structure, CSS controls presentation, and JavaScript can add interaction. Together, these technologies let people publish and explore information through links.'] },
    { heading: 'How does the internet work?', icon: '🔄', imageAlt: 'A request travelling from a device through networks to a server and back', paragraphs: ['When you enter a website address, the browser first uses the Domain Name System (DNS) to find the address of a server. The browser then sends a request across networks. Routers move small packets of data toward that destination, and the server responds with the requested page or an error.', 'The browser receives the response and turns its contents into the page you see. Encryption with HTTPS helps protect information while it travels. A slow connection, unavailable server, or incorrect address can interrupt one of these steps, which is why developers check each part when diagnosing a problem.'] },
    { heading: 'Other things you can do on the internet', icon: '🔗', imageAlt: 'People and devices communicating through the Internet', paragraphs: ['The Internet connects more than websites. People use it to send messages, make voice and video calls, store files, collaborate on documents, learn together, and control connected devices. Each activity uses different applications and services, but all depend on devices exchanging data.', 'Because information can travel widely and quickly, protect personal details, use strong account security, and check that a service is trustworthy before sharing sensitive information.'] },
    { heading: 'What Can You Do Online?', icon: '💻', imageAlt: 'Computer showing a range of online activities', paragraphs: ['Online services help people communicate, learn, find information, shop, and relax. The examples below are common activities; choose services carefully and use privacy and security settings that fit your needs.'], bullets: onlineActivities },
  ]

  const description = course?.description || `${title} brings together knowledge and practical skills that can be learned through clear explanations, guided examples, and repeated practice.`
  const lessons = course?.chapters ?? []
  const lessonTitles = lessons.slice(0, 6).map((lesson) => lesson.title)
  const topicName = title.replace(/^(introduction to|fundamentals of|basics of)\s+/i, '')
  const capabilities = lessonTitles.length ? lessonTitles : [`Understand the foundations of ${topicName}`, `Choose tools and methods for ${topicName}`, `Apply ${topicName} to a practical task`, `Review and improve your results`]
  const generatedSections: OverviewSection[] = [
    { heading: `What is ${topicName}?`, icon: '💡', imageAlt: `Illustration introducing ${topicName}`, paragraphs: [`${description} This course introduces the ideas behind ${topicName} and shows how they connect to practical decisions and tasks.`, `Begin with the key terms and the problem each idea helps solve. Understanding the purpose of a concept makes it easier to recognize when it applies and when another approach is needed.`] },
    { heading: `The foundations of ${topicName}`, icon: '🧭', imageAlt: `Foundational concepts for ${topicName}`, paragraphs: [`Every subject has a small set of foundational ideas that later skills build on. Work through them in order, connect each new term to an example, and ask what evidence would show that you understand it.`, `The course is organized into ${lessons.length || 'several'} lessons. Each lesson focuses on a step in the learning path, from the basic vocabulary through applying and reviewing what you have learned.`] },
    { heading: `How ${topicName} works`, icon: '⚙️', imageAlt: `A process diagram for learning and applying ${topicName}`, paragraphs: [`A useful way to learn ${topicName} is to move from a goal to a method, then to an observable result. Identify what you are trying to achieve, select an approach that fits the situation, and check the result against the original goal.`, `The lessons below provide examples and practice for each step. Work through them actively: make a prediction, try the method, and explain why the result did or did not meet your expectation.`] },
    { heading: `Where ${topicName} is used`, icon: '🌍', imageAlt: `Examples of ${topicName} applied to real tasks`, paragraphs: [`${topicName} becomes useful when you can apply it to a real need. The right choice depends on the context, the available tools, the people affected, and the constraints of the task.`, `Use the worked examples as starting points rather than rules to copy. Change one detail, observe what happens, and note the assumptions or limitations that affect your result.`] },
    { heading: `What can you do with ${topicName}?`, icon: '🚀', imageAlt: `Practical learning paths for ${topicName}`, paragraphs: [`By the end of the course, you will have practised the skills below. Each is a building block you can combine in a larger project.`], bullets: capabilities.map((heading, index) => ({ heading, text: lessons[index]?.summary || `Learn the main ideas, see how ${heading.toLowerCase()} works in practice, and try a small task that helps you check your understanding.`, icon: ['📖', '🧰', '🛠️', '✅', '🔍', '🎯'][index % 6] })) },
  ]
  if (/website|web development/i.test(title)) generatedSections.splice(1, 0, {
    heading: 'Introduction to the Internet', icon: '🌐', imageAlt: 'Globe representing the Internet and connected devices', paragraphs: [
      'The Internet is a worldwide network that connects computers, phones, servers, and other devices. The World Wide Web is one service that runs on this network: it gives people linked pages and media that they can open in a browser. Email, messaging, and online games also use the Internet, but they are not themselves the Web.',
      'When someone enters a web address, the browser looks up the server using DNS, sends a request across networks, and receives a response. The browser then interprets HTML, CSS, and JavaScript to display and operate the page. Understanding this journey helps a web developer troubleshoot addresses, slow requests, server errors, and page rendering.'
    ]
  })
  return generatedSections
}

export default function CourseOverviewComplete({ course }: { course: CourseCardData }) {
  const sections = generateCourseOverviewContent(course.title, course)
  return <article className="course-overview-complete">
    <header className="course-overview-intro">
      <span className="panel-kicker">COURSE GUIDE</span>
      <h2>{isInternetCourse(course.title) ? 'Confusion Between the Terms: Internet and Web' : `Explore ${course.title}`}</h2>
      <p>{course.description} Read each section in order, then use the lesson list to continue into guided practice.</p>
    </header>
    {sections.map((section, index) => <section className="overview-article-section" key={section.heading}>
      <h2>{index + 1}. {section.heading}</h2>
      {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      <div className="overview-illustration" role="img" aria-label={section.imageAlt}><span aria-hidden="true">{section.icon}</span><small>{section.imageAlt}</small></div>
      {section.bullets && <ul className="overview-activities">{section.bullets.map((item) => <li key={item.heading}>
        <h3><span role="img" aria-hidden="true">{item.icon}</span>{item.heading}</h3>
        <p>{item.text}</p>
        <div className="overview-activity-image" role="img" aria-label={`${item.heading} illustration`}><span aria-hidden="true">{item.icon}</span></div>
      </li>)}</ul>}
    </section>)}
    <aside className="course-overview-levels-inline"><h2>Your learning path</h2><p>Complete Beginner to unlock Intermediate, then complete Intermediate to unlock Expert. Finish every Expert lesson to earn your certificate. This course has {course.chapters.length} lessons.</p></aside>
  </article>
}
