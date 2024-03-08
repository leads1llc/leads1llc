import { Link } from "@remix-run/react";

export type TrustedCompaniesProps = {
    title: string;
    companies: [{
        pageUrl: string;
        logo: { url: string }
    }];
};

export function TrustedCompaniesSection(props: TrustedCompaniesProps) {
    return (
        <section className="relative flex flex-col sm:flex-row w-full px-4 sm:px-12 py-4 border-box justify-between items-center border-solid border-b border-dark-500">
            <h2 className="w-full font-light">{props.title}</h2>
            {/* <div className="hidden cursor-pointer sm:flex absolute flex flex-col items-center justify-center left-1/2  w-12 animate-bounce whitespace-nowrap">
                <div>See below</div>
                <FaArrowDown></FaArrowDown>
            </div> */}
            <ul className="flex flex-wrap w-full gap-4 justify-start items-center sm:justify-end">
                {props.companies.map((company, key) => {
                    return (
                        <li key={key}><Link to={company.pageUrl} target="_blank">
                            <img className="w-16" src={company.logo.url} />
                        </Link></li>
                    );
                })}
            </ul>
        </section>
    );
}