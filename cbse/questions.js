// CBSE Robotics Quiz - Class V

const CHAPTERS = [
  {
    id: "ch1",
    title: "Merry Go Round",
    description: "Understanding circular and rotational motion.",
    questions: [
      // One-word
      { type: "short", question: "What type of motion do we observe in the seats of a merry-go-round?", answer: ["circular motion", "circular"] },
      { type: "short", question: "What type of motion does the shaft of a merry-go-round have?", answer: ["rotational motion", "rotational"] },
      { type: "short", question: "Motion of the earth around the sun is called?", answer: ["circular motion", "circular"] },
      { type: "short", question: "Motion of the earth on its own axis is called?", answer: ["rotational motion", "rotational"] },

      // MCQ
      { type: "mcq", question: "Which of the following is an example of circular motion?", options: ["Swing", "Merry-go-round seats", "Running", "Walking"], answer: "Merry-go-round seats" },
      { type: "mcq", question: "Which part of the merry-go-round shows rotational motion?", options: ["Seats", "Shaft", "Lights", "Base plate"], answer: "Shaft" },
      { type: "mcq", question: "Motion of the earth around the sun is:", options: ["Rotational", "Circular", "Linear", "Zigzag"], answer: "Circular" },
      { type: "mcq", question: "Motion of the earth on its axis is:", options: ["Rotational", "Circular", "Straight", "None of these"], answer: "Rotational" },

      // True/False
      { type: "tf", question: "The seats of a merry-go-round move in circular motion.", answer: "True" },
      { type: "tf", question: "The shaft of a merry-go-round moves in circular motion.", answer: "False" },
      { type: "tf", question: "The earth rotates on its own axis in rotational motion.", answer: "True" },
      { type: "tf", question: "The earth moves around the sun in rotational motion.", answer: "False" }
    ]
  }
];
