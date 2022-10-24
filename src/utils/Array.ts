import { O, Option } from './fp-ts'

export const findFirstMapWithIndex =
  <A, B>(f: (index: number, a: A) => Option<B>) =>
  (as: Array<A>): Option<B> => {
    for (let i = 0; i < as.length; i++) {
      const out = f(i, as[i] as A)
      if (O.isSome(out)) {
        return out
      }
    }
    return O.none
  }
