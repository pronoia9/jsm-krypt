import { useTransactionContext } from '../contexts/TransactionContext';

import dummyData from '../utils/dummyData';
import { sliceAddress } from '../utils/sliceAddress';

const TransactionsCard = ({ id, url, message, timestamp, addressFrom, amount, addressTo }) => (
  <div className='bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl'></div>
);

const Transactions = () => {
  const { currentAccount } = useTransactionContext();

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        {currentAccount ? (
          <h3 className='text-white text-3xl text-center my-2'>Latest Transactions</h3>
        ) : (
          <h3 className='text-white text-3xl text-center my-2'>Connect your account to see the latest transactions</h3>
        )}

        <div className='flex flex-wrap justify-center items-center mt-10'>
          {dummyData.reverse().map((item, i) => (
            <TransactionsCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;