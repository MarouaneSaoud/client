import React, {useState} from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import Social from "./common/social";
import { ToastContainer } from "react-toastify";
import useDarkMode from "@/hooks/useDarkMode";
import loginpic from "../../assets/images/all-img/loginpic.png"

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import bgImage from "@/assets/images/all-img/login-bg.png";


const login2 = () => {

  const [isDark] = useDarkMode();
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
                  <div className="text-center 2xl:mb-10 mb-4">
                    <h4 className="font-medium">Sign in</h4>
                    <div className="text-slate-500 dark:text-slate-400 text-base">
                      Sign in to your account to start using Numotronic
                    </div>
                  </div>
                  <LoginForm />

            {/*      <div className="md:max-w-[345px] mt-6 mx-auto font-normal text-slate-500 dark:text-slate-400mt-12 uppercase text-sm">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-slate-900 dark:text-white font-medium hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>*/}
                </div>
              </div>
            </div>
            <div
                className="left-column bg-cover bg-no-repeat bg-center "
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

export default login2;
