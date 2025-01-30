import { useEffect, useState } from "react";

const questions = [
  "What is the only mammal capable of true flight?",
  "Which planet in our solar system has the most moons?",
  "What is the smallest country in the world by land area?",
  "Which animal has the longest lifespan?",
  "What is the most abundant element in the Earth's atmosphere?",
  "Which language has the most words?",
  "What is the fastest land animal on Earth?",
  "Which fruit is known as the 'king of fruits' and is famous for its strong smell?",
  "What is the only letter that doesn’t appear in any U.S. state name?",
  "Which country invented ice cream?",
  "What is the only continent without deserts?",
  "Which animal has three hearts?",
  "What is the longest river in the world?",
  "Which country has the most time zones?",
  "What is the tallest mountain in the world when measured from base to peak?",
  "Which planet is known as the 'Morning Star'?",
  "What is the most widely spoken language in the world?",
  "Which element has the atomic number 1?",
  "What is the largest organ in the human body?",
  "Which bird can fly backward?",
  "What is the only fruit that has its seeds on the outside?",
  "Which country invented pizza?",
  "What is the fastest bird in the world?",
  "Which gas makes up the majority of the Sun's composition?",
  "What is the smallest bone in the human body?",
  "Which animal can sleep for up to 22 hours a day?",
  "What is the most consumed beverage in the world (after water)?",
  "Which country is home to the kangaroo?",
  "What is the only metal that is liquid at room temperature?",
  "Which planet has the most volcanoes?",
  "What is the only bird that can fly upside down?",
  "Which country is known as the Land of the Rising Sun?",
  "What is the largest species of shark?",
  "Which planet has the most rings?",
  "What is the most common surname in the world?",
  "Which animal can hold its breath the longest?",
  "What is the oldest known musical instrument?",
  "Which country has the most islands?",
  "What is the fastest fish in the ocean?",
  "Which fruit is known as the 'king of fruits' in Southeast Asia?",
  "What is the only mammal that can’t jump?",
  "Which country invented the sandwich?",
  "What is the largest desert in the world?",
  "Which animal has the strongest bite force?",
  "What is the most expensive spice in the world?",
  "Which planet spins on its side?",
  "What is the only bird that can swim but cannot fly?",
  "Which country is the largest producer of coffee?",
  "What is the smallest planet in our solar system?",
  "Which animal has the longest migration route?",
  "What is the most common blood type in humans?",
  "Which country is home to the Eiffel Tower?",
  "What is the largest land animal in the world?",
  "Which planet is known as the Red Planet?",
  "What is the only continent that spans all four hemispheres?",
  "Which animal has fingerprints almost identical to humans?",
  "What is the most widely cultivated fruit in the world?",
  "Which country invented the compass?",
  "What is the deepest part of the ocean?",
  "Which animal has the largest eyes of any land mammal?"
]

interface ChatEmptyProps {
  setQuestion: (question: string) => void;
}

export function ChatEmpty({ setQuestion }: ChatEmptyProps) {
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  useEffect(() => {
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomQuestions(shuffledQuestions);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="p-2">
      <div className="nes-container is-rounded flex flex-col items-center justify-center bg-white">
        <i className="nes-bcrikko -mt-8 -mb-8 sm:mt-8 sm:mb-8 scale-50 sm:scale-100"></i>
        <h1 className="nes-text text-sm sm:text-2xl mb-4 mt-6 text-center">Start a conversation!</h1>
        <h2 className="nes-text text-xs sm:text-xl mb-8 text-center">Try one of these questions</h2>
        <ul className="nes-list is-disc px-2 sm:px-16">
          {randomQuestions.map((question, index) => (
            <li key={index} className="nes-text text-xs sm:text-sm mb-2 is-primary hover:underline" onClick={() => setQuestion(question)}>{question}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
