
// Edit this file to add/update SEBA quizzes
const CHAPTERS = [
  {
    id:"ch1",
    title:"Introduction",
    description:"Basics and key ideas.",
    questions:[
      {type:"mcq", question:"Which is a unit of force?", options:["Newton","Joule","Watt","Pascal"], answer:"Newton"},
      {type:"tf", question:"True or False: Mass and weight are the same.", answer:"False"},
      {type:"short", question:"Symbol for acceleration due to gravity?", answer:["g","G (lowercase g)"]}
    ]
  },
  {
    id:"ch2",
    title:"Deeper Concepts",
    description:"More detailed understanding.",
    questions:[
      {type:"mcq", question:"Speed is a ____ quantity.", options:["Scalar","Vector"], answer:"Scalar"},
      {type:"short", question:"SI unit of work?", answer:["joule","J"]},
      {type:"tf", question:"Friction always opposes motion.", answer:"True"}
    ]
  },
  {
    id:"ch3",
    title:"Practice",
    description:"Check your understanding.",
    questions:[
      {type:"short", question:"One-word: Device to measure temperature.", answer:["thermometer"]},
      {type:"mcq", question:"Boiling point of pure water at sea level?", options:["90°C","95°C","100°C","110°C"], answer:"100°C"},
      {type:"tf", question:"Sound cannot travel through vacuum.", answer:"True"}
    ]
  }
];
