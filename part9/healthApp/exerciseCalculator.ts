interface ExerciseData {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

interface ExerciseInputs {
  target: number;
  dailyExercise: number[];
}

const parseExerciseArgs = (args: string[]): ExerciseInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let dailyValues: number[] = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
        throw new Error('Provided values were not numbers!');
    }

    if (i > 2) {
        dailyValues.push(Number(args[i]));
    }
  }

  return {
    target: Number(args[2]),
    dailyExercise: dailyValues
  }
}

const calculateExercises = (dailyExercise: number[], target: number): ExerciseData => {
    let hoursTrained = 0;
    let daysTrained = 0;
    const periodLength = dailyExercise.length;
    for (let i = 0; i < periodLength; i++) {
        if (dailyExercise[i] !== 0) {
            daysTrained++;
            hoursTrained += dailyExercise[i];
        }
    }
    const average = hoursTrained / periodLength;
    let rating: number;
    let ratingDescription: string;
    if (average / target >= 1) {
        rating = 3;
        ratingDescription = "You met your target, well done!"
    } else if (average / target >= 0.6) {
        rating = 2;
        ratingDescription = "Not too bad, but could be better."
    } else {
        rating = 1;
        ratingDescription = "You fell short, better luck next week!"
    }
    
    return {
        periodLength,
        trainingDays: daysTrained,
        target,
        average,
        success: average >= target,
        rating,
        ratingDescription
    }
}


try {
    const { target, dailyExercise } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(dailyExercise, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}