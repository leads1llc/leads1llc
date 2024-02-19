import { Link, NavLink, useNavigate } from "@remix-run/react";
import { LegacyRef, forwardRef, useEffect, useRef, useState } from "react";
import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";
import { FiAlignJustify } from 'react-icons/fi'
import { AiFillCloseCircle } from "react-icons/ai";
import { concatClassNames } from "~/utils/utils";

export type ISupportedLanguages = {
  code: string;
  name: string;
  flag: string;
};

export type ILink = {
  title: string;
  to: string;
}

export type NavProps = {
  lang: string;
  supportedLanguages: ISupportedLanguages[];
  links: ILink[];
  contact: ILink;
};

export type NavLinksProps = {
  supportedLanguages: ISupportedLanguages[];
  lang: string;
  links: ILink[];
  contact: ILink;
  className?: string;
  ref?: LegacyRef<HTMLUListElement>;
  onClick?: () => void;
};


const NavLinks = forwardRef<HTMLUListElement, NavLinksProps>((props, ref) => {
  const { links, lang, supportedLanguages, contact, className, onClick } = props;
  const navigate = useNavigate();

  const handleLangSelect = (langSelected: string) => {
    const path = location.pathname.replace(lang, langSelected) + location.hash;
    navigate(path);
  };


  const commonClassName = "w-full flex items-center justify-center";
  const commonHoverClassName = "hover:bg-primary-500 hover:text-dark-500";

  return (
    <ul ref={ref} className={className}>
      {links.map((link, index) => {
        const linkTo = `/${lang}${link.to}`;
        return (
          <NavLink onClick={onClick} className={concatClassNames("p-2 w-full text-center", commonClassName, commonHoverClassName)} key={index} to={linkTo}>
            <li> {link.title}</li>
          </NavLink>
        );
      })}

      <li
        className={commonClassName}>
        <select
          className="p-2 bg-transparent border"
          onChange={(e) => {
            handleLangSelect(e.target.value);
            if (onClick) onClick();
          }}
          name="lang" id="">
          {supportedLanguages.map((language) => (<option selected={language.code === lang} value={language.code}>{language.flag} {language.code}</option>))}
        </select>
      </li>

      <li
        onClick={onClick}
        className={
          concatClassNames(
            "hidden sm:flex p-2 w-full text-center bg-primary-100 text-dark-500",
            commonClassName,
            commonHoverClassName
          )

        }>
        <Link to={contact.to}>{contact.title}</Link>
      </li>
    </ul>
  );
});

export function Nav({ lang, supportedLanguages, links, contact }: NavProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const menuBarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    console.log(toggle, menuBarRef);
    if (toggle) {
      menuBarRef.current?.classList.toggle('scale-y-0');
      menuBarRef.current?.classList.toggle('scale-y-100');
    } else {
      menuBarRef.current?.classList.toggle('scale-y-100');
      menuBarRef.current?.classList.toggle('scale-y-0');
    }
  }, [toggle]);

  return (
    <nav>
      <div className="relative border-4 p-4 flex w-screen justify-between items-center bg-dark-500 z-50">
        <NavLink to={`/${lang}/home`}>
          <Leads1LLCLogoMark size={70} foregroundColor="#BDBDBD" backgroundColor="#1F1F1F" />
        </NavLink>

        {!toggle ?
          <FiAlignJustify onClick={() => setToggle(true)} size={24} className="text-primary-100 md:hidden" /> :
          <AiFillCloseCircle onClick={() => setToggle(false)} size={24} className="text-primary-100 md:hidden" />
        }

        <div className="hidden duration-200 ease-in md:flex">
          <NavLinks className="flex items-center text-primary-100 gap-2" lang={lang} links={links} supportedLanguages={supportedLanguages} contact={contact} />
        </div>
      </div>

      <Link className="md:hidden flex items-center justify-center p-4 bg-primary-500 text-dark-500" to={contact.to}>{contact.title}</Link>
      
      <NavLinks onClick={() => {
        setToggle(false);
      }} ref={menuBarRef} className="absolute scale-y-0 origin-top overflow-hidden flex flex-col items-center bg-dark-500 left-0 w-full text-primary-100 duration-200 delay-100 ease-in" lang={lang} contact={contact} links={links} supportedLanguages={supportedLanguages}></NavLinks>

    </nav>

  );
}
