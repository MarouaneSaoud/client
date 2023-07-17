import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import whoAuth from "@/services/auth/ath.who.js";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
        {whoAuth.isCurrentUserAdmin() &&
            <Link to="/dashboard">
            {width >= breakpoints.xl ? (
                <img src={isDark ? LogoWhite : MainLogo} alt="" />
            ) : (
                <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" />
            )}
        </Link>}
        {whoAuth.isCurrentUserManager() &&
            <Link to="/manager/dashboard">
                {width >= breakpoints.xl ? (
                    <img src={isDark ? LogoWhite : MainLogo} alt="" />
                ) : (
                    <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" />
                )}
            </Link>}

    </div>
  );
};

export default Logo;
