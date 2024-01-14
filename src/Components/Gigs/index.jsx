import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import { CreateWithStepper } from './Gigsteper';
import ManageProject from './ManageProject';

const Gig = () => {
    const [page, setPage] = useState(1);

    return (
        <HomeLayout>
            {
                page === 1 && <ManageProject setPage={setPage} />
            }
            {
                page === 2 && <CreateWithStepper setPage={setPage} />
            }
        </HomeLayout>
    )
}

export default Gig;
