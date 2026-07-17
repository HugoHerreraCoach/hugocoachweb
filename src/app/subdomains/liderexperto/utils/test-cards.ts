// utils/test-cards.ts
export interface TestCard {
  number: string;
  cvv: string;
  month: string;
  year: string;
  name: string;
  type: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS';
  expectedResult: 'success' | 'insufficient_funds' | 'expired' | 'invalid';
}

export const TEST_CARDS: TestCard[] = [
  {
    number: '4111 1111 1111 1111',
    cvv: '123',
    month: '12',
    year: '2025',
    name: 'Test User',
    type: 'VISA',
    expectedResult: 'success'
  },
  {
    number: '5555 5555 5555 4444',
    cvv: '123',
    month: '12',
    year: '2025',
    name: 'Test User',
    type: 'MASTERCARD',
    expectedResult: 'success'
  },
  {
    number: '4000 0000 0000 0127',
    cvv: '123',
    month: '12',
    year: '2025',
    name: 'Test User',
    type: 'VISA',
    expectedResult: 'insufficient_funds'
  },
  {
    number: '3782 8224 6310 005',
    cvv: '1234',
    month: '12',
    year: '2025',
    name: 'Test User',
    type: 'AMEX',
    expectedResult: 'success'
  }
];

