import React from 'react'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import { useNavigation } from '@react-navigation/native'
import Food from './Food'
import Snake from './Snake'
import Header from './Header'
import Score from './Score'
import { Colours } from '../styles/colours'
import { checkGameOver } from '../utils'
import { checkEatsFood } from '../utils'
import { randomFoodPosition } from '../utils'
import { useRoute } from '@react-navigation/native'
import { updateLock } from '../../../../utils'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 64 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

export default function Game(): JSX.Element {
	const [direction, setDirection] = useState<Direction>(Direction.Right)
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [isPaused, setIsPaused] = useState<boolean>(false)
	const [score, setScore] = useState<number>(0)
	const nav = useNavigation()

	const route = useRoute()
	const item = route.params?.item

	useEffect(() => {
		if (isGameOver && score >=50) {
			Alert.alert('Congratulations!', `Your Score is ${score}`, [
				{
					text: 'Hatch your egg',
					onPress: () => {
						nav.navigate('My Egg' as never, { item })
						updateLock(item)
					},
				},
			])
		}
		if (isGameOver && score < 50) {
			Alert.alert(
				'Try again',
				`Your Score is ${score}. You need to get 100 points to hatch the egg!`,
				[
					{
						text: 'replay',
						onPress: () => {
							reloadGame
						},
					},
				]
			)
		}
		if (!isGameOver) {
			const intervalId = setInterval(() => {
				!isPaused && moveSnake()
			}, MOVE_INTERVAL)
			return () => clearInterval(intervalId)
		}
	}, [snake, isGameOver, isPaused])

	const moveSnake = () => {
		const snakeHead = snake[0]
		const newHead = { ...snakeHead }

		if (checkGameOver(snakeHead, GAME_BOUNDS)) {
			setIsGameOver((prev) => !prev)
			return
		}

		switch (direction) {
			case Direction.Up:
				newHead.y -= 1
				break
			case Direction.Down:
				newHead.y += 1
				break
			case Direction.Left:
				newHead.x -= 1
				break
			case Direction.Right:
				newHead.x += 1
				break
			default:
				break
		}

		if (checkEatsFood(newHead, food, 2)) {
			setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
			setSnake([newHead, ...snake])
			setScore(score + SCORE_INCREMENT)
		} else {
			setSnake([newHead, ...snake.slice(0, -1)])
		}
	}

	const handleGesture = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent
		if (Math.abs(translationX) > Math.abs(translationY)) {
			if (translationX > 0) {
				setDirection(Direction.Right)
			} else {
				setDirection(Direction.Left)
			}
		} else {
			if (translationY > 0) {
				setDirection(Direction.Down)
			} else {
				setDirection(Direction.Up)
			}
		}
	}

	const reloadGame = () => {
		setSnake(SNAKE_INITIAL_POSITION)
		setFood(FOOD_INITIAL_POSITION)
		setIsGameOver(false)
		setScore(0)
		setDirection(Direction.Right)
		setIsPaused(false)
	}

	const pauseGame = () => {
		setIsPaused(!isPaused)
	}

	return (
		<PanGestureHandler onGestureEvent={handleGesture}>
			<SafeAreaView style={styles.container}>
				<Header
					reloadGame={reloadGame}
					pauseGame={pauseGame}
					isPaused={isPaused}
				>
					<Score score={score} />
				</Header>
				<View style={styles.boundaries}>
					<Snake snake={snake} />
					<Food
						x={food.x}
						y={food.y}
					/>
				</View>
			</SafeAreaView>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colours.primary,
	},
	boundaries: {
		flex: 1,
		borderColor: Colours.primary,
		borderWidth: 12,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: Colours.background,
	},
})
