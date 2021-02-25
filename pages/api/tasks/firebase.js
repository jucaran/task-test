import admin from "firebase-admin";
import "firebase/firestore";

const firebaseAdminConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDcsC8KH7rP9S9\nQvQEZB3RV+wt5fxfpPAaKF1oDDwME14WQyvgNvDnxLqzpCK8qNH02jBUmxbHTUkD\nHCzu43eVABcPs9UcvTRTufLead2A+/bpp2Ps0xHB0P8yQgkgh2ISb9ZkCwb6M+5n\nejD7MAIAO4N7FjXg7kGDptvPWsi912pRCOHVoBBn6ZPa48BMr4oNXxs0YfgY5b0b\nTZP4fTJsvSceH3qJqbHwSmUTy8ESsGPsIc+TpmpgqAF3/nZsjSBu3t7bDAUGVxMV\n6z7K0y0++0FhSHA7WbmAqK+qqc+mpxr7VrMr3FhhwrGURUlSYGYtOchegN5cy8ce\nNzDnTb+PAgMBAAECggEAG10cFdvXlSktKEhQ8LJxqEcWhoCOGnf1s7vWBAS+fXRS\ntmw2HuCiTtiwyQjgYiiCqLTJknbaNBIieECAG/wV2HMYR3cGjc0Bn/1HPxN0UyQz\nuBfa+iO89zVDHW64Z2j89pbY3c3bbrlJlgw6AlkA1rZ+XIPKDFFfM8bvPHM56rYZ\nBEu87Yvko88zsZodW16NGORYthVcvnpRjX78MmNca1ZqaTOs61rpuveAk1AbSjaT\nZAiNFJRmEU6AB5e69vCE8X+Jw3r5twYIqLdoD09jSfs/v8VRP3d5KdT7o1PE6p2/\n+TQb/2KBacGF1FbE3B81PRfNVzTVXi7moz01OVktIQKBgQDjZffk2DmIVDz4cKQL\naELcM3fVt0KsLH5QuQoDDyVeXUHdRiTBVe+8oTUVXq4g49b0Xli5cbAnsjmEk8PB\naGNby5YqxF+B3e7UbULPQZipHbZmDUSWmmlrzRK6Wn2E4GngbeHBxFkbKK8T3yAw\nyAwoF5Ho4gZOy5lR7zhSNd4nrwKBgQDcCAUVHaFlaz54YKugXzsLlYj6rQLe8vHk\nY3n+jLK/RObIHhc00+vQWCFkG5pLtKY/5Z4WupdzaukoDsxNvP1eL+cH5pvZsOAA\niBir1jF5QKDBEsg2Z0pSC6KjyyWE+k+D0f3mftZYmZJoLz+KNaZGBx5XAuJOa1e8\n14EYkiX+IQKBgCOLWMhIlBWfNTiQQtQVo/3PfbfGQYGwIr5zbgE0aN7rLNRtlmky\nCZsuh6GjfwxdEMh5xtyVzLcnwJ3ciwi8TGuY0ww0Tcl6604BFiRXWIl2v4AMKuBv\nmnLjRz4hzuTqPyJ5ioRDMLpyDYvJoLp/SocpyADi86F1aa3I+sC+8s65AoGAeMjO\nQXEqkAn3GQ24KSkduJY1w6YF1W136+/PoDSMSwL/zQr3okBTSuOWMOYWJUjdmmXq\nCoATc4BUzXCSJnqAe5vAL04gb7fwv1n2cR37upwHovU0gujgm3lXpqJ1zjG6RJqZ\nzlYCRFDJVffZ4Xzh8b8moI0sve+fEkMa0uongQECgYEA2rx+rp/7iVXZBhZXV2j1\nNhyuJYVs3RvHDIYfEWoJV8/H+fmY5v3kBgXULtBsWQrobrOGp1wxahdpTg6hHM6x\nzB5v2l1n5DnifJVmPeINEp4Rs9VsRdwt0+OeYCCaqCZQHdY6uSOE7uIohXZWodQD\ngvvbyFOQ0dX0cfjtgNfPs6Y=\n-----END PRIVATE KEY-----\n",
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509,
};

const adminApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    })
  : admin.app();

export const db = adminApp.firestore();
