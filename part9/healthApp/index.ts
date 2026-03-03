import express from 'express';
import { calculateBmi, BmiValues } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { ParsedQs } from 'qs';

const app = express();
app.use(express.json());

const parseBmiParams = (params: ParsedQs): BmiValues => {
  if (!(params.height && params.weight)) throw new Error('Not enough arguments');

  if (!isNaN(Number(params.height)) && !isNaN(Number(params.weight))) {
    return {
      height: Number(params.height),
      weight: Number(params.weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateExerciseParameters = (daily_exercises: any, target: any): undefined => {
  if (!daily_exercises || !target) {
    throw new Error('parameters missing');
  };

  if (isNaN(Number(target))) {
    throw new Error("malformatted parameters");
  }

  if (!Array.isArray(daily_exercises)) {
    throw new Error("malformatted parameters");
  }

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) {
        throw new Error("malformatted parameters");
    }
  }
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
  const { height, weight } = parseBmiParams(req.query);
  const bmi = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi
  });
  } catch {
    res.status(400).send(
        {
            error: "malformatted parameters"
        }
    );
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    validateExerciseParameters(daily_exercises, target);

    const result = calculateExercises(daily_exercises as number[], Number(target));
    return res.send({
      result
  });
  } catch (error) {
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "There was an error processing the request";
    }

    return res.status(400).send(
        {
            error: message
        }
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});