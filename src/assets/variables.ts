const years: Array<number> = [2014, 2015, 2016, 2017, 2018, 2019, 2020];

const months: Array<any> = [
    { _id: '01', label: 'Janvier' },
    { _id: '02', label: 'Février' },
    { _id: '03', label: 'Mars' },
    { _id: '04', label: 'Avril' },
    { _id: '05', label: 'Mai' },
    { _id: '06', label: 'Juin' },
    { _id: '07', label: 'Juillet' },
    { _id: '08', label: 'Août' },
    { _id: '09', label: 'Septembre' },
    { _id: '10', label: 'Octobre' },
    { _id: '11', label: 'Novembre' },
    { _id: '12', label: 'Décembre' }
];

const futureHeader: Array<any> = [
    { label: 'Date de Transaction', index: 0 },
    { label: 'Paire', index: 4 },
    { label: 'Type', index: 1 },
    { label: 'Quantité', index: 2 },
    { label: 'Asset', index: 3 },
];

const spotHeader: Array<any> = [
    { label: 'Date de Transaction', index: 0 },
    { label: 'Paire', index: 1 },
    { label: 'Type Ordre', index: 2 },
    { label: 'Quantité', index: 5 },
    { label: 'Prix', index: 3 },
    { label: 'Montant', index: 4 },
    { label: 'Frais (qté)', index: 6 },
    { label: 'Frais (mnt)', index: 7 },
];

export { years, months, futureHeader, spotHeader };