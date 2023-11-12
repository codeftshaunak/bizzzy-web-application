import BillingEarning from './BillingEarning'
import ConnectionHistory from './ConnectionHistory'
import TimeSheet from './TimeSheet'
import TransactionHistory from './TransactionHistory'
import Status from './status'

const index = () => {
  return (
    <div className='w-full mx-auto'>
         <Status /> 
         <TimeSheet /> 
          {/* <TransactionHistory/> */}
        {/* <BillingEarning />  */}
        {/* <ConnectionHistory/> */}
    </div>
  )
}

export default index