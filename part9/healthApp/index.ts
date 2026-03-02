import express from 'express';
import { calculateBmi, BmiValues } from "./bmiCalculator";
import { ParsedQs } from 'qs';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});