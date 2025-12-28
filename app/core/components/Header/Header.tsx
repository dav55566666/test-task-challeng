'use client';
import { useEffect, useRef } from "react";
import { ETheme } from "../../common"
import { Button, CustomLink, EBgType, ELogoDirection, Logo } from "../../uikit"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (self.scroll() > 100) {
          headerRef.current?.classList.add('sticky');
        } else {
          headerRef.current?.classList.remove('sticky');
        }
      },
    });
  }, []);
  return (
    <header className="header" ref={headerRef}>
        <div className="header__container container">
            <div className="header__left">
                <Logo direction={ELogoDirection.IN_HEADER} />
                <ul>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='Discover' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='creators' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='Sell' /></li>
                    <li><CustomLink href='/' theme={ETheme.DARK} value='stats' /></li>
                </ul>
            </div>
            <div className="header__right">
              <Button theme={ETheme.DARK} bgType={EBgType.FILL} value='Connect Wallet' />
            </div>
        </div>
    </header>
  )
}

export default Header