interface hair {
    color: string;
    type: string;
}

interface coordinates {
    lat: number;
    lng: number;
}

interface address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: coordinates;
    country: string;
}

interface bank{
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface company {
    department: string;
    name: string;
    title: string;
    address: address;
}

interface crypto {
    coin: string;
    wallet: string;
    network: string;
}

interface userInterface {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: hair;
    ip: string;
    adress: address;
    macAddress: string;
    university: string;
    bank: bank;
    company: company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: crypto;
    role: string;
}

interface userListInterface {
    users: userInterface[];
    total: number;
    skip: number;
    limit: number;
}

export type { userInterface, userListInterface };