/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../common/auth/Auth';
import Column from './Column';

const Header = () => {
	const [top, setTop] = useState(true);
	const auth = useAuth();
	const navigate = useNavigate();

	const onLoginOut = (e: any) => {
		e && e.preventDefault();
		auth.logout();
		navigate('/');
	};

	useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [top]);

	return (
		<header
			className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white ${
				!top && 'backdrop-blur-sm shadow-lg'
			}`}
		>
			<Column>
				<div className="flex items-center justify-between h-16 md:h-20">
					<div className="flex-shrink-0 mr-4">
						<Link to="/" className="flex">
							<h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
								EGO ROUTINE
							</h1>
							<span className="text-[11px] border border-gray-400 rounded-full px-[7px] ml-[5px] flex self-center italic text-gray-400">
								beta
							</span>
						</Link>
					</div>

					<nav className="flex flex-grow">
						<ul className="flex flex-wrap items-center justify-end flex-grow">
							<ul className="flex flex-wrap items-center justify-end flex-grow pr-10">
								<li>
									<Link
										to="/guide"
										className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
									>
										도움말
									</Link>
								</li>
								<li>
									<Link
										to="/price"
										className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
									>
										요금제
									</Link>
								</li>
								<li>
									{auth.token ? (
										<Link
											to="/login"
											className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
											onClick={(e) => onLoginOut(e)}
										>
											로그아웃
										</Link>
									) : (
										<Link
											to="/login"
											className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
										>
											로그인
										</Link>
									)}
								</li>
							</ul>
							<li>
								<Link
									to="/main"
									className="flex items-center px-5 py-3 font-medium text-white bg-gray-900 rounded-lg  hover:bg-[#1ebd53] hover:text-white	"
								>
									<span>무료로 시작하기</span>
									<svg
										className="flex-shrink-0 w-3 h-3 ml-2 mr-1 fill-current text-white-400"
										viewBox="0 0 12 12"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
											fillRule="nonzero"
										/>
									</svg>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</Column>
		</header>
	);
};

export default Header;
