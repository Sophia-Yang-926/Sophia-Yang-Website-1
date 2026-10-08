const recipes = [
  {
    name: 'Empanadas',
    stall: 'Mexican',
    image: 'empanadas.png',
    hashtag: '#PocketFullOfYum',
    lactoseFreeTag: true,
    alt: 'Two golden empanadas on a plate with a tomato garnish',
    note: 'Filled pastries from the Mexican food stall.',
    vegetarian: false,
    heat: 'not-spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Sweet and Sour Eggplant',
    stall: 'Chinese',
    image: 'eggplant.png',
    hashtag: '#TeamSweetAndSour',
    lactoseFreeTag: true,
    alt: 'A plate of sweet and sour eggplant with rice',
    note: 'Sweet-and-sour eggplant with rice on the side.',
    vegetarian: true,
    heat: 'not-spicy',
    flavor: 'sweet-sour',
    tried: false
  },
  {
    name: 'Ramen',
    stall: 'Japanese',
    image: 'ramen.png',
    hashtag: '#SendNoodles',
    lactoseFreeTag: true,
    alt: 'A bowl of ramen topped with egg halves and a pink fish cake',
    note: 'Noodle soup from the Japanese food stall.',
    vegetarian: false,
    heat: 'not-spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Curry',
    stall: 'Indian',
    image: 'curry.png',
    hashtag: '#ILoveCurry',
    lactoseFreeTag: true,
    alt: 'Golden curry served beside a mound of rice',
    note: 'A spicy curry dish marked vegetarian-safe in the game.',
    vegetarian: true,
    heat: 'spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Mapo Tofu with Pork',
    stall: 'Chinese',
    image: 'mapotofu.png',
    hashtag: '#TofuOnFire',
    lactoseFreeTag: true,
    alt: 'Tofu cubes in a red sauce served with rice',
    note: 'Tofu and pork in a spicy sauce, served with rice.',
    vegetarian: false,
    heat: 'spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Pho',
    stall: 'Vietnamese',
    image: 'pho.png',
    hashtag: '#PhoReal',
    lactoseFreeTag: true,
    alt: 'A bowl of pho with noodles, green herbs and lime',
    note: 'Vietnamese noodle soup, marked spicy in the game.',
    vegetarian: false,
    heat: 'spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Bhel Puri',
    stall: 'Indian',
    image: 'puri.png',
    hashtag: '#CrunchTime',
    lactoseFreeTag: false,
    alt: 'An octagonal bowl of bhel puri topped with green herbs',
    note: 'An Indian snack marked spicy and vegetarian-safe.',
    vegetarian: true,
    heat: 'spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Merguez',
    stall: 'Moroccan',
    image: 'merguez.png',
    hashtag: '#SausageSquad',
    lactoseFreeTag: true,
    alt: 'Two browned merguez sausages on a plate',
    note: 'Sausages from the Moroccan food stall.',
    vegetarian: false,
    heat: 'spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Pork Adobo',
    stall: 'Filipino',
    image: 'porkadobo.png',
    hashtag: '#AdoboObsessed',
    lactoseFreeTag: true,
    alt: 'Pork adobo in a dark sauce served with white rice',
    note: 'Pork in a dark sauce, with rice on the side.',
    vegetarian: false,
    heat: 'not-spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Tajine',
    stall: 'Moroccan',
    image: 'tajine.png',
    hashtag: '#StewGoodToShare',
    lactoseFreeTag: true,
    alt: 'A colorful serving of tajine topped with green herbs',
    note: 'A Moroccan stew to learn at the city\'s food stalls.',
    vegetarian: false,
    heat: 'not-spicy',
    flavor: 'savory',
    tried: false
  },
  {
    name: 'Bean and Cheese Burrito',
    stall: 'Mexican',
    image: 'burrito.png',
    hashtag: '#BeanThereAteThat',
    lactoseFreeTag: false,
    alt: 'A folded bean and cheese burrito on a round plate',
    note: 'A bean-and-cheese filling wrapped in a tortilla.',
    vegetarian: true,
    heat: 'not-spicy',
    flavor: 'savory',
    tried: false
  }
]

