import { id, wrap } from "~/utils/helpers"

export type Nullable<T> = Extract<T, null | undefined>

export const isNull = <TVal>(value: TVal): value is Extract<TVal, null> => value === null
export const isNonNull = <TVal>(value: TVal): value is Exclude<TVal, null> => value !== null
export const isUndefined = <TVal>(value: TVal): value is Extract<TVal, undefined> => value === undefined
export const isDefined = <TVal>(value: TVal): value is Exclude<TVal, undefined> => value !== undefined
export const isNullable = <TVal>(value: TVal): value is Nullable<TVal> => value === undefined || value === null
export const isNonNullable = <TVal>(value: TVal): value is NonNullable<TVal> => value !== undefined && value !== null

export const convertNullable = <TVal, TNonNullable, TNullable>(value: TVal, convNonNullable: (value: NonNullable<TVal>) => TNonNullable, convNullable: (value: Nullable<TVal>) => TNullable) =>
    isNonNullable(value) ? convNonNullable(value) : convNullable(value as Nullable<TVal>)

export const convertIfNonNullable = <TVal, TConv>(value: TVal, converter: (value: NonNullable<TVal>) => TConv) =>
    convertNullable(value, converter, id)

export const defaultIfNullable = <TVal, TDefault = NonNullable<TVal>>(value: TVal, defaultValue: TDefault) =>
    convertNullable(value, id, wrap(defaultValue))

export const throwIfNullable = <TVal>(value: TVal, errorMessage?: string) => {
    if (!isNonNullable(value))
        throw new Error(errorMessage)
    return value
}
