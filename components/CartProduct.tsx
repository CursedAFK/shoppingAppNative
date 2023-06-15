import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'
import { Product } from './ProductCard'

interface CartProductProps {
	product: Product
	deleteProduct: (productId: Number) => void
}

const CartProduct = ({ product, deleteProduct }: CartProductProps) => {
	const router = useRouter()

	return (
		<TouchableOpacity
			style={{ marginVertical: 6, flexDirection: 'row', alignItems: 'center' }}
			onPress={() => router.push(`/product/${product.id}`)}
		>
			<View
				style={{
					width: '30%',
					height: 100,
					padding: 14,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: colors.backgroundLight,
					borderRadius: 10,
					marginRight: 22
				}}
			>
				<Image
					source={product.productImage}
					style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
				/>
			</View>

			<View style={{ flex: 1, justifyContent: 'space-around', height: 100 }}>
				<View style={{}}>
					<Text
						style={{
							fontSize: 14,
							color: colors.black,
							fontWeight: '600',
							letterSpacing: 1
						}}
					>
						{product.productName}
					</Text>

					<View
						style={{
							marginTop: 4,
							flexDirection: 'row',
							alignItems: 'center',
							opacity: 0.6
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: '400',
								maxWidth: '85%',
								marginRight: 4
							}}
						>
							&#8377;{product.productPrice}
						</Text>

						<Text>
							(~&#8377;{product.productPrice + product.productPrice / 20})
						</Text>
					</View>
				</View>

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
							gap: 20
						}}
					>
						<View
							style={{
								borderRadius: 100,
								padding: 4,
								borderWidth: 1,
								borderColor: colors.backgroundMedium,
								opacity: 0.5
							}}
						>
							<MaterialCommunityIcons
								name='minus'
								size={16}
								color={colors.backgroundDark}
							/>
						</View>

						<Text>1</Text>

						<View
							style={{
								borderRadius: 100,
								padding: 4,
								borderWidth: 1,
								borderColor: colors.backgroundMedium,
								opacity: 0.5
							}}
						>
							<MaterialCommunityIcons
								name='plus'
								size={16}
								color={colors.backgroundDark}
							/>
						</View>
					</View>

					<TouchableOpacity onPress={() => deleteProduct(product.id)}>
						<MaterialCommunityIcons
							name='delete-outline'
							size={16}
							color={colors.backgroundDark}
							style={{
								backgroundColor: colors.backgroundLight,
								padding: 8,
								borderRadius: 100
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default CartProduct
