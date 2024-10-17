
import { CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
    UserPoolId: 'us-west-2_AMexENVv6',
    ClientId: '51dvqq4pk0s3nbj8n3835q3fgf',
};

export const userPool = new CognitoUserPool(poolData);
