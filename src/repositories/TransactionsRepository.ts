/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        return (sum += transaction.value);
      }
      return sum;
    }, 0);

    const income = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return (sum += transaction.value);
      }
      return sum;
    }, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
