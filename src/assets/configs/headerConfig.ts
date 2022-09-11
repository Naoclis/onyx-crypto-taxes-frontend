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

export { futureHeader, spotHeader, binanceOldTransactionHeader, binanceTransactionHeader, nexoHeader, coldWalletOtherHeader };