import { confirmTransactionService, initiateTransactionService } from "../service/transactionService";

const TransactionHandler = () => {
  const initiateTransactionHandler = async (data) => {
    return initiateTransactionService(data);
  };

  const confirmTransactionHandler = async (data) => {
    try {
      const res = await confirmTransactionService(data);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { initiateTransactionHandler, confirmTransactionHandler };
};

export default TransactionHandler;
