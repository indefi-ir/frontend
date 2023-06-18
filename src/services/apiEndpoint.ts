// Authenticate
export const registerFunderUrl = '/api/v1/authenticate/register-funder';
export const loginFunderUrl = '/api/v1/authenticate/login-funder';
export const registerCompanyUrl = '/api/v1/authenticate/register-company';
export const loginCompanyUrl = '/api/v1/authenticate/login-company';

// Bills
export const billsUrl =  "/api/v1/bills/get-all-bills";
export const myBillsUrl = "/api/v1/bills/get-my-bills";
export const updateBillUrl = "/api/v1/bills/update-bill";

// Credits
export const creditMyCompanyUrl =  "/api/v1/credits/get-credit-for-my-company";
export const creditCompanyUrl = "/api/v1/credits/get-credit-for-company";
export const addFinancialInstrumentsUrl= "/api/v1/credits/add-financial-instruments-to-company";
export const transferCreditUrl = "/api/v1/credits/transfer-credit";

// ProductCategory
export const productCategoriesUrl =  "/api/v1/product-category/get-all-product-categories";
export const productCategoriesCompanyUrl = "/api/v1/product-category/get-product-categories-for-company";
export const productCategoriesMyCompanyUrl= "/api/v1/product-category/get-product-categories-for-my-company";
export const addProductCategoryUrl = "/api/v1/product-category/add-product-category";

// Transactions
export const transactionsUrl = "/api/v1/transactions/get-all-transactions";
export const transactionCompanyUrl = "/api/v1/transactions/get-transaction-for-company";
export const transactionMyCompanyUrl =  "/api/v1/transactions/get-transaction-for-my-company";

// Users
export const companyByIdUrl = "/api/v1/users/get-company-by-id";
export const companyDetailsByIdUrl = "/api/v1/users/get-company-details-by-id";
export const companiesUrl =  "/api/v1/users/get-companies-mock";
export const myCompanyInfoUrl = "/api/v1/users/get-my-company-info";
export const updateCompanyUrl = "/api/v1/users/update-company";
