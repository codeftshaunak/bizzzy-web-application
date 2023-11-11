import ConnectionHistory from './ConnectionHistory'
import TimeSheet from './TimeSheet'
import Status from './status'

const index = () => {
  return (
    <div className='w-full mx-auto'>
         {/* <Status />
        <TimeSheet />  */}
        <ConnectionHistory/>
    </div>
  )
}

export default index