function cssValue(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property)
}

function getColors() {
  return {
    heavy: cssValue('--heavy'),
    low: cssValue('--low'),
    text: cssValue('--text'),
    dark: cssValue('--dark'),
    primary: cssValue('--primary'),
  }
}

export { getColors }
