import { id } from "~/utils/helpers"

export const keys = <const TObj extends object>(obj: TObj) =>
    Object.keys(obj) as (keyof TObj)[]

export const values = <const TObj extends object>(obj: TObj) =>
    Object.values(obj) as TObj[keyof TObj][]

export const entries = <TObj extends object>(obj: TObj) =>
    Object.entries(obj) as [keyof TObj, TObj[keyof TObj]][]

export const fromEntries = <TVal, const TKey extends PropertyKey = string>(arr: readonly (readonly [TKey, TVal])[]) =>
    Object.fromEntries(arr) as { [K in TKey]: TVal }

export const fromMappedArray = <const T, TKey extends PropertyKey, TVal>(arr: readonly T[], keyMapping: (x: T) => TKey, valMapping: (x: T) => TVal) =>
    fromEntries(arr.map(x => [keyMapping(x), valMapping(x)]))

export const fromMappedKeyArray = <const TKey extends PropertyKey, TVal>(keys: readonly TKey[], mapping: (x: TKey) => TVal) =>
    fromMappedArray(keys, id, mapping)

export const fromMappedValArray = <const TVal, TKey extends PropertyKey>(values: readonly TVal[], mapping: (x: TVal) => TKey) =>
    fromMappedArray(values, mapping, id)

export const mapKeys = <TObj extends object, TKey extends PropertyKey>(obj: TObj, mapping: (value: keyof TObj) => TKey) =>
    fromEntries(entries(obj).map(([k, v]) => [mapping(k), v]))

export const mapValues = <TObj extends object, TVal>(obj: TObj, mapping: (value: TObj[keyof TObj]) => TVal) =>
    fromEntries(entries(obj).map(([k, v]) => [k, mapping(v)]))
