import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

const API_URL = "http://localhost:1337";

async function uploadFlags() {
    try {
        const response = await fetch(`${API_URL}/api/i18n/locales`);
        if (!response.ok) {
            throw new Error('Failed to fetch locales');
        }

        const countriesCreated = [];

        const locales = await response.json();
        for (const locale of locales) {
            const code = locale.code;
            const data = fs.readFileSync(`countries/${code}/countries.json`, 'utf8');
            const countries = JSON.parse(data);
            console.log(countriesCreated);

            for (const country of countries) {
                const alpha2 = country.alpha2;
                const formData = new FormData();

                let countryResponse;

                if (code === "en") {
                    formData.append('files.flag', fs.createReadStream(`flags/128x128/${alpha2}.png`), `${alpha2}.png`);

                    formData.append('data', JSON.stringify({
                        code: alpha2,
                        name: country.name,
                        locale: code
                    }));
                    countryResponse = await fetch(`${API_URL}/api/countries`, {
                        method: 'POST',
                        body: formData
                    });

                } else {
                    const countryCreatedRes = await fetch(`${API_URL}/api/countries/${countriesCreated[alpha2]}?locale=en&populate=*`);
                    const countryCreated = await countryCreatedRes.json();
                    countryCreated.data.attributes.locale = code;
                    countryCreated.data.attributes.name = country.name;
                    countryCreated.data.attributes.flag = countryCreated.data.attributes.flag.data.id


                    formData.append('data', JSON.stringify({
                        ...countryCreated.data.attributes
                    }));

                    console.log(countryCreated.data.attributes);

                    countryResponse = await fetch(`${API_URL}/api/countries/${countriesCreated[alpha2]}/localizations`, {
                        method: 'POST',
                        body: formData
                    });
                }

                const countryData = await countryResponse.json();

                if (code === "en") {
                    countriesCreated[alpha2] = countryData.data.id;
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

await uploadFlags();
