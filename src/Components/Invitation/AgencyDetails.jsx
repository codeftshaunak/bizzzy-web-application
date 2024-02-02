import React, { useEffect, useState } from 'react'
import { getAgencyById } from '../../helpers/agencyApis'

const AgencyDetails = ({ agency_id }) => {
    const [agencydetails, setAgencyDetails] = useState([]);

    const agencyDetailsId = async () => {
        try {
            const response = await getAgencyById(agency_id);
            setAgencyDetails(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        agencyDetailsId();
    }, [agency_id])

    return (
        <div>

        </div>
    )
}

export default AgencyDetails
