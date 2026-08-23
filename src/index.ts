const { readFileSync } = require('node:fs') as typeof import('node:fs')

const designDoc = readFileSync('design-doc.md', 'utf-8')

console.log(designDoc)


// The Phase type must have a title and an array of task
type Phase = {
  title: string
  tasks: string[]
}

// Here will be my array of phases
const designDoc = `
Phase 1 — Static Frontend

- Header
- Navigation
- Hero
- Product cards

Phase 2 — React Data

- Product array
- ProductCard component
- Add product
- Delete product

Phase 3 — Supabase

- Create Supabase project
- Create products table
- Fetch products
`

// End of my array here

//Here I have a function expecting a string
function parsePhases(text: string): Phase[] {

 //my assumption is that this is an array of objects holding each phase
  const phases: Phase[] = []


  //This will seperate each to be seperate
  const lines = text.split('\n')

  let currentPhase: Phase | null = null

//loop through each line
  for (const line of lines) {
    const trimmedLine = line.trim()

//This will be what indicates the agent to read from Phase, I can change to be more specific
    if (trimmedLine.startsWith('Phase ')) {

        //if current line has the key word Phase then 
        //we will add it to our list

      currentPhase = {
        title: trimmedLine,
        tasks: [],
      }
      //add it to our new array
      phases.push(currentPhase)
    }

// If the line starts with a bullet AND we are currently inside a phase...
    if (trimmedLine.startsWith('- ') && currentPhase) {

     // gets ride of the -- in front of each task
      const task = trimmedLine.slice(2)


      //add each task to the current phase
      currentPhase.tasks.push(task)
    }
  }

  return phases
}

// Here will be the data that it is pulling from
const phases = parsePhases(designDoc)

console.log(phases)




//Phase 3 — Generate GitHub Issue Markdown

// Phase object
//     ↓
// convert
//     ↓
// GitHub issue body

function createIssueBody(phase: Phase): string {
  const tasks = phase.tasks
    .map((task) => `- [ ] ${task}`)
    .join('\n')

  return `
## Tasks

${tasks}

## Definition of Done

This phase is complete when all tasks above are finished.
`
}



// for each phrase in phrase start a new line and grab the title
//then map through each task and list it under the title
for (const phase of phases) {
  console.log('\n--------------------')
  console.log(phase.title)
  console.log(createIssueBody(phase))
}