const recipeList = document.querySelector('#recipe-list')
const searchInput = document.querySelector('#recipe-search')
const stallFilter = document.querySelector('#stall-filter')
const resultsCount = document.querySelector('#results-count')
const emptyMessage = document.querySelector('#empty-message')
const triedCount = document.querySelector('#tried-count')
const tastingProgress = document.querySelector('#tasting-progress')
const mealForm = document.querySelector('#meal-form')
const mealStall = document.querySelector('#meal-stall')
const mealFlavor = document.querySelector('#meal-flavor')
const mealDiet = document.querySelector('#meal-diet')
const mealHeat = document.querySelector('#meal-heat')
const mealMatchCount = document.querySelector('#meal-match-count')
const untriedOnly = document.querySelector('#untried-only')
const mealResult = document.querySelector('#meal-result')
const mealPreview = document.querySelector('.meal-preview')
const showMenu = document.querySelector('#show-menu')
const previewCount = 6
let showAll = false

function makeElement(tag, className, text) {
  const element = document.createElement(tag)
  if (className !== '') {
    element.classList.add(className)
  }
  element.textContent = text
  return element
}

function makeDishPicture(recipe) {
  const image = document.createElement('img')
  image.src = 'images/' + recipe.image
  image.alt = recipe.alt
  image.width = 160
  image.height = 151
  image.classList.add('dish-image')
  return image
}

function updateProgress() {
  const total = recipes.filter(recipe => recipe.tried).length
  triedCount.textContent = total + ' of ' + recipes.length + ' tried'
  tastingProgress.max = recipes.length
  tastingProgress.value = total
  tastingProgress.textContent = triedCount.textContent
  refreshMealChoices()
}

for (const recipe of recipes) {
  const card = makeElement('article', 'recipe-card', '')
  card.appendChild(makeDishPicture(recipe))
  card.appendChild(makeElement('h3', '', recipe.name))
  card.appendChild(makeElement('p', 'stall-name', recipe.stall))
  card.appendChild(makeElement('p', 'dish-note', recipe.note))

  const label = makeElement('label', 'tried-label', '')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.setAttribute('aria-label', 'Tried ' + recipe.name)
  label.appendChild(checkbox)
  label.appendChild(makeElement('span', '', 'Tried it'))

  checkbox.addEventListener('change', () => {
    recipe.tried = checkbox.checked
    if (recipe.tried) {
      card.classList.add('is-tried')
    } else {
      card.classList.remove('is-tried')
    }
    updateProgress()
  })

  card.appendChild(label)
  recipeList.appendChild(card)
  recipe.card = card
}

function filterRecipes() {
  const search = searchInput.value.trim().toLowerCase()
  const selectedStall = stallFilter.value
  const isFiltered = search !== '' || selectedStall !== 'all'
  let matches = 0
  let visible = 0

  for (const recipe of recipes) {
    const matchesName = recipe.name.toLowerCase().includes(search)
    const matchesStall = selectedStall === 'all' || recipe.stall === selectedStall
    const matchesFilters = matchesName && matchesStall
    if (matchesFilters) {
      matches = matches + 1
    }
    const show = matchesFilters && (isFiltered || showAll || visible < previewCount)
    recipe.card.hidden = !show
    if (show) {
      visible = visible + 1
    }
  }

  if (visible < matches) {
    resultsCount.textContent = 'Showing ' + visible + ' of ' + matches + ' dishes'
  } else if (matches === 1) {
    resultsCount.textContent = '1 dish on the menu'
  } else {
    resultsCount.textContent = matches + ' dishes on the menu'
  }

  emptyMessage.hidden = visible !== 0
  showMenu.hidden = isFiltered

  if (showAll) {
    showMenu.textContent = 'Show fewer dishes'
    showMenu.setAttribute('aria-expanded', 'true')
  } else {
    showMenu.textContent = 'Show all ' + recipes.length + ' dishes'
    showMenu.setAttribute('aria-expanded', 'false')
  }
}

