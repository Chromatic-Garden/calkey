
type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n ? never : T

type WidenLiteral<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends bigint ? bigint : T extends symbol ? symbol : T

interface Set<T> {
    has(value: T | (WidenLiteral<T> & {})): boolean
}

interface ReadonlySet<T> {
    has(value: T | (WidenLiteral<T> & {})): boolean
}

interface Map<K, V> {
    has(value: K | (WidenLiteral<K> & {})): boolean
}

interface ReadonlyMap<K, V> {
    has(value: K | (WidenLiteral<K> & {})): boolean
}

interface ReadonlyArray<T> {
    includes(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): boolean;
}

interface Array<T> {
    includes(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): boolean;
}

interface Array<T> {
    filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}
  
interface ReadonlyArray<T> {
    filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}

interface ReadonlyArray<T> {
    lastIndexOf(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): number
    indexOf(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): number
}

interface Array<T> {
    lastIndexOf(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): number
    indexOf(searchElement: T | (WidenLiteral<T> & {}), fromIndex?: number): number
}

interface ArrayConstructor {
    isArray(arg: any): arg is unknown[]
}

interface JSON {
    parse(text: string, reviver?: (this: any, key: string, value: any) => any): unknown
}

interface Body {
    json(): Promise<unknown>
}
