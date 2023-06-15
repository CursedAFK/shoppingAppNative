import React from 'react'
import { Dimensions, Image, View } from 'react-native'

interface ProductImageCardProps {
	imageUrl: any
	index: number
}

const ProductImageCard = ({ imageUrl, index }: ProductImageCardProps) => {
	const width = Dimensions.get('window').width

	return (
		<View
			style={{
				width,
				height: 240,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Image
				source={imageUrl}
				style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
			/>
		</View>
	)
}

export default ProductImageCard
