import BillingEarning from './BillingEarning'
import ConnectionHistory from './ConnectionHistory'
import TransactionHistory from './TransactionHistory'
import Status from './Status'
import TimeSheet from './Timesheet'

const index = () => {
  return (
    <div className='w-full mx-auto'>
         {/* <Status /> 
         <TimeSheet />  */}
          {/* <TransactionHistory/> */}
        {/* <BillingEarning />  */}
        <ConnectionHistory/>
    </div>
  )
}

export default index