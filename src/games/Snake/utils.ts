import { Coordinate } from "./types/types";

export const checkEatsFood = (
    head: Coordinate,
    food: Coordinate,
    area: number
): boolean => {
    const distanceBetweenFoodandSnakeX: number = Math.abs(head.x - food.x);
    const distanceBetweenFoodandSnakeY: number = Math.abs(head.y - food.y);
    return (
        distanceBetweenFoodandSnakeX < area && distanceBetweenFoodandSnakeY < area
    )
}

export const checkGameOver = (
    snakeHead: Coordinate, 
    boundaries: any
    ):boolean => {
    return (
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y > boundaries.yMax ||
        snakeHead.y < boundaries.yMin
    )
}


export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
}

export const checkSuccess = (score: number): boolean => {
    console.log(score)
  return score >= 20;
};