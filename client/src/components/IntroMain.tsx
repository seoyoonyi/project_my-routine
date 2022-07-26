import { Link } from "react-router-dom";

const IntroMain = () => {
  return (
    <section className="relative">
      <div
        className="absolute bottom-0 transform -translate-x-1/2 pointer-events-none left-1/2"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-40 pb-12 md:pt-40 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-4 font-extrabold leading-[1.1] tracking-tight text-7xl ">
              새로운 나를 만드는 습관
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 ">
                EGO ROUTINE
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="mb-8 text-xl text-gray-600">
                매일매일 달라진 나를
                <br />
                에고루틴과 함께 만들어보세요!
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
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
              </div>
            </div>
          </div>

          <div>
            <div className="relative flex justify-center mb-8">
              <div className="flex flex-col justify-center">
                <img
                  className="mx-auto"
                  src="images/hero-image.png"
                  width="768"
                  height="432"
                  alt="Hero"
                />
                <svg
                  className="absolute inset-0 h-auto max-w-full mx-auto md:max-w-none"
                  width="768"
                  height="432"
                  viewBox="0 0 768 432"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                      id="hero-ill-a"
                    >
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="99.24%"
                      id="hero-ill-b"
                    >
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="48.57%" />
                      <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient
                      cx="21.152%"
                      cy="86.063%"
                      fx="21.152%"
                      fy="86.063%"
                      r="79.941%"
                      id="hero-ill-e"
                    >
                      <stop stopColor="#4FD1C5" offset="0%" />
                      <stop stopColor="#81E6D9" offset="25.871%" />
                      <stop stopColor="#338CF5" offset="100%" />
                    </radialGradient>
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle
                      fillOpacity=".04"
                      fill="url(#hero-ill-a)"
                      cx="384"
                      cy="216"
                      r="128"
                    />
                    <circle
                      fillOpacity=".16"
                      fill="url(#hero-ill-b)"
                      cx="384"
                      cy="216"
                      r="96"
                    />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg>
              </div>
              <button
                className="absolute flex items-center p-4 font-medium transform -translate-y-1/2 bg-white rounded-full shadow-lg top-full group"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-controls="modal"
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-400 fill-current group-hover:text-blue-600"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Watch the full video (2 min)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroMain;
