import MyReports from './MyReports'
import ConnectionHistory from './ConnectionHistory'
import Status from './Status'
import TimeSheet from './TimeSheet'
const index = () => {
  return (
    <div className='w-full mx-auto'>
         <Status /> 
         <TimeSheet/> 
          {/* <TransactionHistory/> */}
        {/* <BillingEarning />  */}
        {/* <ConnectionHistory />
        <MyReports /> */}
    </div>
  )
}

export default index