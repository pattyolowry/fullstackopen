interface ExerciseData {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))