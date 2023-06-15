import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartProduct from '../../components/CartProduct'
import { Product } from '../../components/ProductCard'
import colors from '../../constants/colors'
import items from '../../constants/items'

const Cart = () => {
	const [products, setProducts] = useState<Product[]>([])

	const router = useRouter()

	const getProductsFromLocalStorage = async () => {
		const productsIdRaw = await AsyncStorage.getItem('localCart')

		const productsId: Number[] = productsIdRaw ? JSON.parse(productsIdRaw) : []

		if (productsId.length === 0) return

		const productsListFromDB = items.filter(item =>
			productsId.includes(item.id)
		) as Product[]

		setProducts(productsListFromDB)
	}

	const totalPrice = products.reduce((acc, curr) => acc + curr.productPrice, 0)

	const deleteProduct = async (productId: Number) => {
		const productsIdRaw = await AsyncStorage.getItem('localCart')

		const productsId: Number[] = productsIdRaw ? JSON.parse(productsIdRaw) : []

		if (productsId.length === 0) return

		const filteredProducts = productsId.filter(product => product !== productId)

		await AsyncStorage.setItem('localCart', JSON.stringify(filteredProducts))

		getProductsFromLocalStorage()
	}

	const checkOut = async () => {
		try {
			await AsyncStorage.removeItem('localCart')
		} catch (error) {
			console.log(error)
		}

		ToastAndroid.show('Order Completed!', ToastAndroid.SHORT)

		router.push('/')
	}

	useEffect(() => {
		getProductsFromLocalStorage()
	}, [])

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}
		>
			<ScrollView>
				<View
					style={{
						flexDirection: 'row',
						paddingTop: 16,
						paddingHorizontal: 16,
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity onPress={() => router.back()}>
						<MaterialCommunityIcons
							name='chevron-left'
							size={18}
							color={colors.backgroundDark}
							style={{
								padding: 12,
								backgroundColor: colors.backgroundLight,
								borderRadius: 12
							}}
						/>
					</TouchableOpacity>

					<Text
						style={{ fontSize: 14, color: colors.black, fontWeight: '400' }}
					>
						Order Details
					</Text>

					<View></View>
				</View>

				<Text
					style={{
						fontSize: 20,
						color: colors.black,
						fontWeight: '500',
						letterSpacing: 1,
						paddingTop: 20,
						paddingLeft: 16,
						marginBottom: 10
					}}
				>
					My Cart
				</Text>

				<View style={{ paddingHorizontal: 16 }}>
					{products.length !== 0 &&
						products.map(product => (
							<CartProduct
								product={product}
								key={product.id}
								deleteProduct={deleteProduct}
							/>
						))}
				</View>

				<View>
					<View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
						<Text
							style={{
								fontSize: 16,
								color: colors.black,
								fontWeight: '500',
								letterSpacing: 1,
								marginBottom: 20
							}}
						>
							Delivery Location
						</Text>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									width: '80%'
								}}
							>
								<View
									style={{
										backgroundColor: colors.backgroundLight,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 12,
										borderRadius: 10,
										marginRight: 18
									}}
								>
									<MaterialCommunityIcons
										name='truck-delivery-outline'
										size={18}
										color={colors.blue}
									/>
								</View>

								<View>
									<Text
										style={{
											fontSize: 14,
											color: colors.black,
											fontWeight: '500'
										}}
									>
										12, Olokodana St.
									</Text>

									<Text
										style={{
											fontSize: 12,
											color: colors.black,
											fontWeight: '400',
											lineHeight: 20,
											opacity: 0.5
										}}
									>
										0187, Lagos
									</Text>
								</View>
							</View>

							<MaterialCommunityIcons
								name='chevron-right'
								size={22}
								color={colors.black}
							/>
						</View>
					</View>
				</View>

				<View>
					<View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
						<Text
							style={{
								fontSize: 16,
								color: colors.black,
								fontWeight: '500',
								letterSpacing: 1,
								marginBottom: 20
							}}
						>
							Payment Method
						</Text>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									width: '80%'
								}}
							>
								<View
									style={{
										backgroundColor: colors.backgroundLight,
										alignItems: 'center',
										justifyContent: 'center',
										padding: 12,
										borderRadius: 10,
										marginRight: 18
									}}
								>
									<Text
										style={{
											fontSize: 10,
											fontWeight: '900',
											color: colors.blue,
											letterSpacing: 1
										}}
									>
										VISA
									</Text>
								</View>

								<View>
									<Text
										style={{
											fontSize: 14,
											color: colors.black,
											fontWeight: '500'
										}}
									>
										Visa Classic
									</Text>

									<Text
										style={{
											fontSize: 12,
											color: colors.black,
											fontWeight: '400',
											lineHeight: 20,
											opacity: 0.5
										}}
									>
										**** **** **** 1234
									</Text>
								</View>
							</View>

							<MaterialCommunityIcons
								name='chevron-right'
								size={22}
								color={colors.black}
							/>
						</View>
					</View>

					<View
						style={{ paddingHorizontal: 16, marginTop: 40, marginBottom: 80 }}
					>
						<Text
							style={{
								fontSize: 16,
								color: colors.black,
								fontWeight: '500',
								letterSpacing: 1,
								marginBottom: 20
							}}
						>
							Order Info
						</Text>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: 8
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									maxWidth: '80%',
									color: colors.black,
									opacity: 0.5
								}}
							>
								Subtotal
							</Text>

							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									color: colors.black,
									opacity: 0.8
								}}
							>
								&#8377; {totalPrice.toLocaleString('en-US')}
							</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: 22
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									maxWidth: '80%',
									color: colors.black,
									opacity: 0.5
								}}
							>
								Shipping Tax
							</Text>

							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									color: colors.black,
									opacity: 0.8
								}}
							>
								&#8377; {(totalPrice / 20).toLocaleString('en-US')}
							</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontWeight: '400',
									maxWidth: '80%',
									color: colors.black,
									opacity: 0.5
								}}
							>
								Total
							</Text>

							<Text
								style={{
									fontSize: 18,
									fontWeight: '500',
									color: colors.black
								}}
							>
								&#8377; {(totalPrice + totalPrice / 20).toLocaleString('en-US')}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<View
				style={{
					position: 'absolute',
					bottom: 10,
					width: '100%',
					height: '8%',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity
					style={{
						width: '86%',
						height: '90%',
						backgroundColor: colors.blue,
						borderRadius: 20,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					onPress={() => totalPrice !== 0 && checkOut()}
				>
					<Text
						style={{
							fontSize: 12,
							fontWeight: '500',
							letterSpacing: 1,
							color: colors.white,
							textTransform: 'uppercase'
						}}
					>
						Checkout ( &#8377;
						{(totalPrice + totalPrice / 20).toLocaleString('en-US')} )
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default Cart
