import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { useForm } from "react-hook-form";
import Router from "next/router";

// data
import productsTypes from "./../../utils/data/products-types";
import productsColors from "./../../utils/data/products-colors";
import productsSizes from "./../../utils/data/products-sizes";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip
			prefixCls="rc-slider-tooltip"
			overlay={value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

const ProductsFilter = () => {
	const router = useRouter();
	const [filtersOpen, setFiltersOpen] = useState(false);
	const dispatch = useDispatch();
	const addQueryParams = () => {
		// query params changes
	};

	return (
		<form className="products-filter" onChange={addQueryParams}>
			<button
				type="button"
				onClick={() => setFiltersOpen(!filtersOpen)}
				className={`products-filter__menu-btn ${
					filtersOpen ? "products-filter__menu-btn--active" : ""
				}`}
			>
				Add Filter <i className="icon-down-open"></i>
			</button>

			<div
				className={`products-filter__wrapper ${
					filtersOpen ? "products-filter__wrapper--open" : ""
				}`}
			>
				<div className="products-filter__block">
					<button type="button">Product type</button>
					<div className="products-filter__block__content">
						{productsTypes.map((type) => (
							<Checkbox
								key={type.id}
								name="product-type"
								label={type.name}
								checked={router.query?.productType?.includes(type.name)}
								onChange={() => {
									let query = router.query;
									if (
										query.productType &&
										query.productType.includes(type.name)
									) {
										query.productType = query.productType.filter(
											(e) => e !== type.name
										);
									} else if (!query.productType) {
										query.productType = ["%", "%", type.name];
									} else {
										query.productType.push(type.name);
									}

									Router.push({
										pathname: "/products",
										query,
									});
								}}
							/>
						))}
					</div>
				</div>

				<div className="products-filter__block">
					<button type="button">Price</button>
					<div className="products-filter__block__content">
						<Range
							min={0}
							max={100}
							defaultValue={[0, 100]}
							tipFormatter={(value) => `${value}`}
							onAfterChange={(value) => {
								let query = router.query;
								query.minPrice = value[0];
								query.maxPrice = value[1];

								Router.push({
									pathname: "/products",
									query,
								});
							}}
						/>
					</div>
				</div>

				<div className="products-filter__block">
					<button type="button">Size</button>
					<div className="products-filter__block__content checkbox-square-wrapper">
						{productsSizes.map((type) => (
							<Checkbox
								type="square"
								key={type.id}
								name="product-size"
								label={type.label}
								checked={router.query?.size?.includes(type.label)}
								onChange={() => {
									let query = router.query;
									if (query.size && query.size.includes(type.label)) {
										query.size = query.size.filter((e) => e !== type.label);
									} else if (!query.size) {
										query.size = ["%", "%", type.label];
									} else {
										query.size.push(type.label);
									}

									Router.push({
										pathname: "/products",
										query,
									});
								}}
							/>
						))}
					</div>
				</div>

				<div className="products-filter__block">
					<button type="button">Color</button>
					<div className="products-filter__block__content">
						<div className="checkbox-color-wrapper">
							{productsColors.map((type) => (
								<CheckboxColor
									key={type.id}
									name="product-color"
									color={type.color}
									checked={router.query?.color?.includes(type.color)}
									onChange={() => {
										let query = router.query;
										if (query.color && query.color.includes(type.color)) {
											query.color = query.color.filter((e) => e !== type.color);
										} else if (!query.color) {
											query.color = ["%", "%", type.color];
										} else {
											query.color.push(type.color);
										}

										Router.push({
											pathname: "/products",
											query,
										});
									}}
								/>
							))}
						</div>
					</div>
				</div>

				{/* <button
					// type="submit"
					className="btn btn-submit btn--rounded btn--yellow"
				>
					Apply
				</button> */}
			</div>
		</form>
	);
};

export default ProductsFilter;
