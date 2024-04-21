import { Link, NavLink, useLocation, useNavigate } from "@remix-run/react";
import { LegacyRef, forwardRef, useEffect, useRef, useState } from "react";
import { Leads1LLCLogoMark } from "~/components/Leads1LLCLogoMark";
import { FiAlignJustify } from 'react-icons/fi'
import { AiFillCloseCircle } from "react-icons/ai";
import { concatClassNames } from "~/utils/utils";
import { strapiResourceUrl } from "~/services/strapi";
import Select from "react-select"
import { COLORS } from "~/styles/variables";

export type ISupportedLanguages = {
  code: string;
  name: string;
  flag: string;
};

export type ILink = {
  title: string;
  url: string;
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
    if (path.includes('/home')) {
      navigate(`/${lang}`);
    }
    navigate(path);
  };


  const commonClassName = "flex items-center justify-center duration-300 ease-in-out";
  const commonHoverClassName = "hover:border-primary-500 hover:text-primary-500 hover:font-bold hover:border-solid hover:border-b hover:text-dark-500";
  const commonActiveClassName = commonHoverClassName.replaceAll('hover:', '');

  const selectOptions = supportedLanguages.map((supportedLanguage) => {
    return {
      value: supportedLanguage.code,
      label: supportedLanguage.code.split('-')[0],
      image: strapiResourceUrl(supportedLanguage.flag)
    }
  });

  return (
    <ul id="nav" ref={ref} className={className}>
      {links.map((link, index) => {
        const linkTo = `/${lang}${link.url}`;
        return (
          <div key={index}>
            <NavLink onClick={onClick} className={({ isActive }) => {
              if (isActive) {
                return commonActiveClassName;
              }
              return concatClassNames("text-center", commonClassName, commonHoverClassName);
            }} key={index} to={linkTo}>
              <li className="flex w-full"><div> {link.title}</div></li>
            </NavLink>
          </div>

        );
      })}

      <li
        className={commonClassName}
        style={{ width: "100%" }}>
        <Select
          isSearchable={false}
          styles={{
            menuList(base, props) {
              return {
                ...base,
                border: "solid",
                borderWidth: "1.5px",
                borderColor: COLORS["primary-300"]
              }
            },
            singleValue(base, props) {
              return {
                ...base,
                color: COLORS["primary-300"]
              }
            },
            control(base, props) {
              return {
                ...base,
                background: COLORS["dark-500"],
                borderColor: COLORS["primary-300"],
                color: COLORS["primary-300"],
                ":hover": {
                  borderColor: COLORS["primary-300"]
                }
              }
            },
            option: (base, status) => {
              return {
                ...base,
                color: status.isFocused ? COLORS["dark-500"] : COLORS["primary-300"],
                background: status.isFocused ? COLORS["primary-300"] : COLORS["dark-500"],
               
              }
            },
            menu: (base, status) => {
              return {
                ...base,
                background: COLORS["dark-500"]
              }
            }

          }}

          defaultValue={selectOptions.find(option => option.value === lang)}
          formatOptionLabel={country => (
            <div className="flex gap-2">
              <img width={20} src={country.image} alt="country-image" />
              <span>{country.label}</span>
            </div>
          )}
          onChange={(e) => {
            handleLangSelect(e!.value);
            if (onClick) onClick();
          }} name="lang" options={selectOptions} />
      </li>

      <li
        onClick={onClick}
        className={
          concatClassNames(
            "hidden sm:flex p-2 w-full text-center bg-primary-500 text-dark-500 font-bold ease duration-300",
            "hover:border-solid hover:border hover:border-light-500 hover:bg-dark-300 hover:text-primary-500",
            commonClassName,
          )

        }>
        <Link to={contact.url}>{contact.title}</Link>
      </li>
    </ul>
  );
});

export function Nav({ lang, supportedLanguages, links, contact }: NavProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const menuBarRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    menuBarRef.current?.classList.toggle('scale-y-100');
  }, []);

  useEffect(() => {
    if (toggle) {
      menuBarRef.current?.classList.toggle('scale-y-0');
      menuBarRef.current?.classList.toggle('scale-y-100');
    } else {
      menuBarRef.current?.classList.toggle('scale-y-100');
      menuBarRef.current?.classList.toggle('scale-y-0');
    }
  }, [toggle]);

  return (
    <nav className="w-full border-solid border-b border-primary-500">
      <div className="w-full relative border-4 px-8 py-4 flex w-screen justify-between items-center bg-dark-500 z-50">
        <NavLink to={`/${lang}/home`}>
          <Leads1LLCLogoMark size={60} foregroundColor="#BDBDBD" backgroundColor="#1F1F1F" />
        </NavLink>

        {!toggle ?
          <FiAlignJustify onClick={() => setToggle(true)} size={24} className="text-primary-100 md:hidden" /> :
          <AiFillCloseCircle onClick={() => setToggle(false)} size={24} className="text-primary-100 md:hidden" />
        }

        <div className="hidden duration-200 ease-in md:flex">
          <NavLinks className="whitespace-nowrap gap-2 flex items-center text-light-500 font-thin" lang={lang} links={links} supportedLanguages={supportedLanguages} contact={contact} />
        </div>
      </div>

      <Link className="w-full md:hidden flex items-center justify-center p-4 bg-primary-500 text-dark-500 font-bold" to={contact.url}>{contact.title}</Link>

      <NavLinks onClick={() => {
        setToggle(false);
      }} ref={menuBarRef} className="md:hidden w-full absolute gap-2 origin-top flex flex-col items-center bg-dark-500 left-0 text-primary-500 duration-200 delay-100 ease-in pb-4 border-solid border-b" lang={lang} contact={contact} links={links} supportedLanguages={supportedLanguages}></NavLinks>

    </nav>

  );
}
