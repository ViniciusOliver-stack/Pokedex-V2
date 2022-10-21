const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonType = document.querySelector('.pokemon_type')
const pokemonImageType = document.querySelector('.pokemon_type_image')
const pokemonImagem = document.querySelector('.pokemon_img')

const pokemonHeight = document.querySelector('.heigth .data')
const pokemonWeight = document.querySelector('.weight .data')
const pokemonAbilities = document.querySelector('.abilities .data')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('#input_search')

const statsHp = document.querySelector('.hp .data')
const statsAttack = document.querySelector('.attack .data')
const statsDefense = document.querySelector('.defense .data')
const statsSpecialAttack = document.querySelector('.special_attack .data')
const statsSpecialDefense = document.querySelector('.special_defense .data')
const statsSpeed = document.querySelector('.speed .data')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  const dataPokemon = await APIResponse.json()
  return dataPokemon
}

const renderPokemon = async pokemon => {
  pokemonLoading()
  const respPokemon = await fetchPokemon(pokemon)

  if (respPokemon) {
    const type = respPokemon['types'][0]['type']['name']
    const hp = respPokemon['stats'][0]['base_stat']
    const attack = respPokemon['stats'][1]['base_stat']
    const defense = respPokemon['stats'][2]['base_stat']
    const special_attack = respPokemon['stats'][3]['base_stat']
    const special_defense = respPokemon['stats'][4]['base_stat']
    const speed = respPokemon['stats'][5]['base_stat']

    pokemonName.innerHTML = respPokemon.name
    pokemonType.innerHTML = type
    pokemonNumber.innerHTML = `#${String(respPokemon.id).padStart(3, '0')}`
    pokemonImageType.src = `../../assets/images/icons/${type}.svg`
    pokemonImagem.src = `../../assets/images/pokemon/${respPokemon.id}.png`

    pokemonHeight.innerHTML = `${respPokemon.height} M`
    pokemonWeight.innerHTML = `${respPokemon.weight} KG`
    pokemonAbilities.innerHTML = `${respPokemon['abilities'][0]['ability']['name']}`

    document.querySelector('body').style.backgroundColor = `var(--bg-${type})`

    statsHp.innerHTML = hp
    document.querySelector('.hp .progress').value = hp

    statsAttack.innerHTML = attack
    document.querySelector('.attack .progress').value = attack

    statsDefense.innerHTML = defense
    document.querySelector('.defense .progress').value = defense

    statsSpecialAttack.innerHTML = special_attack
    document.querySelector('.special_attack .progress').value = special_attack

    statsSpecialDefense.innerHTML = special_defense
    document.querySelector('.special_defense .progress').value = special_defense

    statsSpeed.innerHTML = speed
    document.querySelector('.speed .progress').value = speed

    inputSearch.value = ''
    searchPokemon = respPokemon.id
  } else {
    pokemonImagem.style.display = 'none'
    pokemonName.innerHTML = 'Not found :c'
    pokemonNumber.innerHTML = ''
  }
}

function pokemonLoading() {
  pokemonName.innerHTML = `Loading...`
  pokemonNumber.innerHTML = `#000`
}

form.addEventListener('submit', e => {
  e = e || window.event
  e.preventDefault()

  renderPokemon(inputSearch.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

renderPokemon(searchPokemon)
