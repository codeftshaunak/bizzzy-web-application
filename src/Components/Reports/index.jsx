import BillingEarning from './BillingEarning'
import ConnectionHistory from './ConnectionHistory'
import TimeSheet from './TimeSheet'
import Status from './status'

const index = () => {
  return (
    <div className='w-full mx-auto'>
         <Status />
        <TimeSheet /> 
        {/* <BillingEarning />  */}
        {/* <ConnectionHistory/> */}
    </div>
  )
}

export default index