export const id = <T>(x: T): T => x
export const wrap = <T>(x: T) => () => x
export const consume = <T>(..._: T[]): void => {}
export const randomArrayIndex = <T>(n: T[]) => Math.floor(Math.random() * n.length)
