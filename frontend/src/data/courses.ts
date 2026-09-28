export function formatCourseCategory(category: string) {
  const normalized = category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  const label = normalized.replace(/\b\w/g, (letter) => letter.toUpperCase())
  return label.replace(/^Ai\b/, 'AI').replace(/^Cyber Security$/i, 'Cybersecurity')
}
