import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductCard, { Product } from '../components/ProductCard'
import colors from '../constants/colors'
import items from '../constants/items'

const Home = () => {
	const [products, setProducts] = useState(
		items.filter(item => item.category === 'product')
	)
	const [accessories, setAccessories] = useState(
		items.filter(item => item.category === 'accessory')
	)

	const router = useRouter()

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
			<StatusBar backgroundColor={colors.white} />

			<ScrollView>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 16
					}}
				>
					<TouchableOpacity>
						<Entypo
							name='shopping-bag'
							size={18}
							color={colors.backgroundMedium}
							style={{
								padding: 12,
								borderRadius: 10,
								backgroundColor: colors.backgroundLight
							}}
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.push('/cart')}>
						<MaterialCommunityIcons
							name='cart'
							size={18}
							color={colors.backgroundMedium}
							style={{
								padding: 12,
								borderRadius: 10,
								borderWidth: 1,
								borderColor: colors.backgroundLight
							}}
						/>
					</TouchableOpacity>
				</View>

				<View style={{ marginBottom: 10, padding: 16 }}>
					<Text
						style={{
							fontSize: 26,
							color: colors.black,
							fontWeight: '500',
							letterSpacing: 1,
							marginBottom: 10
						}}
					>
						Hi-Fi Shop &amp; Service
					</Text>

					<Text
						style={{
							fontSize: 14,
							color: colors.black,
							fontWeight: '400',
							letterSpacing: 1,
							lineHeight: 24
						}}
					>
						Audio shop on Rustaveli Ave 57, {'\n'}This shop offers both products
						and services
					</Text>
				</View>

				<View style={{ padding: 16 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 18,
									color: colors.black,
									fontWeight: '500',
									letterSpacing: 1
								}}
							>
								Products
							</Text>

							<Text
								style={{
									fontSize: 14,
									color: colors.black,
									fontWeight: '400',
									opacity: 0.5,
									marginLeft: 10
								}}
							>
								41
							</Text>
						</View>

						<Text
							style={{ fontSize: 14, color: colors.blue, fontWeight: '400' }}
						>
							View All
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-around'
						}}
					>
						{products.map(product => (
							<ProductCard key={product.id} product={product as Product} />
						))}
					</View>
				</View>

				<View style={{ padding: 16 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 18,
									color: colors.black,
									fontWeight: '500',
									letterSpacing: 1
								}}
							>
								Accessories
							</Text>

							<Text
								style={{
									fontSize: 14,
									color: colors.black,
									fontWeight: '400',
									opacity: 0.5,
									marginLeft: 10
								}}
							>
								78
							</Text>
						</View>

						<Text
							style={{ fontSize: 14, color: colors.blue, fontWeight: '400' }}
						>
							View All
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-around'
						}}
					>
						{accessories.map(product => (
							<ProductCard key={product.id} product={product as Product} />
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Home