showMenu.addEventListener('click', () => {
  showAll = !showAll
  filterRecipes()
})
searchInput.addEventListener('input', filterRecipes)
stallFilter.addEventListener('change', filterRecipes)
document.querySelector('#filter-form').addEventListener('submit', event => {
  event.preventDefault()
  filterRecipes()
})
document.querySelector('#filter-form').addEventListener('reset', event => {
  event.preventDefault()
  searchInput.value = ''
  stallFilter.value = 'all'
  showAll = false
  filterRecipes()
})

function getMealChoices(ignoreTried) {
  const choices = []
  for (const recipe of recipes) {
    const matchesStall = mealStall.value === 'all' || recipe.stall === mealStall.value
    const matchesFlavor = mealFlavor.value === 'all' || recipe.flavor === mealFlavor.value
    let matchesDiet = false
    if (mealDiet.value === 'all') {
      matchesDiet = true
    } else if (mealDiet.value === 'vegetarian') {
      matchesDiet = recipe.vegetarian
    } else if (mealDiet.value === 'lactose-free') {
      matchesDiet = recipe.lactoseFreeTag
    } else if (mealDiet.value === 'vegetarian-lactose-free') {
      matchesDiet = recipe.vegetarian && recipe.lactoseFreeTag
    }
    const matchesHeat = mealHeat.value === 'all' || recipe.heat === mealHeat.value
    const matchesTasting = ignoreTried || !untriedOnly.checked || !recipe.tried
    if (matchesStall && matchesFlavor && matchesDiet && matchesHeat && matchesTasting) {
      choices.push(recipe)
    }
  }
  return choices
}

function showMeal(heading, description, picture) {
  mealResult.textContent = ''
  if (picture) {
    mealResult.appendChild(picture)
  }
  mealResult.appendChild(makeElement('p', 'result-title', heading))
  mealResult.appendChild(makeElement('p', 'result-description', description))
}

function showNoMatch() {
  if (untriedOnly.checked && getMealChoices(true).length > 0) {
    showMeal('Already tried them all', 'You have tried every dish that matches. Untick “Only dishes I haven’t tried” if you would like one again.', null)
  } else {
    showMeal('No match this time', 'None of these 11 dishes matches every preference. Try a different cuisine, flavor or spice setting.', null)
  }
}

function refreshMealChoices() {
  const choices = getMealChoices(false)
  if (choices.length === 1) {
    mealMatchCount.textContent = '1 dish matches'
  } else {
    mealMatchCount.textContent = choices.length + ' dishes match'
  }
  if (choices.length === 0) {
    showNoMatch()
  } else {
    showMeal('Ready for a random pick?', 'Set your filters, then select Draw a Random Dish.', mealPreview)
  }
}

for (const control of [mealStall, mealFlavor, mealDiet, mealHeat, untriedOnly]) {
  control.addEventListener('change', refreshMealChoices)
}

mealForm.addEventListener('reset', event => {
  event.preventDefault()
  for (const control of [mealStall, mealFlavor, mealDiet, mealHeat]) {
    control.value = 'all'
  }
  untriedOnly.checked = true
  refreshMealChoices()
})

mealForm.addEventListener('submit', event => {
  event.preventDefault()
  const choices = getMealChoices(false)
  if (choices.length === 0) {
    showNoMatch()
    return
  }

  const randomIndex = Math.floor(Math.random() * choices.length)
  const recipe = choices[randomIndex]
  showMeal(recipe.name, recipe.note, makeDishPicture(recipe))
  mealResult.appendChild(makeElement('p', 'result-hashtag', recipe.hashtag))

  const properties = makeElement('ul', 'result-properties', '')
  properties.setAttribute('aria-label', 'Dish keywords')
  const details = [recipe.stall]
  if (recipe.vegetarian) {
    details.push('Vegetarian-Safe')
  }
  if (recipe.lactoseFreeTag) {
    details.push('Lactose-free')
  }
  if (recipe.heat === 'spicy') {
    details.push('Spicy')
  } else if (recipe.heat === 'not-spicy') {
    details.push('Not spicy')
  }
  for (const detail of details) {
    properties.appendChild(makeElement('li', 'result-tag', detail))
  }
  mealResult.appendChild(properties)
})

updateProgress()
filterRecipes()
