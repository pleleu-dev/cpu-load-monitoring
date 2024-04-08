type Load = {
  average: number
  time: number
  formattedTime: string
}

type ApiLoad = {
  cpu: {
    average: number
    time: number
  }
}
export type { Load, ApiLoad }
