import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Slide from "@mui/material/Slide";
import ShoppingCart from "../shopping-cart/index.js";
import { showCart } from "./../../store/actions/showCartActions";
import Router from "next/router";

const Header = ({ isErrorPage }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	// const showSlider = useSelector((state) => state.showCart);
	const [showSlider, setShowSlider] = useState(false);
	const { cartItems } = useSelector((state) => state.cart);
	const arrayPaths = ["/"];

	const [onTop, setOnTop] = useState(
		!arrayPaths.includes(router.pathname) || isErrorPage ? false : true
	);
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const navRef = useRef(null);
	const searchRef = useRef(null);

	const headerClass = () => {
		if (window.pageYOffset === 0) {
			setOnTop(true);
		} else {
			setOnTop(false);
		}
	};

	useEffect(() => {
		if (!arrayPaths.includes(router.pathname) || isErrorPage) {
			return;
		}

		headerClass();
		window.onscroll = function () {
			headerClass();
		};

		if (router.query && router.query.showCart === "true") {
			setShowSlider(true);
		} else {
			setShowSlider(false);
		}
	}, []);

	useEffect(() => {
		if (router.query && router.query.showCart === "true") {
			setShowSlider(true);
		} else {
			setShowSlider(false);
		}
	}, [router.query.showCart]);

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const closeSearch = () => {
		setSearchOpen(false);
	};

	// on click outside
	useOnClickOutside(navRef, closeMenu);
	useOnClickOutside(searchRef, closeSearch);

	console.log(router.query);

	return (
		<header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
			<Slide direction="left" in={showSlider} mountOnEnter unmountOnExit>
				<div className="bg-red-500/100 w-full md:w-1/2 flex flex-col h-screen fixed right-0 z-50">
					<ShoppingCart />
				</div>
			</Slide>
			<div className={`${showSlider ? "hidden" : "container"}`}>
				<Link href="/">
					<a>
						<h1 className="site-logo">
							<Logo />
							E-Shop
						</h1>
					</a>
				</Link>
				<nav
					ref={navRef}
					className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
				>
					<Link href="/products">
						<a>Products</a>
					</Link>
					<a href="#">Inspiration</a>
					<a href="#">Rooms</a>
					<button className="site-nav__btn">
						<p>Account</p>
					</button>
				</nav>

				<div className="site-header__actions">
					<button
						ref={searchRef}
						className={`search-form-wrapper ${
							searchOpen ? "search-form--active" : ""
						}`}
					>
						<form className={`search-form`}>
							<i
								className="icon-cancel"
								onClick={() => setSearchOpen(!searchOpen)}
							></i>
							<input
								type="text"
								name="search"
								placeholder="Enter the product you are looking for"
							/>
						</form>
						<i
							onClick={() => setSearchOpen(!searchOpen)}
							className="icon-search"
						></i>
					</button>
					{/* <Link href="/cart"> */}
					{/* onClick={() => dispatch(showCart())} */}
					<button
						className="btn-cart"
						onClick={() => {
							Router.push({ query: {...router.query, showCart : "true"} });
						}}
					>
						<i className="icon-cart"></i>
						{cartItems.length > 0 && (
							<span className="btn-cart__count">{cartItems.length}</span>
						)}
					</button>
					{/* </Link> */}
					<Link href="/login">
						<button className="site-header__btn-avatar">
							<i className="icon-avatar"></i>
						</button>
					</Link>
					<button
						onClick={() => setMenuOpen(true)}
						className="site-header__btn-menu"
					>
						<i className="btn-hamburger">
							<span></span>
						</i>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
