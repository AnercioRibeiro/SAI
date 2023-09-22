//import  countries   from '@/app/data/countries.json';
import  provincies   from '@/app/data/provincies.json';

const formattedProvincies = provincies.map((province) =>({
    value: province.Abbreviation,
    label: province.Name,
    //flag: country.flag,
    latlng: province.LatLng,
    region: province.Capital
}));

const useCountries = () => {
    const getAll = () => formattedProvincies;

    const getByValue = (value: string) => {
    return formattedProvincies.find((item) => item.value === value);
}
return {
    getAll,
    getByValue
};
}

export default useCountries;