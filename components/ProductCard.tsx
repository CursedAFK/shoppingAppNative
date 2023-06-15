import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'

export interface Product {
	id: number
	category: string
	productName: string
	productPrice: number
	description: string
	isOff: boolean
	offPercentage: number
	productImage: any
	isAvailable: boolean
	productImageList: any[]
}

interface ProductCardProps {
	product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	const router = useRouter()

	return (
		<TouchableOpacity
			style={{ width: '48%', marginVertical: 14 }}
			onPress={() => router.push(`/product/${product.id}`)}
		>
			<View
				style={{
					width: '100%',
					height: 100,
					borderRadius: 10,
					backgroundColor: colors.backgroundLight,
					position: 'relative',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 8
				}}
			>
				{product.isOff && (
					<View
						style={{
							position: 'absolute',
							width: '20%',
							height: '24%',
							backgroundColor: colors.green,
							top: 0,
							left: 0,
							borderTopLeftRadius: 10,
							borderBottomRightRadius: 10,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: colors.white,
								fontWeight: '700',
								letterSpacing: 1
							}}
						>
							{product.offPercentage}%
						</Text>
					</View>
				)}

				<Image
					source={product.productImage}
					style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
				/>
			</View>

			<Text
				style={{
					fontSize: 12,
					fontWeight: '600',
					color: colors.black,
					marginBottom: 2
				}}
			>
				{product.productName}
			</Text>

			{product.category === 'accessory' &&
				(product.isAvailable ? (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<FontAwesome
							name='circle'
							size={12}
							color={colors.green}
							style={{ marginRight: 6 }}
						/>

						<Text style={{ fontSize: 12, color: colors.green }}>Available</Text>
					</View>
				) : (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<FontAwesome
							name='circle'
							size={12}
							color={colors.red}
							style={{ marginRight: 6 }}
						/>

						<Text style={{ fontSize: 12, color: colors.red }}>Unavailable</Text>
					</View>
				))}

			<Text>&#8377; {product.productPrice}</Text>
		</TouchableOpacity>
	)
}

export default ProductCard
