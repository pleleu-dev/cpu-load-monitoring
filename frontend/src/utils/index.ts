function cssValue(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property)
}

export { cssValue }
