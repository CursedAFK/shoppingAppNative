import { Entypo, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
	Animated,
	Dimensions,
	FlatList,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductImageCard from '../../../components/ProductImageCard'
import colors from '../../../constants/colors'
import items from '../../../constants/items'

const ProductDetail = () => {
	const router = useRouter()

	const { productId } = useLocalSearchParams()

	if (!productId) return null

	const product = items.find(item => item.id === +productId)

	if (!product) return null

	const width = Dimensions.get('window').width

	const scrollX = new Animated.Value(0)

	const position = Animated.divide(scrollX, width)

	const addToCart = async (productId: Number) => {
		const localCartRaw = await AsyncStorage.getItem('localCart')

		const localCart: Number[] = localCartRaw ? JSON.parse(localCartRaw) : []

		localCart.push(productId)

		try {
			await AsyncStorage.setItem('localCart', JSON.stringify(localCart))

			ToastAndroid.show('Added to cart', ToastAndroid.SHORT)

			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}
		>
			<StatusBar backgroundColor={colors.backgroundLight} />

			<ScrollView>
				<View
					style={{
						backgroundColor: colors.backgroundLight,
						borderBottomRightRadius: 20,
						borderBottomLeftRadius: 20,
						position: 'relative',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 4
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingTop: 16,
							paddingLeft: 16,
							width: '100%'
						}}
					>
						<TouchableOpacity onPress={() => router.back()}>
							<Entypo
								name='chevron-left'
								size={18}
								color={colors.backgroundDark}
								style={{
									padding: 12,
									backgroundColor: colors.white,
									borderRadius: 10
								}}
							/>
						</TouchableOpacity>
					</View>

					<FlatList
						data={product.productImageList}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<ProductImageCard imageUrl={item} index={index} />
						)}
						keyExtractor={item => item}
						decelerationRate={0.8}
						snapToInterval={width}
						bounces={false}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { x: scrollX } } }],
							{ useNativeDriver: false }
						)}
					/>

					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: 16,
							marginTop: 32
						}}
					>
						{product.productImageList.map((item, index) => (
							<Animated.View
								style={{
									width: '16%',
									height: 2.4,
									backgroundColor: colors.black,
									opacity: position.interpolate({
										inputRange: [index - 1, index, index + 1],
										outputRange: [0.2, 1, 0.2],
										extrapolate: 'clamp'
									}),
									marginHorizontal: 4,
									borderRadius: 100
								}}
								key={index}
							/>
						))}
					</View>
				</View>

				<View style={{ paddingHorizontal: 16, marginTop: 6, marginBottom: 80 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 14
						}}
					>
						<Entypo
							name='shopping-cart'
							size={18}
							color={colors.blue}
							style={{ marginRight: 6 }}
						/>

						<Text style={{ fontSize: 12, color: colors.black }}>Shopping</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							marginVertical: 4,
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						<Text
							style={{
								fontSize: 24,
								fontWeight: '700',
								letterSpacing: 0.5,
								marginVertical: 4,
								textTransform: 'capitalize',
								color: colors.black,
								maxWidth: '84%'
							}}
						>
							{product.productName}
						</Text>

						<Ionicons
							name='link-outline'
							size={24}
							color={colors.blue}
							style={{
								backgroundColor: colors.blue + '10',
								padding: 8,
								borderRadius: 100
							}}
						/>
					</View>

					<Text
						style={{
							fontSize: 12,
							color: colors.black,
							fontWeight: '400',
							letterSpacing: 1,
							opacity: 0.5,
							lineHeight: 20,
							maxWidth: '85%',
							maxHeight: 44,
							marginBottom: 18
						}}
					>
						{product.description}
					</Text>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginVertical: 14,
							borderBottomColor: colors.backgroundLight,
							borderBottomWidth: 1,
							paddingBottom: 20
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								width: '80%',
								alignItems: 'center'
							}}
						>
							<View
								style={{
									backgroundColor: colors.backgroundLight,
									alignItems: 'center',
									justifyContent: 'center',
									padding: 12,
									borderRadius: 100,
									marginRight: 10
								}}
							>
								<Entypo name='location-pin' size={16} color={colors.blue} />
							</View>

							<Text>Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
						</View>

						<Entypo
							name='chevron-right'
							size={22}
							color={colors.backgroundDark}
						/>
					</View>

					<View style={{ paddingHorizontal: 16 }}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: '500',
								maxWidth: '85%',
								color: colors.black,
								marginBottom: 4
							}}
						>
							&#8377; {product.productPrice}
						</Text>

						<Text>
							Tax Rate 2%~ &#8377;{product.productPrice / 20} (&#8377;
							{product.productPrice + product.productPrice / 20})
						</Text>
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
					onPress={() => product.isAvailable && addToCart(product.id)}
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
						{product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default ProductDetail
