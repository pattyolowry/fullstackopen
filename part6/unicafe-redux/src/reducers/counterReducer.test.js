import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('okay is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset sets everything back to zero', () => {
    const actionGood = {
      type: 'GOOD'
    }
    const actionOk = {
      type: 'OK'
    }
    const actionBad = {
      type: 'BAD'
    }
    const actionReset = {
      type: 'RESET'
    }
    let state = initialState

    state = counterReducer(state, actionGood)
    state = counterReducer(state, actionOk)
    state = counterReducer(state, actionBad)
    expect(state).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    deepFreeze(state)
    const newState = counterReducer(state, actionReset)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
