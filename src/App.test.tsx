import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum } from './service/util/number-functions';
import { range } from './service/util/number-functions';
import LifeMatrix from "../src/service/LifeMatrix";



test ('sum of matrix', () => {
  expect(matrixSum([[1,2,3], [4,5,6]])).toBe(21)
})

test('range test', () => {
  expect(range(3,5)).toEqual([3,4]) 
})

test ('next test', () => {
const lifeMatrix = new LifeMatrix([[0,0,0,0],
                                   [0,1,1,0],
                                   [0,1,1,0],
                                   [0,0,0,0]]);
const expectedMatrix = [[0,0,0,0],
                        [0,1,1,0],
                        [0,1,1,0],
                        [0,0,0,0]];
expect(lifeMatrix.next()).toEqual(expectedMatrix);
});


test ('next test', () => {
  const lifeMatrix = new LifeMatrix([
                                    [0,0,0,0,0],
                                    [0,0,1,0,0],
                                    [0,0,1,0,0],
                                    [0,0,1,0,0],
                                    [0,0,0,0,0],
                                    
                                  ]);
                                  const expectedMatrix = ([
                                    [0,0,0,0,0],
                                    [0,0,0,0,0],
                                    [0,1,1,1,0],
                                    [0,0,0,0,0],
                                    [0,0,0,0,0],
                                    
                                  ]);
  expect(lifeMatrix.next()).toEqual(expectedMatrix);
  });


  test ('next test', () => {
    const lifeMatrix = new LifeMatrix([
                                      [0,0,0,0,0],
                                      [0,0,0,0,0],
                                      [0,1,1,1,0],
                                      [0,0,0,0,0],
                                      [0,0,0,0,0],
                                      
                                    ]);
                                    const expectedMatrix = ([
                                      [0,0,0,0,0],
                                      [0,0,1,0,0],
                                      [0,0,1,0,0],
                                      [0,0,1,0,0],
                                      [0,0,0,0,0],
                                      
                                    ]);
    expect(lifeMatrix.next()).toEqual(expectedMatrix);
    });