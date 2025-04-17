function buildTigoW2AResponse({
  txnId,
  refId,
  result = 'TS',
  errorCode = 'error000',
  errorDesc = '',
  msisdn,
  content = 'Payment received successfully',
}: {
  txnId: string;
  refId: string;
  result?: 'TS' | 'TF';
  errorCode?: string;
  errorDesc?: string;
  msisdn: string;
  content?: string;
}): string {
  return `
  <COMMAND>
    <TYPE>SYNC_BILLPAY_RESPONSE</TYPE>
    <TXNID>${txnId}</TXNID>
    <REFID>${refId}</REFID>
    <RESULT>${result}</RESULT>
    <ERRORCODE>${errorCode}</ERRORCODE>
    <ERRORDESC>${errorDesc}</ERRORDESC>
    <MSISDN>${msisdn}</MSISDN>
    <FLAG>Y</FLAG>
    <CONTENT>${content}</CONTENT>
  </COMMAND>
  `.trim();
}


export default buildTigoW2AResponse;
