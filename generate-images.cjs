
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "public", "hangman");

fs.mkdirSync(folder, { recursive: true });

// The gallows stays visible throughout the game.
const gallows = `
  <path d="M35 230 H180" />
  <path d="M80 230 V20 H175 V50" />
`;

// Each incorrect guess adds one more body part.
const bodyParts = [
  // 1: Head with a frown
  `
    <circle cx="175" cy="75" r="25" />
    <circle cx="166" cy="69" r="2" fill="#1e293b" stroke="none" />
    <circle cx="184" cy="69" r="2" fill="#1e293b" stroke="none" />
    <path d="M163 90 Q175 77 187 90" stroke-width="3" />
  `,

  // 2: Body
  `<line x1="175" y1="100" x2="175" y2="160" />`,

  // 3: Left arm
  `<line x1="175" y1="115" x2="140" y2="145" />`,

  // 4: Right arm
  `<line x1="175" y1="115" x2="210" y2="145" />`,

  // 5: Both legs
  `
    <line x1="175" y1="160" x2="145" y2="210" />
    <line x1="175" y1="160" x2="205" y2="210" />
  `
];

for (let stage = 0; stage <= 5; stage++) {
  const drawing = bodyParts.slice(0, stage).join("\n");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 260 250">
      <g fill="none"
         stroke="#1e293b"
         stroke-width="5"
         stroke-linecap="round"
         stroke-linejoin="round">
        ${gallows}
        ${drawing}
      </g>
    </svg>
  `;

  fs.writeFileSync(
    path.join(folder, `hangman-${stage}.svg`),
    svg
  );
}

console.log("All six Hangman images created!");
// INCLUDED IN AI CONTRIBUTION - I AM NOT GOOD AT DRAWING, SO I ASKED AI TO HELP 