// Authenticate
export const registerFunderUrl = '/api/v1/authenticate/register-funder';
export const loginFunderUrl = '/api/v1/authenticate/login-funder';
export const registerCompanyUrl = '/api/v1/authenticate/register-company';
export const loginCompanyUrl = '/api/v1/authenticate/login-company';

// Bills
export const billsUrl =  "/api/v1/bills/get-all-bills?skip=0&count=10";
export const myBillsUrl = "/api/v1/bills/get-my-bills";
export const updateBillUrl = "/api/v1/bills/update-bill";
export const getBillsForCompanyUrl = "/api/v1/bills/get-bills-for-company?skip=0&count=100&id=";
export const getBillsValueStatusUrl = "/api/v1/bills/get-bills-value-with-status?status=";


// SupplyChain
export const addSupplyChainUrl =  "/api/v1/supplychain/add-supplychain";
export const supplyChainDetailsUrl =  "/api/v1/supplychain/get-supplychain-by-id?supplychainId=";
export const getAllSupplyChainsUrl =  "/api/v1/supplychain/get-all-supplychains?skip=0&count=10";
export const getSupplyChainsForCompanyUrl =  "/api/v1/supplychain/get-supplychains-for-company";
export const getSupplyChainsForMyCompanyUrl =  "/api/v1/supplychain/get-supplychains-for-my-company";
export const updateSupplyChainUrl =  "/api/v1/supplychain/get-supplychains-for-my-company";
export const supplyChainForCompanyUrl =  "/api/v1/supplychain/get-supplychains-for-company?skip=0&count=100&companyId=";
export const tooltipSupplyChainForCompanyUrl = "/api/v1/supplychain/get-tool-tip-for-supplychain-for-company"

// Credits
export const creditMyCompanyUrl =  "/api/v1/credits/get-credit-for-my-company";
export const creditCompanyUrl = "/api/v1/credits/get-credit-for-company";
export const addFinancialInstrumentsUrl= "/api/v1/credits/add-financial-instruments-to-company";
export const transferCreditUrl = "/api/v1/credits/transfer-credit";

// ProductCategory
export const productCategoriesUrl =  "/api/v1/product-category/get-all-product-categories?skip=0&count=100";
export const productCategoriesCompanyUrl = "/api/v1/product-category/get-product-categories-for-company";
export const productCategoriesMyCompanyUrl= "/api/v1/product-category/get-product-categories-for-my-company";
export const addProductCategoryUrl = "/api/v1/product-category/add-product-category";
export const productUnitsUrl = "/api/v1/product-category/get-all-product-units?skip=0&count=100";

// Transactions
export const transactionsUrl = "/api/v1/transactions/get-all-transactions?skip=0&count=100";
export const transactionCompanyUrl = "/api/v1/transactions/get-transaction-for-company";
export const transactionMyCompanyUrl =  "/api/v1/transactions/get-transaction-for-my-company?skip=0&count=100";

// Users
export const companyByIdUrl = "/api/v1/users/get-company-by-id";
export const companyDetailsByIdUrl = "/api/v1/users/get-company-details-by-id?companyId=";
export const companiesUrl =  "api/v1/users/get-companies?skip=0&count=100&verifired=true";
export const myCompanyInfoUrl = "/api/v1/users/get-my-company-info";
export const updateCompanyUrl = "/api/v1/users/update-company";
export const updateCompanyStatusUrl = "/api/v1/users/update-company-status?companyId=";
export const addProductUnit = "/api/v1/product-category/add-product-unit-category";

// Dashboard
export const getCreditsEverUrl = "/api/v1/dashboard/get-all-credits-ever";

export const getCreditsEverForCompanyUrl = "/api/v1/dashboard/get-all-credits-ever-for-company?companyId=";

export const getReceivedCreditForCompanyUrl = "/api/v1/dashboard/get-all-received-for-company?companyId=";

export const getAllTransferForCompanyUrl = "/api/v1/dashboard/get-all-transfer-for-company?companyId=";

export const getAllTransferAmountAllProductForCompanyUrl = "/api/v1/dashboard/get-transfer-amount-all-product-for-company?companyId=";

export const geTransferAmountBasedOnProductForCompanyUrl = "/api/v1/dashboard/get-transfer-amount-based-on-product-for-company";

export const getReceivedAmountAllProductForCompanyUrl = "/api/v1/dashboard/get-received-amount-all-product-for-company?companyId=";

export const getReceivedAmountBaseProductForCompany =  "/api/v1/dashboard/get-received-amount-based-on-product-for-company";

export const getAveragePriceProductForCompany = "/api/v1/dashboard/get-average-price-for-product-for-company";

export const getAveragePriceForAllProductForCompany = "/api/v1/dashboard/get-average-price-for-all-product-for-company?companyId=";

// Invoices
export const addNewInvoiceUrl = "/api/v1/invoice/add-new-invoice";
export const InvoicesMyCompanyUrl = "/api/v1/invoice/get-invoices-for-my-company?skip=0&count=100";
export const UpdateInvoiceUrl = "/api/v1/invoice/update-invoice-status?invoiceId=";

