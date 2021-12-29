import { useState, useEffect } from "react";
import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";
import { useRouter } from "next/router";

const ProductsContent = () => {
	const router = useRouter();
	const fetcher = (url) => fetch(url).then((res) => res.json());
	let { data, error } = useSwr("/api/products", fetcher);

	const checkProductType = (item) => {
		if (
			Object.keys(router.query).length == 0 ||
			Object(router.query.productType).length <= 2 ||
			Object(router.query.productType).length == undefined
		) {
			return true;
		} else if (
			router.query.productType &&
			router.query.productType.includes(item.category)
		) {
			return true;
		}

		return false;
	};

	const checkPrice = (item) => {
		if (Object.keys(router.query).length == 0 || !router.query.minPrice) {
			return true;
		} else if (
			item.currentPrice >= router.query.minPrice &&
			item.currentPrice <= router.query.maxPrice
		) {
			return true;
		} else {
			return false;
		}
	};

	const checkSize = (item) => {
		let temp = false;
		item.sizes.map((size) => {
			if (
				Object.keys(router.query).length == 0 ||
				Object(router.query.size).length <= 2 ||
				Object(router.query.size).length == undefined
			) {
				temp = true;
				return true;
			} else if (router.query.size && router.query.size.includes(size)) {
				temp = true;
				return true;
			}
		});

		return temp;
	};

	const checkColor = (item) => {
		let temp = false;
		item.colors.map((color) => {
			if (
				Object.keys(router.query).length == 0 ||
				Object(router.query.color).length <= 2 ||
				Object(router.query.color).length == undefined
			) {
				temp = true;
				return true;
			} else if (router.query.color && router.query.color.includes(color)) {
				temp = true;
				return true;
			}
		});

		return temp;
	};
	if (error) return <div>Failed to load users</div>;
	return (
		<>
			{!data && <ProductsLoading />}

			{data && (
				<section className="products-list">
					{data
						.filter(
							(item) =>
								checkProductType(item) &&
								checkSize(item) &&
								checkPrice(item) &&
								checkColor(item)
						)
						.map((item) => (
							<ProductItem
								discount={item.discount}
								key={item.id}
								id={item.id}
								price={item.price}
								currentPrice={item.currentPrice}
								productImage={item.images[0]}
								name={item.name}
							/>
						))}
				</section>
			)}
		</>
	);
};

export default ProductsContent;
