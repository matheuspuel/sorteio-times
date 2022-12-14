import { Id } from 'src/utils/Entity'
import { A, D, flow, Num, Ord, pipe, Show, Str } from 'src/utils/fp-ts'
import { avg } from 'src/utils/Number'
import { Position, PositionAbrvShow, PositionOrd } from './Position'

export const RatingList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type Rating = typeof RatingList[number]

export const RatingFromNumber: D.Decoder<number, Rating> = D.fromRefinement(
  (v): v is Rating => true,
  'Rating',
)

export const Rating: D.Decoder<unknown, Rating> = pipe(
  D.number,
  D.compose(RatingFromNumber),
)

export type Player = {
  id: Id
  name: string
  rating: Rating
  position: Position
  active: boolean
}

export const Player: D.Decoder<unknown, Player> = D.struct({
  id: Id,
  name: D.string,
  rating: Rating,
  position: Position,
  active: D.boolean,
})

export const PlayerIsActive = (p: Player) => p.active

export const PlayerPositionOrd: Ord<Player> = pipe(
  PositionOrd,
  Ord.contramap(p => p.position),
)

export const PlayerNameOrd: Ord<Player> = pipe(
  Str.Ord,
  Ord.contramap(p => p.name),
)

export const PlayerRatingOrd: Ord<Player> = pipe(
  Num.Ord,
  Ord.contramap(p => p.rating),
)

export const PlayerShow: Show.Show<Player> = {
  show: p => `${p.rating} - ${p.name} (${PositionAbrvShow.show(p.position)})`,
}

export const PlayerListShow: Show.Show<Array<Player>> = {
  show: flow(
    A.sortBy([PlayerPositionOrd, Ord.reverse(PlayerRatingOrd), PlayerNameOrd]),
    A.map(PlayerShow.show),
    A.intercalate(Str.Monoid)('\n'),
  ),
}

export const TeamListShow: Show.Show<Array<Array<Player>>> = {
  show: flow(
    A.map(PlayerListShow.show),
    A.mapWithIndex((i, t) => `Time ${i + 1}\n\n${t}`),
    A.intercalate(Str.Monoid)('\n\n'),
  ),
}

export const PlayerShowSensitive: Show.Show<Player> = {
  show: p => `${p.name} (${PositionAbrvShow.show(p.position)})`,
}

export const PlayerListShowSensitive: Show.Show<Array<Player>> = {
  show: flow(
    A.sortBy([PlayerPositionOrd, PlayerNameOrd]),
    A.map(PlayerShowSensitive.show),
    A.intercalate(Str.Monoid)('\n'),
  ),
}

export const TeamListShowSensitive: Show.Show<Array<Array<Player>>> = {
  show: flow(
    A.map(PlayerListShowSensitive.show),
    A.mapWithIndex((i, t) => `Time ${i + 1}\n\n${t}`),
    A.intercalate(Str.Monoid)('\n\n'),
  ),
}

export const getRatingTotal: (players: Array<Player>) => number = A.foldMap(
  Num.MonoidSum,
)(p => p.rating)

export const getRatingAvg: (players: Array<Player>) => number = flow(
  A.map(p => p.rating),
  avg,
)
