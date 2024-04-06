// Mock ResponsiveContainer component from recharts.tsx:
// To avoid Recharts error: ReferenceError: ResizeObserver is not defined

import React from 'react'

export function ResponsiveContainer(props: any) {
  return (
    <div>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { width: 500, height: 500 }),
      )}
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export * from 'recharts'
