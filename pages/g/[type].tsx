import { useRouter } from 'next/router'
import GameScreen from '../../components/screens/Game'

const dataMap = {
  games: require('../../data/games.json'),
  tv: require('../../data/tv.json'),
  movies: require('../../data/movies.json'),
}

export default function Game() {
  const { query } = useRouter()
  const data = dataMap[query.type as string] || dataMap.movies
  return <GameScreen data={data} type={query.type as string} />
}
