//import  countries   from '@/app/data/countries.json';
import  userTypes   from '@/app/data/userType.json';

const formattedUsers = userTypes.map((userType) =>({
    value: userType.type,
    label: userType.type

}));

const useUserTypes = () => {
    const getAll = () => formattedUsers;

    const getByValue = (value: string) => {
    return formattedUsers.find((item) => item.value);
}
return {
    getAll,
    getByValue
};
}

export default useUserTypes;