export async function callingCodesWithFlags() {
    const countryRes = await fetch('https://restcountries.com/v3.1/region/americas?fields=idd,flag');
    const countryJson = await countryRes.json();

    let countries = countryJson.map(country => {
        let callingCode = country.idd.root;
        if (!(country.idd.suffixes.length > 1)) {
            callingCode += country.idd.suffixes.join();
        }
        const flag = country.flag;

        return {
            callingCode,
            flag
        }
    });

    return countries;
}

