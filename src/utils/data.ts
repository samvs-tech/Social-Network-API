const names: string[] = [
    'Alice',
    'Bob',
    'Clara',
    'David',
    'Evelyn',
    'Frank',
    'Grace',
    'Henry',
    'Isabel',
    'Jack',
    'Karen',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Peter',
    'Quinn',
    'Ruby',
    'Samuel',
    'Tessa',
  ];
  
  const thoughts: string[] = [
    'Writing clean code is an art.',
    'TypeScript makes JavaScript more robust.',
    'Debugging is like solving a mystery.',
    'Version control with Git is essential.',
    'Code reviews improve team collaboration.',
    'Front-end development is both design and logic.',
    'Back-end development powers the web.',
    'Every bug teaches you something new.',
    'Coding challenges improve problem-solving skills.',
    'Automating tasks saves time and effort.',
    'Readable code is better than clever code.',
    'Unit tests make refactoring easier.',
    'Frameworks simplify complex applications.',
    'Learning new programming languages is rewarding.',
    'Documentation is the key to maintainability.',
    'Breaking problems into smaller pieces is the way to go.',
    'Pair programming enhances learning.',
    'A well-named variable can save hours.',
    'Practice makes debugging faster.',
    `There's always more to learn in coding!`,
  ];
  
  
  const getRandomArrItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomUsername = (): string =>
    `${getRandomArrItem(names)}_${Math.floor(Math.random() * 1000)}`;
  
  const getRandomEmail = (): string =>
    `${getRandomUsername().toLowerCase()}@example.com`;
  
  interface Thought {
    thoughtText: string;
    username: string;
    createdAt: Date;
    reactions: any[]; 
  }
  
  const getRandomThoughts = (count: number): Thought[] => {
    const results: Thought[] = [];
    for (let i = 0; i < count; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUsername(),
        createdAt: new Date(),
        reactions: [],
      });
    }
    return results;
  };
  
  export {
    getRandomUsername,
    getRandomEmail,
    getRandomThoughts,
    getRandomArrItem,
  };