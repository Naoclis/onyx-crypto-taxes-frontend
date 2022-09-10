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
    { label: 'Cause du rejet', index: 5 },
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
    { label: 'Cause du rejet', index: 8 },
];

const binanceOldTransactionHeader: Array<any> = [
    { label: 'Date de Transaction', index: 0 },
    { label: 'Marché', index: 1 },
    { label: 'Type Ordre', index: 2 },
    { label: 'Quantité', index: 4 },
    { label: 'Asset', index: 3 },
    { label: 'Cause du rejet', index: 6 },
];

const binanceTransactionHeader: Array<any> = [
    { label: 'Date de Transaction', index: 1 },
    { label: 'Marché', index: 2 },
    { label: 'Type Ordre', index: 3 },
    { label: 'Quantité', index: 5 },
    { label: 'Asset', index: 4 },
    { label: 'Cause du rejet', index: 7 },
];

const nexoHeader: Array<any> = [
    { label: 'Date de Transaction', index: 9 },
    { label: 'Type Ordre', index: 1 },
    { label: 'Quantité (IN)', index: 2 },
    { label: 'Asset (IN)', index: 3 },
    { label: 'Quantité (OUT)', index: 4 },
    { label: 'Asset (OUT)', index: 5 },
    { label: 'Détails', index: 6 },
    { label: 'Cause du rejet', index: 10 },
];
//"Txhash","UnixTimestamp","DateTime","From","To","Value","ContractAddress","TokenName","TokenSymbol"
const coldWalletOtherHeader: Array<any> = [
    { label: 'Date de Transaction', index: 2 },
    { label: 'From', index: 3 },
    { label: 'To', index: 4 },
    { label: 'Value', index: 5 },
    { label: 'TokenName', index: 7 },
    { label: 'TokenSymbol', index: 8 },
    { label: 'Cause du rejet', index: 9 },
];

export { years, months, futureHeader, spotHeader, binanceOldTransactionHeader, binanceTransactionHeader, nexoHeader, coldWalletOtherHeader };