// lib/test-data.ts
export const TEST_CARDS = {
  visa: {
    approved: '4097440000000004',
    declined: '4097440000000012',
    pending: '4097440000000020'
  },
  mastercard: {
    approved: '5178200000000007',
    declined: '5178200000000015',
    pending: '5178200000000023'
  },
  amex: {
    approved: '345678000000007',
    declined: '345678000000015'
  },
  diners: {
    approved: '36020000000009',
    declined: '36020000000017'
  }
};

export const TEST_RESPONSES = {
  APPROVED: '1',
  DECLINED: '4',
  PENDING: '14',
  ERROR: '104'
};