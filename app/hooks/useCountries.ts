//import  countries   from '@/app/data/countries.json';
import  countries   from '@/app/data/provincies.json';

const formattedCountries = countries.map((country) =>({
    value: country.Abbreviation,
    label: country.Name,
    //flag: country.flag,
    latlng: country.LatLng,
    region: country.Capital
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
}
return {
    getAll,
    getByValue
};
}

export default useCountries;