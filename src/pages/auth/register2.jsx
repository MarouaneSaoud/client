import React from "react";
import { Link } from "react-router-dom";
import RegForm from "./common/reg-from";
import Social from "./common/social";
import useDarkmode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import bgImage from "@/assets/images/all-img/login-bg.png";
import loginpic from "../../assets/images/all-img/loginpic.png";
const register2 = () => {
  const [isDark] = useDarkmode();
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Create an account to start using Dashcode
                  </div>
                </div>
                <RegForm />

                <div className="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Already registered?
                  <Link
                    to="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>

            </div>
          </div>
          <div
            className="left-column bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${loginpic})`,
            }}
          >
            <div className="flex flex-col h-full justify-center ">
              <div className="flex-1 flex flex-col  justify-center items-center"style={{ marginTop: '-250px' }}>
                <Link to="/">
                  <img src={LogoWhite} alt="" className="mb-10" />
                </Link>
              </div>
              <div>
                <div className="black-500-title max-w-[525px] mx-auto pb-20 text-center" style={{ marginBottom: '-55px' }}>
                  Achieve A Greater
                  <span className="font-bold" >  Performance </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default register2;
