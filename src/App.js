import React from 'react'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilValue,
  useSetRecoilState
} from 'recoil'
import './styles.css'

const ANIMALS = {
  CAT: 'cat',
  DOG: 'dog'
}

const ALL = 'all'

const animalsState = atom({
  key: 'animalsState',
  default: [
    {
      id: 1,
      name: 'Rexy',
      type: ANIMALS.DOG
    },
    {
      id: 2,
      name: 'Oscar',
      type: ANIMALS.CAT
    },
    {
      id: 3,
      name: 'Tom',
      type: ANIMALS.CAT
    }
  ]
})

const animalFilterState = atom({
  key: 'animalFilterState',
  default: ALL
})

const filteredAnimalsState = selector({
  key: 'animalListState',
  get: ({ get }) => {
    const filter = get(animalFilterState)
    const animals = get(animalsState)
    if (filter === ALL) return animals
    return animals.filter(animal => animal.type === filter)
  }
})

const icon = type => {
  if (type === ANIMALS.DOG) return '🐶'
  if (type === ANIMALS.CAT) return '🐱'
}

const Animals = () => {
  const animals = useRecoilValue(filteredAnimalsState)
  console.log(
    'render animations：',
    animals.map(a => a.name)
  )
  return (
    <div>
      <h1>Animals:</h1>
      {animals.map(animal => (
        <div key={animal.id}>
          {animal.name}, {animal.type} {icon(animal.type)}
        </div>
      ))}
    </div>
  )
}

const PickAnimal = () => {
  const setAnimalFilter = useSetRecoilState(animalFilterState)
  console.log('pick animal')
  return (
    <div className="buttons">
      <button onClick={() => setAnimalFilter(ALL)}>All</button>
      <button onClick={() => setAnimalFilter(ANIMALS.DOG)}>Dogs</button>
      <button onClick={() => setAnimalFilter(ANIMALS.CAT)}>Cats</button>
    </div>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <PickAnimal />
        <Animals />
      </div>
    </RecoilRoot>
  )
}
